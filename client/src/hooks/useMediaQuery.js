import { useEffect, useState } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQueryList = window.matchMedia(query);
    const updateMatch = () => setMatches(mediaQueryList.matches);

    updateMatch();
    mediaQueryList.addEventListener?.('change', updateMatch);
    return () => mediaQueryList.removeEventListener?.('change', updateMatch);
  }, [query]);

  return matches;
}

export default useMediaQuery;
