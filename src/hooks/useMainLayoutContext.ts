import { useContext } from 'react';
import AudioContext, { AudioContextProps } from '../contexts/AudioContext';
import MainLayoutContext, {
  MainLayoutContextProps,
} from '../contexts/MainLayoutContext';

function useMainLayoutContext(): MainLayoutContextProps {
  const mainLayout: MainLayoutContextProps =
    useContext<MainLayoutContextProps>(MainLayoutContext);
  return mainLayout;
}

export default useMainLayoutContext;
