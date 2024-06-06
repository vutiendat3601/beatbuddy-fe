import { useOidc } from '@axa-fr/react-oidc';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as PlayIcon } from '../../assets/icon/play.svg';
import ArtistCard from '../../components/artist-card/ArtistCard';
import TrackCard from '../../components/track-card/TrackCard';
import useAudioContext from '../../hooks/useAudioContext';
import {
  changePlaybackTrack,
  updatePlaybackStates,
} from '../../reducers/audioReducer';
import { Artist } from '../../schemas/Artist';
import Pagination from '../../schemas/Pagination2';
import { Track } from '../../schemas/Track';
import catalogService from '../../services/catalog-service';
import style from './Home.module.scss';
const css = classNames.bind(style);

function Home() {
  // const [popularPlaylists, setPopularPlaylists] = useState<Playlist[]>();
  const [popularArtistPage, setPopularArtistPage] =
    useState<Pagination<Artist>>();
  const { isAuthenticated } = useOidc();
  const [popularTrackPage, setPopularTrackPage] = useState<Pagination<Track>>();

  const { dispatchAudio } = useAudioContext();
  useEffect(() => {
    catalogService
      .getPopularArtists(1, 12)
      .then((artistPage) => setPopularArtistPage(artistPage));
    catalogService
      .getPopularTracks(1, 12)
      .then((trackPage) => setPopularTrackPage(trackPage));
  }, []);
  function handlePlay(target?: Track): void {
    if (target) {
      changePlaybackTrack(dispatchAudio, target);
      updatePlaybackStates(dispatchAudio, { isPlaying: true, currentSec: 0 });
    }
  }
  return (
    <div className={`${css('home')}`}>
      {/* {popularPlaylists && (
        <section className={`${css('element')}`}>
          <h2 className={`heading-2 ${css('element-title')}`}>
            Popular Playlists
          </h2>
          <div className={`${css('element-items')}`}>
            {popularPlaylists.map((pp, index) => (
              <Link to={`/playlist/${pp.id}`} key={index}>
                <PlaylistCard playlist={pp} width={200} />
              </Link>
            ))}
          </div>
        </section>
      )} */}
      {popularTrackPage && (
        <section className={`${css('element')}`}>
          <h2 className={`heading-2 ${css('element-title')}`}>
            Popular Tracks
          </h2>
          <ul className={`${css('element-items')}`}>
            {popularTrackPage.items.map((t) => (
              <li key={t.id} className={`${css('element-horizontal-item')}`}>
                <TrackCard
                  track={t}
                  callToAction={
                    isAuthenticated && t.isPlayable
                      ? {
                          action: handlePlay,
                          width: 28,
                          icon: <PlayIcon />,
                        }
                      : undefined
                  }
                />
              </li>
            ))}
          </ul>
        </section>
      )}
      {popularArtistPage && (
        <section className={`${css('element')}`}>
          <h2 className={`heading-2 ${css('element-title')}`}>
            Popular Artists
          </h2>
          <ul className={`${css('element-items')}`}>
            {popularArtistPage.items.map((a) => (
              <li key={a.id} className={`${css('element-vertical-item')}`}>
                <Link to={`/artist/${a.id}`}>
                  <ArtistCard artist={a} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default Home;
