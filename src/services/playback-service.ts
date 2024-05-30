import { Playback, Queue, PlaybackState } from '../schemas/Playback';
import { bbapi } from '../shared/utils/axios';

const playbackService = {
  async getUserPlayback(): Promise<Playback> {
    const API_USER_PLAYBACK_GET = `/v1/me/playback`;
    const resp = await bbapi.get(API_USER_PLAYBACK_GET);
    if (resp.data.status === 'error') {
    }
    return resp.data.data as Playback;
  },
  async updateUserPlayback(queue: Queue, state: PlaybackState): Promise<void> {
    const { playedTracks, waitingTracks, repeatMode, isShuffled, originals } =
      queue;
    const { currentSec, volume, track } = state;
    const {
      playedTracks: originalPlayedTracks,
      waitingTracks: originalWaitingTrack,
    } = originals;

    const playedTrackIds: string[] = playedTracks.map((pt) => pt.id);
    const waitingTrackIds: string[] = waitingTracks.map((wt) => wt.id);

    const originalPlayedTrackIds: string[] = originalPlayedTracks.map(
      (opt) => opt.id
    );
    const originalWaitingTrackIds: string[] = originalWaitingTrack.map(
      (owt) => owt.id
    );

    const API_USER_PLAYBACK_UPDATE = `/v1/me/playback`;
    const resp = await bbapi.put(API_USER_PLAYBACK_UPDATE, {
      playedTrackIds,
      waitingTrackIds,
      originalPlayedTrackIds,
      originalWaitingTrackIds,
      currentSec,
      volume,
      trackId: track?.id,
      repeatMode,
      isShuffled,
    });
    if (resp.data.status === 'error') {
    }
    // return resp.data.data as Playback;
  },
};

export default playbackService;
