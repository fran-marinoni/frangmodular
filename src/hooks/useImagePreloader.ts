import { useState, useEffect, useRef } from "react";

/**
 * Preloads an array of image URLs into the browser cache.
 * Returns `true` only when ALL images have been loaded (or errored)
 * AND the minimum delay has passed since the hook first received URLs.
 */
export function useImagePreloader(urls: string[], minDelay = 0): boolean {
  const [ready, setReady] = useState(false);
  const prevKey = useRef("");

  useEffect(() => {
    const filtered = urls.filter(Boolean);
    const key = filtered.join("|");

    // Same set already loaded
    if (key === prevKey.current && ready) return;
    // No URLs yet — keep waiting
    if (filtered.length === 0) return;

    prevKey.current = key;
    setReady(false);

    let cancelled = false;

    const imagePromises = filtered.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = url;
        })
    );

    const minDelayPromise =
      minDelay > 0
        ? new Promise<void>((r) => setTimeout(r, minDelay))
        : Promise.resolve();

    Promise.all([Promise.all(imagePromises), minDelayPromise]).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [urls.filter(Boolean).join("|"), minDelay]);

  return ready;
}

/**
 * Preloads only the FIRST N images for fast above-the-fold rendering.
 * Returns true when those critical images are ready.
 */
export function useCriticalImagePreloader(urls: string[], count = 1, minDelay = 0): boolean {
  const critical = urls.filter(Boolean).slice(0, count);
  return useImagePreloader(critical, minDelay);
}
