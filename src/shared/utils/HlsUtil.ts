import Hls from 'hls.js';

interface HlsPlayer {
  audioElem: HTMLMediaElement;
  hls: Hls | null;
  isHlsSupported: boolean;
  loadSource: (src: string | undefined) => void;
}

function createHlsPlayer(audioElemId: string): HlsPlayer {
  let hls: Hls | null = null;
  let isHlsSupported = false;
  const audioElem: HTMLMediaElement = document.getElementById(
    audioElemId
  ) as HTMLMediaElement;
  if (audioElem) {
    isHlsSupported = Hls.isSupported();
    if (isHlsSupported) {
      hls = new Hls();
      hls.attachMedia(audioElem);
    } else {
    }
    // For Safari
    // document.getElementById('audioPlayer').src = audioUrl;
  }

  return {
    audioElem,
    hls,
    isHlsSupported,
    loadSource(src: string | undefined) {
      if (hls && src) {
        if (isHlsSupported) {
          hls.loadSource(src);
        } else if (audioElem?.canPlayType('application/vnd.apple.mpegurl')) {
          audioElem.src = src;
        }
      }
    },
  };
}
export type { HlsPlayer };
export default createHlsPlayer;
