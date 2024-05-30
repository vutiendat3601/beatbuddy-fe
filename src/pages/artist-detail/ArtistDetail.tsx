import { useOidc } from '@axa-fr/react-oidc';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as PlayIcon } from '../../assets/icon/play.svg';
import { ReactComponent as VerifiedIcon } from '../../assets/icon/verified.svg';
import TrackCard from '../../components/track-card/TrackCard';
import useAudioContext from '../../hooks/useAudioContext';
import {
  changePlaybackTrack,
  playPlaylist,
  updatePlaybackStates,
} from '../../reducers/audioReducer';
import { Artist } from '../../schemas/Artist';
import Pagination from '../../schemas/Pagination2';
import { Track } from '../../schemas/Track';
import catalogService from '../../services/catalog-service';
import style from './ArtistDetail.module.scss';

const css = classNames.bind(style);

function ArtistDetail(): JSX.Element {
  const [artist, setArtist] = useState<Artist>();
  const [popularTrackPage, setPopularTrackPage] = useState<Pagination<Track>>();
  const params = useParams();
  const { dispatchAudio } = useAudioContext();
  const { isAuthenticated } = useOidc();
  useEffect(() => {
    if (params.id) {
      catalogService.getArtist(params.id).then((artist) => setArtist(artist));
      catalogService
        .getArtistPopularTracks(params.id)
        .then((trackPage) => setPopularTrackPage(trackPage));
    }
  }, [params.id]);

  function handlePlay(target?: Track): void {
    if (target) {
      changePlaybackTrack(dispatchAudio, target);
      updatePlaybackStates(dispatchAudio, { isPlaying: true, currentSec: 0 });
    }
  }

  return artist ? (
    <section className={css('artist-detail')}>
      <div className={`${css('background')}`}>
        {artist.background || artist.thumbnail ? (
          <img
            className={`${css('background-img')}`}
            style={{ objectFit: artist.background ? 'cover' : 'contain' }}
            src={artist.background || artist.thumbnail || ''}
            alt=""
          />
        ) : (
          <></>
        )}
        <div className={css('info')}>
          <h1 className={`heading-1 ${css('name')}`}>{artist.name}</h1>
          <div className={css('verified')}>
            <VerifiedIcon />
            <span>Verified Artist</span>
          </div>
          <p className={`text-label ${css('listener-count')}`}>
            Total 2,000,000 listens.
          </p>
        </div>
      </div>

      <div className={`${css('content')}`}>
        {popularTrackPage && (
          <section className={`${css('element')}`}>
            <div className={css('element-head')}>
              <h2 className={`heading-2 ${css('element-title')}`}>
                Popular Tracks
              </h2>
              {isAuthenticated && (
                <div className={css('action')}>
                  <button
                    className={css('cta')}
                    onClick={() =>
                      playPlaylist(dispatchAudio, popularTrackPage.items)
                    }
                  >
                    <PlayIcon />
                  </button>
                </div>
              )}
            </div>
            <ul className={`${css('top-tracks')}`}>
              {popularTrackPage.items.map((t, index) => (
                <li key={t.id} className={`${css('top-track')}`}>
                  <p className={`text-label ${css('top-value')}`}>
                    {index + 1}
                  </p>
                  <div className={`${css('track-card')}`}>
                    <TrackCard
                      track={t}
                      thumbnailWidth={48}
                      callToAction={
                        isAuthenticated && t.isPlayable
                          ? {
                              action: handlePlay,
                              width: 28,
                              icon: <PlayIcon />,
                            }
                          : undefined
                      }
                      controls={{
                        love: {
                          onClick: () => undefined,
                          hidden: !isAuthenticated,
                        },
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </section>
  ) : (
    <p>Artist not found!</p>
  );
}

export default ArtistDetail;
