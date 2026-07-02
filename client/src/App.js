import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/feedback/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { UIProvider } from './context/UIContext';
import AppRoutes from './routes/AppRoutes';

/**
 * Composes global providers. Domain providers remain independent so they can
 * be tested or replaced without changing route components.
 */
function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <UIProvider>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </UIProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
