import classNames from 'classnames/bind';
import { Outlet } from 'react-router-dom';
import AudioPlayer from '../../components/audio-player/AudioPlayer';
import QueueCard from '../../components/queue-card/QueueCard';
import useMainLayoutContext from '../../hooks/useMainLayoutContext';
import style from './MainLayout.module.scss';
import Header from './header/Header';

const css = classNames.bind(style);

interface MainLayoutProps {
  children?: JSX.Element;
}

function MainLayout({ children }: MainLayoutProps): JSX.Element {
  const { mainLayout } = useMainLayoutContext();
  const { queueCard } = mainLayout;
  return (
    <div className={`container-fluid ${css('main-layout')}`}>
      <header className={css('header')}>
        <Header />
      </header>
      <div
        className={css('content', { 'queue-card-shown': !queueCard.isHidden })}
      >
        <Outlet />
      </div>
      <aside
        className={css('right-sidebar', {
          'queue-card-shown': !queueCard.isHidden,
        })}
      >
        <QueueCard hidden={queueCard.isHidden} />
      </aside>
      <footer className={css('footer')}>
        <AudioPlayer />
      </footer>
    </div>
  );
}

export default MainLayout;
