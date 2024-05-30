import classNames from 'classnames/bind';

import defaultArtistThumb from '../../assets/img/artist-thumb-fallback.png';
import { Artist } from '../../schemas/Artist';
import style from './ArtistCard.module.scss';

const css = classNames.bind(style);

interface PlaylistCardProps {
  artist: Artist;
  onClick?: () => void;
}

function ArtistCard({ artist, onClick }: PlaylistCardProps): JSX.Element {
  return (
    <div className={`${css('artist-card')}`} onClick={onClick}>
      <div className={`${css('thumbnail-wrapper')}`}>
        <img
          className={css('thumbnail')}
          src={artist.thumbnail || defaultArtistThumb}
          alt=""
        />
      </div>
      <p className={css('name')}>{artist.name}</p>
    </div>
  );
}
export default ArtistCard;
