type PlaybackAction =
  | 'play'
  | 'pause'
  | 'auto_seek'
  | 'seek'
  | 'update_metadata';
interface Playback {
  playing: boolean;
  currentSec: number;
  totalSec: number;
  id: number;
}

const initPlayback: Playback = {
  playing: false,
  currentSec: 0,
  totalSec: 0,
  id: -1,
};
function playbackReducer(
  playback: Playback,
  action: { type: PlaybackAction; payload: Playback }
): Playback {
  const { type, payload } = action;
  switch (type) {
    case 'play':
      if (playback.playing) {
        window.clearInterval(playback.id);
        return { ...playback, playing: false, id: -1 };
      }
      return { ...playback, playing: true, id: payload.id };
    case 'seek':
      return { ...playback, currentSec: payload.currentSec };
    case 'auto_seek':
      if (playback.currentSec >= playback.totalSec) {
        window.clearInterval(playback.id);
        return { ...playback, currentSec: 0, playing: false, id: -1 };
      }
      return { ...playback, currentSec: playback.currentSec + 1 };
    case 'update_metadata':
      return { ...playback, totalSec: payload.totalSec };
    default:
      throw new Error('Invalid action!');
  }
}

export type { PlaybackAction };
export { initPlayback };
export default playbackReducer;
