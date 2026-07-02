export function formatCurrency(value, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value || 0);
}

export function truncateText(value, length = 90) {
  if (!value) return '';
  return value.length > length ? `${value.slice(0, length)}…` : value;
}
