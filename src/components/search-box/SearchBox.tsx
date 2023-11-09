import classNames from 'classnames/bind';
import styles from './SearchBox.module.css';

// ## Icons
import searchIcon from '../../assets/icon/search.svg';
interface SearchBoxProps {
  placeholder?: string;
  children?: any;
}

const css = classNames.bind(styles);
function SearchBox({ placeholder, children }: SearchBoxProps): JSX.Element {
  return (
    <div className={css('search-box')}>
      <img src={searchIcon} alt="" className="search-icon" />
      <input
        type="text"
        placeholder={placeholder}
        className={css('search-input')}
      />
    </div>
  );
}

export default SearchBox;
