import classNames from 'classnames/bind';

import style from './ArtistCard.module.scss';
import { Artist } from '../../models/Artist';
import defaultArtistThumb from '../../assets/img/artist-thumb-fallback.png';

const css = classNames.bind(style);

interface PlaylistCardProps {
  artist: Artist;
  widthPercent: number;
}

function ArtistCard({ artist, widthPercent }: PlaylistCardProps): JSX.Element {
  return (
    <div className={`${css('artist-card')}`} style={{ width: `${widthPercent}%` }}>
      <div className={`${css('thumbnail-wrapper')}`}>
        <img className={css('thumbnail')} src={artist.thumbnail || defaultArtistThumb} alt="" />
      </div>
      <p className={css('name')}>{artist.name}</p>
    </div>
  );
}
export default ArtistCard;
