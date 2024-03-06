import classNames from 'classnames/bind';
import { memo, useEffect, useRef, useState } from 'react';
import { ReactComponent as ClearIcon } from '../../assets/icon/clear.svg';
import { ReactComponent as PlayIcon } from '../../assets/icon/play.svg';
import { ReactComponent as SearchIcon } from '../../assets/icon/search.svg';
import { AudioContextProps } from '../../contexts/AudioContext';
import useAudioContext from '../../hooks/useAudioContext';
import { Search, Pagination } from '../../models/Search';
import { Track } from '../../models/Track';
import searchService from '../../services/search-service';
import TrackCard from '../track-card/TrackCard';
import style from './SearchBox.module.scss';
import { Artist } from '../../models/Artist';
import { useOidc } from '@axa-fr/react-oidc';
import { changeFocus } from '../../reducers/mainLayoutReducer';
import useMainLayoutContext from '../../hooks/useMainLayoutContext';

const css = classNames.bind(style);

interface SearchOption {
  onSearch?: (keyword: string) => Promise<Search>;
  trackSearch?: {
    onResult: (searchResult: Pagination<Track>) => void;
  };
  artistSearch?: {
    onResult: (searchResult: Pagination<Artist>) => void;
  };
}

interface SearchBoxProps {
  standalone?: boolean;
  searchOptions?: SearchOption;
  placeholder?: string;
}

const INITIAL_SEARCH: SearchOption = {
  onSearch: async (keyword: string): Promise<Search> => {
    if (keyword.length > 0) {
      return await searchService.search(keyword, 0, 10);
    }
    return {};
  },
};

function SearchBox({
  standalone = true,
  searchOptions: { onSearch, trackSearch, artistSearch } = INITIAL_SEARCH,
  placeholder,
}: SearchBoxProps) {
  const [keyword, setKeyword] = useState<string>('');
  const [search, setSearch] = useState<Search>({});
  const [resultHidden, setResultHidden] = useState(false);
  const searchIdRef = useRef<NodeJS.Timeout>();
  const { dispatchAudio }: AudioContextProps = useAudioContext();
  const { isAuthenticated } = useOidc();
  const { dispatchMainLayout } = useMainLayoutContext();
  const keywordInpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    clearTimeout(searchIdRef.current);
    searchIdRef.current = setTimeout(() => {
      async function search() {
        if (onSearch) {
          const search = await onSearch(keyword);
          setSearch(search);
        }
      }
      search();
    }, 800);
  }, [keyword, onSearch]);

  useEffect(() => {
    trackSearch && search.track && trackSearch.onResult(search.track);
    artistSearch && search.artist && artistSearch.onResult(search.artist);
  }, [search, artistSearch, trackSearch]);

  function handleKeywordChange(e: any) {
    clearTimeout(searchIdRef.current);
    setKeyword(e.target.value);
  }

  function handlePlay(target?: Track): void {
    if (target) {
      keywordInpRef.current?.focus();

      dispatchAudio({
        type: 'change_playback_track',
        payload: {
          track: { ...target },
        },
      });
      dispatchAudio({
        type: 'update_playback',
        payload: { isPlaying: true, currentSec: 0 },
      });
    }
  }
  function changeKeywordInputFocus(focused: boolean = true) {
    keywordInpRef.current && keywordInpRef.current.focus();
  }
  return (
    <div
      className={css('search-box', { standalone })}
      onClick={() => setResultHidden(false)}
    >
      <SearchIcon className={css('icon')} />
      <input
        ref={keywordInpRef}
        className={css('keyword-inp')}
        type="text"
        name="keyword"
        placeholder={placeholder || 'Search for track, artist or playlist'}
        value={keyword}
        onChange={handleKeywordChange}
      />
      <button
        hidden={keyword.length === 0}
        className={css('clear-btn')}
        onClick={() => setKeyword('')}
      >
        <ClearIcon className={css('icon')} />
      </button>
      {standalone && (
        <ul
          className={css('items', {
            hidden: keyword.length === 0 || resultHidden,
          })}
          onClick={(e: any) => changeKeywordInputFocus()}
        >
          {keyword.length > 0 && (
            <li key={keyword} className={css('item', 'keyword-item')}>
              <a href="#!" className={css('keyword-link')}>
                <SearchIcon /> {keyword}
              </a>
            </li>
          )}
          {search?.track?.items.map((track) => (
            <li className={css('item')} key={track.id}>
              <div className={css('track-details')}>
                <TrackCard
                  thumbnailWidth={48}
                  track={track}
                  callToAction={
                    isAuthenticated && track.isPlayable
                      ? {
                          action: handlePlay,
                          width: 28,
                          icon: <PlayIcon />,
                        }
                      : undefined
                  }
                  controls={{
                    love: {
                      onClick: () => undefined,
                      hidden: !isAuthenticated,
                    },
                  }}
                  onLinkClick={() => {
                    changeFocus(dispatchMainLayout, 'content');
                    setResultHidden(true);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className={css('cover')}></div>
    </div>
  );
}
export default memo(SearchBox);
