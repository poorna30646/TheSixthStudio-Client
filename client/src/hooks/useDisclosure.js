import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Accessible disclosure state with escape, outside-click, and focus-return behavior.
 */
export function useDisclosure() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  const toggle = useCallback(() => setOpen((current) => !current), []);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) close();
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') close(true);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close, open]);

  return { open, setOpen, toggle, close, containerRef, triggerRef };
}

export default useDisclosure;
