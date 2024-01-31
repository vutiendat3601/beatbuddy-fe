import { Track } from './Track';

interface Queue {
  playedTracks: Track[];
  tracks: Track[];
  originTracks: Track[];
  repeatMode: 'once' | 'all' | 'none';
  isShuffled: boolean;
}

const INITITAL_QUEUE: Queue = {
  playedTracks: [],
  tracks: [],
  originTracks: [],
  isShuffled: false,
  repeatMode: 'none',
};


export type { Queue };

export { INITITAL_QUEUE };
