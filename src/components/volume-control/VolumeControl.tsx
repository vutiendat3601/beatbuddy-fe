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
  }, []);

  return (
    <div className={css('volume')}>
      <div className={css('icon')}>
        <svg
          width="23"
          height="20"
          viewBox="0 0 23 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.9039 2.57182C20.4851 2.82171 21.0175 3.71148 21.4028 5.07698C21.788 6.44248 22.0001 8.19158 22 10.0016C21.9999 11.8116 21.7875 13.5604 21.4021 14.9254C21.0166 16.2904 20.4841 17.1795 19.9028 17.4286"
            stroke={value === 100 ? 'white' : 'transparent'}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M15.8962 4.11564C16.458 4.39732 16.9632 5.17935 17.3228 6.32405C17.6824 7.46875 17.8733 8.90275 17.862 10.3736C17.8506 11.8445 17.6378 13.258 17.2609 14.3652C16.884 15.4725 16.3671 16.2025 15.8014 16.4269"
            stroke={value >= 60 ? 'white' : 'transparent'}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M12.7088 5C12.9334 5 13.1557 5.12933 13.3632 5.3806C13.5707 5.63188 13.7592 6.00017 13.9179 6.46447C14.0767 6.92876 14.2027 7.47996 14.2886 8.08658C14.3746 8.69321 14.4188 9.34339 14.4188 10C14.4188 10.6566 14.3746 11.3068 14.2886 11.9134C14.2027 12.52 14.0767 13.0712 13.9179 13.5355C13.7592 13.9998 13.5707 14.3681 13.3632 14.6194C13.1557 14.8707 12.9334 15 12.7088 15"
            stroke={value > 0 ? 'white' : 'transparent'}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M13 7L19 13M19 7L13 13"
            stroke={value === 0 ? 'white' : 'transparent'}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M6.47519 4.6078L8.20798 2.34395C8.78908 1.58475 10.0021 1.99569 10.0021 2.95175V16.452C10.0021 17.4614 8.67641 17.8351 8.14925 16.9742L6.46754 14.2278C6.28579 13.931 5.96277 13.75 5.61473 13.75H3C2.44772 13.75 2 13.3023 2 12.75V6C2 5.44772 2.44772 5 3 5H5.68111C5.99242 5 6.28598 4.85501 6.47519 4.6078Z"
            stroke="white"
            strokeWidth="2.2"
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
