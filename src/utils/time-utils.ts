function formatSecToMinAndSec(sec: number): string {
  const minutes = sec < 60 ? 0 : sec / 60;
  const seconds: number = Math.round(sec % 60);
  return Math.floor(minutes) + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export { formatSecToMinAndSec };
