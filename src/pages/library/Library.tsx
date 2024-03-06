import classNames from 'classnames/bind';
import style from './Library.module.scss';
import { useState } from 'react';
import { Playlist } from '../../models/Playlist';
import { Link } from 'react-router-dom';
import ArtistCard from '../../components/artist-card/ArtistCard';

const css = classNames.bind(style);

function Library(): JSX.Element {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  return (
    <section className={`${css('element')}`}>
      <h2 className={`heading-2 ${css('element-title')}`}>Your Playlists</h2>
      <ul className={`${css('element-items')}`}>
        {playlists.map((a) => (
          <li key={a.id} className={`${css('element-item')}`}>
            <Link to={`/artist/${a.id}`}>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Library;
