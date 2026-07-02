/**
 * Framework-independent route metadata used by navigation, document titles,
 * analytics, and future permission policy.
 */
export const ROUTE_CONFIG = Object.freeze([
  { path: '/', title: 'AI Video Creation', access: 'public', layout: 'public' },
  { path: '/features', title: 'Features', access: 'public', layout: 'public' },
  { path: '/templates', title: 'Templates', access: 'public', layout: 'public' },
  { path: '/pricing', title: 'Pricing', access: 'public', layout: 'public' },
  { path: '/about', title: 'About', access: 'public', layout: 'public' },
  { path: '/contact', title: 'Contact', access: 'public', layout: 'public' },
  { path: '/login', title: 'Sign in', access: 'guest', layout: 'auth' },
  { path: '/register', title: 'Create account', access: 'guest', layout: 'auth' },
  { path: '/forgot-password', title: 'Recover account', access: 'guest', layout: 'auth' },
  { path: '/reset-password', title: 'Reset password', access: 'guest', layout: 'auth' },
  { path: '/verify-email', title: 'Verify email', access: 'guest', layout: 'auth' },
  { path: '/dashboard', title: 'Dashboard', access: 'protected', layout: 'app' },
  { path: '/projects', title: 'Projects', access: 'protected', layout: 'app' },
  { path: '/assets', title: 'Assets', access: 'protected', layout: 'app' },
  { path: '/videos', title: 'Videos', access: 'protected', layout: 'app' },
  { path: '/templates/manage', title: 'Manage templates', access: 'role', layout: 'app' },
  { path: '/voices', title: 'Voices', access: 'protected', layout: 'app' },
  { path: '/settings', title: 'Settings', access: 'protected', layout: 'app' },
  { path: '/workspace', title: 'Video workspace', access: 'protected', layout: 'workspace' },
  { path: '*', title: 'Page not found', access: 'public', layout: 'public' },
]);

const exactTitles = new Map(ROUTE_CONFIG.map(({ path, title }) => [path, title]));

export function getRouteTitle(pathname) {
  if (exactTitles.has(pathname)) return exactTitles.get(pathname);
  if (pathname.startsWith('/workspace/')) return 'Video workspace';
  return 'Page not found';
}

export const routeConfig = ROUTE_CONFIG;
export default ROUTE_CONFIG;
