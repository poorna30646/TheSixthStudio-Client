const DIVISIONS = [
  { amount: 60, unit: 'second' },
  { amount: 60, unit: 'minute' },
  { amount: 24, unit: 'hour' },
  { amount: 7, unit: 'day' },
  { amount: 4.34524, unit: 'week' },
  { amount: 12, unit: 'month' },
  { amount: Number.POSITIVE_INFINITY, unit: 'year' },
];

export function formatRelativeTime(value, locale = 'en') {
  const timestamp = new Date(value).getTime();
  if (!Number.isFinite(timestamp)) return 'Recently';

  let duration = (timestamp - Date.now()) / 1000;

  for (const division of DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(
        Math.round(duration),
        division.unit
      );
    }
    duration /= division.amount;
  }

  return 'Recently';
}
