import { useDashboardContext } from '../context/DashboardContext';

/**
 * Exposes the isolated dashboard state contract.
 *
 * @returns {object} Dashboard status, data, and state transition functions.
 */
export function useDashboard() {
  return useDashboardContext();
}

export default useDashboard;
