import classNames from 'classnames/bind';
import { ReactComponent as LikeIcon } from '../../assets/icon/love.svg';
import { Track } from '../../models/Track';
import AudioControl from '../audio-control/AudioControl';
import style from './TrackCard.module.scss';

const css = classNames.bind(style);

interface TrackCardProps {
  track: Track | null;
  controls?: AudioControl;
  variant: 'default' | 'mobile-player';
}

function TrackCard({ track, variant, controls }: TrackCardProps): JSX.Element {
  return (
    <div className={css('track-card', { [variant]: true })}>
      <img
        src={track?.thumbnail || ''}
        alt={track?.name}
        className={css('thumbnail')}
      />
      <div className={css('details')}>
        <p>
          {variant === 'mobile-player' ? (
            <span>{track?.name}</span>
          ) : (
            <a href="#!" className="text-link">
              {track?.name}
            </a>
          )}
        </p>
        <p>
          {track?.artists.map((artist, index) => (
            <span key={artist.id}>
              {variant === 'mobile-player' ? (
                <span className="text-desc">{artist.name}</span>
              ) : (
                <a href="#!" className="text-link text-desc">
                  {artist.name}
                </a>
              )}
              {index !== track.artists.length - 1 && (
                <span className="text-desc">, </span>
              )}
            </span>
          ))}
        </p>
      </div>
      <button className={`d-none d-md-flex ${css('love-btn')}`}>
        {<LikeIcon />}
      </button>
      {controls && (
        <div className={css('audio-control')}>
          <AudioControl controls={controls} />
        </div>
      )}
    </div>
  );
}
export default TrackCard;
