import axios from 'axios';
import { Artist } from '../schemas/Artist';
import Pagination from '../schemas/Pagination2';
import { Track } from '../schemas/Track';
import Search from '../schemas/Search2';
import Token from '../schemas/Token';
const API_V1_URL = process.env.REACT_APP_API_V1_URL;

const authClient = axios.create({
  baseURL: `${API_V1_URL}/auth`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const authService = {
  async getClientToken(): Promise<Token> {
    const resp = await authClient.get(`/token/client-token`);
    return await resp.data;
  },
};

export default authService;
