import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import { getCategoryBySlug } from "@/lib/chairsData";
import { useChairMainImage } from "@/hooks/useChairImages";
import NotFound from "@/pages/NotFound";
import { ArrowRight } from "lucide-react";

const SillasCategoria = () => {
  const { category } = useParams();
  const cat = category ? getCategoryBySlug(category) : undefined;

  if (!cat) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${cat.name} – Sillas | Generación Modular`}
        description={`Sillas ${cat.name.toLowerCase()} de Generación Modular. ${cat.chairs.length} modelos disponibles.`}
        canonical={`/sillas/${cat.slug}`}
      />
      <Header />
      <main className="border-t border-border">
        {/* Hero */}
        <section className="px-6 md:px-8 py-12 md:py-20">
          <Link to="/sillas" className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block">
            ← Sillas
          </Link>
          <h1 className="font-display text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-black tracking-tight leading-none text-foreground">
            {cat.name}.
          </h1>
        </section>

        {/* Grid */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border border-t border-border">
          {cat.chairs.map((chair) => (
            <ChairCard key={chair.slug} chair={chair} categorySlug={cat.slug} />
          ))}
        </section>
      </main>
    </div>
  );
};

function ChairCard({ chair, categorySlug }: { chair: { name: string; slug: string; assetFolder: string }; categorySlug: string }) {
  const mainImage = useChairMainImage(chair.assetFolder);

  return (
    <Link
      to={`/sillas/${categorySlug}/${chair.slug}`}
      className="group bg-background flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {mainImage ? (
          <img
            src={mainImage}
            alt={chair.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">
            {chair.name}
          </div>
        )}
      </div>
      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-foreground">{chair.name}</h3>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  );
}

export default SillasCategoria;
