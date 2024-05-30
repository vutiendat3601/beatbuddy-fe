import { useOidc } from '@axa-fr/react-oidc';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as PlayIcon } from '../../assets/icon/play.svg';
import useAudioContext from '../../hooks/useAudioContext';
import { Track } from '../../schemas/Track';
import {
  changePlaybackTrack,
  updatePlaybackStates,
} from '../../reducers/audioReducer';
import trackService from '../../services/track-service';
import {
  formatDurationSec,
  formatIsoDate,
} from '../../shared/utils/datetime-util';
import style from './TrackDetail.module.scss';
import catalogService from '../../services/catalog-service';

const css = classNames.bind(style);

function TrackDetail(): JSX.Element {
  const [playedInQueue, setPlayedInQueue] = useState<boolean>(false);
  const [track, setTrack] = useState<Track>();
  const { dispatchAudio } = useAudioContext();
  const { isAuthenticated } = useOidc();
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      catalogService.getTrack(params.id).then((track) => setTrack(track));
    }
  }, [params.id]);

  useEffect(() => {
    setPlayedInQueue(false);
  }, [track]);

  function handlePlay() {
    if (track && !playedInQueue) {
      changePlaybackTrack(dispatchAudio, track);
      updatePlaybackStates(dispatchAudio, { isPlaying: true });
      setPlayedInQueue(true);
    }
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
                <Link to={`/artist/${artist.id}`} className="text-link">
                  <div className={css('inner')}>
                    <img
                      src={artist.thumbnail || ''}
                      alt=""
                      className={css('artist-thumbnail')}
                    />
                    <span className={css('artist-name')}>{artist.name}</span>
                  </div>
                </Link>
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
      {isAuthenticated && (
        <div className={css('action')}>
          <button
            className={css('cta')}
            onClick={handlePlay}
            disabled={playedInQueue}
          >
            <PlayIcon />
          </button>
        </div>
      )}
    </section>
  ) : (
    <p>Track not found!</p>
  );
}

export default TrackDetail;
