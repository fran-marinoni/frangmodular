import { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import FooterSection from "@/components/home/FooterSection";
import { getCategoryBySlug } from "@/lib/projectsData";
import { useResolvedImages } from "@/hooks/useResolvedImage";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import NotFound from "@/pages/NotFound";

const SectionLoader = () => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background gap-6">
    <h2 className="font-display text-[2rem] md:text-[2.5rem] font-black tracking-tighter text-foreground leading-none">
      Generación<br />
      <span className="font-normal italic">Modular.</span>
    </h2>
    <div className="w-48 md:w-64 h-[3px] bg-muted rounded-full overflow-hidden">
      <div className="h-full bg-primary rounded-full animate-loading-grow" />
    </div>
    <p className="text-muted-foreground text-xs tracking-widest uppercase">Cargando proyectos</p>
  </div>
);

const ProyectoCategoria = () => {
  const { category, year } = useParams();
  const navigate = useNavigate();
  const data = category ? getCategoryBySlug(category) : undefined;

  const items = (data && year) ? (data.projects[year] || []) : [];
  const imagePaths = items.map((item) => item.image);
  const resolvedImages = useResolvedImages(imagePaths);

  // Collect resolved URLs for preloading
  const resolvedUrls = useMemo(
    () => imagePaths.map((p) => resolvedImages[p]).filter(Boolean),
    [resolvedImages, imagePaths.length]
  );

  const imagesReady = useImagePreloader(resolvedUrls, 1200);

  if (!data || !year || !data.years.includes(year)) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`Proyectos ${data.title.replace('.', '')} ${year}`}
        description={`Proyectos de mobiliario ${data.title.replace('.', '').toLowerCase()} realizados por Generación Modular en ${year}. Diseño y fabricación de mobiliario modular en Ecuador.`}
        canonical={`/proyectos/${category}/${year}`}
      />
      <Header />
      <main>
        <section className="px-6 md:px-8 pt-8 md:pt-12 pb-6">
          <div className="flex items-end justify-between">
            <h1 className="font-display text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-black leading-none text-foreground">
              {data.title}
            </h1>
            <span className="font-display text-[2rem] md:text-[3rem] lg:text-[4rem] font-black leading-none text-primary">
              {year}
            </span>
          </div>
        </section>

        <section className="px-0">
          {items.length === 0 ? (
            <div className="px-6 md:px-8 py-20 text-center">
              <p className="text-muted-foreground text-sm">No hay proyectos para este año.</p>
            </div>
          ) : !imagesReady ? (
            <SectionLoader />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3">
              {items.map((item, i) => (
                <Link key={i} to={`/proyecto/${item.slug}`} className="relative group overflow-hidden block">
                  <div className="aspect-square overflow-hidden bg-muted">
                    {resolvedImages[item.image] && (
                      <img
                        src={resolvedImages[item.image]}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 md:p-6">
                    <h3 className="font-display text-sm md:text-lg lg:text-xl font-black text-white leading-tight whitespace-pre-line mb-2 md:mb-3">
                      {item.name}
                    </h3>
                    <span className="self-start bg-primary text-primary-foreground text-[9px] md:text-[10px] font-bold px-4 py-1.5 border-2 border-primary rounded-[8px] tracking-wider hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200">
                      Ver proyecto
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="px-6 md:px-8 py-8 flex flex-wrap gap-2 justify-center">
          {data.years.map((y) => (
            <button
              key={y}
              onClick={() => navigate(`/proyectos/${category}/${y}`)}
              className={`text-[10px] font-bold px-4 py-1.5 border-2 rounded-[8px] tracking-wider transition-all duration-200 hover:-translate-y-1 ${
                y === year
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-foreground bg-primary text-primary-foreground hover:bg-primary/80"
              }`}
            >
              {y}
            </button>
          ))}
        </section>

        <FooterSection />
      </main>
    </div>
  );
};

export default ProyectoCategoria;
