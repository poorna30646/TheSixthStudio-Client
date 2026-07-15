import { useCallback } from 'react';

/**
 * Lightweight toast fallback.
 * This project intentionally does not depend on react-hot-toast.
 * The API remains compatible with the previous hook.
 */

export function useToast() {
  const success = useCallback((message) => {
    console.log(`✅ SUCCESS: ${message}`);
  }, []);

  const error = useCallback((message) => {
    console.error(`❌ ERROR: ${message}`);
  }, []);

  const info = useCallback((message) => {
    console.info(`ℹ️ INFO: ${message}`);
  }, []);

  const loading = useCallback((message) => {
    console.log(`⏳ LOADING: ${message}`);
    return Date.now().toString();
  }, []);

  const dismiss = useCallback(() => {
    // No-op for fallback implementation.
  }, []);

  return {
    success,
    error,
    info,
    loading,
    dismiss,
  };
}

export default useToast;