import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';

/**
 * Last-resort application boundary for render failures.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV !== 'production') {
      // Keep diagnostics available locally without exposing error details to users.
      console.error('Application render error', error, info);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (!hasError) {
      return children;
    }

    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6 text-center">
        <div className="max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
            TheSixthStudio
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Something went off-script.</h1>
          <p className="mt-3 text-slate-400">
            The application could not render this view. Reload to start from a clean state.
          </p>
          <Button className="mt-7" onClick={this.handleReload}>
            Reload application
          </Button>
        </div>
      </main>
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
