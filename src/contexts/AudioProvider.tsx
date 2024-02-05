import { useReducer } from 'react';
import audioReducer from '../reducers/audioReducer';
import { INITIAL_PLAYBACK } from '../models/Playback';
import { INITITAL_QUEUE } from '../models/Queue';
import AudioContext from './AudioContext';

interface AudioProviderProps {
  children: any;
}

function AudioProvider({ children }: AudioProviderProps): JSX.Element {
  const [audioContext, dispatchAudio] = useReducer(audioReducer, {
    queue: INITITAL_QUEUE,
    playback: INITIAL_PLAYBACK,
  });

  return (
    <AudioContext.Provider
      value={{
        audioContext,
        dispatchAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export default AudioProvider;
