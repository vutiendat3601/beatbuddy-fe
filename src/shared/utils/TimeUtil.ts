function formatDurationSec(durationSec: number, hasHour = false) {
  const minutes = Math.floor(durationSec / 60);
  const remainingSeconds = Math.round(durationSec % 60);

  const formattedMinutes = hasHour && minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  return `${formattedMinutes}:${formattedSeconds}`;
}
export default formatDurationSec;
