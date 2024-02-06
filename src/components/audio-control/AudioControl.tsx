import classNames from 'classnames/bind';
import { ReactComponent as LoveIcon } from '../../assets/icon/love.svg';
import { ReactComponent as NextIcon } from '../../assets/icon/next.svg';
import { ReactComponent as PauseIcon } from '../../assets/icon/pause.svg';
import { ReactComponent as PlayIcon } from '../../assets/icon/play.svg';
import { ReactComponent as PreviousIcon } from '../../assets/icon/previous.svg';
import { ReactComponent as RepeatIcon } from '../../assets/icon/repeat.svg';
import { ReactComponent as ShuffleIcon } from '../../assets/icon/shuffle.svg';
import style from './AudioControl.module.scss';

const css = classNames.bind(style);

interface AudioControlFunction {
  love?: {
    onLove: () => void;
    disabled?: boolean;
    hidden?: boolean;
    width?: number;
    order?: number;
  };
  play?: {
    onPlay: () => void;
    isPlaying: boolean;
    disabled?: boolean;
    hidden?: boolean;
    width?: number;
  };
  next?: {
    onNext: () => void;
    disabled?: boolean;
    hidden?: boolean;
  };
  previous?: {
    onPrevious: () => void;
    disabled?: boolean;
    hidden?: boolean;
  };
  shuffle?: {
    onShuffle: () => void;
    isShuffled: boolean;
    disabled?: boolean;
    hidden?: boolean;
  };
  repeat?: {
    onRepeat: () => void;
    repeatMode: 'once' | 'all' | 'none';
    disabled?: boolean;
    hidden?: boolean;
  };
}

interface TrackCardProps {
  controls: AudioControlFunction;
}

function AudioControl({
  controls: { love, play, next, previous, shuffle, repeat },
}: TrackCardProps): JSX.Element {
  return (
    <div className={`${css('audio-control')}`}>
      {love && (
        <button
          hidden={love.hidden}
          className={`${css('control')}`}
          style={love.order !== undefined ? { order: love.order } : undefined}
        >
          <LoveIcon />
        </button>
      )}
      <button
        hidden={shuffle === undefined || shuffle?.hidden}
        disabled={shuffle?.disabled}
        className={`${css('control')}`}
      >
        <ShuffleIcon />
      </button>
      <button
        hidden={previous === undefined || previous.hidden}
        className={`${css('control')}`}
        disabled={previous?.disabled}
        onClick={previous?.onPrevious}
      >
        <PreviousIcon />
      </button>
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
          onClick={play.onPlay}
        >
          {play.isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      )}
      <button
        hidden={next === undefined || next.hidden}
        disabled={next?.disabled}
        className={`${css('control')}`}
        onClick={next?.onNext}
      >
        <NextIcon />
      </button>
      <button
        hidden={repeat === undefined || repeat.hidden}
        disabled={repeat?.disabled}
        className={`${css('control')}`}
      >
        <RepeatIcon />
      </button>
    </div>
  );
}

export type { AudioControlFunction };
export default AudioControl;
