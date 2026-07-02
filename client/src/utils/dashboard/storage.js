const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'];

export function formatStorage(bytes, decimals = 1) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';

  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    UNITS.length - 1
  );
  const value = bytes / (1024 ** unitIndex);

  return `${value.toFixed(unitIndex === 0 ? 0 : decimals)} ${UNITS[unitIndex]}`;
}
