import {
  FaFilm,
  FaFolderOpen,
  FaHome,
  FaImages,
  FaLayerGroup,
  FaMicrophone,
  FaSlidersH,
} from 'react-icons/fa';

export const PUBLIC_NAV_ITEMS = Object.freeze([
  { label: 'Features', to: '/features' },
  { label: 'Templates', to: '/templates' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]);

export const APP_NAV_ITEMS = Object.freeze([
  { label: 'Dashboard', to: '/dashboard', icon: FaHome },
  { label: 'Projects', to: '/projects', icon: FaFolderOpen },
  { label: 'Assets', to: '/assets', icon: FaImages },
  { label: 'Videos', to: '/videos', icon: FaFilm },
  { label: 'Templates', to: '/templates/manage', icon: FaLayerGroup },
  { label: 'Voices', to: '/voices', icon: FaMicrophone },
  { label: 'Settings', to: '/settings', icon: FaSlidersH },
]);

export const FOOTER_GROUPS = Object.freeze([
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/features' },
      { label: 'Templates', to: '/templates' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign in', to: '/login' },
      { label: 'Create account', to: '/register' },
    ],
  },
]);
