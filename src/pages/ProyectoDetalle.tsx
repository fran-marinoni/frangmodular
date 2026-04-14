import { useState, useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import FooterSection from "@/components/home/FooterSection";
import { getProjectBySlug, getProjectImagePaths, resolveImage } from "@/lib/projectsData";
import NotFound from "@/pages/NotFound";

const useResolvedImages = (paths: string[]) => {
  const [resolved, setResolved] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    if (paths.length === 0) return;
    Promise.all(
      paths.map(async (p) => {
        const src = await resolveImage(p);
        return [p, src] as const;
      })
    ).then((entries) => {
      if (!cancelled) setResolved(Object.fromEntries(entries));
    });
    return () => { cancelled = true; };
  }, [paths.join("|")]);

  return resolved;
};

const ProyectoDetalle = () => {
  const { projectSlug } = useParams();
  const project = projectSlug ? getProjectBySlug(projectSlug) : undefined;

  const allImagePaths = project ? getProjectImagePaths(project.imageFolder) : [];
  const fixedPaths = allImagePaths.slice(0, 2);
  const carouselPaths = allImagePaths.length > 2 ? allImagePaths.slice(2) : allImagePaths;

  const resolvedImages = useResolvedImages(allImagePaths);

  const resolvedUrls = useMemo(
    () => allImagePaths.map((p) => resolvedImages[p]).filter(Boolean),
    [resolvedImages, allImagePaths.length]
  );

  // Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  if (!project) return <NotFound />;

  const displayName = project.name.replace(/\.$/, '');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={`${displayName} – Proyecto ${project.year}`}
        description={`Proyecto ${displayName} realizado por Generación Modular en ${project.year}. Cliente: ${project.client}. Diseño y fabricación de mobiliario modular.`}
        canonical={`/proyecto/${project.slug}`}
      />
      <Header />

      <main>
        {/* Title + Metadata */}
        <section className="border-t border-border">
          <div className="px-6 md:px-8 pt-8 md:pt-12 pb-6 md:pb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <h1 className="font-display text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-black leading-none text-foreground tracking-tight">
              {displayName.toUpperCase()}.
            </h1>
            <div className="text-right text-sm space-y-1 shrink-0">
              <p>
                <span className="text-primary font-bold italic">Año: </span>
                <span className="font-medium">{project.year}</span>
              </p>
              <p>
                <span className="text-primary font-bold italic">Cliente: </span>
                <span className="font-medium">{project.client}</span>
              </p>
              <p>
                <span className="text-primary font-bold italic">Diseñador: </span>
                <span className="font-medium">{project.designer}</span>
              </p>
              <p>
                <span className="text-primary font-bold italic">Fabricante: </span>
                <span className="font-medium">{project.manufacturer}</span>
              </p>
            </div>
          </div>
        </section>

        {resolvedUrls.length > 0 && (
          <>
            {/* Two Fixed Images */}
            <section className="border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
                {fixedPaths.map((path, i) => (
                  <div key={i} className="overflow-hidden bg-background">
                    <img
                      src={resolvedImages[path] || "/placeholder.svg"}
                      alt={`${displayName} - Vista ${i + 1}`}
                      className="w-full h-[300px] md:h-[450px] lg:h-[520px] object-cover"
                    />
                  </div>
                ))}
                {fixedPaths.length === 1 && (
                  <div className="overflow-hidden bg-background">
                    <img
                      src={resolvedImages[fixedPaths[0]] || "/placeholder.svg"}
                      alt={`${displayName} - Vista 2`}
                      className="w-full h-[300px] md:h-[450px] lg:h-[520px] object-cover object-[70%_center]"
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Carousel + Text */}
            {carouselPaths.length > 0 && (
              <section className="border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
                  <div className="bg-background relative">
                    <div ref={emblaRef} className="overflow-hidden">
                      <div className="flex">
                        {carouselPaths.map((path, i) => (
                          <div key={i} className="flex-[0_0_100%] min-w-0">
                            <img
                              src={resolvedImages[path] || "/placeholder.svg"}
                              alt={`${displayName} - Slide ${i + 1}`}
                              className="w-full h-[350px] md:h-[450px] lg:h-[520px] object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <button
                        onClick={scrollPrev}
                        className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={scrollNext}
                        className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 transition-colors"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-background p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    {project.description?.map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-sm md:text-base leading-relaxed text-foreground/80 mb-6 last:mb-0 text-center"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* CTA Bar */}
        <section className="bg-primary text-primary-foreground">
          <div className="px-6 md:px-8 py-5 md:py-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <h3 className="font-display text-xl md:text-2xl font-black">
              Cotiza tu proyecto
            </h3>
            <span className="font-bold text-lg md:text-xl tracking-wide">098-747-8458</span>
            <a
              href="https://wa.me/5939877490249"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-foreground text-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-primary-foreground hover:opacity-90 hover:-translate-y-1 transition-all duration-200 tracking-wider"
            >
              Whatsapp
            </a>
          </div>
        </section>

        <FooterSection />
      </main>
    </div>
  );
};

export default ProyectoDetalle;
