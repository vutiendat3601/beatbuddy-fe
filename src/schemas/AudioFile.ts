// "key": "fffa4bbfeb42e6d0d0997558424b795e",
//     "uris": [
//       "https://raw.githubusercontent.com/vutiendat3601/cdn/_/aud/r000/fffa4bbfeb42e6d0d0997558424b795e/fffa4bbfeb42e6d0d0997558424b795e.m3u8"
//     ]

interface AudioFile {
  key: string;
  uris: string[];
}

const EMPTY_AUDIO_FILE: AudioFile = {
  key: '',
  uris: [],
};

export { EMPTY_AUDIO_FILE };

export default AudioFile;
