import { Artist } from './Artist';
import { Pagination } from './Pagination';
import { Track } from './Track';

interface Search {
  track?: {
    items: Track[];
    metadata: Pagination;
  };
  artist?: {
    items: Artist[];
    metadata: Pagination;
  };
}

export type { Search };
