import { removeObject } from './local-storage-util';

function clearUserData() {
  ['queue', 'playback'].forEach((d) => removeObject(d));
}

export { clearUserData };
