import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as HomeSolidIcon } from '../../assets/icon/home-solid.svg';
import { ReactComponent as HomeIcon } from '../../assets/icon/home.svg';
import { ReactComponent as LibrarySolidIcon } from '../../assets/icon/library-solid.svg';
import { ReactComponent as LibraryIcon } from '../../assets/icon/library.svg';
import { ReactComponent as UserSolidIcon } from '../../assets/icon/user-solid.svg';
import { ReactComponent as UserIcon } from '../../assets/icon/user.svg';

import { useOidc, useOidcUser } from '@axa-fr/react-oidc';
import useMainLayoutContext from '../../hooks/useMainLayoutContext';
import { changeFocus } from '../../reducers/mainLayoutReducer';
import style from './Navigation.module.scss';

const css = classNames.bind(style);

interface NavigationProps {
  evenly?: boolean;
  direction?: 'lr' | 'rl';
}

function Navigation({
  evenly = false,
  direction = 'lr',
}: NavigationProps): JSX.Element {
  const location = useLocation();
  const { oidcUser } = useOidcUser();
  const { isAuthenticated } = useOidc();

  const { dispatchMainLayout } = useMainLayoutContext();

  function focusContent() {
    changeFocus(dispatchMainLayout, 'content');
  }

  return (
    <nav className={`${css('nav', { evenly, [direction]: true })}`}>
      <Link to="/" className={css('nav-link')} onClick={focusContent}>
        {location.pathname === '/' ? <HomeSolidIcon /> : <HomeIcon />}
      </Link>
      {isAuthenticated && (
        <Link to="/library" className={css('nav-link')} onClick={focusContent}>
          {location.pathname === '/library' ? (
            <LibrarySolidIcon />
          ) : (
            <LibraryIcon />
          )}
        </Link>
      )}
      {isAuthenticated && (
        <Link to="/user" className={css('nav-link')} onClick={focusContent}>
          {oidcUser?.picture ? (
            <img className={css('user-pic')} src={oidcUser.picture} alt="" />
          ) : location.pathname === '/user' ? (
            <UserSolidIcon />
          ) : (
            <UserIcon />
          )}
        </Link>
      )}
    </nav>
  );
}
export default Navigation;
