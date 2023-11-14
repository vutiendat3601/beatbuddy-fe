// ## Resources
import styles from './Header.module.scss';
import logoIcon from '../../../assets/icon/logo.svg';
import sidebarSwitcherIcon from '../../../assets/icon/menu.svg';
import avatarIcon from '../../../assets/icon/avatar.svg';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import SearchBox from '../../../components/search-box/SearchBox';
import { useContext } from 'react';
import ThemeContext from '../../../contexts/ThemeContext';
import { deviceWidth } from '../../../utils/responsive-device';

interface HeaderProps {
  children?: any;
}

const css = classNames.bind(styles);
function Header({ children }: HeaderProps): JSX.Element {
  const { sidebar, setSidebar } = useContext(ThemeContext);

  const handleSidebarSwitcher = () => {
    if (!setSidebar) {
      return;
    }
    if (sidebar.status !== 'extended') {
      setSidebar({ ...sidebar, status: 'extended' });
    } else {
      window.innerWidth <= deviceWidth['mobile'].maxWidth &&
        setSidebar({ ...sidebar, status: 'hidden' });
      window.innerWidth > deviceWidth['mobile'].maxWidth &&
        setSidebar({ ...sidebar, status: 'collapsed' });
    }
  };

  return (
    <header className={css('header')}>
      <button
        className={css('sidebar-switcher')}
        onClick={handleSidebarSwitcher}
      >
        <img className={css('icon')} src={sidebarSwitcherIcon} alt="Menu" />
      </button>

      <div className={css('content')}>
        <Link to="/">
          <img src={logoIcon} alt="Beat Buddy" className={css('logo-icon')} />
        </Link>
        <div className={css('search-box-wrapper')}>
          <SearchBox placeholder="Search songs, albums, artists" />
        </div>
        <div className={css('user')}>
          <img src={avatarIcon} alt="" className="avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
