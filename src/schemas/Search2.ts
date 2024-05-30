import { Artist } from './Artist';
import Pagination from './Pagination2';
import { Track } from './Track';

interface Search {
  results: {
    track?: Pagination<Track>;
    artist?: Pagination<Artist>;
  };
  page: number;
  size: number;
}

const EMPTY_SEARCH: Search = {
  results: {},
  page: 0,
  size: 0,
};

export { EMPTY_SEARCH };

export default Search;
