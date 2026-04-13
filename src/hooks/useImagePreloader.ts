import { useState, useEffect, useRef } from "react";

/**
 * Preloads an array of image URLs into the browser cache.
 * Returns `true` only when ALL images have been loaded (or errored).
 * 
 * @param urls - resolved image URLs to preload
 * @param minDelay - minimum ms to wait (matches preloader duration), default 0
 */
export function useImagePreloader(urls: string[], minDelay = 0): boolean {
  const [ready, setReady] = useState(false);
  const prevKey = useRef("");

  useEffect(() => {
    const filtered = urls.filter(Boolean);
    const key = filtered.join("|");

    // Skip if same set or empty
    if (key === prevKey.current && ready) return;
    if (filtered.length === 0) return;

    prevKey.current = key;
    setReady(false);

    let cancelled = false;
    const start = Date.now();

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
