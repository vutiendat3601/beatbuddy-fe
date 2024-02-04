import { RefObject, useEffect, useState } from 'react';
import style from './VolumeControl.module.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

interface VolumeControlProps {
  mediaElemRef: RefObject<HTMLMediaElement> | null;
  onVolumeChange?: (value: number) => void;
}

function VolumeControl({ mediaElemRef, onVolumeChange }: VolumeControlProps) {
  const [value, setValue] = useState<number>(0);

  function handleVolumeChange(e: any) {
    setValue(e.target.value);
    const value = e.target.value * 0.01;
    if (mediaElemRef?.current) {
      mediaElemRef.current.volume = value;
    }
    onVolumeChange && onVolumeChange(value);
  }

  useEffect(() => {
    mediaElemRef?.current && setValue(mediaElemRef.current.volume * 100);
  }, [mediaElemRef]);

  const mediaElem = mediaElemRef?.current;
  return (
    <div className={css('volume')}>
      <div className={css('icon')}>
        <svg
          width="28"
          height="22"
          viewBox="0 0 28 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.4846 2.829C24.1822 3.10388 24.821 4.08263 25.2833 5.58468C25.7456 7.08673 26.0002 9.01074 26 11.0018C25.9999 12.9928 25.745 14.9165 25.2825 16.418C24.82 17.9195 24.181 18.8974 23.4834 19.1715"
            stroke={
              mediaElem && mediaElem.volume >= 0.9 ? 'white' : 'transparent'
            }
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M18.6754 4.5272C19.3496 4.83706 19.9558 5.69728 20.3873 6.95645C20.8188 8.21562 21.048 9.79302 21.0344 11.411C21.0208 13.029 20.7654 14.5838 20.3131 15.8017C19.8608 17.0197 19.2406 17.8228 18.5617 18.0696"
            stroke={
              mediaElem && mediaElem.volume >= 0.4 ? 'white' : 'transparent'
            }
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M14.8506 5.5C15.1201 5.5 15.3869 5.64226 15.6358 5.91866C15.8848 6.19506 16.111 6.60019 16.3015 7.11091C16.4921 7.62164 16.6432 8.22795 16.7463 8.89524C16.8495 9.56253 16.9025 10.2777 16.9025 11C16.9025 11.7223 16.8495 12.4375 16.7463 13.1048C16.6432 13.7721 16.4921 14.3784 16.3015 14.8891C16.111 15.3998 15.8848 15.8049 15.6358 16.0813C15.3869 16.3577 15.1201 16.5 14.8506 16.5"
            stroke={
              mediaElem && mediaElem.volume > 0 ? 'white' : 'transparent'
            }
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M15.2 7.7L22.4 14.3M22.4 7.7L15.2 14.3"
            stroke={
              mediaElem && mediaElem.volume === 0 ? 'white' : 'transparent'
            }
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M7.30982 5.14094L9.83489 2.11689C10.434 1.39934 11.6025 1.82302 11.6025 2.75783V18.7027C11.6025 19.6916 10.3203 20.0805 9.77094 19.2582L7.30692 15.5695C7.12138 15.2918 6.80941 15.125 6.47538 15.125H3C2.44772 15.125 2 14.6773 2 14.125V6.5C2 5.94772 2.44771 5.5 3 5.5H6.54223C6.83866 5.5 7.11982 5.36848 7.30982 5.14094Z"
            stroke="white"
            strokeWidth="3"
          />
        </svg>
      </div>
      <input
        className={css('value')}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={handleVolumeChange}
      />
    </div>
  );
}

export default VolumeControl;
