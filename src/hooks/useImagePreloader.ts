import { useEffect, useState } from 'react';

export const useImagePreloader = (urls: string[]) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!urls || urls.length === 0) return;

    let isMounted = true;
    let loadedCount = 0;

    const checkAllLoaded = () => {
      if (isMounted && loadedCount === urls.length) {
        setLoaded(true);
      }
    };

    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        checkAllLoaded();
      };
      img.onerror = () => {
        // Even if error, we count it as processed
        loadedCount++;
        checkAllLoaded();
      };
    });

    return () => {
      isMounted = false;
    };
  }, [urls]); // Note: urls array reference change triggers reload. Caller should memoize if needed.

  return { loaded };
};
