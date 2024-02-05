import classNames from 'classnames/bind';
import useAudioContext from '../../hooks/useAudioContext';

import { ReactComponent as PlayIcon } from '../../assets/icon/play.svg';
import { Track } from '../../models/Track';
import TrackCard from '../track-card/TrackCard';
import style from './QueueCard.module.scss';

const css = classNames.bind(style);

interface QueueCardProps {
  hidden?: boolean;
}

function QueueCard({ hidden = false }: QueueCardProps) {
  const { audioContext, dispatchAudio } = useAudioContext();
  const { queue, playback } = audioContext;
  const { playedTracks, tracks } = queue;
  const { isPlaying } = playback;

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
        callToAction={{ action: handlePlayInQueue, icon: <PlayIcon /> }}
      />
    );
  }

  return (
    <div className={css('queue-card', { hidden })}>
      <ul className="tracks">
        {playedTracks.map(renderTrack, 'played_tracks')}
        {playback.track && (
          <TrackCard
            thumbnailWidth={48}
            track={playback.track}
            variant="default"
            highlighted
            controls={{
              play: {
                isPlaying,
                onPlay: handlePlay,
                width: 32
              },
            }}
          />
        )}
        {tracks.map(renderTrack, 'tracks')}
      </ul>
    </div>
  );
}

export default QueueCard;
