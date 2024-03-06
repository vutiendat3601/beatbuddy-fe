import { Track } from './Track';

interface Playlist {
  id: string;
  name: string;
  description: string | null;
  durationSec: number;
  thumbnail: string | null;
  tracks: Track[];
  isPublic: boolean;
  uri: string;
  createdBy: string;
  updatedBy: string;
  createdAt: number;
  updatedAt: number;
}
export type { Playlist };
