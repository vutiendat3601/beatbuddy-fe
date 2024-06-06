import { Playlist } from '../schemas/Playlist';
import { bbapi } from '../shared/utils/axios';

const playlistService = {
  async getPlaylist(playlistId: string): Promise<Playlist> {
    const API_PLAYLIST_GET = `/v1/playlists/${playlistId}`;
    const resp = await bbapi.get(API_PLAYLIST_GET);
    if (resp.data.status === 'error') {
    }
    return resp.data.data as Playlist;
  },
};

export default playlistService;
