/**
 * src/data/projects.js
 * Projects Management presentation-only mock data for Module 4 Phase 4.3.
 */

export const PROJECT_STATUSES = Object.freeze([
  Object.freeze({ value: 'draft', label: 'Draft' }),
  Object.freeze({ value: 'in_progress', label: 'In progress' }),
  Object.freeze({ value: 'review', label: 'Review' }),
  Object.freeze({ value: 'published', label: 'Published' }),
]);

export const PROJECTS_OWNERS = Object.freeze([
  Object.freeze({ id: 'owner-you', name: 'You', role: 'Creator' }),
  Object.freeze({ id: 'owner-studio', name: 'Studio', role: 'Producer' }),
]);

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} createdAt ISO date
 * @property {string} updatedAt ISO date
 * @property {string} status one of PROJECT_STATUSES[].value
 * @property {number} videoCount
 * @property {number} assetCount
 * @property {number} voiceCount
 * @property {string} ownerId
 * @property {string} thumbnailColor CSS color token fallback
 */

export const PROJECTS = Object.freeze([
  Object.freeze({
    id: 'proj-summer-launch',
    name: 'Summer product launch',
    description: 'Scripted intro + hero cutdowns with a single voice direction.',
    createdAt: '2026-06-05T10:20:00.000Z',
    updatedAt: '2026-07-02T07:10:00.000Z',
    status: 'in_progress',
    videoCount: 6,
    assetCount: 42,
    voiceCount: 2,
    ownerId: 'owner-you',
    thumbnailColor: 'bg-amber-400/20',
  }),
  Object.freeze({
    id: 'proj-founder-story',
    name: 'Founder story',
    description: 'Draft narration and scene layout for a 60s brand narrative.',
    createdAt: '2026-06-28T16:05:00.000Z',
    updatedAt: '2026-07-01T11:40:00.000Z',
    status: 'draft',
    videoCount: 2,
    assetCount: 19,
    voiceCount: 1,
    ownerId: 'owner-studio',
    thumbnailColor: 'bg-sky-400/20',
  }),
  Object.freeze({
    id: 'proj-weekly-series',
    name: 'Weekly social series',
    description: 'Recurring templates for weekly edits with consistent branding.',
    createdAt: '2026-06-20T08:30:00.000Z',
    updatedAt: '2026-06-30T09:20:00.000Z',
    status: 'review',
    videoCount: 11,
    assetCount: 73,
    voiceCount: 4,
    ownerId: 'owner-you',
    thumbnailColor: 'bg-emerald-400/20',
  }),
  Object.freeze({
    id: 'proj-launch-teaser',
    name: 'Launch teaser v3',
    description: 'Final review for a teaser format with versioned cutdowns.',
    createdAt: '2026-06-22T12:00:00.000Z',
    updatedAt: '2026-06-29T08:00:00.000Z',
    status: 'published',
    videoCount: 3,
    assetCount: 28,
    voiceCount: 2,
    ownerId: 'owner-studio',
    thumbnailColor: 'bg-fuchsia-400/20',
  }),
  Object.freeze({
    id: 'proj-voice-rewrite',
    name: 'Voice direction rewrite',
    description: 'Re-record narration samples and update scenes accordingly.',
    createdAt: '2026-06-10T09:45:00.000Z',
    updatedAt: '2026-07-02T05:30:00.000Z',
    status: 'in_progress',
    videoCount: 4,
    assetCount: 35,
    voiceCount: 3,
    ownerId: 'owner-you',
    thumbnailColor: 'bg-indigo-400/20',
  }),
]);

