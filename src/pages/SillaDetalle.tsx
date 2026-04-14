import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import RelatedProducts from "@/components/RelatedProducts";
import { getChairBySlugs, getChairImagePaths, resolveChairImage } from "@/lib/chairsData";
import NotFound from "@/pages/NotFound";

// Reuse the same feature assets as Apollo
import chairFeatures from "@/assets/chair-features.webp";
import chairFeature1 from "@/assets/chair-feature-1.webp";
import chairFeature2 from "@/assets/chair-feature-2.webp";
import chairFeature3 from "@/assets/chair-feature-3.webp";
import chairFeature4 from "@/assets/chair-feature-4.webp";

const featureImages = [chairFeature1, chairFeature2, chairFeature3, chairFeature4];
const featureItems = [
  { num: "1", label: "Cabecero." },
  { num: "2", label: "Apoya brazos fijos." },
  { num: "3", label: "Mecanismo Knee Tilt." },
  { num: "4", label: "Base de aluminio negro." },
];

const categories = ["VISITA", "EJECUTIVA", "OPERATIVA"];

const SillaDetalle = () => {
  const { category, slug } = useParams();
  const result = category && slug ? getChairBySlugs(category, slug) : undefined;

  if (!result) return <NotFound />;

  const { category: cat, chair } = result;
  const imagePaths = getChairImagePaths(chair.assetFolder);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${chair.name} – Silla ${cat.name.toLowerCase()} | Generación Modular`}
        description={`Silla ${cat.name.toLowerCase()} ${chair.name} de Generación Modular. Diseño ergonómico con cabecero, apoyabrazos fijos, mecanismo Knee Tilt y base de aluminio.`}
        canonical={`/sillas/${cat.slug}/${chair.slug}`}
        ogType="product"
      />
      <Header />
      <main className="border-t border-border">
        <ChairDetailContent
          chair={chair}
          category={cat}
          imagePaths={imagePaths}
        />
        <RelatedProducts />
      </main>
    </div>
  );
};

function ChairDetailContent({
  chair,
  category,
  imagePaths,
}: {
  chair: { name: string; slug: string; description: string; assetFolder: string };
  category: { name: string; slug: string };
  imagePaths: ReturnType<typeof getChairImagePaths>;
}) {
  const [activeCategory, setActiveCategory] = useState("EJECUTIVA");
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  // Resolve images
  const mainPaths = imagePaths.main.slice(0, 6);
  const thumbPaths = imagePaths.thumbnails;
  const [resolvedMain, setResolvedMain] = useState<string[]>([]);
  const [resolvedThumbs, setResolvedThumbs] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all(mainPaths.map((p) => resolveChairImage(p))).then((urls) => {
      if (!cancelled) setResolvedMain(urls.filter(Boolean));
    });
    Promise.all(thumbPaths.map((p) => resolveChairImage(p))).then((urls) => {
      if (!cancelled) setResolvedThumbs(urls.filter(Boolean));
    });
    return () => { cancelled = true; };
  }, [mainPaths.join(","), thumbPaths.join(",")]);

  const currentMainImage = resolvedMain[mainImageIndex] || resolvedMain[0] || "";

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const renderDetailsContent = () => (
    <>
      {/* Descripción */}
      <div className="px-6 py-6 border-b border-border">
        <p className="text-xs leading-relaxed text-muted-foreground max-w-md">
          Diseñada para impresionar y brindar el máximo confort, esta silla ejecutiva combina
          elegancia con funcionalidad. Su tapizado en piel, respaldo alto con cabecera y base de
          aluminio la convierten en la opción ideal para espacios ejecutivos donde el estilo y el
          bienestar van de la mano. Así es {chair.name}.
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
                Información sobre {item.toLowerCase()} del producto {chair.name}.
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <section className="relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 w-full min-h-screen">
          {/* Left Column */}
          <div className="px-4 md:px-6 py-3 md:py-4 md:border-r border-border flex flex-col justify-center min-h-0">
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none mb-2 md:mb-3 font-black tracking-tight text-center">
              {chair.name}.
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

            {/* Main Image */}
            <div className="relative flex items-center justify-center flex-1 min-h-[200px]">
              {currentMainImage ? (
                <img
                  src={currentMainImage}
                  alt={chair.name}
                  className="w-full max-w-xs md:max-w-2xl mx-auto max-h-[45vh] md:max-h-[60vh] object-contain"
                />
              ) : (
                <div className="w-64 h-64 bg-muted rounded flex items-center justify-center text-muted-foreground text-sm">
                  {chair.name}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-1 md:mt-2 justify-center">
              {resolvedThumbs.map((thumb, i) => (
                <button
                  key={i}
                  onClick={() => setMainImageIndex(i)}
                  className={`w-11 h-11 md:w-14 md:h-14 border overflow-hidden ${
                    mainImageIndex === i ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`Vista ${i + 1}`}
                    loading="lazy"
                    width={64}
                    height={64}
                    className={`w-full h-full object-cover ${i < 2 ? "object-[center_82%]" : ""}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column — desktop only */}
          <div className="hidden md:flex flex-col overflow-y-auto">
            {renderDetailsContent()}
          </div>
        </div>
      </section>

      {/* Mobile: details content flows after */}
      <div className="md:hidden border-t border-border">
        {renderDetailsContent()}
      </div>
    </>
  );
}

export default SillaDetalle;
