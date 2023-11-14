// ## Resources
import trackMp3 from '../../../assets/audio/muon-roi-ma-sao-con-remix.mp3';
import likeIcon from '../../../assets/icon/like.svg';
import lyricsIcon from '../../../assets/icon/lyrics.svg';
import nextIcon from '../../../assets/icon/next.svg';
import pauseIcon from '../../../assets/icon/pause.svg';
import playIcon from '../../../assets/icon/play.svg';
import queueIcon from '../../../assets/icon/playing-queue.svg';
import previousIcon from '../../../assets/icon/previous.svg';
import repeatIcon from '../../../assets/icon/repeat.svg';
import shuffleIcon from '../../../assets/icon/shuffle.svg';
import thumbImg from '../../../assets/img/muon-roi-ma-sao-con-remix-bomatela.jpg';
import styles from './Media.module.scss';

import classNames from 'classnames/bind';
import { useReducer, useRef } from 'react';
import { formatSecToMinAndSec } from '../../../utils/time-utils';
import playbackReducer, { initPlayback } from './playback-reducer';
interface MediaProps {
  children?: any;
}
const css = classNames.bind(styles);
function Media({ children }: MediaProps): JSX.Element {
  // ## State

  const [playback, dispatchPlayback] = useReducer(
    playbackReducer,
    initPlayback
  );

  // ## Ref
  const audioRef = useRef<HTMLAudioElement>(null);

  const audio = audioRef.current;

  const handleAutoSeek = () => {
    dispatchPlayback({
      type: 'auto_seek',
      payload: { ...playback },
    });
  };

  const handlePlayBtn = () => {
    if (audio) {
      if (playback.playing) {
        dispatchPlayback({
          type: 'play',
          payload: { ...playback, playing: false },
        });
        audio.pause();
      } else {
        const id = window.setInterval(handleAutoSeek, 1000);
        dispatchPlayback({
          type: 'play',
          payload: { ...playback, playing: true, id },
        });
        audio.play();
      }
    }
  };

  return (
    <aside className={css('media')}>
      <div className={css('track')}>
        <img src={thumbImg} alt="" className={css('thumb')} />
        <div className={css('info')}>
          <a className={css('name')} href="#!">
            Muộn Rồi Mà Sao Còn - Remix
          </a>
          <div className={css('artist')}>
            <a href="#!">Sơn Tùng M-TP</a>
            <span>, </span>
            <a href="#!">BOMATELA</a>
          </div>
        </div>
        <button className={css('like-btn')}>
          <img src={likeIcon} alt="" className="" />
        </button>
      </div>
      <div className={css('control')}>
        <audio
          src={trackMp3}
          ref={audioRef}
          onLoadedMetadata={() => {
            if (audio) {
              dispatchPlayback({
                type: 'update_metadata',
                payload: { ...playback, totalSec: Math.round(audio.duration) },
              });
            }
          }}
        />
        <div className={css('row-top')}>
          <button className={css('control-btn')}>
            <img src={shuffleIcon} alt="" />
          </button>
          <button className={css('control-btn', 'rounded')}>
            <img src={previousIcon} alt="" />
          </button>
          <button
            className={css('control-btn', 'rounded')}
            onClick={handlePlayBtn}
          >
            <img src={playback.playing ? pauseIcon : playIcon} alt="" />
          </button>
          <button className={css('control-btn', 'rounded')}>
            <img src={nextIcon} alt="" />
          </button>
          <button className={css('control-btn')}>
            <img src={repeatIcon} alt="" />
          </button>
        </div>
        <div className={css('progress')}>
          <span className="currentMs">
            {formatSecToMinAndSec(playback.currentSec)}
          </span>
          <div className={css('progressbar')}>
            <div
              className={css('played')}
              style={{
                width: `${(playback.currentSec / playback.totalSec) * 100}%`,
              }}
            ></div>
            <div
              className={css('overlay')}
              onClick={(e: any) => {
                const progressbar = e.target;
                if (progressbar) {
                  const pos = progressbar.getBoundingClientRect();
                  const offsetX = e.clientX - pos.left;
                  let ratio = offsetX / pos.width;
                  dispatchPlayback({
                    type: 'seek',
                    payload: {
                      ...playback,
                      currentSec: Math.round(playback.totalSec * ratio),
                    },
                  });
                  if (audio) {
                    audio.currentTime = ratio * playback.totalSec;
                  }
                }
              }}
            ></div>
          </div>
          <span className={css('totalMs')}>
            {formatSecToMinAndSec(playback.totalSec)}
          </span>
        </div>
      </div>
      <div className="tool">
        <button>
          <img src={lyricsIcon} alt="" className="lyrics" />
        </button>
        <button>
          <img src={queueIcon} alt="" className="queue" />
        </button>
      </div>
    </aside>
  );
}

export default Media;
