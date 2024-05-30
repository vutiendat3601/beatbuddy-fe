import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { Playlist } from '../../schemas/Playlist';
import style from './PlaylistCard.module.scss';

const css = classNames.bind(style);

interface Trans {
  percent: number;
  ms: number;
}

const INITIAL_TRANS = {
  percent: 0,
  ms: 0,
};

interface PlaylistCardProps {
  playlist: Playlist;
  width: number;
}

function PlaylistCard({ playlist, width }: PlaylistCardProps): JSX.Element {
  return (
    <div className={`${css('playlist-card')}`} style={{ width }}>
      <img
        className={css('thumbnail')}
        src={playlist?.thumbnail || playlist.tracks[0]?.thumbnail || ''}
        alt=""
      />
      <p className={css('name')}>{playlist.name}</p>
      {/* <p>{playlist.createdBy}</p>
      <p>{playlist.createdAt}</p> */}
    </div>
  );
}
export default PlaylistCard;
