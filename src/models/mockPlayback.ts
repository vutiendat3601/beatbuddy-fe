import { INITIAL_PLAYBACK } from './Playback';
import { Track } from './Track';

const track: Track = {
  id: '384d4901-261a-4044-a19d-cbdb69c843c4',
  name: 'Muộn Rồi Mà Sao Còn - Remix',
  isPublic: true,
  description: null,
  releasedDate: null,
  durationSec: 446,
  thumbnail:
    'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/fffa4bbfeb42e6d0d0997558424b795e/fffa4bbfeb42e6d0d0997558424b795e.jpg',
  isPlayable: true,
  artists: [
    {
      id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
      name: 'Sơn Tùng M-TP',
      realName: null,
      birthDate: null,
      description: null,
      nationality: 'vn',
      biography: null,
      thumbnail:
        'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
      backgroundImg: null,
      isVerified: true,
      isPublic: true,
    },
    {
      id: '29968bbb-3f30-4f53-bcbe-188e14372313',
      name: 'BOMATELA',
      realName: null,
      birthDate: null,
      description: null,
      nationality: null,
      biography: null,
      thumbnail:
        'https://i.scdn.co/image/ab67616d0000b27313d38e4353a8c3ae89fec15b',
      backgroundImg: null,
      isVerified: true,
      isPublic: true,
    },
  ],
};

const mockPlayback = { ...INITIAL_PLAYBACK };
mockPlayback.track = track;

export default mockPlayback;
