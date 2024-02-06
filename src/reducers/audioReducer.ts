import { Playback, INITIAL_PLAYBACK } from '../models/Playback';
import { Queue, INITITAL_QUEUE } from '../models/Queue';
import { Track } from '../models/Track';
import { saveObject } from '../shared/utils/local-storage-util';

interface AudioPlayer {
  queue: Queue;
  playback: Playback;
}

interface PlayInQueue {
  in: 'played_tracks' | 'tracks';
  index: number;
}

interface AudioPayload {
  currentSec?: number;
  queue?: Queue;
  playback?: Playback;
  tracks?: Track[];
  playedTracks?: Track[];
  track?: Track | null;
  isPlaying?: boolean;
  volume?: number;
  playInQueue?: PlayInQueue;
}

interface AudioPlayerAction {
  type:
    | 'save_queue'
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
  queue: INITITAL_QUEUE,
  playback: INITIAL_PLAYBACK,
};

function audioReducer(states: AudioPlayer, action: AudioPlayerAction) {
  const { type, payload } = action;
  let playback = { ...states.playback };
  let queue = { ...states.queue };
  let playedTracks = [...states.queue.playedTracks];
  let tracks = [...states.queue.tracks];
  let track = states.playback.track;
  switch (type) {
    case 'save_queue':
      saveObject('queue', states.queue);
      break;
    case 'save_playback':
      saveObject('playback', { ...states.playback, isPlaying: false });
      break;
    case 'play_in_queue':
      if (payload.playInQueue) {
        states.playback.track && playedTracks.push(states.playback.track);
        const { index } = payload.playInQueue;
        switch (payload.playInQueue.in) {
          case 'played_tracks':
            track = states.queue.playedTracks[index];
            let tailPlayedTracks = playedTracks.slice(index + 1);
            console.log('tailPlayedTracks', tailPlayedTracks);
            playedTracks = playedTracks.slice(0, index);
            tracks = [...tailPlayedTracks, ...tracks];
            break;
          case 'tracks':
            track = states.queue.tracks[index];
            let headTracks = states.queue.tracks.slice(0, index);
            tracks = states.queue.tracks.slice(index + 1);
            playedTracks = [...playedTracks, ...headTracks];
            break;
        }
        playback.track = track;
        queue.playedTracks = playedTracks;
        queue.tracks = tracks;
        return { ...states, queue, playback };
      }

      return { ...states, playback, queue };
    case 'change_playback_track':
      if (payload.track) {
        if (states.playback.track) {
          playedTracks.push(states.playback.track);
          queue.playedTracks = playedTracks;
        }
        playback.track = payload.track;
        playback.currentSec = 0;
      }
      return { ...states, playback, queue };
    case 'update_playback':
      if (payload.currentSec) {
        playback.currentSec = payload.currentSec;
      }
      if (payload.isPlaying !== undefined) {
        playback.isPlaying = payload.isPlaying;
      }
      if (payload.volume && payload.volume >= 0 && payload.volume <= 1) {
        playback.volume = payload.volume;
      }
      return { ...states, playback };
    case 'init':
      if (payload.queue) {
        queue = payload.queue;
      }
      if (payload.playback) {
        playback = payload.playback;
      }
      if (payload.volume && payload.volume >= 0 && payload.volume <= 1) {
        playback.volume = payload.volume;
      }
      return { ...states, queue, playback };
    case 'previous':
      states.playback.track && tracks.unshift(states.playback.track);
      track = playedTracks.pop();
      if (track) {
        playback.track = track;
        queue.playedTracks = playedTracks;
        queue.tracks = tracks;
      }
      return { ...states, playback, queue };
    case 'next':
      states.playback.track && playedTracks.push(states.playback.track);
      track = tracks.shift();
      if (!track) {
        track = playedTracks.shift();
        tracks = [...playedTracks];
        playedTracks = [];
      }
      queue.playedTracks = playedTracks;
      queue.tracks = tracks;
      playback.track = track;
      return { ...states, playback, queue };
    default:
      break;
  }
  return states;
}

export type { AudioPlayer, AudioPayload, AudioPlayerAction };
export { INITIAL_AUDIO_CONTEXT };
export default audioReducer;
