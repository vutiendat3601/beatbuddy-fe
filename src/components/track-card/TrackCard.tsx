import classNames from 'classnames/bind';
import {
  CSSProperties,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ThreeDotIcon } from '../../assets/icon/three-dot.svg';
import trackThumbFallbackIcon from '../../assets/img/track-thumb-fallback.png';
import { Track } from '../../models/Track';
import { formatDurationSec } from '../../shared/utils/datetime-util';
import TrackAction, { TrackActionFunction } from '../track-action/TrackAction';
import style from './TrackCard.module.scss';

const css = classNames.bind(style);

interface Trans {
  percent: number;
  ms: number;
}

const INITIAL_TRANS = {
  percent: 0,
  ms: 0,
};

interface MenuItem {
  name: string;
  onClick: () => void;
  disabled?: boolean;
  hidden?: boolean;
}

type Element = 'love' | 'duration' | 'menu' | 'cta';

interface Menu {
  items: MenuItem[];
}
interface TrackCardProps {
  thumbnailWidth?: number;
  highlighted?: boolean;
  track: Track;
  controls?: TrackActionFunction;
  disabledLink?: boolean;
  hoverHighlight?: boolean;
  playingProgress?: boolean;
  callToAction?: {
    action: (track?: Track) => void;
    width?: number;
    icon: JSX.Element;
  };
  menu?: Menu;
  hiddenElements?: Element[];
  onLinkClick?: () => void;
}

function TrackCard({
  thumbnailWidth = 68,
  highlighted = false,
  track,
  disabledLink = false,
  controls,
  callToAction,
  hoverHighlight = true,
  playingProgress = false,
  menu,
  hiddenElements = [],
  onLinkClick = () => undefined,
}: TrackCardProps): JSX.Element {
  const [nameTransX, setNameTransX] = useState<Trans>(INITIAL_TRANS);
  const [artistTransX, setArtistTransX] = useState<Trans>(INITIAL_TRANS);
  // const [isMenuShown, setMenuShown] = useState<boolean>(false);

  const nameTransXIdRef = useRef<NodeJS.Timeout>();
  const artistTransXIdRef = useRef<NodeJS.Timeout>();

  function clearTransXIds() {
    setNameTransX(INITIAL_TRANS);
    setArtistTransX(INITIAL_TRANS);
    clearTimeout(nameTransXIdRef.current);
    clearTimeout(artistTransXIdRef.current);
    nameTransXIdRef.current = undefined;
    artistTransXIdRef.current = undefined;
  }
  useEffect(() => {
    window.addEventListener('resize', clearTransXIds);
    return () => {
      window.removeEventListener('resize', clearTransXIds);
    };
  }, []);

  function slideText(
    elem: HTMLElement,
    timeoutRef: MutableRefObject<NodeJS.Timeout | undefined>,
    callback: (value: Trans) => void
  ) {
    if (elem) {
      const MS_PER_PX = 60;
      const width = elem.offsetWidth;
      const scrollWidth = elem.scrollWidth;
      let offset = ((scrollWidth - width) / width) * 100;
      if (offset > 0) {
        let duration = ++offset * MS_PER_PX;
        duration = duration > 500 ? duration : 500;
        const transX = { percent: offset, ms: duration };
        callback({ percent: offset, ms: duration });
        timeoutRef.current = setTimeout(() => {
          callback({ ...transX, percent: 0 });
          timeoutRef.current = setTimeout(
            () => callback(INITIAL_TRANS),
            duration * 1.2
          );
        }, duration * 1.2);
      }
    }
  }

  function handleNameHover(e: any) {
    if (nameTransX === INITIAL_TRANS) {
      slideText(e.target.closest('p'), nameTransXIdRef, setNameTransX);
    }
  }

  function handleArtistHover(e: any) {
    if (artistTransX === INITIAL_TRANS) {
      slideText(e.target.closest('p'), artistTransXIdRef, setArtistTransX);
    }
  }

  return (
    <div
      className={css('track-card', {
        highlighted: highlighted,
        'hover-highlight': hoverHighlight,
        'playing-progress': playingProgress,
      })}
    >
      <div>
        <img
          className={css('thumbnail')}
          src={track?.thumbnail || trackThumbFallbackIcon || ''}
          alt=""
          width={thumbnailWidth}
          height={thumbnailWidth}
          onError={undefined}
        />
      </div>
      <div
        className={css('details')}
        style={
          {
            '--name-trans-x-percent': `calc(${nameTransX.percent}% * -1)`,
            '--name-trans-x-ms': `${nameTransX.ms}ms`,
            '--artist-trans-x-percent': `calc(${artistTransX.percent}% * -1)`,
            '--artist-trans-x-ms': `${artistTransX.ms}ms`,
          } as CSSProperties
        }
      >
        <p className={css('name')}>
          {disabledLink ? (
            <span
              className={css('name-value', {
                sliding: nameTransX !== INITIAL_TRANS,
              })}
              onMouseOver={handleNameHover}
            >
              {track.name}
            </span>
          ) : (
            <Link
              to={`/track/${track.id}`}
              onClick={(e: any) => {
                e.stopPropagation();
                onLinkClick();
              }}
              className={`text-link ${css('name-value', {
                sliding: nameTransX !== INITIAL_TRANS,
              })}`}
              onMouseOver={handleNameHover}
            >
              {track.name}
            </Link>
          )}
        </p>
        <p className={css('artist')}>
          <span
            className={`text-desc ${css('artist-value', {
              sliding: artistTransX !== INITIAL_TRANS,
            })}`}
            onMouseOver={handleArtistHover}
          >
            {track.artists?.map((artist, index) => (
              <span key={artist.id}>
                {disabledLink ? (
                  <span className="text-desc">{artist.name}</span>
                ) : (
                  <Link
                    onClick={(e: any) => {
                      e.stopPropagation();
                      onLinkClick();
                    }}
                    to={`/artist/${artist.id}`}
                    className="text-link text-desc"
                  >
                    {artist.name}
                  </Link>
                )}
                {index !== track.artists.length - 1 && ', '}
              </span>
            ))}
          </span>
        </p>
      </div>
      <div className={css('more')}>
        <div className={css('action')}>
          {callToAction && (
            <button
              className={css('cta')}
              onClick={() => callToAction.action(track)}
              style={
                callToAction.width && callToAction.width >= 0
                  ? { width: callToAction.width, height: callToAction.width }
                  : undefined
              }
            >
              {callToAction.icon}
            </button>
          )}
          {controls && (
            <div className={css('controls')}>
              <TrackAction controls={controls} />
            </div>
          )}
        </div>
        {!hiddenElements.includes('duration') && (
          <p className={`text-label ${css('duration')}`}>
            {formatDurationSec(track.durationSec)}
          </p>
        )}
        {!hiddenElements.includes('menu') && (
          <button className={css('menu-btn')}>
            <ThreeDotIcon className={css('three-dot')} />
          </button>
        )}
      </div>
    </div>
  );
}
export default TrackCard;
