import { useCallback } from 'react';
import toast from 'react-hot-toast';

export function useToast() {
  const success = useCallback((message, options = {}) => toast.success(message, options), []);
  const error = useCallback((message, options = {}) => toast.error(message, options), []);
  const info = useCallback((message, options = {}) => toast(message, options), []);
  const loading = useCallback((message, options = {}) => toast.loading(message, options), []);
  const dismiss = useCallback((toastId) => toast.dismiss(toastId), []);

  return { success, error, info, loading, dismiss };
}

export default useToast;
