import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArtistCard from '../../components/artist-card/ArtistCard';
import { Artist } from '../../models/Artist';
import artistService from '../../services/artist-service';
import style from './Home.module.scss';

const css = classNames.bind(style);

function Home() {
  // const [popularPlaylists, setPopularPlaylists] = useState<Playlist[]>();
  const [popularArtists, setPopularArtists] = useState<Artist[]>();

  useEffect(() => {
    async function getPopularArtists() {
      const pageArtistResp = await artistService.getPopularArtists(0, 12);
      const artists: Artist[] = pageArtistResp.items || [];
      setPopularArtists(artists);
    }
    getPopularArtists();
  }, []);

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
      {popularArtists && (
        <section className={`${css('element')}`}>
          <h2 className={`heading-2 ${css('element-title')}`}>
            Popular Artists
          </h2>
          <ul className={`${css('element-items')}`}>
            {popularArtists.map((a) => (
              <li key={a.id} className={`${css('element-item')}`}>
                <Link to={`/artist/${a.id}`}>
                  <ArtistCard artist={a} widthPercent={100} />
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
