import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { ReactComponent as LikeIcon } from '../../../assets/icon/like.svg';
import { ReactComponent as NextIcon } from '../../../assets/icon/next.svg';
import { ReactComponent as PauseIcon } from '../../../assets/icon/pause.svg';
import { ReactComponent as PlayIcon } from '../../../assets/icon/play.svg';
import { ReactComponent as PreviousIcon } from '../../../assets/icon/previous.svg';
import { ReactComponent as QueueIcon } from '../../../assets/icon/queue.svg';
import { ReactComponent as RepeatIcon } from '../../../assets/icon/repeat.svg';
import { ReactComponent as ShuffleIcon } from '../../../assets/icon/shuffle.svg';

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

  function handleVolumeChange(e: any) {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = e.target.value / 100;
      dispatchAudio({
        type: 'update_playback',
        payload: { volume: audio.volume },
      });
    }
  }
  return (
    <div className={css('audio-player')}>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className={css('track')}>
            <img
              src={track?.thumbnail || ''}
              alt={track?.name}
              className={css('thumbnail')}
            />
            <div className={css('details')}>
              <p>
                <a href="#!" className="text-link">
                  {track?.name}
                </a>
              </p>
              <p>
                {track?.artists.map((artist, index) => (
                  <span key={artist.id}>
                    <a href="#!" className="text-link text-desc">
                      {artist.name}
                    </a>
                    {index !== track.artists.length - 1 && (
                      <span className="text-desc">, </span>
                    )}
                  </span>
                ))}
              </p>
            </div>
            <button className={css('love-btn')}>{<LikeIcon />}</button>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className={css('controls')}>
            <div className={css('controls-top')}>
              <button className={`${css('control')}`}>
                <ShuffleIcon />
              </button>
              <button
                className={`${css('control')}`}
                disabled={
                  audio
                    ? playedTracks.length === 0 &&
                      audio.currentTime <= PLAYBACK_PLAY_START_AFTER_SEC
                    : false
                }
                onClick={handlePrevious}
              >
                <PreviousIcon />
              </button>
              <button
                className={css('control', 'play-btn', {
                  playing: isPlaying,
                })}
                onClick={handlePlay}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button className={`${css('control')}`} onClick={handleNext}>
                <NextIcon />
              </button>
              <button className={`${css('control')}`}>
                <RepeatIcon />
              </button>
            </div>
            <div className={css('controls-progressbar')}>
              <p className={`text-label ${css('start-time')}`}>
                {audio
                  ? formatDurationSec(Math.floor(audio.currentTime), false)
                  : '0:00'}
              </p>
              <div
                className={css('progress')}
                style={
                  {
                    '--current-percent':
                      audio && audio.duration
                        ? `${(audio.currentTime / audio.duration) * 100}%`
                        : `0`,
                  } as React.CSSProperties
                }
              >
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
        <div className="col-lg-4 col-md-12">
          <div className={css('action')}>
            <div className="utils">
              <button className={css('queue-btn')}>
                <QueueIcon />
              </button>
            </div>
            <div className={css('volume')}>
              <div className={css('icon')}>
                <svg
                  width="23"
                  height="20"
                  viewBox="0 0 23 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.9039 2.57182C20.4851 2.82171 21.0175 3.71148 21.4028 5.07698C21.788 6.44248 22.0001 8.19158 22 10.0016C21.9999 11.8116 21.7875 13.5604 21.4021 14.9254C21.0166 16.2904 20.4841 17.1795 19.9028 17.4286"
                    stroke={
                      audio
                        ? audio.volume === 1
                          ? 'white'
                          : 'transparent'
                        : ''
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15.8962 4.11564C16.458 4.39732 16.9632 5.17935 17.3228 6.32405C17.6824 7.46875 17.8733 8.90275 17.862 10.3736C17.8506 11.8445 17.6378 13.258 17.2609 14.3652C16.884 15.4725 16.3671 16.2025 15.8014 16.4269"
                    stroke={
                      audio
                        ? audio.volume >= 0.6
                          ? 'white'
                          : 'transparent'
                        : ''
                    }
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12.7088 5C12.9334 5 13.1557 5.12933 13.3632 5.3806C13.5707 5.63188 13.7592 6.00017 13.9179 6.46447C14.0767 6.92876 14.2027 7.47996 14.2886 8.08658C14.3746 8.69321 14.4188 9.34339 14.4188 10C14.4188 10.6566 14.3746 11.3068 14.2886 11.9134C14.2027 12.52 14.0767 13.0712 13.9179 13.5355C13.7592 13.9998 13.5707 14.3681 13.3632 14.6194C13.1557 14.8707 12.9334 15 12.7088 15"
                    stroke={
                      audio ? (audio.volume > 0 ? 'white' : 'transparent') : ''
                    }
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13 7L19 13M19 7L13 13"
                    stroke={
                      audio
                        ? audio.volume === 0
                          ? 'white'
                          : 'transparent'
                        : ''
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.47519 4.6078L8.20798 2.34395C8.78908 1.58475 10.0021 1.99569 10.0021 2.95175V16.452C10.0021 17.4614 8.67641 17.8351 8.14925 16.9742L6.46754 14.2278C6.28579 13.931 5.96277 13.75 5.61473 13.75H3C2.44772 13.75 2 13.3023 2 12.75V6C2 5.44772 2.44772 5 3 5H5.68111C5.99242 5 6.28598 4.85501 6.47519 4.6078Z"
                    stroke="white"
                    strokeWidth="2.2"
                  />
                </svg>
              </div>
              <input
                className={css('value')}
                type="range"
                min={0}
                max={100}
                value={audio ? audio.volume * 100 : 0}
                onChange={handleVolumeChange}
              />
            </div>
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
