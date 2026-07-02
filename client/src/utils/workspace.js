const LABEL_OVERRIDES = Object.freeze({
  dashboard: 'Dashboard',
  projects: 'Projects',
  assets: 'Assets',
  videos: 'Video Studio',
  templates: 'Templates',
  manage: 'Manage',
  voices: 'Voice Studio',
  analytics: 'Analytics',
  settings: 'Settings',
});

export function formatPathLabel(segment) {
  if (LABEL_OVERRIDES[segment]) return LABEL_OVERRIDES[segment];

  return segment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function buildBreadcrumbs(pathname) {
  const segments = pathname.split('/').filter(Boolean);

  return segments.map((segment, index) => ({
    label: formatPathLabel(segment),
    to: `/${segments.slice(0, index + 1).join('/')}`,
    current: index === segments.length - 1,
  }));
}
