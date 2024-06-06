import { createContext } from 'react';
import { INITIAL_PLAYBACK } from '../schemas/Playback';
import { AudioPlayer, AudioPlayerAction } from '../reducers/audioReducer';

interface AudioContextProps {
  audioContext: AudioPlayer;
  dispatchAudio: React.Dispatch<AudioPlayerAction>;
}

const AudioContext = createContext<AudioContextProps>({
  audioContext: { playback: INITIAL_PLAYBACK },
  dispatchAudio: (_value: any) => {},
});

export type { AudioContextProps };
export default AudioContext;
