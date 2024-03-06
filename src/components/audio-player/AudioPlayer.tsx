import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { ReactComponent as QueueIcon } from '../../assets/icon/queue.svg';

import TrackCard from '../../components/track-card/TrackCard';
import VolumeControl from '../../components/volume-control/VolumeControl';
import { AudioContextProps } from '../../contexts/AudioContext';
import useAudioContext from '../../hooks/useAudioContext';
import useMainLayoutContext from '../../hooks/useMainLayoutContext';
import {
  changePlayingState,
  changeRepeatMode,
  nextTrack,
  previousTrack,
  savePlayback,
  toggleShuffle,
  updatePlaybackStates,
} from '../../reducers/audioReducer';
import { changeFocus } from '../../reducers/mainLayoutReducer';
import trackService from '../../services/track-service';
import {
  PLAYBACK_PLAY_START_AFTER_SEC,
  PLAYBACK_UPDATE_INTERVAL_MS,
} from '../../shared/global-constant';
import { formatDurationSec } from '../../shared/utils/datetime-util';
import createHlsPlayer, { HlsPlayer } from '../../shared/utils/hls-util';
import style from './AudioPlayer.module.scss';
import TrackAction from '../track-action/TrackAction';

const css = classNames.bind(style);

function AudioPlayer(): JSX.Element {
  const { audioContext, dispatchAudio }: AudioContextProps = useAudioContext();
  const {
    dispatchMainLayout,
    mainLayout: { focused },
  } = useMainLayoutContext();

  const {
    playback: { state: playbackState, queue },
  } = audioContext;
  const { track, currentSec, isPlaying } = playbackState;
  const { waitingTracks, playedTracks, repeatMode, isShuffled } = queue;

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
    savePlayback(dispatchAudio);
  }, [queue, dispatchAudio]);

  function savePlaybackInterval() {
    savePlayback(dispatchAudio);
    isSessionSavedRef.current = true;
    clearTimeout(sessionIdRef.current);
    sessionIdRef.current = setTimeout(() => {
      isSessionSavedRef.current = false;
    }, PLAYBACK_UPDATE_INTERVAL_MS);
  }

  function handlePlay() {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play();
        changePlayingState(dispatchAudio, true);
      } else {
        audio.pause();
        changePlayingState(dispatchAudio, false);
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
      savePlayback(dispatchAudio);
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

  function handleAudioTimeUpdate() {
    const audio = audioRef.current;
    if (audio) {
      updatePlaybackStates(dispatchAudio, { currentSec: audio.currentTime });
      if (playbackState.track && !isSessionSavedRef.current) {
        savePlaybackInterval();
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
      previousTrack(dispatchAudio);
    }
  }

  // ## Next
  function handleNext() {
    nextTrack(dispatchAudio);
    if (waitingTracks.length === 0 && repeatMode !== 'all') {
      updatePlaybackStates(dispatchAudio, { isPlaying: false });
    }
  }

  function handleVolumeChange(value: number) {
    updatePlaybackStates(dispatchAudio, { volume: value });
  }
  // console.log(queue);
  function handleShuffle() {
    toggleShuffle(dispatchAudio);
  }

  function handleRepeat() {
    changeRepeatMode(dispatchAudio);
  }

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
      <div className="row">
        <div className="col-12 col-md-5 col-lg-3">
          <div className="d-md-none">
            {track && (
              <TrackCard
                hoverHighlight={false}
                track={track}
                thumbnailWidth={56}
                disabledLink
                controls={{
                  queue: {
                    onClick: () =>
                      changeFocus(
                        dispatchMainLayout,
                        focused === 'queue' ? 'content' : 'queue'
                      ),
                  },
                  play: { isPlaying, onClick: handlePlay, width: 40 },
                }}
                hiddenElements={['menu', 'duration']}
              />
            )}
          </div>
          <div className="d-none d-md-block">
            {track && (
              <TrackCard
                hoverHighlight={false}
                track={track}
                hiddenElements={['menu', 'duration']}
              />
            )}
          </div>
        </div>
        <div className="d-none d-md-block col-md-7 col-lg-6">
          <div className={css('controls')}>
            <div className={css('controls-top')}>
              <TrackAction
                controls={{
                  shuffle: {
                    isShuffled: isShuffled,
                    onClick: handleShuffle,
                  },
                  play: {
                    isPlaying,
                    onClick: handlePlay,
                    disabled: !playbackState.track,
                  },
                  next: {
                    onClick: handleNext,
                    disabled: waitingTracks.length === 0,
                  },
                  previous: {
                    onClick: handlePrevious,
                    disabled: audio
                      ? playedTracks.length === 0 &&
                        audio.currentTime <= PLAYBACK_PLAY_START_AFTER_SEC
                      : false,
                  },
                  repeat: {
                    onClick: handleRepeat,
                    repeatMode,
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
        <div className="col-lg-3 d-none d-lg-block">
          <div className={css('action')}>
            <div className="utils">
              <button
                className={css('queue-btn')}
                onClick={(e: any) =>
                  changeFocus(
                    dispatchMainLayout,
                    focused === 'queue' ? 'content' : 'queue'
                  )
                }
              >
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
