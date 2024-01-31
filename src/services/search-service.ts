import { Search } from '../models/Search';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const searchService = {
  async search(
    keyword: string,
    page: number = 0,
    size: number = 50,
    types: string[] = ['track', 'artist']
  ): Promise<Search> {
    const typesParam = types.join(',');
    const API_TRACK_SEARCH = `${API_BASE_URL}/v1/search?q=${keyword}&types=${typesParam}&page=${page}&size=${size}`;
    const resp = await fetch(API_TRACK_SEARCH);
    const json = await resp.json();
    const data = json.data as Search;
    return data;
  },
};

export default searchService;
