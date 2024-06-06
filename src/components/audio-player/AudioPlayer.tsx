import classNames from 'classnames/bind';
import { ReactComponent as LyricsIcon } from '../../assets/icon/lyrics.svg';
import { ReactComponent as QueueIcon } from '../../assets/icon/queue.svg';

import TrackCard from '../../components/track-card/TrackCard';
import useAudioContext from '../../hooks/useAudioContext';
import useMainLayoutContext from '../../hooks/useMainLayoutContext';
import {
  changeRepeatMode,
  nextTrack,
  previousTrack,
  togglePlayState,
  toggleShuffle,
  updatePlaybackStates,
} from '../../reducers/audioReducer';
import { changeFocus } from '../../reducers/mainLayoutReducer';
import { PLAYBACK_PLAY_START_AFTER_SEC } from '../../shared/global-constant';
import { formatDurationSec } from '../../shared/utils/datetime-util';
import { getScreenWidth, screens } from '../../shared/utils/responsive-util';
import TrackAction from '../track-action/TrackAction';
import VolumeControl from '../volume-control/VolumeControl';
import style from './AudioPlayer.module.scss';

const css = classNames.bind(style);

function AudioPlayer(): JSX.Element {
  const {
    dispatchMainLayout,
    mainLayout: { focused },
  } = useMainLayoutContext();
  const {
    dispatchAudio,
    audioContext: { playback },
  } = useAudioContext();
  const {
    // queue,
    queue: { isShuffled, playedTracks, waitingTracks, repeatMode },
    state: playbackState,
  } = playback;

  const { isPlaying, track, currentSec, totalSec } = playbackState;

  return (
    <div
      className={css('audio-player')}
      style={
        {
          '--current-percent': `${(currentSec / totalSec) * 100}%`,
        } as React.CSSProperties
      }
    >
      <div className="row">
        <div className="col-12 col-md-5 col-lg-3">
          <div className="d-md-none">
            {track && (
              <TrackCard
                hoverHighlighted={false}
                track={track}
                thumbnailWidth={56}
                disabledLink
                playingProgress
                controls={{
                  queue: {
                    onClick: () =>
                      changeFocus(
                        dispatchMainLayout,
                        focused === 'queue' ? 'content' : 'queue'
                      ),
                  },
                  play: {
                    isPlaying,
                    onClick: () => togglePlayState(dispatchAudio),
                    width: 40,
                  },
                }}
                hiddenElements={['menu', 'duration']}
              />
            )}
          </div>
          <div className="d-none d-md-block">
            {track && (
              <TrackCard
                hoverHighlighted={false}
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
                  lyrics: {
                    onClick: () => undefined,
                    hidden: getScreenWidth() >= screens.lg,
                  },
                  shuffle: {
                    isShuffled: isShuffled,
                    onClick: () => toggleShuffle(dispatchAudio),
                  },
                  play: {
                    isPlaying,
                    onClick: () => togglePlayState(dispatchAudio),
                    disabled: !playbackState.track,
                  },
                  next: {
                    onClick: () => nextTrack(dispatchAudio),
                    disabled: waitingTracks.length === 0,
                  },
                  previous: {
                    onClick: () => {
                      if (currentSec > 6) {
                        updatePlaybackStates(dispatchAudio, { seekedSec: 0 });
                      } else {
                        previousTrack(dispatchAudio);
                      }
                    },
                    disabled:
                      playedTracks.length === 0 &&
                      currentSec <= PLAYBACK_PLAY_START_AFTER_SEC,
                  },
                  repeat: {
                    onClick: () => changeRepeatMode(dispatchAudio),
                    repeatMode,
                  },
                  queue: {
                    onClick: () =>
                      changeFocus(
                        dispatchMainLayout,
                        focused === 'queue' ? 'content' : 'queue'
                      ),
                    hidden: getScreenWidth() >= screens.lg,
                  },
                }}
              />
            </div>
            <div className={css('controls-progressbar')}>
              <p className={`text-label ${css('start-time')}`}>
                {formatDurationSec(Math.floor(currentSec), false)}
              </p>
              <div className={css('progress')}>
                <input
                  className={css('progress-seek')}
                  type="range"
                  min={0}
                  max={totalSec}
                  value={currentSec}
                  onChange={(e: any) => {
                    updatePlaybackStates(dispatchAudio, {
                      seekedSec: e.target.value,
                    });
                  }}
                />
              </div>
              <p className={`text-label ${css('end-time')}`}>
                {formatDurationSec(Math.floor(totalSec), false)}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 d-none d-lg-block">
          <div className={css('action')}>
            <div className={css('utils')}>
              <button
                className={css('lyrics-btn')}
                onClick={(e: any) => undefined}
              >
                <LyricsIcon />
              </button>
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
            <VolumeControl />
          </div>
        </div>
      </div>
    </div>
  );
}
export default AudioPlayer;
