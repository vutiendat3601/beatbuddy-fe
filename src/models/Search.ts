import { Artist } from './Artist';
import { Pagination } from './Pagination';
import { Track } from './Track';


interface Search {
  track?: Pagination<Track>;
  artist?: Pagination<Artist>;
}

export type { Search, Pagination };
