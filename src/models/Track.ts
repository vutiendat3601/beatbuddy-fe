import { Artist } from './Artist';

interface Track {
  id: string;
  name: string;
  isPublic: boolean;
  description: string | null;
  releasedDate: string | null;
  durationSec: number;
  thumbnail: string | null;
  isPlayable: boolean;
  artists: Artist[];
}

interface TrackStream {
  fileName: string | null;
  links: {
    kbps128: string[];
    kbps320: string[];
  };
}

const initialTrackStream: TrackStream = {
  fileName: null,
  links: {
    kbps128: [],
    kbps320: [],
  },
};

export type { Track, TrackStream };
export { initialTrackStream };
