import { Track, TrackStream } from '../models/Track';
import { bbapi } from '../shared/utils/axios';

const trackService = {
  async getStream(trackId: string): Promise<TrackStream> {
    const API_TRACK_GET_STREAM = `/v1/tracks/${trackId}/stream`;
    const resp = await bbapi.get(API_TRACK_GET_STREAM);
    if (resp.data.status === 'error') {
    }
    return resp.data.data as TrackStream;
  },

  async getTrack(trackId: string): Promise<Track> {
    const API_TRACK_GET = `/v1/tracks/${trackId}`;
    const resp = await bbapi.get(API_TRACK_GET);
    if (resp.data.status === 'error') {
    }
    return resp.data.data as Track;
  },
};

export default trackService;
