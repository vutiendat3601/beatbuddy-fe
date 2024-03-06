import { Track } from './Track';

interface PlaybackState {
  track: Track | undefined;
  currentSec: number;
  isPlaying: boolean;
  volume: number;
}

type RepeatMode = 'once' | 'all' | 'none';

interface Queue {
  playedTracks: Track[];
  waitingTracks: Track[];
  originals: {
    playedTracks: Track[];
    waitingTracks: Track[];
  };
  repeatMode: RepeatMode;
  isShuffled: boolean;
}

interface Playback {
  state: PlaybackState;
  queue: Queue;
}

const INITITAL_QUEUE: Queue = {
  playedTracks: [],
  waitingTracks: [],
  originals: {
    playedTracks: [],
    waitingTracks: [],
  },
  isShuffled: false,
  repeatMode: 'none',
};

const INITIAL_PLAYBACK: Playback = {
  state: {
    track: undefined,
    volume: 0.6,
    currentSec: 0,
    isPlaying: false,
  },
  queue: INITITAL_QUEUE,
};

export { INITIAL_PLAYBACK, INITITAL_QUEUE };

export type { Playback, PlaybackState, Queue, RepeatMode };
