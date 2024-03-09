import classNames from 'classnames/bind';
import { ReactComponent as LoveIcon } from '../../assets/icon/love.svg';
import { ReactComponent as NextIcon } from '../../assets/icon/next.svg';
import { ReactComponent as LyricsIcon } from '../../assets/icon/lyrics.svg';
import { ReactComponent as PauseIcon } from '../../assets/icon/pause.svg';
import { ReactComponent as PlayIcon } from '../../assets/icon/play.svg';
import { ReactComponent as PreviousIcon } from '../../assets/icon/previous.svg';
import { ReactComponent as QueueIcon } from '../../assets/icon/queue.svg';
import { ReactComponent as RepeatIcon } from '../../assets/icon/repeat.svg';
import { ReactComponent as ShuffleIcon } from '../../assets/icon/shuffle.svg';

import style from './TrackAction.module.scss';

const css = classNames.bind(style);

interface TrackActionFunction {
  lyrics?: {
    onClick: () => void;
    disabled?: boolean;
    hidden?: boolean;
    width?: number;
    order?: number;
  };
  love?: {
    onClick: () => void;
    disabled?: boolean;
    hidden?: boolean;
    width?: number;
    order?: number;
  };
  play?: {
    onClick: () => void;
    isPlaying: boolean;
    disabled?: boolean;
    hidden?: boolean;
    width?: number;
  };
  next?: {
    onClick: () => void;
    disabled?: boolean;
    hidden?: boolean;
  };
  previous?: {
    onClick: () => void;
    disabled?: boolean;
    hidden?: boolean;
  };
  shuffle?: {
    onClick: () => void;
    isShuffled: boolean;
    disabled?: boolean;
    hidden?: boolean;
  };
  repeat?: {
    onClick: () => void;
    repeatMode: 'once' | 'all' | 'none';
    disabled?: boolean;
    hidden?: boolean;
  };
  queue?: {
    onClick: () => void;
    disabled?: boolean;
    hidden?: boolean;
    width?: number;
    order?: number;
  };
}

interface TrackCardProps {
  controls: TrackActionFunction;
}

function TrackAction({
  controls: { lyrics, queue, love, play, next, previous, shuffle, repeat },
}: TrackCardProps): JSX.Element {
  return (
    <div className={`${css('track-action')}`}>
      {lyrics && (
        <button
          hidden={lyrics.hidden}
          className={`${css('control')}`}
          style={lyrics.order !== undefined ? { order: lyrics.order } : undefined}
        >
          <LyricsIcon />
        </button>
      )}
      {love && (
        <button
          hidden={love.hidden}
          className={`${css('control')}`}
          style={love.order !== undefined ? { order: love.order } : undefined}
        >
          <LoveIcon />
        </button>
      )}
      {shuffle && (
        <button
          hidden={shuffle === undefined || shuffle?.hidden}
          disabled={shuffle?.disabled}
          onClick={shuffle.onClick}
          className={`${css('control', 'shuffle-btn', {
            shuffled: shuffle.isShuffled,
          })}`}
        >
          <ShuffleIcon />
        </button>
      )}
      {previous && (
        <button
          hidden={previous === undefined || previous.hidden}
          className={`${css('control')}`}
          disabled={previous?.disabled}
          onClick={previous?.onClick}
        >
          <PreviousIcon />
        </button>
      )}
      {play && (
        <button
          hidden={play.hidden}
          disabled={play.disabled}
          className={`${css('control', 'play-btn', {
            playing: play.isPlaying,
          })}`}
          style={
            play.width && play.width >= 0
              ? { width: play.width, height: play.width }
              : undefined
          }
          onClick={play.onClick}
        >
          {play.isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      )}
      {next && (
        <button
          hidden={next === undefined || next.hidden}
          disabled={next.disabled}
          className={`${css('control')}`}
          onClick={next.onClick}
        >
          <NextIcon />
        </button>
      )}
      {repeat && (
        <button
          hidden={repeat === undefined || repeat.hidden}
          disabled={repeat.disabled}
          className={`${css('control', 'repeat-btn', {
            [repeat.repeatMode]: true,
          })}`}
          onClick={repeat.onClick}
        >
          <RepeatIcon />
        </button>
      )}
      {queue && (
        <button
          hidden={queue.hidden}
          className={`${css('control')}`}
          onClick={queue.onClick}
          style={queue.order !== undefined ? { order: queue.order } : undefined}
        >
          <QueueIcon />
        </button>
      )}
    </div>
  );
}

export type { TrackActionFunction };
export default TrackAction;
