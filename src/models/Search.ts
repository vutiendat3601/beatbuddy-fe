import { Artist } from './Artist';
import { Pagination } from './Pagination';
import { Track } from './Track';

interface SearchResult<T> {
  items: T[];
  metadata: Pagination;
}

interface Search {
  track?: SearchResult<Track>;
  artist?: SearchResult<Artist>;
}

export type { Search, SearchResult };
