// ## Resources
import styles from './Header.module.css';
import logoIcon from '../../../assets/icon/logo.svg';
import sidebarSwitcherIcon from '../../../assets/icon/menu.svg';
import avatarIcon from '../../../assets/icon/avatar.svg';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import SearchBox from '../../../components/search-box/SearchBox';
import { useContext } from 'react';
import ThemeContext from '../../../contexts/ThemeContext';

interface HeaderProps {
  children?: any;
}

const css = classNames.bind(styles);
function Header({ children }: HeaderProps): JSX.Element {
  const { sidebarCollapsed, setSidebarCollapsed } = useContext(ThemeContext);
  return (
    <header className={css('header')}>
      <div className={css('menu')}>
        <button
          className={css('sidebar-switcher')}
          onClick={() =>
            setSidebarCollapsed && setSidebarCollapsed(!sidebarCollapsed)
          }
        >
          <img className={css('icon')} src={sidebarSwitcherIcon} alt="Menu" />
        </button>
      </div>
      <Link to="/">
        <img src={logoIcon} alt="Beat Buddy" className={css('logo-icon')} />
      </Link>
      <div className={css('search-box')}>
        <SearchBox placeholder="Search songs, albums, artists" />
      </div>
      <div className={css('user')}>
        <img src={avatarIcon} alt="" className="avatar" />
      </div>
    </header>
  );
}

export default Header;
