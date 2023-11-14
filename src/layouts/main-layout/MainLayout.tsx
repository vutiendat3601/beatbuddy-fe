import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ThemeContext, {
  Sidebar as SidebarProps,
  Header as HeaderProps,
  initSidebar,
  defaultThemeContext,
  SidebarStatus,
} from '../../contexts/ThemeContext';
import { deviceWidth } from '../../utils/responsive-device';
import styles from './MainLayout.module.scss';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Media from './media/Media';

interface MainLayoutProps {
  children?: any;
}

const css = classNames.bind(styles);
function MainLayout({ children }: MainLayoutProps): JSX.Element {
  const [sidebar, setSidebar] = useState<SidebarProps>(initSidebar);
  const [header, setHeader] = useState<HeaderProps>(defaultThemeContext.header);

  // ## Check Header border
  useEffect(() => {
    const handleScroll = () => {
      const pos = document.body.getBoundingClientRect();
      const bordered =
        window.innerWidth > deviceWidth['mobile'].maxWidth && pos.y < 0;
      setHeader((header) => ({ ...header, bordered }));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ## Check Sidebar border
  useEffect(() => {
    const handleScroll = () => {
      const pos = document.body.getBoundingClientRect();
      const bordered =
        window.innerWidth > deviceWidth['mobile'].maxWidth && pos.y < 0;
      setSidebar((sidebar) => ({ ...sidebar, bordered }));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ## Check responsive for sidebar
  useEffect(() => {
    window.innerWidth <= deviceWidth['mobile'].maxWidth &&
      setSidebar((sidebar) => ({ ...sidebar, status: 'hidden' }));
    window.innerWidth > deviceWidth['mobile'].maxWidth &&
      setSidebar((sidebar) => ({ ...sidebar, status: 'collapsed' }));
  }, []);

  // ## Handle viewport resize
  useEffect(() => {
    const handleResize = () => {
      if (sidebar.status !== 'extended') {
        window.innerWidth <= deviceWidth['mobile'].maxWidth &&
          setSidebar((sidebar) => ({ ...sidebar, status: 'hidden' }));
        window.innerWidth > deviceWidth['mobile'].maxWidth &&
          setSidebar((sidebar) => ({ ...sidebar, status: 'collapsed' }));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebar]);

  return (
    <ThemeContext.Provider value={{ sidebar, setSidebar, header }}>
      <div className={css('grid')}>
        <div className={css('header-wrapper', { bordered: header.bordered })}>
          <Header />
        </div>
        <div
          className={css('sidebar-wrapper', [sidebar.status], {
            bordered: sidebar.bordered,
          })}
        >
          <Sidebar
            status={sidebar.status}
            onStatusChange={(status: SidebarStatus) =>
              setSidebar((sidebar) => ({ ...sidebar, status }))
            }
          />
        </div>
        <div className={css('content')}>{children}</div>
        <footer className={css('media-wrapper')}>
          <Media />
        </footer>
      </div>
    </ThemeContext.Provider>
  );
}

export default MainLayout;
