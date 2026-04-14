import { useState, useEffect, useMemo } from "react";
import { getVariantImagePaths, resolveChairImage } from "@/lib/chairsData";

interface ResolvedVariantImages {
  gallery: string[];
  ambientadas: string[];
  colores: string[];
  /** Only the critical above-fold URLs (first gallery image) */
  criticalUrls: string[];
  /** All resolved URLs */
  allUrls: string[];
  loading: boolean;
}

/**
 * Resolves all image categories for a single chair variant's asset folder.
 * Now resolves in two phases: critical (first image) then rest.
 */
export function useResolvedChairImages(assetFolder: string): ResolvedVariantImages {
  const imagePaths = useMemo(() => getVariantImagePaths(assetFolder), [assetFolder]);

  const galleryPaths = useMemo(() => imagePaths.gallery.slice(0, 6), [imagePaths.gallery]);
  const ambientadaPaths = useMemo(() => imagePaths.ambientadas.slice(0, 3), [imagePaths.ambientadas]);
  const coloresPaths = imagePaths.colores;

  const [gallery, setGallery] = useState<string[]>([]);
  const [ambientadas, setAmbientadas] = useState<string[]>([]);
  const [colores, setColores] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const galleryKey = useMemo(() => galleryPaths.join("|"), [galleryPaths]);
  const ambientadaKey = useMemo(() => ambientadaPaths.join("|"), [ambientadaPaths]);
  const coloresKey = useMemo(() => coloresPaths.join("|"), [coloresPaths]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const resolveAll = async () => {
      // Phase 1: resolve critical gallery images first (above-fold)
      const firstGallery = galleryPaths.slice(0, 1);
      const firstResolved = await Promise.all(firstGallery.map(p => resolveChairImage(p)));
      
      if (!cancelled && firstResolved.length > 0) {
        // Set partial gallery immediately so above-fold renders fast
        setGallery(firstResolved.filter(Boolean));
        setLoading(false);
      }

      // Phase 2: resolve remaining in parallel
      const [restGallery, a, c] = await Promise.all([
        Promise.all(galleryPaths.slice(1).map(p => resolveChairImage(p))),
        Promise.all(ambientadaPaths.map(p => resolveChairImage(p))),
        Promise.all(coloresPaths.map(p => resolveChairImage(p))),
      ]);

      if (!cancelled) {
        setGallery([...firstResolved, ...restGallery].filter(Boolean));
        setAmbientadas(a.filter(Boolean));
        setColores(c.filter(Boolean));
        setLoading(false);
      }
    };

    resolveAll();
    return () => { cancelled = true; };
  }, [galleryKey, ambientadaKey, coloresKey]);

  const criticalUrls = useMemo(
    () => gallery.slice(0, 1).filter(Boolean),
    [gallery]
  );

  const allUrls = useMemo(
    () => [...gallery, ...ambientadas, ...colores].filter(Boolean),
    [gallery, ambientadas, colores]
  );

  return { gallery, ambientadas, colores, criticalUrls, allUrls, loading };
}
