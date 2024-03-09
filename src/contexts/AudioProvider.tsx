import { useOidc, useOidcUser } from '@axa-fr/react-oidc';
import { useEffect, useReducer, useRef, useState } from 'react';
import { INITIAL_PLAYBACK, Playback } from '../models/Playback';
import audioReducer, {
  initPlayback,
  nextTrack,
  savePlayback,
  updatePlaybackStates,
} from '../reducers/audioReducer';
import playbackService from '../services/playback-service';
import trackService from '../services/track-service';
import { PLAYBACK_UPDATE_INTERVAL_MS } from '../shared/global-constant';
import createHlsPlayer, { HlsPlayer } from '../shared/utils/hls-util';
import { getObject } from '../shared/utils/local-storage-util';
import AudioContext from './AudioContext';

interface AudioProviderProps {
  children: any;
}

function AudioProvider({ children }: AudioProviderProps): JSX.Element {
  const { isAuthenticated } = useOidc();
  const { oidcUser } = useOidcUser();
  const [inital, setInitial] = useState<boolean>(true);
  const [audioContext, dispatchAudio] = useReducer(audioReducer, {
    playback: INITIAL_PLAYBACK,
  });

  useEffect(() => {
    let playback = getObject<Playback>('playback');
    if (playback) {
      initPlayback(dispatchAudio, playback);
    }
    setInitial(false);
  }, []);

  const {
    playback: { state: playbackState, queue, ownerId },
  } = audioContext;
  const { track, currentSec, isPlaying, seekedSec, volume } = playbackState;

  // ## useRef
  const hlsPlayerRef = useRef<HlsPlayer>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const sessionIdRef = useRef<ReturnType<typeof setTimeout>>();
  const isSessionSavedRef = useRef<boolean>(false);
  const audio = audioRef.current;

  useEffect(() => {
    async function getUserPlayback() {
      let serverPlayback = await playbackService.getUserPlayback();
      if (serverPlayback) {
        initPlayback(dispatchAudio, serverPlayback);
      } else {
        initPlayback(dispatchAudio, {
          ...INITIAL_PLAYBACK,
          ownerId: oidcUser?.sub,
        });
      }
    }
    if (oidcUser && ownerId !== oidcUser.sub) {
      console.log('oidcUser', oidcUser);
      getUserPlayback();
    }
  }, [oidcUser, ownerId]);

  useEffect(() => {
    hlsPlayerRef.current = createHlsPlayer('audioPlayer');
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.readyState > 0 && audio.paused && audio.play();
      } else {
        !audio.paused && audio.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    console.log('volume', volume);
    if (audio) {
      audio.volume = volume;
      audio.muted = audio.volume <= 0.01;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (seekedSec >= 0) {
        audio.currentTime = seekedSec;
        updatePlaybackStates(dispatchAudio, { seekedSec: -1 });
      }
    }
  }, [seekedSec]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      clearTimeout(sessionIdRef.current);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [dispatchAudio]);

  useEffect(() => {
    async function getStream() {
      const hlsPlayer = hlsPlayerRef.current;
      if (track && hlsPlayer) {
        const data = await trackService.getStream(track.id);
        const kbps128s = data.links.kbps128;
        if (kbps128s) {
          hlsPlayer.loadSource(kbps128s[0]);
        }
      }
    }
    isAuthenticated && getStream();
  }, [track, isAuthenticated]);

  useEffect(() => {
    savePlayback(dispatchAudio);
  }, [queue, dispatchAudio]);

  function savePlaybackInterval() {
    savePlayback(dispatchAudio);
    playbackService.updateUserPlayback(queue, playbackState);

    isSessionSavedRef.current = true;
    clearTimeout(sessionIdRef.current);
    sessionIdRef.current = setTimeout(() => {
      isSessionSavedRef.current = false;
    }, PLAYBACK_UPDATE_INTERVAL_MS);
  }

  function handleAudioLoadedMetadata() {
    const audio = audioRef.current;
    if (audio) {
      updatePlaybackStates(dispatchAudio, { totalSec: audio.duration });
      if (isPlaying) {
        audio.play();
      } else {
        audio.currentTime = currentSec;
      }
      savePlayback(dispatchAudio);
    }
  }

  function handleAudioEnd() {
    if (audio) {
      const { repeatMode } = queue;
      audio.currentTime = 0;
      if (repeatMode !== 'once') {
        nextTrack(dispatchAudio);
      } else {
        audio.play();
      }
    }
  }

  function handleAudioTimeUpdate() {
    if (!inital) {
      const audio = audioRef.current;
      if (audio) {
        updatePlaybackStates(dispatchAudio, { currentSec: audio.currentTime });
        if (playbackState.track && !isSessionSavedRef.current) {
          savePlaybackInterval();
        }
      }
    }
  }

  return (
    <AudioContext.Provider
      value={{
        audioContext,
        dispatchAudio,
      }}
    >
      <audio
        id="audioPlayer"
        ref={audioRef}
        hidden
        preload="auto"
        onLoadedMetadata={handleAudioLoadedMetadata}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={handleAudioEnd}
      ></audio>
      {children}
    </AudioContext.Provider>
  );
}

export default AudioProvider;
