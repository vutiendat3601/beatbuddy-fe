import classNames from 'classnames/bind';
import AudioPlayer from '../../components/audio-player/AudioPlayer';
import QueueCard from '../../components/queue-card/QueueCard';
import useMainLayoutContext from '../../hooks/useMainLayoutContext';
import style from './MainLayout.module.scss';
import Header from './header/Header';

const css = classNames.bind(style);

function MainLayout(): JSX.Element {
  const { mainLayout, dispatchMainLayout } = useMainLayoutContext();
  const { queueCard } = mainLayout;
  return (
    <div className={`container-fluid ${css('main')}`}>
      <header className={css('header')}>
        <Header />
      </header>
      <main></main>
      <aside className={css('right-sidebar')}>
        <QueueCard hidden={queueCard.isHidden} />
      </aside>
      <footer className={css('footer')}>
        <AudioPlayer />
      </footer>
    </div>
  );
}

export default MainLayout;
