import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock(
  'react-router-dom',
  () => ({
    BrowserRouter: ({ children }) => <>{children}</>,
    useNavigate: () => jest.fn(),
  }),
  { virtual: true }
);

jest.mock('./routes/AppRoutes', () => ({
  __esModule: true,
  default: () => <h1>TheSixthStudio application routes</h1>,
}));

const App = require('./App').default;

test('mounts the application provider and route boundary', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: /thesixthstudio application routes/i })
  ).toBeInTheDocument();
});
