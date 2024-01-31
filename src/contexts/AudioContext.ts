import { createContext } from 'react';
import {
  AudioPlayer,
  AudioPlayerAction,
} from '../reducers/audioReducer';
import { INITIAL_PLAYBACK } from '../models/Playback';
import { INITITAL_QUEUE } from '../models/Queue';

interface AudioContextProps {
  audioContext: AudioPlayer;
  dispatchAudio: React.Dispatch<AudioPlayerAction>;
}

const AudioContext = createContext<AudioContextProps>({
  audioContext: { queue: INITITAL_QUEUE, playback: INITIAL_PLAYBACK },
  dispatchAudio: (value: any) => {},
});

export type { AudioContextProps };
export default AudioContext;
