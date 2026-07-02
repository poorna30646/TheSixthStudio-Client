import React, { createContext, useCallback, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { DASHBOARD_INITIAL_DATA } from '../data/dashboard';

const DashboardContext = createContext(null);

const initialState = {
  status: 'ready',
  error: null,
  data: DASHBOARD_INITIAL_DATA,
};

function dashboardReducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, status: 'loading', error: null };
    case 'hydrate':
      return { status: 'ready', error: null, data: action.payload };
    case 'error':
      return { ...state, status: 'error', error: action.payload };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

/**
 * Isolated state boundary for dashboard overview data.
 * Future query hooks can hydrate this provider without changing dashboard UI.
 */
export function DashboardProvider({ children, initialData }) {
  const [state, dispatch] = useReducer(
    dashboardReducer,
    initialData ? { ...initialState, data: initialData } : initialState
  );

  const setLoading = useCallback(() => dispatch({ type: 'loading' }), []);
  const hydrateDashboard = useCallback(
    (data) => dispatch({ type: 'hydrate', payload: data }),
    []
  );
  const setDashboardError = useCallback(
    (error) => dispatch({ type: 'error', payload: error }),
    []
  );
  const resetDashboard = useCallback(() => dispatch({ type: 'reset' }), []);

  const value = useMemo(
    () => ({
      ...state,
      isLoading: state.status === 'loading',
      setLoading,
      hydrateDashboard,
      setDashboardError,
      resetDashboard,
    }),
    [hydrateDashboard, resetDashboard, setDashboardError, setLoading, state]
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialData: PropTypes.shape({
    stats: PropTypes.array,
    recentProjects: PropTypes.array,
    recentAssets: PropTypes.array,
    recentVideos: PropTypes.array,
    storage: PropTypes.object,
    plan: PropTypes.object,
    activity: PropTypes.array,
    quickActions: PropTypes.array,
  }),
};

export function useDashboardContext() {
  const context = React.useContext(DashboardContext);

  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }

  return context;
}

export default DashboardContext;
