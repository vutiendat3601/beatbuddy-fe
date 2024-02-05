import { Track } from './Track';

interface Playback {
  track: Track | undefined;
  currentSec: number;
  isPlaying: boolean;
  volume: number;
}

const INITIAL_PLAYBACK: Playback = {
  currentSec: 0,
  volume: 0.6,
  track: undefined,
  isPlaying: false,
};

export type { Playback };

export { INITIAL_PLAYBACK };
