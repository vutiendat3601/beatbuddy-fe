import { Search } from '../models/Search';
import { bbapi } from '../shared/utils/axios';

const searchService = {
  async search(
    q: string,
    page: number = 0,
    size: number = 50,
    types: string[] = ['track', 'artist']
  ): Promise<Search> {
    const typesParam = types.join(',');
    const API_TRACK_SEARCH = `/v1/search?q=${q}&types=${typesParam}&page=${page}&size=${size}`;
    const resp = await bbapi.get(API_TRACK_SEARCH);
    if (resp.data.status === 'error') {
    }
    return resp.data.data as Search;
  },
};

export default searchService;
