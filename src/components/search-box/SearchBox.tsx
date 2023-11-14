// ## Resources
import searchIcon from '../../assets/icon/search.svg';
import closeIcon from '../../assets/icon/close.svg';

import classNames from 'classnames/bind';
import styles from './SearchBox.module.css';
import { useRef, useState } from 'react';

interface SearchBoxProps {
  maxChars?: number;
  placeholder?: string;
  children?: any;
}

const css = classNames.bind(styles);
function SearchBox({
  maxChars,
  placeholder,
  children,
}: SearchBoxProps): JSX.Element {
  const [keyword, setKeyword] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={css('search-box')}
      onClick={() => inputRef.current?.focus()}
    >
      <img src={searchIcon} alt="" className="search-icon" />
      <input
        className={css('search-input')}
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        maxLength={maxChars}
        value={keyword}
        onChange={(e: any) => setKeyword(e.target.value)}
      />
      <button
        className={css('clear', { hidden: !keyword })}
        onClick={() => setKeyword('')}
      >
        <img src={closeIcon} alt="clear" />
      </button>
    </div>
  );
}

export default SearchBox;
