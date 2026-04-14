import { useState, useEffect, useMemo } from "react";
import { getVariantImagePaths, resolveChairImage } from "@/lib/chairsData";

interface ResolvedVariantImages {
  gallery: string[];
  ambientadas: string[];
  colores: string[];
  allUrls: string[];
  loading: boolean;
}

/**
 * Resolves all image categories for a single chair variant's asset folder.
 * Returns stable arrays — only re-resolves when assetFolder changes.
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

  // Stable dependency keys
  const galleryKey = useMemo(() => galleryPaths.join("|"), [galleryPaths]);
  const ambientadaKey = useMemo(() => ambientadaPaths.join("|"), [ambientadaPaths]);
  const coloresKey = useMemo(() => coloresPaths.join("|"), [coloresPaths]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const resolveAll = async () => {
      const [g, a, c] = await Promise.all([
        Promise.all(galleryPaths.map((p) => resolveChairImage(p))),
        Promise.all(ambientadaPaths.map((p) => resolveChairImage(p))),
        Promise.all(coloresPaths.map((p) => resolveChairImage(p))),
      ]);

      if (!cancelled) {
        setGallery(g.filter(Boolean));
        setAmbientadas(a.filter(Boolean));
        setColores(c.filter(Boolean));
        setLoading(false);
      }
    };

    resolveAll();
    return () => { cancelled = true; };
  }, [galleryKey, ambientadaKey, coloresKey]);

  const allUrls = useMemo(
    () => [...gallery, ...ambientadas, ...colores].filter(Boolean),
    [gallery, ambientadas, colores]
  );

  return { gallery, ambientadas, colores, allUrls, loading };
}
