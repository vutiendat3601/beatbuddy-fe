import classNames from 'classnames/bind';
import { ReactComponent as PlayIcon } from '../../assets/icon/play.svg';
import style from './TrackDetail.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Track } from '../../models/Track';
import trackService from '../../services/track-service';
import {
  formatDurationSec,
  formatIsoDate,
} from '../../shared/utils/datetime-util';
import useAudioContext from '../../hooks/useAudioContext';

const css = classNames.bind(style);

function TrackDetail(): JSX.Element {
  const [track, setTrack] = useState<Track>();
  const params = useParams();
  const { dispatchAudio } = useAudioContext();

  useEffect(() => {
    async function getTrack(trackId: string) {
      const track = await trackService.getTrack(trackId);
      track && setTrack(track);
    }
    params.trackId && getTrack(params.trackId);
  }, [params.trackId]);

  function handlePlay() {
    dispatchAudio({ type: 'change_playback_track', payload: { track } });
    dispatchAudio({ type: 'update_playback', payload: { isPlaying: true } });
  }

  return track ? (
    <section className={css('track-detail')}>
      <header className={css('head')}>
        <img
          src={track.thumbnail || undefined}
          alt={track.name}
          className={css('thumbnail')}
        />
        <div className={css('info')}>
          <h1 className={`heading-1 ${css('name')}`}>{track.name}</h1>
          <ul className={css('artists')}>
            {track.artists.map((artist) => (
              <li key={artist.id} className={css('artist')}>
                <a href="#!" className="text-link">
                  <div className={css('inner')}>
                    <img
                      src={artist.thumbnail || ''}
                      alt=""
                      className={css('artist-thumbnail')}
                    />
                    <span className={css('artist-name')}>{artist.name}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <p className={css('more')}>
            <span>{formatDurationSec(track.durationSec)}</span>
            {track.releasedDate && (
              <span className={css('prefix-dot')}>
                {formatIsoDate(track.releasedDate)}
              </span>
            )}
          </p>
        </div>
      </header>
      <div className={css('action')}>
        <button className={css('cta')} onClick={handlePlay}>
          <PlayIcon />
        </button>
      </div>
    </section>
  ) : (
    <p>Track not found!</p>
  );
}

export default TrackDetail;
