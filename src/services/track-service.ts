import { Track, TrackStream } from '../models/Track';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const trackService = {
  async getStream(trackId: string): Promise<TrackStream> {
    const API_TRACK_GET_STREAM = `${API_BASE_URL}/v1/tracks/${trackId}/stream`;
    const resp = await fetch(API_TRACK_GET_STREAM);
    const json = await resp.json();
    const data = json.data as TrackStream;
    return data;
  },

  async getTrack(trackId: string): Promise<Track> {
    const API_TRACK_GET = `${API_BASE_URL}/v1/tracks/${trackId}`;
    const resp = await fetch(API_TRACK_GET);
    const json = await resp.json();
    const data = json.data as Track;
    return data;
  },
};

export default trackService;
