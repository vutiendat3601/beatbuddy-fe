import classNames from 'classnames/bind';
import style from './MainLayout.module.scss';
import AudioPlayer from './audio-player/AudioPlayer';
import Header from './header/Header';

const css = classNames.bind(style);

function MainLayout(): JSX.Element {
  return (
    <main className={`container-fluid ${css('main')}`}>
      <div className={css('header')}>
        <Header />
      </div>
      <div className={css('audio-player')}>
        <AudioPlayer />
      </div>
    </main>
  );
}

export default MainLayout;
