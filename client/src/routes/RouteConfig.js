export const routeConfig = [
  {
    path: '/login',
    protected: false,
    layout: 'public',
    title: 'Login',
  },
  {
    path: '/register',
    protected: false,
    layout: 'public',
    title: 'Register',
  },
  {
    path: '/forgot-password',
    protected: false,
    layout: 'public',
    title: 'Forgot Password',
  },
  {
    path: '/reset-password',
    protected: false,
    layout: 'public',
    title: 'Reset Password',
  },
  {
    path: '/verify-email',
    protected: false,
    layout: 'public',
    title: 'Verify Email',
  },
  {
    path: '/dashboard',
    protected: true,
    layout: 'app',
    title: 'Dashboard',
  },
  {
    path: '/settings',
    protected: true,
    layout: 'app',
    title: 'Settings',
  },
  {
    path: '/500',
    layout: 'public',
    title: 'Server Error',
  },
  {
    path: '*',
    layout: 'public',
    title: 'Page Not Found',
  },
];

export default routeConfig;
