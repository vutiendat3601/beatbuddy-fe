import { Track } from './Track';

interface Playback {
  track: Track | null;
  currentSec: number;
  isPlaying: boolean;
  volume: number;
}

const INITIAL_PLAYBACK: Playback = {
  currentSec: 0,
  volume: 0.6,
  track: null,
  isPlaying: false,
};

export type { Playback };

export { INITIAL_PLAYBACK };
