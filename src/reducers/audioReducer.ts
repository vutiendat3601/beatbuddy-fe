import { Playback, INITIAL_PLAYBACK } from '../models/Playback';
import { Queue, INITITAL_QUEUE } from '../models/Queue';
import { Track } from '../models/Track';

interface AudioPlayer {
  queue: Queue;
  playback: Playback;
}

interface AudioPayload {
  currentSec?: number;
  queue?: Queue;
  playback?: Playback;
  tracks?: Track[];
  playedTracks?: Track[];
  track?: Track | null;
  isPlaying?: boolean;
  volume?: number;
}

interface AudioPlayerAction {
  type:
    | 'init'
    | 'play'
    | 'paused'
    | 'seek'
    | 'update_session'
    | 'repeat'
    | 'shuffle'
    | 'update_playback';
  payload: AudioPayload;
}

const initialAudioPlayer: AudioPlayer = {
  queue: INITITAL_QUEUE,
  playback: INITIAL_PLAYBACK,
};

function audioReducer(states: AudioPlayer, action: AudioPlayerAction) {
  const updatedStates = { ...states };
  const { type, payload } = action;
  switch (type) {
    case 'play':
      break;
    case 'update_playback':
      if (payload.currentSec) {
        updatedStates.playback.currentSec = payload.currentSec;
      }
      if (payload.isPlaying !== undefined) {
        updatedStates.playback.isPlaying = payload.isPlaying;
      }
      if (payload.volume && payload.volume >= 0 && payload.volume <= 1) {
        updatedStates.playback.volume = payload.volume;
      }
      break;
    case 'init':
      if (payload.queue) {
        updatedStates.queue = payload.queue;
      }
      if (payload.playback) {
        updatedStates.playback = payload.playback;
      }
      if (payload.volume && payload.volume >= 0 && payload.volume <= 1) {
        updatedStates.playback.volume = payload.volume;
      }
      break;
    case 'update_session':
      if (payload.track) {
        updatedStates.playback.track = payload.track;
        updatedStates.playback.currentSec = 0;
      }
      if (payload.tracks) {
        updatedStates.queue.tracks = payload.tracks;
      }
      if (payload.playedTracks) {
        updatedStates.queue.playedTracks = payload.playedTracks;
      }
      break;
    default:
      break;
  }
  return updatedStates;
}

export type { AudioPlayer, AudioPayload, AudioPlayerAction };
export { initialAudioPlayer };
export default audioReducer;
