import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as PlayIcon } from '../../assets/icon/play.svg';
import { ReactComponent as VerifiedIcon } from '../../assets/icon/verified.svg';
import TrackCard from '../../components/track-card/TrackCard';
import useAudioContext from '../../hooks/useAudioContext';
import { Artist } from '../../models/Artist';
import { Track } from '../../models/Track';
import artistService from '../../services/artist-service';
import style from './ArtistDetail.module.scss';
import { useOidc } from '@axa-fr/react-oidc';
import CtaNotification from '../../components/cta-notification/CtaNotification';
import {
  changePlaybackTrack,
  playPlaylist,
  updatePlaybackStates,
} from '../../reducers/audioReducer';

const css = classNames.bind(style);

function ArtistDetail(): JSX.Element {
  const [artist, setArtist] = useState<Artist>();
  const [topTracks, setTopTracks] = useState<Track[]>();
  const params = useParams();
  const { dispatchAudio } = useAudioContext();
  const { isAuthenticated } = useOidc();
  const navigate = useNavigate();
  useEffect(() => {
    async function getArtist(artistId: string) {
      const artist = await artistService.getArtist(artistId);
      artist && setArtist(artist);
    }
    async function getArtistTopTracks(artistId: string) {
      const tracks = await artistService.getTopTracks(artistId);
      tracks && setTopTracks(tracks);
    }
    const artistId = params.artistId;
    if (artistId) {
      getArtist(artistId);
      getArtistTopTracks(artistId);
    }
  }, [params.artistId]);
  function handlePlay(target?: Track): void {
    if (target) {
      changePlaybackTrack(dispatchAudio, target);
      updatePlaybackStates(dispatchAudio, { isPlaying: true, currentSec: 0 });
    }
  }

  return artist ? (
    <section className={css('artist-detail')}>
      <div className={`${css('background')}`}>
        <img
          className={`${css('background-img')}`}
          style={{ objectFit: artist.backgroundImg ? 'cover' : 'contain' }}
          src={artist.backgroundImg || artist.thumbnail || ''}
          alt=""
        />
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
        {topTracks && (
          <section className={`${css('element')}`}>
            <div className={css('element-head')}>
              <h2 className={`heading-2 ${css('element-title')}`}>
                Top Tracks
              </h2>
              {isAuthenticated && (
                <div className={css('action')}>
                  <button
                    className={css('cta')}
                    onClick={() => playPlaylist(dispatchAudio, topTracks)}
                  >
                    <PlayIcon />
                  </button>
                </div>
              )}
            </div>
            {!isAuthenticated && (
              <CtaNotification
                message={`Sign in to listen ${artist.name}'s top tracks.`}
                actionName="Sign in"
                action={() => navigate('/auth/sign-in')}
              />
            )}
            <ul className={`${css('top-tracks')}`}>
              {topTracks.map((t, index) => (
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
