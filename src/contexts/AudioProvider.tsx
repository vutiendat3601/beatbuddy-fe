import { useEffect, useReducer } from 'react';
import { INITIAL_PLAYBACK, Playback } from '../models/Playback';
import audioReducer, { initPlayback } from '../reducers/audioReducer';
import AudioContext from './AudioContext';
import { getObject } from '../shared/utils/local-storage-util';

interface AudioProviderProps {
  children: any;
}

function AudioProvider({ children }: AudioProviderProps): JSX.Element {
  const [audioContext, dispatchAudio] = useReducer(audioReducer, {
    playback: INITIAL_PLAYBACK,
  });

  useEffect(() => {
    let playback = getObject<Playback>('playback');
    if (playback) {
      initPlayback(dispatchAudio, playback);
    }
  }, []);

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
