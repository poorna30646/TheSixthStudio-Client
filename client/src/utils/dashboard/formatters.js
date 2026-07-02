export function formatCompactNumber(value, locale = 'en-US') {
  if (!Number.isFinite(value)) return '0';

  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercentage(value, locale = 'en-US') {
  const safeValue = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 0,
  }).format(safeValue / 100);
}
