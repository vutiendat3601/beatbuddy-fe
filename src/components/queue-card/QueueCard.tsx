import classNames from 'classnames/bind';
import useAudioContext from '../../hooks/useAudioContext';

import { memo, useCallback, useRef, useState } from 'react';
import { ReactComponent as PlayIcon } from '../../assets/icon/play.svg';
import useMainLayoutContext from '../../hooks/useMainLayoutContext';
import { INITIAL_PAGINATION } from '../../models/Pagination';
import { Pagination, Search } from '../../models/Search';
import { Track } from '../../models/Track';
import { playInQueue, updatePlaybackStates } from '../../reducers/audioReducer';
import { autoChangeFocus } from '../../reducers/mainLayoutReducer';
import { screens } from '../../shared/utils/responsive-util';
import SearchBox from '../search-box/SearchBox';
import TrackCard from '../track-card/TrackCard';
import style from './QueueCard.module.scss';

const css = classNames.bind(style);

function QueueCard() {
  const { audioContext, dispatchAudio } = useAudioContext();
  const { playback } = audioContext;
  const {
    queue: { playedTracks, waitingTracks: tracks },
  } = playback;
  const { isPlaying, track } = playback.state;
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [isSearching, setSearching] = useState<boolean>(false);
  const { dispatchMainLayout } = useMainLayoutContext();

  const trackSearchRef = useRef({
    onResult: (searchTrackResult: Pagination<Track>) => {
      setFilteredTracks(searchTrackResult.items);
    },
  });

  function handlePlay() {
    updatePlaybackStates(dispatchAudio, { isPlaying: !isPlaying });
  }

  function renderTrack(
    list: 'played_tracks' | 'waiting_tracks',
    target: Track,
    index: number
  ) {
    function handlePlayInQueue() {
      function play() {
        setSearching(false);
        playInQueue(dispatchAudio, { in: list, index });
        updatePlaybackStates(dispatchAudio, { isPlaying: true });
      }
      play();
    }
    return (
      <TrackCard
        thumbnailWidth={48}
        key={`${index}${target.id}`}
        track={target}
        callToAction={{
          action: handlePlayInQueue,
          width: 28,
          icon: <PlayIcon />,
        }}
        onLinkClick={() => autoChangeFocus(dispatchMainLayout, 'content')}
        controls={{ love: { onClick: () => undefined, width: 28 } }}
      />
    );
  }

  const handleSearch = useCallback(
    async (keyword: string): Promise<Search> => {
      const searchTrack: Pagination<Track> = {
        items: [],
        metadata: INITIAL_PAGINATION,
      };
      if (keyword.length > 0) {
        setSearching(true);
        const allTracks: Track[] = [...playedTracks, ...tracks];
        const filteredTracks: Track[] = allTracks.filter((t) => {
          const q = keyword.toLowerCase();
          const artistNames = t.artists.reduce(
            (names, a) => names.concat(` ${a.name.toLowerCase()}`),
            ''
          );
          return t.name.toLowerCase().includes(q) || artistNames.includes(q);
        });
        searchTrack.items = filteredTracks;
      } else {
        setSearching(false);
      }
      return { track: searchTrack };
    },
    [playedTracks, tracks]
  );

  const QueueTracks: JSX.Element = (
    <ul className={css('queue-tracks')}>
      {isSearching ? (
        <>
          {track && (
            <div className={css('current-track')}>
              <TrackCard
                thumbnailWidth={48}
                track={track}
                highlighted
                controls={{
                  love: { onClick: () => undefined, width: 28, order: 1 },
                  play: {
                    isPlaying,
                    onClick: handlePlay,
                    width: 28,
                  },
                }}
                onLinkClick={() =>
                  autoChangeFocus(
                    dispatchMainLayout,
                    'content',
                    screens.lg,
                    true
                  )
                }
              />
            </div>
          )}
          {filteredTracks.length === 0 ? (
            <p className={css('no-result')}>No result to show.</p>
          ) : (
            filteredTracks.map((t, index) =>
              renderTrack('waiting_tracks', t, index)
            )
          )}
        </>
      ) : (
        <>
          {playedTracks.map((t, index) =>
            renderTrack('played_tracks', t, index)
          )}
          {track && (
            <div className={css('current-track')}>
              <TrackCard
                thumbnailWidth={48}
                track={track}
                highlighted
                onLinkClick={() =>
                  autoChangeFocus(dispatchMainLayout, 'content')
                }
                controls={{
                  love: { onClick: () => undefined, width: 28, order: 1 },
                  play: {
                    isPlaying,
                    onClick: handlePlay,
                    width: 28,
                  },
                }}
              />
            </div>
          )}
          {tracks.map((t, index) => renderTrack('waiting_tracks', t, index))}
        </>
      )}
    </ul>
  );
  return (
    <div className={css('queue-card', { searching: isSearching })}>
      {playedTracks.length === 0 && !track && tracks.length === 0 ? (
        <div className={`${css('no-queue')}`}>
          <p className={`text-label ${css('message')}`}>
            There's no current queue.
          </p>
        </div>
      ) : (
        <>
          <div className={css('search')}>
            <SearchBox
              standalone={false}
              searchOptions={{
                onSearch: handleSearch,
                trackSearch: trackSearchRef.current,
              }}
              placeholder="Search for track"
            />
          </div>
          {QueueTracks}
        </>
      )}
    </div>
  );
}
export default memo(QueueCard);
