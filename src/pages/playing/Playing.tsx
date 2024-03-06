import classNames from 'classnames/bind';

import style from './Playing.module.scss';
import AudioPlayer from '../../components/audio-player/AudioPlayer';

const css = classNames.bind(style);

function Playing(): JSX.Element {
  return (
    <section className={css('playing')}>
      <AudioPlayer />
    </section>
  );
}
export default Playing;
