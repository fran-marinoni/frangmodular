import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import chairHero from "@/assets/home/hero-chair.png";
import heroSlide2 from "@/assets/home/hero-slide2.png";
import heroSlide3 from "@/assets/home/hero-slide3.png";
import heroPreview90s from "@/assets/home/hero-preview-90s.png";
import heroPreviewProyectos from "@/assets/home/hero-preview-proyectos.png";
import heroPreviewProductos from "@/assets/home/hero-preview-productos.png";

type PreviewCard = {
  image: string;
  label: string;
};

const slidePreviewCards: Record<number, { left: PreviewCard; right: PreviewCard }> = {
  0: {
    left: { image: heroPreviewProyectos, label: "Proyectos." },
    right: { image: heroPreview90s, label: "Back to\nthe 90s." },
  },
  1: {
    left: { image: heroPreviewProductos, label: "Productos." },
    right: { image: heroPreviewProyectos, label: "Proyectos." },
  },
  2: {
    left: { image: heroPreview90s, label: "Back to\nthe 90s." },
    right: { image: heroPreviewProductos, label: "Productos." },
  },
};

const HeroSection = () => {
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

  const cards = slidePreviewCards[currentSlide] || slidePreviewCards[0];

  return (
    <section className="relative bg-background overflow-hidden">
      <div className="relative min-h-[480px] md:min-h-[560px] lg:min-h-[640px] xl:min-h-[700px]">

        {/* Left preview card */}
        <div
          onClick={scrollPrev}
          className="hidden lg:flex absolute left-0 top-[28%] z-20 items-stretch border-2 border-foreground cursor-pointer group transition-transform duration-200 hover:-translate-y-1"
        >
          <button className="w-14 bg-primary group-hover:bg-primary/80 text-primary-foreground flex items-center justify-center flex-shrink-0 transition-colors duration-200">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-[100px] h-[100px] xl:w-[120px] xl:h-[120px] overflow-hidden relative border-l-2 border-foreground">
            <img src={cards.left.image} alt={cards.left.label} className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2">
              <span className="bg-primary text-primary-foreground text-[8px] font-bold px-2 py-0.5 tracking-wider uppercase whitespace-pre-line">
                {cards.left.label}
              </span>
            </div>
          </div>
        </div>

        {/* Right preview card */}
        <div
          onClick={scrollNext}
          className="hidden lg:flex absolute right-0 top-[55%] z-20 items-stretch border-2 border-foreground cursor-pointer group transition-transform duration-200 hover:-translate-y-1"
        >
          <div className="w-[180px] h-[90px] xl:w-[210px] xl:h-[100px] overflow-hidden relative border-r-2 border-foreground">
            <img src={cards.right.image} alt={cards.right.label} className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2 bg-foreground/80 text-background text-[7px] font-bold px-1.5 py-0.5 leading-tight whitespace-pre-line">
              {cards.right.label}
            </div>
          </div>
          <button className="w-14 bg-primary group-hover:bg-primary/80 text-primary-foreground flex items-center justify-center flex-shrink-0 transition-colors duration-200">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">

            {/* Slide 1 — Original */}
            <div className="flex-[0_0_100%] min-w-0 relative min-h-[480px] md:min-h-[560px] lg:min-h-[640px] xl:min-h-[700px]">
              <div className="absolute left-[8%] md:left-[12%] lg:left-[200px] xl:left-[240px] top-1/2 -translate-y-1/2 z-10">
                <h1 className="font-display text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] xl:text-[8rem] font-black leading-[0.88] tracking-tighter text-foreground">
                  Office<br />
                  <span className="font-normal italic">but</span> tec.
                </h1>
                <p className="text-sm md:text-base font-bold text-foreground mt-3 tracking-wide">desde 1990.</p>
                <Link
                  to="/productos/apollo"
                  className="mt-5 inline-block bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider"
                >
                  Compra ahora
                </Link>
              </div>
              <div className="absolute right-[5%] md:right-[10%] lg:right-[12%] xl:right-[14%] bottom-0 z-[5]">
                <img
                  src={chairHero}
                  alt="Silla Apollo"
                  className="w-[280px] md:w-[380px] lg:w-[480px] xl:w-[560px] object-contain"
                />
              </div>
            </div>

            {/* Slide 2 — Film */}
            <div className="flex-[0_0_100%] min-w-0 relative min-h-[480px] md:min-h-[560px] lg:min-h-[640px] xl:min-h-[700px] bg-background flex items-end justify-center">
              <div className="relative w-full h-auto">
                <img
                  src={heroSlide2}
                  alt="Film"
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-foreground/30" />
              </div>
              <div className="absolute left-[8%] md:left-[12%] lg:left-[200px] xl:left-[240px] top-1/2 -translate-y-1/2 z-10">
                <h1 className="font-display text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] xl:text-[8rem] font-black leading-[0.88] tracking-tighter text-background">
                  Back to<br />
                  <span className="font-normal italic">the</span> 90s.
                </h1>
                <button className="mt-5 inline-block bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider">
                  Ver Film
                </button>
              </div>
            </div>

            {/* Slide 3 — Proyectos */}
            <div className="flex-[0_0_100%] min-w-0 relative min-h-[480px] md:min-h-[560px] lg:min-h-[640px] xl:min-h-[700px]">
              <img
                src={heroSlide3}
                alt="Proyectos"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/30" />
              <div className="absolute left-[8%] md:left-[12%] lg:left-[200px] xl:left-[240px] top-1/2 -translate-y-1/2 z-10">
                <h1 className="font-display text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] xl:text-[8rem] font-black leading-[0.88] tracking-tighter text-background">
                  Nuestros<br />
                  <span className="font-normal italic">Proyectos.</span>
                </h1>
                <Link
                  to="/proyectos"
                  className="mt-5 inline-block bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider"
                >
                  Ver Proyectos
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
