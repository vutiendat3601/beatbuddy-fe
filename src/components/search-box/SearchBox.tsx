import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as ClearIcon } from '../../assets/icon/clear.svg';
import { ReactComponent as PlayIcon } from '../../assets/icon/play.svg';
import { ReactComponent as MenuIcon } from '../../assets/icon/menu.svg';
import { ReactComponent as SearchIcon } from '../../assets/icon/search.svg';
import { AudioContextProps } from '../../contexts/AudioContext';
import useAudioContext from '../../hooks/useAudioContext';
import { Search } from '../../models/Search';
import { Track } from '../../models/Track';
import searchService from '../../services/search-service';
import style from './SearchBox.module.scss';
const css = classNames.bind(style);
function SearchBox() {
  const [keyword, setKeyword] = useState<string>('');
  const [search, setSearch] = useState<Search>();
  const searchIdRef = useRef<NodeJS.Timeout>();
  const { audioContext, dispatchAudio }: AudioContextProps = useAudioContext();
  const { queue, playback } = audioContext;
  const { track } = playback;

  const keywordInpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (keyword.length > 0) {
      searchIdRef.current = setTimeout(() => {
        async function search() {
          const search = await searchService.search(keyword, 0, 10);
          setSearch(search);
        }
        search();
      }, 800);
    }
  }, [keyword]);

  function handleKeywordChange(e: any) {
    clearTimeout(searchIdRef.current);
    setKeyword(e.target.value);
  }

  function handlePlay(targetTrack: Track) {
    keywordInpRef.current?.focus();
    const { playedTracks } = queue;

    let updatedPlayedTracks = [...playedTracks];

    track && updatedPlayedTracks.push(track);
    let updatedTrack = targetTrack;

    dispatchAudio({
      type: 'update_session',
      payload: {
        playedTracks: updatedPlayedTracks,
        track: updatedTrack,
      },
    });
    dispatchAudio({ type: 'update_playback', payload: { isPlaying: true } });
  }
  return (
    <div className={css('search-box')}>
      <SearchIcon className={css('icon')} />
      <input
        ref={keywordInpRef}
        className={css('keyword-inp')}
        type="text"
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
      <ul
        className={css('items', {
          hidden: keyword.length === 0,
        })}
        onClick={() => keywordInpRef.current && keywordInpRef.current.focus()}
      >
        {keyword.length > 0 && (
          <li key={keyword} className={css('item')}>
            <a href="#!" className={css('keyword-item')}>
              <SearchIcon /> {keyword}
            </a>
          </li>
        )}
        {search?.track?.items
          .filter((track) => track.isPlayable)
          // .filter((_track, index) => index < 5)
          .map((track) => (
            <li className={css('item')} key={track.id}>
              <div className={css('track-details')}>
                <img
                  src={track.thumbnail || ''}
                  alt={track.name}
                  className={css('track-thumbnail')}
                />
                <div className={css('track-info')}>
                  <h2 className={css('track-name')}>
                    <a href="#!" className="text-link">
                      {track.name}
                    </a>
                  </h2>
                  <p className={css('track-artists')}>
                    {track.artists.map((artist, index) => (
                      <span key={artist.id}>
                        <a href="#!" className="text-link text-desc">
                          {artist.name}
                        </a>
                        {index !== track.artists.length - 1 && (
                          <span className="text-desc">, </span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <div className={css('controls')}>
                <button
                  className={`${css('control', 'play-btn')}`}
                  onClick={() => handlePlay(track)}
                >
                  <PlayIcon />
                </button>
                <button className={`${css('control')}`}>
                  <MenuIcon />
                </button>
              </div>
            </li>
          ))}
      </ul>
      <div className={css('cover')}></div>
    </div>
  );
}
export default SearchBox;
