// ## Resources
import styles from './Sidebar.module.scss';
import homeIcon from '../../../assets/icon/home.svg';
import musicLibIcon from '../../../assets/icon/music-library.svg';
import plusIcon from '../../../assets/icon/plus.svg';
import logoIcon from '../../../assets/icon/logo.svg';
import chevronLeftIcon from '../../../assets/icon/chevron-left.svg';
import thumb from '../../../assets/img/thumb-02.jpg';

import classNames from 'classnames/bind';
import Button from '../../../components/button/Button';
import { SidebarStatus } from '../../../contexts/ThemeContext';

interface SidbarProps {
  status: SidebarStatus;
  onStatusChange?: (status: SidebarStatus) => void;
}

const css = classNames.bind(styles);
function Sidebar({ status, onStatusChange }: SidbarProps): JSX.Element {
  return (
    <aside className={css('sidebar', [status])}>
      <div className={css('head')}>
        <img src={logoIcon} alt="Beat Buddy" className={css('logo')} />
        <button
          className={css('hide-btn')}
          onClick={() => onStatusChange && onStatusChange('hidden')}
        >
          <img src={chevronLeftIcon} alt="" className="icon" />
        </button>
      </div>
      <ul className={css('nav-list')}>
        <li className={css('nav-item', 'active')}>
          <img className={css('icon')} src={homeIcon} alt="home" />
          <p className={css('label')}>Home</p>
        </li>
        <li className={css('nav-item')}>
          <img className={css('icon')} src={musicLibIcon} alt="home" />
          <p className={css('label')}>Library</p>
        </li>
      </ul>
      <div className={css('separator')}></div>
      <div className={css('playlist')}>
        <Button className={css('new-playlist-btn')}>
          <img src={plusIcon} alt="New playlist" />
          New playlist
        </Button>
        <ul className={css('playlist-list')}>
          <li className={css('playlist-item')}>
            <img className={css('thumb')} src={thumb} alt="thumb" />
            <div className={css('info')}>
              <p className={css('name')}>Bài hát yêu thích</p>
              <p className={css('owner')}>Dat Vu</p>
            </div>
          </li>
          <li className={css('playlist-item')}>
            <img className={css('thumb')} src={thumb} alt="thumb" />
            <div className={css('info')}>
              <p className={css('name')}>Bài hát yêu thích Bài hát yêu thích</p>
              <p className={css('owner')}>Dat Vu</p>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
