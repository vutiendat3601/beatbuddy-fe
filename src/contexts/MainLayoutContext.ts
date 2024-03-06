import { createContext } from 'react';
import {
  MainLayout,
  MainLayoutAction,
  INITIAL_MAIN_LAYOUT,
} from '../reducers/mainLayoutReducer';

interface MainLayoutContextProps {
  mainLayout: MainLayout;
  dispatchMainLayout: React.Dispatch<MainLayoutAction>;
}

const MainLayoutContext = createContext<MainLayoutContextProps>({
  mainLayout: INITIAL_MAIN_LAYOUT,
  dispatchMainLayout: (_value: any) => {},
});

export type { MainLayoutContextProps };
export default MainLayoutContext;
