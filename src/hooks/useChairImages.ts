import { useState, useEffect } from "react";
import { getVariantImagePaths, resolveChairImage, ChairCategory, ChairProduct, getProductBySlug } from "@/lib/chairsData";

/**
 * Resolves the first gallery image for a product (for grid/card thumbnails).
 */
export function useChairMainImage(assetFolder: string): string {
  const [src, setSrc] = useState("");

  useEffect(() => {
    let cancelled = false;
    const paths = getVariantImagePaths(assetFolder);
    const first = paths.gallery[0];
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
    const chairSlugs = category.chairs.slice(0, 3);

    Promise.all(
      chairSlugs.map((slug) => {
        const product = getProductBySlug(slug);
        if (!product) return Promise.resolve("");
        const folder = product.variants[0].assetFolder;
        const paths = getVariantImagePaths(folder);
        const first = paths.gallery[0];
        return first ? resolveChairImage(first) : Promise.resolve("");
      })
    ).then((urls) => {
      if (!cancelled) setThumbs(urls);
    });

    return () => { cancelled = true; };
  }, [category.slug]);

  return thumbs;
}
