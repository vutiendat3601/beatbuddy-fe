import { Artist } from '../models/Artist';
import { Pagination } from '../models/Pagination';
import { Track } from '../models/Track';
import { bbapi } from '../shared/utils/axios';

const artistService = {
  async getArtist(artistId: string): Promise<Artist> {
    const API_ARTIST_GET = `/v1/artists/${artistId}`;
    const resp = await bbapi.get(API_ARTIST_GET);
    if (resp.data.status === 'error') {
    }
    return resp.data.data as Artist;
  },

  async getPopularArtists(
    page: number,
    size: number = 10
  ): Promise<Pagination<Artist>> {
    const API_ARTIST_POPULARITY_GET = `/v1/artists/feed/popularity?page=${page}&size=${size}`;
    const resp = await bbapi.get(API_ARTIST_POPULARITY_GET);

    if (resp.data.status === 'error') {
    }
    const pageResp: Pagination<Artist> = {
      items: resp.data.data as Artist[],
      metadata: resp.data.metadata,
    };
    return pageResp;
  },

  async getTopTracks(artistId: string, top: number = 10): Promise<Track[]> {
    const API_ARTIST_TOP_TRACK_GET = `/v1/artists/${artistId}/top-tracks?top=${top}`;
    const resp = await bbapi.get(API_ARTIST_TOP_TRACK_GET);

    if (resp.data.status === 'error') {
    }
    return resp.data.data as Track[];
  },
};

export default artistService;
