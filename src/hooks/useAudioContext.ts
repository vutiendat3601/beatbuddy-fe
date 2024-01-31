import { useContext } from 'react';
import AudioContext, { AudioContextProps } from '../contexts/AudioContext';

function useAudioContext(): AudioContextProps {
  const audioContext: AudioContextProps =
    useContext<AudioContextProps>(AudioContext);
  return audioContext;
}

export default useAudioContext;
