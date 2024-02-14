import classNames from 'classnames/bind';
import useAudioContext from '../../hooks/useAudioContext';

import { ReactComponent as PlayIcon } from '../../assets/icon/play.svg';
import { Track } from '../../models/Track';
import TrackCard from '../track-card/TrackCard';
import style from './QueueCard.module.scss';
import SearchBox from '../search-box/SearchBox';
import { Search, SearchResult } from '../../models/Search';
import { INITIAL_PAGINATION } from '../../models/Pagination';
import { memo, useCallback, useRef, useState } from 'react';

const css = classNames.bind(style);

interface QueueCardProps {
  hidden?: boolean;
}

function QueueCard({ hidden = false }: QueueCardProps) {
  const { audioContext, dispatchAudio } = useAudioContext();
  const { queue, playback } = audioContext;
  const { playedTracks, tracks } = queue;
  const { isPlaying, track } = playback;
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [isSearching, setSearching] = useState<boolean>(false);

  function handlePlay() {
    dispatchAudio({
      type: 'update_playback',
      payload: { isPlaying: !isPlaying },
    });
  }

  function renderTrack(
    this: 'played_tracks' | 'tracks',
    target: Track,
    index: number
  ) {
    const trackIn = this;
    function handlePlayInQueue(this: 'played_tracks' | 'tracks') {
      function play(this: 'played_tracks' | 'tracks') {
        dispatchAudio({
          type: 'play_in_queue',
          payload: {
            playInQueue: { in: this, index },
          },
        });
        dispatchAudio({
          type: 'update_playback',
          payload: { isPlaying: true },
        });
      }
      play.call(trackIn);
    }
    return (
      <TrackCard
        thumbnailWidth={48}
        variant="default"
        key={`${index}${target.id}`}
        track={target}
        callToAction={{
          action: handlePlayInQueue,
          width: 28,
          icon: <PlayIcon />,
        }}
        controls={{ love: { onClick: () => undefined, width: 28 } }}
        menu={{ items: [{ name: 'cs', onClick: () => undefined }] }}
      />
    );
  }

  const handleSearch = useCallback(
    async (keyword: string): Promise<Search> => {
      const searchTrack: SearchResult<Track> = {
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

  const trackSearchRef = useRef({
    onResult: (searchTrackResult: SearchResult<Track>) => {
      setFilteredTracks(searchTrackResult.items);
    },
  });

  const QueueTracks: JSX.Element = (
    <ul className={css('queue-tracks')}>
      {isSearching ? (
        <>
          {track && (
            <div className={css('current-track')}>
              <TrackCard
                thumbnailWidth={48}
                track={track}
                variant="default"
                highlighted
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
          {filteredTracks.length === 0 ? (
            <p className={css('no-result')}>No result to show.</p>
          ) : (
            filteredTracks.map(renderTrack, 'tracks')
          )}
        </>
      ) : (
        <>
          {playedTracks.map(renderTrack, 'played_tracks')}
          {track && (
            <div className={css('current-track')}>
              <TrackCard
                thumbnailWidth={48}
                track={track}
                variant="default"
                highlighted
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
          {tracks.map(renderTrack, 'tracks')}
        </>
      )}
    </ul>
  );

  return (
    <div className={css('queue-card', { hidden, searching: isSearching })}>
      <div className={css('search')}>
        <SearchBox
          standalone={false}
          searchOptions={{
            onSearch: handleSearch,
            trackSearch: trackSearchRef.current,
          }}
        />
      </div>
      {QueueTracks}
    </div>
  );
}
export default memo(QueueCard);
