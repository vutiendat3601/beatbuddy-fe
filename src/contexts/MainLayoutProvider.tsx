import { useEffect, useReducer } from 'react';
import mainLayoutReducer, {
  INITIAL_MAIN_LAYOUT,
} from '../reducers/mainLayoutReducer';
import MainLayoutContext from './MainLayoutContext';

interface MainLayoutProps {
  children: any;
}

function MainLayoutProvider({ children }: MainLayoutProps): JSX.Element {
  const [mainLayout, dispatchMainLayout] = useReducer(
    mainLayoutReducer,
    INITIAL_MAIN_LAYOUT
  );

  useEffect(() => {
    // function listenWindowResize() {
    //   dispatchMainLayout({ type: 'screen_resized', payload: {} });
    // }
    // window.addEventListener('resize', listenWindowResize);
    // return () => {
    //   window.removeEventListener('resize', listenWindowResize);
    // };
  }, []);

  return (
    <MainLayoutContext.Provider
      value={{
        mainLayout,
        dispatchMainLayout,
      }}
    >
      {children}
    </MainLayoutContext.Provider>
  );
}

export default MainLayoutProvider;
