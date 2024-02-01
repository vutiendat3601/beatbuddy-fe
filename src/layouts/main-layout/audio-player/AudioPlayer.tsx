import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { ReactComponent as QueueIcon } from '../../../assets/icon/queue.svg';

import AudioControl from '../../../components/audio-control/AudioControl';
import TrackCard from '../../../components/track-card/TrackCard';
import VolumeControl from '../../../components/volume-control/VolumeControl';
import { AudioContextProps } from '../../../contexts/AudioContext';
import useAudioContext from '../../../hooks/useAudioContext';
import { Playback } from '../../../models/Playback';
import { INITITAL_QUEUE, Queue } from '../../../models/Queue';
import { Track } from '../../../models/Track';
import trackService from '../../../services/track-service';
import {
  PLAYBACK_PLAY_START_AFTER_SEC,
  PLAYBACK_UPDATE_INTERVAL_MS,
} from '../../../shared/GlobalConstant';
import createHlsPlayer, { HlsPlayer } from '../../../shared/utils/HlsUtil';
import { getObject, saveObject } from '../../../shared/utils/LocalStorageUtil';
import formatDurationSec from '../../../shared/utils/TimeUtil';
import style from './AudioPlayer.module.scss';

const css = classNames.bind(style);

function AudioPlayer(): JSX.Element {
  const { audioContext, dispatchAudio }: AudioContextProps = useAudioContext();

  const { queue, playback } = audioContext;
  const { track, currentSec, isPlaying } = playback;
  const { playedTracks } = queue;
  // ## useRef
  const hlsPlayerRef = useRef<HlsPlayer>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const sessionIdRef = useRef<ReturnType<typeof setTimeout>>();
  const isSessionSavedRef = useRef<boolean>(false);

  const audio = audioRef.current;

  useEffect(() => {
    hlsPlayerRef.current = createHlsPlayer('audioPlayer');
  }, []);

  useEffect(() => {
    let queue = getObject<Queue>('queue');
    let playback = getObject<Playback>('playback') as Playback;
    const audio = audioRef.current;
    if (queue && playback) {
      if (audio) {
        audio.volume = playback.volume;
      }
      dispatchAudio({ type: 'init', payload: { queue, playback } });
    }
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
    getStream();
  }, [track]);

  useEffect(() => {
    if (queue !== INITITAL_QUEUE) {
      saveObject('queue', queue);
    }
  }, [queue]);

  function handlePlay() {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play();
        dispatchAudio({
          type: 'update_playback',
          payload: { isPlaying: true },
        });
      } else {
        dispatchAudio({
          type: 'update_playback',
          payload: { isPlaying: false },
        });
        audio.pause();
      }
    }
  }
  function handleAudioLoadedMetadata() {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.currentTime = currentSec;
      }
      saveObject('queue', queue);
    }
  }

  function handleAudioEnd() {
    if (audio) {
      const { repeatMode } = queue;
      audio.currentTime = 0;
      if (repeatMode !== 'once') {
        handleNext();
      } else {
        audio.play();
      }
    }
  }

  function savePlayback() {
    saveObject('playback', { ...playback, isPlaying: false });
    isSessionSavedRef.current = true;
    clearTimeout(sessionIdRef.current);
    sessionIdRef.current = setTimeout(() => {
      isSessionSavedRef.current = false;
    }, PLAYBACK_UPDATE_INTERVAL_MS);
  }

  function handleAudioTimeUpdate() {
    const audio = audioRef.current;
    if (audio) {
      dispatchAudio({
        type: 'update_playback',
        payload: { currentSec: audio.currentTime },
      });
      if (playback.track && !isSessionSavedRef.current) {
        savePlayback();
      }
    }
  }

  function handleSeek(e: any) {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = e.target.value;
    }
  }
  // ## Previous
  function handlePrevious() {
    const audio = audioRef.current;

    if (audio && audio.currentTime > PLAYBACK_PLAY_START_AFTER_SEC) {
      // ## Play from start
      audio.currentTime = 0;
    } else {
      const { playedTracks, tracks } = queue;
      if (playedTracks.length !== 0) {
        let updatedPlayedTracks = [...playedTracks];
        let updatedTracks: Track[] = [...tracks];

        track && updatedTracks.unshift(track);
        let updatedTrack = updatedPlayedTracks.pop();

        console.log(updatedPlayedTracks);
        dispatchAudio({
          type: 'update_session',
          payload: {
            playedTracks: updatedPlayedTracks,
            tracks: updatedTracks,
            track: updatedTrack,
          },
        });
      }
      savePlayback();
    }
  }

  // ## Next
  function handleNext() {
    const { playedTracks, tracks } = queue;

    let updatedPlayedTracks = [...playedTracks];
    let updatedTracks: Track[] = [...tracks];

    track && updatedPlayedTracks.push(track);
    let updatedTrack = updatedTracks.shift();
    let isPlaying = true;
    if (!updatedTrack) {
      updatedTrack = updatedPlayedTracks.shift();
      updatedTracks = [...updatedPlayedTracks];
      updatedPlayedTracks = [];
      isPlaying = queue.repeatMode !== 'all';
    }
    dispatchAudio({
      type: 'update_session',
      payload: {
        playedTracks: updatedPlayedTracks,
        tracks: updatedTracks,
        track: updatedTrack,
        isPlaying: isPlaying,
      },
    });
    dispatchAudio({
      type: 'update_playback',
      payload: {
        isPlaying,
      },
    });
    savePlayback();
  }

  function handleVolumeChange(value: number) {
    dispatchAudio({
      type: 'update_playback',
      payload: { volume: value },
    });
  }

  function handleShuffle() {}

  return (
    <div
      className={css('audio-player')}
      style={
        {
          '--current-percent':
            audio && audio.duration
              ? `${(audio.currentTime / audio.duration) * 100}%`
              : `0`,
        } as React.CSSProperties
      }
    >
      <div className="row row-cols-1 row-cols-md-2">
        <div className="col col-12 col-md-5 col-lg-4">
          <div className="d-md-none">
            <TrackCard
              variant="mobile-player"
              track={track}
              controls={{
                play: {
                  isPlaying,
                  onPlay: handlePlay,
                },
              }}
            />
          </div>
          <div className="d-none d-md-block">
            <TrackCard variant="default" track={track} />
          </div>
        </div>
        <div className="col col-md-7 col-lg-6 d-none d-md-block">
          <div className={css('controls')}>
            <div className={css('controls-top')}>
              <AudioControl
                controls={{
                  play: {
                    isPlaying,
                    onPlay: handlePlay,
                  },
                  shuffle: {
                    isShuffled: false,
                    onShuffle: handleShuffle,
                  },
                  next: {
                    onNext: handleNext,
                  },
                  previous: {
                    onPrevious: handlePrevious,
                    disabled: audio
                      ? playedTracks.length === 0 &&
                        audio.currentTime <= PLAYBACK_PLAY_START_AFTER_SEC
                      : false,
                  },
                }}
              />
            </div>
            <div className={css('controls-progressbar')}>
              <p className={`text-label ${css('start-time')}`}>
                {audio
                  ? formatDurationSec(Math.floor(audio.currentTime), false)
                  : '0:00'}
              </p>
              <div className={css('progress')}>
                <input
                  className={css('progress-seek')}
                  type="range"
                  min={0}
                  max={audio && audio.duration ? audio.duration : 0}
                  value={audio ? audio.currentTime : 0}
                  onChange={handleSeek}
                />
              </div>
              <p className={`text-label ${css('end-time')}`}>
                {audio && audio.duration
                  ? formatDurationSec(Math.floor(audio.duration), false)
                  : '0:00'}
              </p>
            </div>
          </div>
        </div>
        <div className="col col-lg-2 d-none d-lg-block">
          <div className={css('action')}>
            <div className="utils">
              <button className={css('queue-btn')}>
                <QueueIcon />
              </button>
            </div>
            <VolumeControl
              onVolumeChange={handleVolumeChange}
              mediaElemRef={audioRef}
            />
          </div>
        </div>
      </div>
      <audio
        id="audioPlayer"
        ref={audioRef}
        hidden
        preload="auto"
        onLoadedMetadata={handleAudioLoadedMetadata}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={handleAudioEnd}
      ></audio>
    </div>
  );
}
export default AudioPlayer;
