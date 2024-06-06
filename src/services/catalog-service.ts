import axios from 'axios';
import { Artist } from '../schemas/Artist';
import Pagination from '../schemas/Pagination2';
import Search from '../schemas/Search2';
import { Track } from '../schemas/Track';
import authService from './auth-service';
const API_V1_URL = process.env.REACT_APP_API_V1_URL;

const catalogClient = axios.create({
  baseURL: `${API_V1_URL}/catalog`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

catalogClient.interceptors.request.use(async (config) => {
  if (!localStorage.getItem('X-Client-Token')) {
    const clientToken = await authService.getClientToken();
    localStorage.setItem('clientToken', clientToken.token);
  }
  config.headers['X-Client-Token'] = `Bearer ${localStorage.getItem(
    'clientToken'
  )}`;
  return config;
});

const catalogService = {
  async getPopularArtists(
    page: number = 1,
    size: number = 30
  ): Promise<Pagination<Artist>> {
    const resp = await catalogClient.get(
      `/feed/popular-artists?page=${page}&size=${size}`
    );
    return await resp.data;
  },
  async getPopularTracks(
    page: number = 1,
    size: number = 30
  ): Promise<Pagination<Track>> {
    const resp = await catalogClient.get(
      `/feed/popular-tracks?page=${page}&size=${size}`
    );
    return await resp.data;
  },
  async getTrack(id: string): Promise<Track> {
    const resp = await catalogClient.get(`/tracks/${id}`);
    return await resp.data;
  },
  async getArtist(id: string): Promise<Artist> {
    const resp = await catalogClient.get(`/artists/${id}`);
    return await resp.data;
  },
  async getArtistPopularTracks(
    id: string,
    page: number = 1,
    size: number = 10
  ): Promise<Pagination<Track>> {
    const resp = await catalogClient.get(
      `/artists/${id}/popular-tracks?page=${page}&size=${size}`
    );
    return await resp.data;
  },
  async search(
    query: string,
    types: string[] = ['track', 'artist'],
    page: number = 1,
    size: number = 10
  ): Promise<Search> {
    const resp = await catalogClient.get(
      `/search?query=${query}&types=${types.join(
        ','
      )}&page=${page}&size=${size}`
    );
    return await resp.data;
  },
};

export default catalogService;
