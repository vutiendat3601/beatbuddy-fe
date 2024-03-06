import { useParams } from 'react-router-dom';
import { Playlist } from '../../models/Playlist';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './PlaylistDetail.module.scss';
import playlistService from '../../services/playlist-service';
import TrackCard from '../../components/track-card/TrackCard';

const css = classNames.bind(style);

function PlaylistDetail(): JSX.Element {
  const [playlist, setPlaylist] = useState<Playlist>();
  const params = useParams();
  useEffect(() => {
    async function getPlaylist(playlistId: string) {
      const track = await playlistService.getPlaylist(playlistId);
      track && setPlaylist(track);
    }
    params.playlistId && getPlaylist(params.playlistId);
  }, [params.playlistId]);

  return playlist ? (
    <section className={css('track-detail')}>
      <p>{playlist.name}</p>
      <p>{playlist.thumbnail}</p>
      <p>{playlist.createdBy}</p>
      <p>{playlist.createdAt}</p>
      {playlist?.tracks.map(
        t => <TrackCard
        key={t.id}
        thumbnailWidth={48}
        track={t}
        controls={{ love: { onClick: () => undefined } }}
      />
      )}
    </section>
  ) : (
    <p>Playlist not found!</p>
  );
}

export default PlaylistDetail;
