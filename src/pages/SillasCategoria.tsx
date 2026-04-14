import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import { getCategoryBySlug, chairCategories } from "@/lib/chairsData";
import { useChairMainImage } from "@/hooks/useChairImages";
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
  const { category } = useParams();
  const cat = category ? getCategoryBySlug(category) : undefined;
  const [selected, setSelected] = useState<string | null>(null);

  if (!cat) return <NotFound />;

  const num = categoryNumber[cat.slug] || "01";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${cat.name} – Sillas | Generación Modular`}
        description={`Sillas ${cat.name.toLowerCase()} de Generación Modular. ${cat.chairs.length} modelos disponibles.`}
        canonical={`/sillas/${cat.slug}`}
      />
      <Header />
      <main>
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
          {cat.chairs.map((chair) => (
            <ChairCard
              key={chair.slug}
              chair={chair}
              categorySlug={cat.slug}
              isSelected={selected === chair.slug}
              onSelect={() => setSelected(selected === chair.slug ? null : chair.slug)}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

function ChairCard({
  chair,
  categorySlug,
  isSelected,
  onSelect,
}: {
  chair: { name: string; slug: string; assetFolder: string };
  categorySlug: string;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const mainImage = useChairMainImage(chair.assetFolder);

  return (
    <Link
      to={`/sillas/${categorySlug}/${chair.slug}`}
      className="group bg-background flex flex-col border-b border-r border-border"
      onMouseEnter={onSelect}
    >
      {/* Chair name */}
      <div className="px-4 pt-4 pb-2">
        <h3 className="font-display text-lg md:text-xl font-black text-foreground leading-tight">
          {chair.name}.
        </h3>
      </div>

      {/* Image */}
      <div
        className={`relative aspect-[4/5] overflow-hidden mx-4 mb-4 transition-all duration-200 ${
          isSelected ? "ring-2 ring-primary" : ""
        }`}
      >
        {mainImage ? (
          <img
            src={mainImage}
            alt={chair.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs bg-muted">
            {chair.name}
          </div>
        )}
      </div>
    </Link>
  );
}

export default SillasCategoria;
