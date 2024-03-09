import { useOidc } from '@axa-fr/react-oidc';
import classNames from 'classnames/bind';
import { Outlet, useNavigate } from 'react-router-dom';
import AudioPlayer from '../../components/audio-player/AudioPlayer';
import Navigation from '../../components/navigation/Navigation';
import QueueCard from '../../components/queue-card/QueueCard';
import useAudioContext from '../../hooks/useAudioContext';
import useMainLayoutContext from '../../hooks/useMainLayoutContext';
import { isAudioContextAvailale } from '../../reducers/audioReducer';
import style from './MainLayout.module.scss';
import Header from './header/Header';
import CtaNotification from '../../components/cta-notification/CtaNotification';

const css = classNames.bind(style);

function MainLayout(): JSX.Element {
  const {
    mainLayout: { focused },
  } = useMainLayoutContext();
  const navigate = useNavigate();
  const { isAuthenticated } = useOidc();
  const {
    audioContext: { playback },
  } = useAudioContext();
  return (
    <div
      className={css('main-layout', {
        [`${focused}-focused`]: true,
      })}
    >
      <div className={`container-fluid ${css('main-layout-inner')}`}>
        <header className={css('header')}>
          <Header />
        </header>
        <div
          className={css('content')}
          // onClick={() => changeFocus(dispatchMainLayout, 'content')}
        >
          <Outlet />
        </div>
        <aside className={css('queue')}>
          {isAuthenticated && <QueueCard />}
        </aside>
        <footer className={css('footer')}>
          {isAuthenticated ? (
            isAudioContextAvailale(playback) && (
              <>
                <AudioPlayer />
                <div className={`d-md-none ${css('navbar')}`}>
                  <Navigation evenly />
                </div>
              </>
            )
          ) : (
            <CtaNotification message="Sign in to listen to music." actionName='Sign in' action={()=> navigate('/auth/sign-in')} />
          )}
        </footer>
      </div>
    </div>
  );
}

export default MainLayout;
