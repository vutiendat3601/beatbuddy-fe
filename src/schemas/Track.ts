import { Artist } from './Artist';

interface Track {
  id: string;
  urn: string;
  name: string;
  durationSec: number;
  description: string | null;
  releasedDate: string | null;
  thumbnail: string | null;
  isPublic: boolean;
  isPlayable: boolean;
  totalLikes: number;
  artists: Artist[];
  audioFileIds: string[];
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
