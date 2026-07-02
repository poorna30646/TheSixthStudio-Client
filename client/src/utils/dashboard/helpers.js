export function calculateUsagePercentage(used, limit) {
  if (!Number.isFinite(used) || !Number.isFinite(limit) || limit <= 0) return 0;
  return Math.min(100, Math.max(0, (used / limit) * 100));
}

export function getTrendLabel(change, trend) {
  if (!Number.isFinite(change) || trend === 'neutral') return 'No material change';
  return `${change}% ${trend === 'down' ? 'decrease' : 'increase'}`;
}

export function getStatusTone(status) {
  const normalizedStatus = status?.toLowerCase();

  if (['ready', 'complete', 'completed'].includes(normalizedStatus)) return 'success';
  if (['rendering', 'in progress', 'review'].includes(normalizedStatus)) return 'warning';
  return 'neutral';
}
