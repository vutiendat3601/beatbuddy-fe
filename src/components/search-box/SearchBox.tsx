import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as ClearIcon } from '../../assets/icon/clear.svg';
import { ReactComponent as PlayIcon } from '../../assets/icon/play.svg';
import { ReactComponent as SearchIcon } from '../../assets/icon/search.svg';
import { AudioContextProps } from '../../contexts/AudioContext';
import useAudioContext from '../../hooks/useAudioContext';
import { Search, SearchResult } from '../../models/Search';
import { Track } from '../../models/Track';
import searchService from '../../services/search-service';
import TrackCard from '../track-card/TrackCard';
import style from './SearchBox.module.scss';
import { Artist } from '../../models/Artist';

const css = classNames.bind(style);

interface SearchOption {
  onSearch?: (keyword: string) => Promise<Search>;
  trackSearch?: {
    onResult: (searchResult: SearchResult<Track>) => void;
  };
  artistSearch?: {
    onResult: (searchResult: SearchResult<Artist>) => void;
  };
}

interface SearchBoxProps {
  standalone?: boolean;
  searchOptions?: SearchOption;
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
}: SearchBoxProps) {
  const [keyword, setKeyword] = useState<string>('');
  const [search, setSearch] = useState<Search>({});
  const searchIdRef = useRef<NodeJS.Timeout>();
  const { dispatchAudio }: AudioContextProps = useAudioContext();

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
    if (!standalone) {
      trackSearch && search.track && trackSearch.onResult(search.track);
      artistSearch && search.artist && artistSearch.onResult(search.artist);
    }
  }, [search, artistSearch, trackSearch, standalone]);

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
  return (
    <div className={css('search-box', { standalone })}>
      <SearchIcon className={css('icon')} />
      <input
        ref={keywordInpRef}
        className={css('keyword-inp')}
        type="text"
        name="keyword"
        placeholder="Search for track, artist"
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
            hidden: keyword.length === 0,
          })}
          onClick={() => keywordInpRef.current && keywordInpRef.current.focus()}
        >
          {keyword.length > 0 && (
            <li key={keyword} className={css('item', 'keyword-item')}>
              <a href="#!" className={css('keyword-link')}>
                <SearchIcon /> {keyword}
              </a>
            </li>
          )}
          {search?.track?.items
            .filter((track) => track.isPlayable)
            .map((track) => (
              <li className={css('item')} key={track.id}>
                <div className={css('track-details')}>
                  <TrackCard
                    thumbnailWidth={48}
                    track={track}
                    variant="default"
                    callToAction={{
                      action: handlePlay,
                      width: 28,
                      icon: <PlayIcon />,
                    }}
                    controls={{ love: { onLove: () => undefined } }}
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
export default SearchBox;
