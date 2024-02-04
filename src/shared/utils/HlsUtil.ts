import Hls from 'hls.js';

interface HlsPlayer {
  audioElemId: string;
  audioElem: HTMLMediaElement;
  hls: Hls | null;
  isHlsSupported: boolean;
  loadSource: (src: string) => void;
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
    audioElemId,
    audioElem,
    hls,
    isHlsSupported,
    loadSource(src: string) {
      // if (hls && src) {
      if (isHlsSupported && hls) {
        hls.loadSource(src);
      } else if (audioElem.canPlayType('application/vnd.apple.mpegurl')) {
        const audioElem = document.getElementById(
          audioElemId
        ) as HTMLAudioElement;
        audioElem.src = src;
        // }
      }
    },
  };
}
export type { HlsPlayer };
export default createHlsPlayer;
