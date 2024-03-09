import { useSearchParams } from 'react-router-dom';
import style from './SearchDetail.module.scss';
import classNames from 'classnames/bind';
import SearchBox from '../../components/search-box/SearchBox';

const css = classNames.bind(style);

function SearchDetail({}): JSX.Element {
  const [params] = useSearchParams();
  return (
    <div className={css('search-detail')}>
      {/* <div className={css('search-box')}>
        <SearchBox />
      </div> */}
      <h1 className="heading-1">Result for search </h1>
      <h2 className="heading-2">Tracks</h2>
    </div>
  );
}

export default SearchDetail;
