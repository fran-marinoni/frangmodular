import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Header from "@/components/Header";
import FooterSection from "@/components/home/FooterSection";
import { getProjectBySlug } from "@/lib/projectsData";
import { useResolvedImage } from "@/hooks/useResolvedImage";
import NotFound from "@/pages/NotFound";

const ProjectImage = ({ imagePath, alt, className }: { imagePath: string; alt: string; className?: string }) => {
  const src = useResolvedImage(imagePath);
  return <img src={src} alt={alt} loading="lazy" className={className} />;
};

const ProyectoDetalle = () => {
  const { projectSlug } = useParams();
  const project = projectSlug ? getProjectBySlug(projectSlug) : undefined;

  // Carousel for bottom images — reuse the same project image with different crops/views
  // Since we have 1 image per project, we simulate multiple views
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

  // We use the same image for the carousel slides with different object-position
  const carouselPositions = ["object-center", "object-left", "object-right"];

  return (
    <div className="min-h-screen bg-background text-foreground">
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

        {/* Two Fixed Images */}
        <section className="border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            <div className="overflow-hidden bg-background">
              <ProjectImage
                imagePath={project.image}
                alt={`${displayName} - Vista 1`}
                className="w-full h-[300px] md:h-[450px] lg:h-[520px] object-cover"
              />
            </div>
            <div className="overflow-hidden bg-background">
              <ProjectImage
                imagePath={project.image}
                alt={`${displayName} - Vista 2`}
                className="w-full h-[300px] md:h-[450px] lg:h-[520px] object-cover object-[70%_center]"
              />
            </div>
          </div>
        </section>

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

        {/* Carousel + Text */}
        <section className="border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {/* Left: Carousel */}
            <div className="bg-background relative">
              <div ref={emblaRef} className="overflow-hidden">
                <div className="flex">
                  {carouselPositions.map((pos, i) => (
                    <div key={i} className="flex-[0_0_100%] min-w-0">
                      <ProjectImage
                        imagePath={project.image}
                        alt={`${displayName} - Slide ${i + 1}`}
                        className={`w-full h-[350px] md:h-[450px] lg:h-[520px] object-cover ${pos}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Controls */}
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

            {/* Right: Description */}
            <div className="bg-background p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              {project.description?.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm md:text-base leading-relaxed text-foreground/80 mb-6 last:mb-0 text-center md:text-center"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <FooterSection />
      </main>
    </div>
  );
};

export default ProyectoDetalle;
