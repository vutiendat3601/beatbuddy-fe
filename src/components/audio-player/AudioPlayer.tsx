import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { ReactComponent as QueueIcon } from '../../assets/icon/queue.svg';

import AudioControl from '../../components/audio-control/AudioControl';
import TrackCard from '../../components/track-card/TrackCard';
import VolumeControl from '../../components/volume-control/VolumeControl';
import { AudioContextProps } from '../../contexts/AudioContext';
import useAudioContext from '../../hooks/useAudioContext';
import useMainLayoutContext from '../../hooks/useMainLayoutContext';
import { Playback } from '../../models/Playback';
import { Queue } from '../../models/Queue';
import trackService from '../../services/track-service';
import {
  PLAYBACK_PLAY_START_AFTER_SEC,
  PLAYBACK_UPDATE_INTERVAL_MS,
} from '../../shared/GlobalConstant';
import createHlsPlayer, { HlsPlayer } from '../../shared/utils/HlsUtil';
import { getObject } from '../../shared/utils/LocalStorageUtil';
import formatDurationSec from '../../shared/utils/TimeUtil';
import style from './AudioPlayer.module.scss';

const css = classNames.bind(style);

function AudioPlayer(): JSX.Element {
  const { audioContext, dispatchAudio }: AudioContextProps = useAudioContext();
  const { mainLayout, dispatchMainLayout } = useMainLayoutContext();
  const { queueCard } = mainLayout;

  const { queue, playback } = audioContext;
  const { track, currentSec, isPlaying } = playback;
  const { playedTracks, repeatMode } = queue;
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
      if (!isPlaying) {
        !audio.paused && audio.pause();
      } else if (audio.readyState > 0) {
        audio.paused && audio.play();
      }
    }
    // handlePlay();
  }, [isPlaying]);

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
    dispatchAudio({ type: 'save_queue', payload: {} });
  }, [queue, dispatchAudio]);

  function savePlaybackInterval() {
    dispatchAudio({ type: 'save_playback', payload: {} });
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
      dispatchAudio({ type: 'save_queue', payload: {} });
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
      dispatchAudio({
        type: 'update_playback',
        payload: { currentSec: audio.currentTime },
      });
      if (playback.track && !isSessionSavedRef.current) {
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
      dispatchAudio({
        type: 'previous',
        payload: {},
      });
    }
  }

  // ## Next
  function handleNext() {
    dispatchAudio({
      type: 'next',
      payload: {},
    });
    if (playedTracks.length === 0 && repeatMode !== 'all') {
      dispatchAudio({ type: 'update_playback', payload: { isPlaying: false } });
    }
  }

  function handleVolumeChange(value: number) {
    dispatchAudio({
      type: 'update_playback',
      payload: { volume: value },
    });
  }

  function handleShuffle() {}

  function handleRepeat() {}

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
                variant="mobile-player"
                track={track}
                controls={{
                  play: { isPlaying, onPlay: handlePlay },
                }}
              />
            )}
          </div>
          <div className="d-none d-md-block">
            {track && <TrackCard variant="default" track={track} />}
          </div>
        </div>
        <div className="d-none d-md-block col-md-7 col-lg-6">
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
                  repeat: {
                    onRepeat: handleRepeat,
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
                  dispatchMainLayout({ type: 'toggle_queue', payload: {} })
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
