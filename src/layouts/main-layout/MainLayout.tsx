import classNames from 'classnames/bind';
import styles from './MainLayout.module.css';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import ThemeContext from '../../contexts/ThemeContext';
import { useState } from 'react';

interface MainLayoutProps {
  children?: any;
}

const css = classNames.bind(styles);
function MainLayout({ children }: MainLayoutProps): JSX.Element {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(true);
  return (
    <ThemeContext.Provider value={{ sidebarCollapsed, setSidebarCollapsed }}>
      <div className={css('container')}>
        <div className={css('header-wrapper', { hidden: sidebarCollapsed })}>
          <Header />
        </div>
      </div>
      <div className={css('sidebar-wrapper', { hidden: sidebarCollapsed })}>
        <Sidebar collapsed={sidebarCollapsed} />
      </div>
      <div
        className={css('sidebar-overlay', { collapsed: sidebarCollapsed })}
        onClick={() => setSidebarCollapsed(true)}
      ></div>
    </ThemeContext.Provider>
  );
}

export default MainLayout;
