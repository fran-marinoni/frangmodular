import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useMemo, memo } from "react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import SectionLoader from "@/components/SectionLoader";
import { chairCategories, getProductBySlug, getVariantImagePaths, resolveChairImage, ChairCategory } from "@/lib/chairsData";
import { useImagePreloader } from "@/hooks/useImagePreloader";

const Sillas = () => {
  const [thumbnails, setThumbnails] = useState<Record<string, string[]>>({});
  const [resolving, setResolving] = useState(true);

  // Resolve first 3 chair thumbnails per category
  useEffect(() => {
    let cancelled = false;
    const work = chairCategories.map(async (cat) => {
      const slugs = cat.chairs.slice(0, 3);
      const urls = await Promise.all(
        slugs.map(async (slug) => {
          const product = getProductBySlug(slug);
          if (!product) return "";
          const paths = getVariantImagePaths(product.variants[0].assetFolder);
          const first = paths.gallery[0];
          return first ? resolveChairImage(first) : "";
        })
      );
      return [cat.slug, urls] as const;
    });

    Promise.all(work).then((entries) => {
      if (!cancelled) {
        setThumbnails(Object.fromEntries(entries));
        setResolving(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const allUrls = useMemo(
    () => Object.values(thumbnails).flat().filter(Boolean),
    [thumbnails]
  );
  const imagesReady = useImagePreloader(allUrls, 300);
  const showLoader = resolving || !imagesReady;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sillas – Generación Modular"
        description="Explora nuestra línea completa de sillas: ejecutivas, operativas, visitas, barra, lounge y estadio."
        canonical="/sillas"
      />
      <Header />

      {showLoader && <SectionLoader label="Cargando sillas" />}

      <main className="border-t border-border" style={{ visibility: showLoader ? "hidden" : "visible" }}>
        {/* Hero */}
        <section className="px-6 md:px-8 py-16 md:py-24">
          <h1 className="font-display text-[3rem] md:text-[4.5rem] lg:text-[6rem] font-black tracking-tight leading-none text-foreground">
            Sillas.
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mt-4 max-w-lg">
            Diseño, ergonomía y calidad en cada modelo. Encuentra la silla perfecta para cada espacio.
          </p>
        </section>

        {/* Categories grid */}
        <section className="flex flex-col gap-px bg-border">
          {chairCategories.map((cat) => (
            <CategoryRow key={cat.slug} category={cat} thumbs={thumbnails[cat.slug] || []} />
          ))}
        </section>
      </main>
    </div>
  );
};

const CategoryRow = memo(function CategoryRow({
  category,
  thumbs,
}: {
  category: ChairCategory;
  thumbs: string[];
}) {
  return (
    <Link
      to={`/sillas/${category.slug}`}
      className="group bg-background flex flex-col md:flex-row items-stretch"
    >
      {/* Thumbnails */}
      <div className="flex gap-px flex-1 min-h-[200px] md:min-h-[260px]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 relative overflow-hidden bg-muted">
            {thumbs[i] ? (
              <img
                src={thumbs[i]}
                alt={`${category.name} ${i + 1}`}
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">
                —
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Label */}
      <div className="md:w-72 lg:w-80 px-6 py-6 md:py-0 flex flex-col justify-center border-t md:border-t-0 md:border-l border-border">
        <h2 className="font-display text-2xl md:text-3xl font-black text-foreground leading-tight">
          {category.name}.
        </h2>
        <p className="text-muted-foreground text-xs mt-1">
          {category.chairs.length} {category.chairs.length === 1 ? "modelo" : "modelos"}
        </p>
        <div className="flex items-center gap-1.5 mt-3">
          <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
            Ver modelos
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  );
});

export default Sillas;
