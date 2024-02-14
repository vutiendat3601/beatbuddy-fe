function formatDurationSec(durationSec: number, hasHour = false) {
  const minutes = Math.floor(durationSec / 60);
  const remainingSeconds = Math.round(durationSec % 60);

  const formattedMinutes =
    hasHour && minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  return `${formattedMinutes}:${formattedSeconds}`;
}

function formatIsoDate(isoDate: string, separator: string = '/'): string {
  const date = new Date(isoDate);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export { formatIsoDate, formatDurationSec };
