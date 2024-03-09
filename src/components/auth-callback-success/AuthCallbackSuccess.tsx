import { useEffect, useReducer } from 'react';
import playbackService from '../../services/playback-service';
import { saveObject } from '../../shared/utils/local-storage-util';

const AuthCallbackSuccess = () => {
  useEffect(() => {
    async function getUserPlayback() {
      const playback = await playbackService.getUserPlayback();
      if (playback) {
        saveObject('playback', playback);
      }
    }
    getUserPlayback();
  }, []);

  return <div></div>;
};

export default AuthCallbackSuccess;
