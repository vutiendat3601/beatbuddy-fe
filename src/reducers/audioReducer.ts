import {
  INITIAL_PLAYBACK,
  Playback,
  Queue,
  RepeatMode,
} from '../models/Playback';
import { Track } from '../models/Track';
import { saveObject } from '../shared/utils/local-storage-util';

interface AudioPlayer {
  playback: Playback;
}

interface PlayInQueue {
  in: 'played_tracks' | 'waiting_tracks';
  index: number;
}

interface AudioPayload {
  currentSec?: number;
  queue?: Queue;
  playbackTrack?: Track;
  playback?: Playback;
  waitingTracks?: Track[];
  playedTracks?: Track[];
  track?: Track | null;
  isPlaying?: boolean;
  volume?: number;
  playInQueue?: PlayInQueue;
}

interface AudioPlayerAction {
  type:
    | 'play_playlist'
    | 'save_playback'
    | 'update_playback'
    | 'change_playback_track'
    | 'play_in_queue'
    | 'init'
    | 'seek'
    | 'previous'
    | 'next'
    | 'repeat'
    | 'shuffle';
  payload: AudioPayload;
}

const INITIAL_AUDIO_CONTEXT: AudioPlayer = {
  playback: INITIAL_PLAYBACK,
};

function audioReducer(states: AudioPlayer, action: AudioPlayerAction) {
  const { type, payload } = action;
  let playback: Playback = { ...states.playback };
  let queue: Queue = { ...playback.queue };
  let playbackState = { ...playback.state };

  let playedTracks = [...queue.playedTracks];
  let waitingTracks = [...queue.waitingTracks];
  switch (type) {
    case 'save_playback':
      playbackState.isPlaying = false;
      playback.state = playbackState;
      saveObject('playback', playback);
      break;
    case 'play_playlist':
      if (payload.waitingTracks) {
        queue.playedTracks = [];
        waitingTracks = [...payload.waitingTracks];
        queue.isShuffled && waitingTracks.sort(() => Math.random() - 0.5);
        
        playbackState.track = waitingTracks[0];
        queue.waitingTracks = waitingTracks.slice(1);
        queue.originals = {
          playedTracks: queue.playedTracks,
          waitingTracks: queue.waitingTracks,
        };

        playbackState.isPlaying = true;
        playbackState.currentSec = 0;

        playback.queue = queue;
        playback.state = playbackState;
        return { ...states, playback };
      }
      break;
    case 'play_in_queue':
      if (payload.playInQueue) {
        playbackState.track && playedTracks.push(playbackState.track);
        const { index } = payload.playInQueue;
        let track: Track | undefined = undefined;
        switch (payload.playInQueue.in) {
          case 'played_tracks':
            track = queue.playedTracks[index];
            let tailPlayedTracks = playedTracks.slice(index + 1);
            playedTracks = playedTracks.slice(0, index);
            waitingTracks = [...tailPlayedTracks, ...waitingTracks];
            break;
          case 'waiting_tracks':
            track = queue.waitingTracks[index];
            let headTracks = queue.waitingTracks.slice(0, index);
            waitingTracks = queue.waitingTracks.slice(index + 1);
            playedTracks = [...playedTracks, ...headTracks];
            break;
        }
        queue.playedTracks = playedTracks;
        queue.waitingTracks = waitingTracks;
        queue.originals = {
          playedTracks: queue.playedTracks,
          waitingTracks: queue.waitingTracks,
        };
        playbackState.track = track;

        playback.queue = queue;
        playback.state = playbackState;
        return { ...states, playback };
      }
      break;
    case 'change_playback_track':
      if (payload.track) {
        if (playbackState.track) {
          playedTracks.push(playbackState.track);
          queue.playedTracks = playedTracks;
          queue.originals = {
            playedTracks: queue.playedTracks,
            waitingTracks: queue.waitingTracks,
          };
        }
        playbackState.track = payload.track;

        playback.queue = queue;
        playback.state = playbackState;
        return { ...states, playback };
      }
      break;
    case 'update_playback':
      if (payload.currentSec) {
        playbackState.currentSec = payload.currentSec;
      }
      if (payload.isPlaying !== undefined) {
        playbackState.isPlaying = payload.isPlaying;
      }
      if (payload.volume && payload.volume >= 0 && payload.volume <= 1) {
        playbackState.volume = payload.volume;
      }

      playback.state = playbackState;
      return { ...states, playback };
    case 'repeat':
      const REPEAT_MODE: RepeatMode[] = ['none', 'all', 'once'];
      const idx =
        (REPEAT_MODE.findIndex((rm) => rm === queue.repeatMode) + 1) %
        REPEAT_MODE.length;
      queue.repeatMode = REPEAT_MODE[idx];

      playback.queue = queue;
      return { ...states, playback };
    case 'init':
      if (payload.playback) {
        playback = payload.playback;
        playback.state.isPlaying = false;
        return { ...states, playback };
      }
      break;
    case 'previous':
      if (playedTracks.length > 0) {
        playbackState.track && waitingTracks.unshift(playbackState.track);
        playbackState.track = playedTracks.pop();
        queue.playedTracks = playedTracks;
        queue.waitingTracks = waitingTracks;

        queue.originals = {
          playedTracks: queue.playedTracks,
          waitingTracks: queue.waitingTracks,
        };
        playback.state = playbackState;
        playback.queue = queue;
        return { ...states, playback };
      }
      break;
    case 'next':
      if (waitingTracks.length > 0) {
        playbackState.track && playedTracks.push(playbackState.track);
        playbackState.track = waitingTracks.shift();
      } else {
        waitingTracks = playedTracks;
        playedTracks = [];
        playbackState.track = waitingTracks.shift();
      }
      queue.playedTracks = playedTracks;
      queue.waitingTracks = waitingTracks;

      queue.originals = {
        playedTracks: queue.playedTracks,
        waitingTracks: queue.waitingTracks,
      };
      playback.state = playbackState;
      playback.queue = queue;
      return { ...states, playback };
    case 'shuffle':
      if (queue.isShuffled) {
        playedTracks = [...queue.originals.playedTracks];
        waitingTracks = [...queue.originals.waitingTracks];
        queue.isShuffled = false;
      } else {
        playedTracks.sort(() => Math.random() - 0.5);
        waitingTracks.sort(() => Math.random() - 0.5);
        console.log(playedTracks);
        queue.isShuffled = true;
      }

      queue.playedTracks = playedTracks;
      queue.waitingTracks = waitingTracks;

      playback.queue = queue;
      return { ...states, playback };
    default:
      break;
  }
  return states;
}

