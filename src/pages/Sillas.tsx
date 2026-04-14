import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import { chairCategories } from "@/lib/chairsData";
import { useChairCategoryThumbnails } from "@/hooks/useChairImages";

const Sillas = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sillas – Generación Modular"
        description="Explora nuestra línea completa de sillas: ejecutivas, operativas, visitas, barra, lounge y estadio."
        canonical="/sillas"
      />
      <Header />
      <main className="border-t border-border">
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
            <CategoryRow key={cat.slug} category={cat} />
          ))}
        </section>
      </main>
    </div>
  );
};

function CategoryRow({ category }: { category: typeof chairCategories[number] }) {
  const thumbs = useChairCategoryThumbnails(category);

  return (
    <Link
      to={`/sillas/${category.slug}`}
      className="group bg-background flex flex-col md:flex-row items-stretch"
    >
      {/* Thumbnails */}
      <div className="flex gap-px flex-1 min-h-[200px] md:min-h-[260px]">
        {thumbs.slice(0, 3).map((thumb, i) => (
          <div key={i} className="flex-1 relative overflow-hidden bg-muted">
            {thumb ? (
              <img
                src={thumb}
                alt={`${category.name} ${i + 1}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">
                —
              </div>
            )}
          </div>
        ))}
        {thumbs.length < 3 &&
          Array.from({ length: 3 - thumbs.length }).map((_, i) => (
            <div key={`empty-${i}`} className="flex-1 bg-muted" />
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
}

export default Sillas;
