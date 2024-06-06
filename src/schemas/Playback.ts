import { Track } from './Track';

interface PlaybackState {
  track: Track | undefined;
  currentSec: number;
  totalSec: number;
  isPlaying: boolean;
  seekedSec: number;
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
  ownerId: string | null;
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
    totalSec: 0,
    isPlaying: false,
    seekedSec: -1,
  },
  queue: INITITAL_QUEUE,
  ownerId: null,
};

export { INITIAL_PLAYBACK, INITITAL_QUEUE };

export type { Playback, PlaybackState, Queue, RepeatMode };