function isAudioContextAvailale(playback: Playback) {
  return (
    playback.queue.playedTracks.length > 0 ||
    playback.queue.waitingTracks.length > 0 ||
    playback.state.track
  );
}

function playPlaylist(
  dispatchAudio: (value: AudioPlayerAction) => void,
  playlist: Track[]
) {
  playlist &&
    dispatchAudio({
      type: 'play_playlist',
      payload: { waitingTracks: playlist },
    });
}

function changePlayingState(
  dispatchAudio: (value: AudioPlayerAction) => void,
  isPlaying: boolean
) {
  dispatchAudio({
    type: 'update_playback',
    payload: { isPlaying },
  });
}

function savePlayback(dispatchAudio: (value: AudioPlayerAction) => void) {
  dispatchAudio({ type: 'save_playback', payload: {} });
}

function updatePlaybackStates(
  dispatchAudio: (value: AudioPlayerAction) => void,
  playbackState: { currentSec?: number; isPlaying?: boolean; volume?: number }
) {
  dispatchAudio({ type: 'update_playback', payload: { ...playbackState } });
}

function previousTrack(dispatchAudio: (value: AudioPlayerAction) => void) {
  dispatchAudio({
    type: 'previous',
    payload: {},
  });
}

function nextTrack(dispatchAudio: (value: AudioPlayerAction) => void) {
  dispatchAudio({
    type: 'next',
    payload: {},
  });
}

function playInQueue(
  dispatchAudio: (value: AudioPlayerAction) => void,
  playInQueue: PlayInQueue
) {
  dispatchAudio({
    type: 'play_in_queue',
    payload: {
      playInQueue,
    },
  });
}

function initPlayback(
  dispatchAudio: (value: AudioPlayerAction) => void,
  playback: Playback
) {
  dispatchAudio({ type: 'init', payload: { playback } });
}

function changePlaybackTrack(
  dispatchAudio: (value: AudioPlayerAction) => void,
  track: Track
) {
  dispatchAudio({ type: 'change_playback_track', payload: { track } });
}

function changeRepeatMode(dispatchAudio: (value: AudioPlayerAction) => void) {
  dispatchAudio({ type: 'repeat', payload: {} });
}

function toggleShuffle(dispatchAudio: (value: AudioPlayerAction) => void) {
  dispatchAudio({ type: 'shuffle', payload: {} });
}

export {
  INITIAL_AUDIO_CONTEXT,
  changePlaybackTrack,
  changePlayingState,
  initPlayback,
  isAudioContextAvailale,
  nextTrack,
  playInQueue,
  playPlaylist,
  previousTrack,
  savePlayback,
  updatePlaybackStates,
  changeRepeatMode,
  toggleShuffle,
};
export type { AudioPayload, AudioPlayer, AudioPlayerAction };
export default audioReducer;
