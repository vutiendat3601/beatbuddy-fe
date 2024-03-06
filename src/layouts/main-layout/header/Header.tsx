import classNames from 'classnames/bind';
import style from './Header.module.scss';
import SearchBox from '../../../components/search-box/SearchBox';
import { ReactComponent as LogoImg } from '../../../assets/img/logo-small.svg';
import Navigation from '../../../components/navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';

const css = classNames.bind(style);

function Header(): JSX.Element {
  const location = useLocation();

  return (
    <header className={css('header')}>
      <div className="row">
        <div className="col-12 col-md-3">
          <div className={`d-none d-md-flex ${css('header-left')}`}>
            <Link to="/" className={css('logo-link')}>
              <LogoImg />
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <SearchBox />
        </div>
        <div className="col-12 col-md-3">
          <div className={`d-none d-md-flex ${css('header-right')}`}>
            <Navigation direction="rl" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
