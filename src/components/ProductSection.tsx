import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import chairFeatures from "@/assets/chair-features.png";
import chairFeature1 from "@/assets/chair-feature-1.png";
import chairFeature2 from "@/assets/chair-feature-2.png";
import chairFeature3 from "@/assets/chair-feature-3.png";
import chairFeature4 from "@/assets/chair-feature-4.png";
import chairThumb1 from "@/assets/chair-apollo-thumb1.jpg";
import chairThumb2 from "@/assets/chair-apollo-thumb2.jpg";
import chairThumb3 from "@/assets/chair-apollo-thumb3.jpg";

const thumbnails = [chairThumb1, chairThumb2, chairThumb3];
const categories = ["VISITA", "EJECUTIVA", "OPERATIVA"];
const SCROLL_HEIGHT_VH = 200;

const featureImages = [chairFeature1, chairFeature2, chairFeature3, chairFeature4];
const featureItems = [
  { num: "1", label: "Cabecero." },
  { num: "2", label: "Apoya brazos fijos." },
  { num: "3", label: "Mecanismo Knee Tilt." },
  { num: "4", label: "Base de aluminio negro." },
];

const ProductSection = () => {
  const [activeCategory, setActiveCategory] = useState("EJECUTIVA");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafRef = useRef<number>(0);

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const smoothScrub = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || !isFinite(video.duration)) {
      rafRef.current = requestAnimationFrame(smoothScrub);
      return;
    }
    const diff = targetTimeRef.current - currentTimeRef.current;
    if (Math.abs(diff) > 0.005) {
      currentTimeRef.current += diff * 0.1;
      video.currentTime = currentTimeRef.current;
    }
    rafRef.current = requestAnimationFrame(smoothScrub);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let metadataReady = false;

    const handleScroll = () => {
      if (!metadataReady) return;
      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
      targetTimeRef.current = progress * video.duration;
    };

    const onReady = () => {
      if (metadataReady) return;
      if (video.readyState >= 1 && isFinite(video.duration) && video.duration > 0) {
        metadataReady = true;
        video.pause();
        video.currentTime = 0;
        currentTimeRef.current = 0;
        targetTimeRef.current = 0;
        handleScroll();
      }
    };

    // Try immediately, then listen for multiple readiness events (mobile compat)
    onReady();
    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);

    // Force load on mobile (some browsers defer without explicit call)
    try { video.load(); } catch (_) { /* ignore */ }

    rafRef.current = requestAnimationFrame(smoothScrub);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Also listen to touchmove for more responsive mobile scrubbing
    window.addEventListener("touchmove", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      cancelAnimationFrame(rafRef.current);
    };
  }, [smoothScrub]);

  const renderDetailsContent = () => (
    <>
      {/* Descripción */}
      <div className="px-6 py-6 border-b border-border">
        <p className="text-xs leading-relaxed text-muted-foreground max-w-md">
          Diseñada para impresionar y brindar el máximo confort, esta silla ejecutiva combina
          elegancia con funcionalidad. Su tapizado en piel, respaldo alto con cabecera y base de
          aluminio la convierten en la opción ideal para espacios ejecutivos donde el estilo y el
          bienestar van de la mano. Así es Delphi.
        </p>
      </div>

      {/* Características */}
      <div className="px-6 py-6 border-b border-border">
        <h3 className="font-extrabold text-base mb-4 text-foreground">Características:</h3>
        <div
          className="flex gap-6 items-start"
          onMouseLeave={() => setActiveFeature(null)}
        >
          <div className="relative w-40 h-40 flex-shrink-0">
            {/* Default image */}
            <img
              src={chairFeatures}
              alt="Diagrama de características"
              width={180}
              height={180}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${activeFeature === null ? "opacity-100" : "opacity-0"}`}
            />
            {/* Feature images */}
            {featureImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Característica ${i + 1}`}
                width={180}
                height={180}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${activeFeature === i ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <ul className="text-xs w-full">
            {featureItems.map((item, i) => (
              <li
                key={i}
                onMouseEnter={() => setActiveFeature(i)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setActiveFeature(activeFeature === i ? null : i);
                }}
                className={`cursor-pointer transition-colors duration-200 select-none py-3 px-3 -mx-2 rounded min-h-[44px] flex items-center ${activeFeature === i ? "text-primary font-bold bg-primary/5" : ""}`}
              >
                <span className="text-primary font-bold mr-1">{item.num}.</span> {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Colores disponibles */}
      <div className="px-6 py-6 border-b border-border">
        <h3 className="font-extrabold text-base mb-3 text-foreground">Colores disponibles:</h3>
        <div className="flex gap-3">
          <div className="w-16 h-12 rounded-sm" style={{ backgroundColor: "#B5ADBA" }} />
          <div className="w-16 h-12 rounded-sm" style={{ backgroundColor: "#1E1E1E" }} />
          <div className="w-16 h-12 rounded-sm" style={{ backgroundColor: "#E9E9E9" }} />
        </div>
      </div>

      {/* Accordion sections */}
      <div className="flex flex-col">
        {["Garantía", "Certificados", "Catálogo"].map((item) => (
          <div key={item} className={`${item !== "Catálogo" ? "border-b border-border" : ""}`}>
            <button
              onClick={() => toggleAccordion(item)}
              className="w-full flex items-center justify-between px-6 py-3"
            >
              <span className="font-extrabold text-sm text-foreground">{item}</span>
              <ChevronDown
                className={`w-5 h-5 text-primary transition-transform ${
                  openAccordion === item ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAccordion === item && (
              <div className="px-6 pb-3 text-xs text-muted-foreground">
                Información sobre {item.toLowerCase()} del producto Apollo.
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Scroll container — works on ALL devices */}
      <div
        ref={scrollContainerRef}
        style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
        className="relative"
      >
        <section className="sticky top-0 h-screen">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 w-full h-full">
            {/* Left Column — always visible */}
            <div className="px-4 md:px-6 py-3 md:py-4 md:border-r border-border flex flex-col justify-center min-h-0 h-full">
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none mb-2 md:mb-3 font-black tracking-tight text-center">
                Apollo.
              </h1>

              <div className="flex mt-4 md:mt-6 mb-2 md:mb-3 justify-between w-full max-w-xs mx-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs tracking-wider font-medium pb-1 transition-all border-b-2 ${
                      activeCategory === cat
                        ? "border-primary font-bold text-foreground"
                        : "border-transparent text-muted-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative flex items-center justify-center flex-1 min-h-0" style={{ minHeight: '200px' }}>
                <video
                  ref={videoRef}
                  src="/videos/chair-apollo.mp4"
                  muted
                  playsInline
                  preload="metadata"
                  poster="/videos/chair-apollo-poster.jpg"
                  className="w-full max-w-xs md:max-w-2xl mx-auto max-h-[45vh] md:max-h-[60vh] object-contain"
                  style={{ pointerEvents: "none", WebkitTransform: "translateZ(0)" }}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-1 md:mt-2 justify-center">
                {thumbnails.map((thumb, i) => (
                  <div key={i} className="w-11 h-11 md:w-14 md:h-14 border border-border overflow-hidden">
                    <img
                      src={thumb}
                      alt={`Vista ${i + 1}`}
                      loading="lazy"
                      width={64}
                      height={64}
                      className={`w-full h-full object-cover ${i < 2 ? "object-[center_82%]" : ""}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column — desktop only inside sticky */}
            <div className="hidden md:flex flex-col overflow-y-auto">
              {renderDetailsContent()}
            </div>
          </div>
        </section>
      </div>

      {/* Mobile: details content flows AFTER the scroll container */}
      <div className="md:hidden border-t border-border">
        {renderDetailsContent()}
      </div>
    </>
  );
};

export default ProductSection;
