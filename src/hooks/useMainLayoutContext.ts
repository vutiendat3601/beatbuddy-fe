import { useContext } from 'react';
import MainLayoutContext, {
  MainLayoutContextProps,
} from '../contexts/MainLayoutContext';

function useMainLayoutContext(): MainLayoutContextProps {
  const mainLayout: MainLayoutContextProps =
    useContext<MainLayoutContextProps>(MainLayoutContext);
  return mainLayout;
}

export default useMainLayoutContext;
