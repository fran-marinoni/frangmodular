import { useParams, Link } from "react-router-dom";
import { useState, useMemo, useEffect, memo } from "react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import SectionLoader from "@/components/SectionLoader";
import { getCategoryBySlug, getProductsForCategory, getPreferredVariant, getVariantImagePaths, resolveChairImage, ChairProduct } from "@/lib/chairsData";
import { useCriticalImagePreloader } from "@/hooks/useImagePreloader";
import NotFound from "@/pages/NotFound";

const categoryNumber: Record<string, string> = {
  ejecutivas: "01",
  operativas: "02",
  visitas: "03",
  barra: "04",
  lounge: "05",
  estadio: "06",
};

const SillasCategoria = () => {
  const { param } = useParams();
  const cat = param ? getCategoryBySlug(param) : undefined;
  const [selected, setSelected] = useState<string | null>(null);

  const products = useMemo(() => (cat ? getProductsForCategory(cat.slug) : []), [cat?.slug]);

  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const [resolving, setResolving] = useState(true);

  useEffect(() => {
    if (!cat || products.length === 0) { setResolving(false); return; }
    let cancelled = false;
    setResolving(true);

    const entries = products.map((product) => {
      const preferredId = getPreferredVariant(product, cat.slug);
      const variant = product.variants.find((v) => v.id === preferredId) || product.variants[0];
      const paths = getVariantImagePaths(variant.assetFolder);
      const first = paths.gallery[0];
      return { slug: product.slug, path: first };
    });

    Promise.all(
      entries.map(async ({ slug, path }) => {
        if (!path) return [slug, ""] as const;
        const url = await resolveChairImage(path);
        return [slug, url] as const;
      })
    ).then((results) => {
      if (!cancelled) {
        setThumbnails(Object.fromEntries(results));
        setResolving(false);
      }
    });

    return () => { cancelled = true; };
  }, [cat?.slug, products.length]);

  // Only preload first 6 thumbnails (above-fold in 3-col grid)
  const thumbUrls = useMemo(() => Object.values(thumbnails).filter(Boolean), [thumbnails]);
  const imagesReady = useCriticalImagePreloader(thumbUrls, 6, 300);

  if (!cat) return <NotFound />;

  const num = categoryNumber[cat.slug] || "01";
  const showLoader = resolving || !imagesReady;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${cat.name} – Sillas | Generación Modular`}
        description={`Sillas ${cat.name.toLowerCase()} de Generación Modular. ${products.length} modelos disponibles.`}
        canonical={`/sillas/${cat.slug}`}
      />
      <Header />

      {showLoader && <SectionLoader label="Cargando categoría" />}

      <main style={{ visibility: showLoader ? "hidden" : "visible" }}>
        {/* Hero section */}
        <section className="px-6 md:px-8 pt-10 pb-8 md:pt-16 md:pb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="font-display text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-black italic tracking-tight leading-none text-foreground">
              {cat.name}.
            </h1>
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-10">
            <p className="text-xs leading-relaxed text-muted-foreground max-w-xs">
              En Generación Modular damos vida a tus proyectos a través de un asesoramiento integral en cuanto a planificación, diseño y fabricación de mobiliario.
            </p>
            <div className="text-right whitespace-nowrap">
              <span className="text-xs font-bold text-foreground">{num}</span>
              <span className="text-xs text-muted-foreground ml-1">Sillas.</span>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="grid grid-cols-2 md:grid-cols-3 border-t border-border">
          {products.map((product, i) => (
            <ChairCard
              key={product.slug}
              product={product}
              categorySlug={cat.slug}
              thumbnailUrl={thumbnails[product.slug] || ""}
              isSelected={selected === product.slug}
              onSelect={() => setSelected(selected === product.slug ? null : product.slug)}
              lazy={i >= 6}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

const ChairCard = memo(function ChairCard({
  product,
  categorySlug,
  thumbnailUrl,
  isSelected,
  onSelect,
  lazy,
}: {
  product: ChairProduct;
  categorySlug: string;
  thumbnailUrl: string;
  isSelected: boolean;
  onSelect: () => void;
  lazy: boolean;
}) {
  const preferredVariantId = getPreferredVariant(product, categorySlug);

  return (
    <Link
      to={`/sillas/${product.slug}?variant=${preferredVariantId}`}
      className="group bg-background flex flex-col border-b border-r border-border"
      onMouseEnter={onSelect}
    >
      {/* Chair name */}
      <div className="px-4 pt-4 pb-2">
        <h3 className="font-display text-lg md:text-xl font-black text-foreground leading-tight">
          {product.name}.
        </h3>
      </div>

      {/* Image */}
      <div
        className={`relative aspect-[4/5] overflow-hidden mx-4 mb-4 transition-all duration-200 ${
          isSelected ? "ring-2 ring-primary" : ""
        }`}
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={product.name}
            loading={lazy ? "lazy" : undefined}
            className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs bg-muted">
            {product.name}
          </div>
        )}
      </div>
    </Link>
  );
});

export default SillasCategoria;
