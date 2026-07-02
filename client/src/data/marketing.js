export const TRUSTED_COMPANIES = Object.freeze([
  'Northstar',
  'Arcadia',
  'Monument',
  'Paperplane',
  'Sundial',
  'Daybreak',
]);

export const FEATURES = Object.freeze([
  {
    icon: '✦',
    title: 'Prompt to production',
    description: 'Turn a creative brief into a structured video draft without stitching tools together.',
  },
  {
    icon: '◫',
    title: 'Reusable templates',
    description: 'Standardize repeatable formats while keeping every scene easy to customize.',
  },
  {
    icon: '◉',
    title: 'Natural AI voices',
    description: 'Match narration to your story with searchable voices, tones, and languages.',
  },
  {
    icon: '◇',
    title: 'Unified asset library',
    description: 'Keep footage, audio, images, and generated media organized across projects.',
  },
  {
    icon: '↗',
    title: 'Reliable rendering',
    description: 'Track every render from queue to completion with durable project history.',
  },
  {
    icon: '⌘',
    title: 'Team-ready workflow',
    description: 'Create a consistent workspace for reviews, handoffs, and future collaboration.',
  },
]);

export const STEPS = Object.freeze([
  {
    number: '01',
    title: 'Describe the outcome',
    description: 'Start with a brief, script, or an existing template.',
  },
  {
    number: '02',
    title: 'Shape the story',
    description: 'Arrange scenes, choose assets, and select the right voice.',
  },
  {
    number: '03',
    title: 'Generate and refine',
    description: 'Preview the composition and make focused edits in one workspace.',
  },
  {
    number: '04',
    title: 'Render and publish',
    description: 'Export the finished video and retain a clear production history.',
  },
]);

export const TEMPLATES = Object.freeze([
  { title: 'Product launch', category: 'Marketing', ratio: '16:9', tone: 'from-amber-500/30' },
  { title: 'Social story', category: 'Social', ratio: '9:16', tone: 'from-fuchsia-500/30' },
  { title: 'Explainer', category: 'Education', ratio: '16:9', tone: 'from-sky-500/30' },
  { title: 'Weekly update', category: 'Business', ratio: '1:1', tone: 'from-emerald-500/30' },
]);

export const VOICES = Object.freeze([
  { initials: 'AM', name: 'Aria', style: 'Warm · Narrative', language: 'English' },
  { initials: 'JL', name: 'Julian', style: 'Clear · Professional', language: 'English' },
  { initials: 'MS', name: 'Mira', style: 'Bright · Conversational', language: 'Multilingual' },
]);

export const TESTIMONIALS = Object.freeze([
  {
    quote: 'The workflow gives our team a clear path from a rough idea to a reviewable video.',
    name: 'Maya Chen',
    role: 'Creative Director, Northstar',
  },
  {
    quote: 'Templates keep the repetitive work consistent while leaving room for the story.',
    name: 'Owen Brooks',
    role: 'Content Lead, Daybreak',
  },
  {
    quote: 'Having assets, voices, and renders in one workspace removes a surprising amount of friction.',
    name: 'Sofia Malik',
    role: 'Producer, Arcadia',
  },
]);

export const PRICING_PLANS = Object.freeze([
  {
    name: 'Starter',
    description: 'For exploring AI-assisted video creation.',
    price: '$0',
    period: 'forever',
    features: ['3 projects', 'Starter templates', '720p exports', 'Community support'],
    cta: 'Start free',
    featured: false,
  },
  {
    name: 'Creator',
    description: 'For creators publishing consistently.',
    price: '$29',
    period: 'per month',
    features: ['Unlimited projects', 'Premium templates', '1080p exports', 'Voice library access'],
    cta: 'Choose Creator',
    featured: true,
  },
  {
    name: 'Studio',
    description: 'For teams building repeatable workflows.',
    price: '$79',
    period: 'per month',
    features: ['Shared workspace', 'Brand templates', 'Priority rendering', 'Team support'],
    cta: 'Choose Studio',
    featured: false,
  },
]);

export const FAQ_ITEMS = Object.freeze([
  {
    question: 'What can I create with TheSixthStudio?',
    answer: 'The platform is designed for explainers, product videos, social content, internal updates, and repeatable branded formats.',
  },
  {
    question: 'Do I need video editing experience?',
    answer: 'No. The workflow starts with familiar concepts such as scripts, scenes, assets, templates, and voice selection.',
  },
  {
    question: 'Can I use my own media?',
    answer: 'Yes. The workspace architecture supports an organized asset library for your footage, images, and audio.',
  },
  {
    question: 'Can my team use shared templates?',
    answer: 'The Studio plan is structured for shared projects and reusable brand templates as collaboration capabilities roll out.',
  },
  {
    question: 'How are renders tracked?',
    answer: 'Video jobs are represented as durable records so queued, active, completed, and failed states can be surfaced consistently.',
  },
]);
