import axios from "axios";
import AudioFile from "../schemas/AudioFile";
const API_V1_URL = process.env.REACT_APP_API_V1_URL;

const audioClient = axios.create({
  baseURL: `${API_V1_URL}/audio`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const audioService = {
  async getAudioFile(id: string): Promise<AudioFile> {
    const resp = await audioClient.get(`/files/${id}`);
    return await resp.data;
  },
};

export default audioService;
