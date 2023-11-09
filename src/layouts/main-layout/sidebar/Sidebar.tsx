// ## Resources
import styles from './Sidebar.module.css';
import homeIcon from '../../../assets/icon/home.svg';
import musicLibIcon from '../../../assets/icon/music-library.svg';
import plusIcon from '../../../assets/icon/plus.svg';
import thumb from '../../../assets/img/thumb-02.jpg';
import logoIcon from '../../../assets/icon/logo.svg';

import classNames from 'classnames/bind';
import Button from '../../../components/button/Button';
import { Link } from 'react-router-dom';

interface SidbarProps {
  collapsed?: boolean;
  children?: any;
}

const css = classNames.bind(styles);
function Sidebar({ collapsed = true, children }: SidbarProps): JSX.Element {
  return (
    <aside className={css('sidebar', { collapsed })}>
      <img
        src={logoIcon}
        alt="Beat Buddy"
        className={css('logo', { collapsed })}
      />
      <ul className={css('nav-list', { collapsed })}>
        <li className={css('nav-item', { collapsed })}>
          <img className={css('icon')} src={homeIcon} alt="home" />
          <p className={css('label')}>Home</p>
        </li>
        <li className={css('nav-item', { collapsed })}>
          <img className={css('icon')} src={musicLibIcon} alt="home" />
          <p className={css('label')}>Library</p>
        </li>
      </ul>
      <div className={css('playlist', { collapsed })}>
        <Button>
          <img src={plusIcon} alt="New playlist" />
          New playlist
        </Button>
        <ul className={css('playlist-list')}>
          <li className={css('playlist-item')}>
            <Link className={css('playlist-link')} to="#!">
              <img className={css('thumb')} src={thumb} alt="thumb" />
              <div className={css('info')}>
                <p className={css('title')}>Bài hát yêu thích</p>
                <p className={css('owner')}>Dat Vu</p>
              </div>
            </Link>
          </li>
          <li className={css('playlist-item')}>
            <Link className={css('playlist-link')} to="#!">
              <img className={css('thumb')} src={thumb} alt="thumb" />
              <div className={css('info')}>
                <p className={css('title')}>Bài hát yêu thích</p>
                <p className={css('owner')}>Dat Vu</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
