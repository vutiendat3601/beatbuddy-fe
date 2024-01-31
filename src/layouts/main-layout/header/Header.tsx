import classNames from 'classnames/bind';
import style from './Header.module.scss';
import SearchBox from '../../../components/search-box/SearchBox';

const css = classNames.bind(style);

function Header(): JSX.Element {
  return (
    <header className={css('header')}>
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <SearchBox />
        </div>
        <div className="col-lg-3"></div>
      </div>
    </header>
  );
}

export default Header;
