/**
 * Presentation-only dashboard seed used until Module 5 connects dashboard
 * queries. It deliberately lives outside the service layer.
 */
export const DASHBOARD_INITIAL_DATA = Object.freeze({
  stats: [
    { id: 'projects', label: 'Active projects', value: 12, change: 8, trend: 'up' },
    { id: 'assets', label: 'Media assets', value: 248, change: 24, trend: 'up' },
    { id: 'videos', label: 'Videos created', value: 36, change: 12, trend: 'up' },
    { id: 'renderMinutes', label: 'Render minutes', value: 142, change: 3, trend: 'neutral' },
  ],
  recentProjects: [
    { id: 'project-1', name: 'Summer product launch', status: 'In progress', progress: 72, updatedAt: '2026-07-02T07:10:00.000Z' },
    { id: 'project-2', name: 'Founder story', status: 'Draft', progress: 35, updatedAt: '2026-07-01T11:40:00.000Z' },
    { id: 'project-3', name: 'Weekly social series', status: 'Review', progress: 90, updatedAt: '2026-06-30T09:20:00.000Z' },
  ],
  recentAssets: [
    { id: 'asset-1', name: 'launch-hero.mp4', meta: 'Video · 48.2 MB', updatedAt: '2026-07-02T06:45:00.000Z' },
    { id: 'asset-2', name: 'product-angle-03.png', meta: 'Image · 6.8 MB', updatedAt: '2026-07-01T13:25:00.000Z' },
    { id: 'asset-3', name: 'narration-final.wav', meta: 'Audio · 12.4 MB', updatedAt: '2026-06-30T14:10:00.000Z' },
  ],
  recentVideos: [
    { id: 'video-1', name: 'Launch teaser v3', meta: '00:42 · 1080p', status: 'Ready', updatedAt: '2026-07-02T05:15:00.000Z' },
    { id: 'video-2', name: 'Feature overview', meta: '01:18 · 1080p', status: 'Rendering', updatedAt: '2026-07-01T15:30:00.000Z' },
    { id: 'video-3', name: 'Customer quote cut', meta: '00:24 · 1080p', status: 'Draft', updatedAt: '2026-06-29T08:00:00.000Z' },
  ],
  storage: {
    usedBytes: 25555055411,
    limitBytes: 107374182400,
  },
  plan: {
    name: 'Creator',
    renderMinutesUsed: 42,
    renderMinutesLimit: 100,
    renewalDate: '2026-08-02T00:00:00.000Z',
  },
  activity: [
    { id: 'activity-1', actor: 'You', action: 'created a new project', subject: 'Summer product launch', occurredAt: '2026-07-02T07:10:00.000Z' },
    { id: 'activity-2', actor: 'You', action: 'uploaded', subject: 'launch-hero.mp4', occurredAt: '2026-07-02T06:45:00.000Z' },
    { id: 'activity-3', actor: 'Studio', action: 'completed the render', subject: 'Launch teaser v3', occurredAt: '2026-07-02T05:15:00.000Z' },
    { id: 'activity-4', actor: 'You', action: 'updated the voice in', subject: 'Founder story', occurredAt: '2026-07-01T11:40:00.000Z' },
  ],
  quickActions: [
    { id: 'create-project', label: 'Create project', description: 'Start a new production workspace.', to: '/projects', icon: 'project' },
    { id: 'upload-asset', label: 'Upload asset', description: 'Add video, audio, or imagery.', to: '/assets', icon: 'asset' },
    { id: 'generate-video', label: 'Generate video', description: 'Move from a brief to a first draft.', to: '/videos', icon: 'video' },
  ],
});

/**
 * DashboardPage Phase 4.2 mock data.
 * Kept as named exports to support direct composition in the page.
 */
export const stats = [
  { title: 'Projects', value: 12, description: 'Active productions' },
  { title: 'Videos', value: 31, description: 'Drafts & renders' },
  { title: 'Assets', value: 87, description: 'Uploaded media' },
  { title: 'Storage', value: '2.4 GB', description: 'Used this month' },
];

export const recentProjects = [
  { id: 1, name: 'AI Podcast', updated: '2 hours ago' },
  { id: 2, name: 'Marketing Reel', updated: 'Yesterday' },
  { id: 3, name: 'Product Teaser', updated: '3 days ago' },
];

export const recentVideos = [
  { id: 1, name: 'Launch teaser v3', updated: 'Today' },
  { id: 2, name: 'Founder overview', updated: 'Yesterday' },
  { id: 3, name: 'Customer quote cut', updated: '2 days ago' },
];

export const activity = [
  { id: 'a1', title: 'Created a new project', time: '2 hours ago' },
  { id: 'a2', title: 'Uploaded an asset', time: 'Today' },
  { id: 'a3', title: 'Completed the render', time: 'Yesterday' },
  { id: 'a4', title: 'Updated project details', time: '3 days ago' },
];

export default DASHBOARD_INITIAL_DATA;

