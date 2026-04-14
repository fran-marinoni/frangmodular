import { useState, useEffect } from "react";
import { getChairImagePaths, resolveChairImage, ChairCategory } from "@/lib/chairsData";

/**
 * Resolves the first main image for a chair (for grid/card thumbnails).
 */
export function useChairMainImage(assetFolder: string): string {
  const [src, setSrc] = useState("");

  useEffect(() => {
    let cancelled = false;
    const paths = getChairImagePaths(assetFolder);
    const first = paths.main[0];
    if (!first) return;

    resolveChairImage(first).then((url) => {
      if (!cancelled) setSrc(url);
    });
    return () => { cancelled = true; };
  }, [assetFolder]);

  return src;
}

/**
 * Resolves one thumbnail per category (first chair's first image) for the category listing.
 */
export function useChairCategoryThumbnails(category: ChairCategory): string[] {
  const [thumbs, setThumbs] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    const chairs = category.chairs.slice(0, 3);

    Promise.all(
      chairs.map((chair) => {
        const paths = getChairImagePaths(chair.assetFolder);
        const first = paths.main[0];
        return first ? resolveChairImage(first) : Promise.resolve("");
      })
    ).then((urls) => {
      if (!cancelled) setThumbs(urls);
    });

    return () => { cancelled = true; };
  }, [category.slug]);

  return thumbs;
}
