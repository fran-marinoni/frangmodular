import { useParams, useSearchParams } from "react-router-dom";
import { useState, useCallback, memo } from "react";
import { ChevronDown } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import RelatedProducts from "@/components/RelatedProducts";
import SectionLoader from "@/components/SectionLoader";
import { getProductBySlug, ChairVariant, ChairProduct } from "@/lib/chairsData";
import { useResolvedChairImages } from "@/hooks/useResolvedChairImages";
import { useImagePreloader } from "@/hooks/useImagePreloader";
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

const SillaDetalle = () => {
  const { param } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const product = param ? getProductBySlug(param) : undefined;

  const setVariant = useCallback((id: string) => {
    setSearchParams({ variant: id }, { replace: true });
  }, [setSearchParams]);

  if (!product) return <NotFound />;

  const variantParam = searchParams.get("variant");
  const activeVariantId = product.variants.find((v) => v.id === variantParam)?.id || product.defaultVariant;
  const activeVariant = product.variants.find((v) => v.id === activeVariantId)!;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${product.name} – Silla ${activeVariant.label.toLowerCase()}`}
        description={`${product.description} Así es ${product.name}.`}
        canonical={`/sillas/${product.slug}`}
        ogType="product"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          brand: { "@type": "Brand", name: "Generación Modular" },
          category: activeVariant.label,
        }}
      />
      <Header />
      <main className="border-t border-border">
        <ChairDetailContent
          key={activeVariant.id}
          product={product}
          activeVariant={activeVariant}
          allVariants={product.variants}
          onVariantChange={setVariant}
        />
        <RelatedProducts />
      </main>
    </div>
  );
};

const ChairDetailContent = memo(function ChairDetailContent({
  product,
  activeVariant,
  allVariants,
  onVariantChange,
}: {
  product: ChairProduct;
  activeVariant: ChairVariant;
  allVariants: ChairVariant[];
  onVariantChange: (id: string) => void;
}) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  // Resolve all images for this variant in one batch
  const { gallery, ambientadas, colores, allUrls, loading } = useResolvedChairImages(activeVariant.assetFolder);

  // Preload resolved URLs into browser cache, with branded loader
  const imagesReady = useImagePreloader(allUrls, 300);

  const showLoader = loading || !imagesReady;

  const currentMainImage = gallery[mainImageIndex] || gallery[0] || "";

  const toggleAccordion = useCallback((name: string) => {
    setOpenAccordion((prev) => (prev === name ? null : name));
  }, []);

  if (showLoader) {
    return <SectionLoader label="Cargando silla" />;
  }

  return (
    <>
      <section className="relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 w-full min-h-screen">
          {/* Left Column */}
          <div className="px-4 md:px-6 py-3 md:py-4 md:border-r border-border flex flex-col justify-center min-h-0">
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none mb-2 md:mb-3 font-black tracking-tight text-center">
              {product.name}.
            </h1>

            {/* Variant selector tabs — only show if multiple variants */}
            {allVariants.length > 1 && (
              <div className="flex mt-4 md:mt-6 mb-2 md:mb-3 justify-between w-full max-w-xs mx-auto">
                {allVariants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => onVariantChange(v.id)}
                    className={`text-xs tracking-wider font-medium pb-1 transition-all border-b-2 uppercase ${
                      activeVariant.id === v.id
                        ? "border-primary font-bold text-foreground"
                        : "border-transparent text-muted-foreground"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="relative flex items-center justify-center flex-1 min-h-[200px]">
              {currentMainImage ? (
                <img
                  src={currentMainImage}
                  alt={product.name}
                  className="w-full max-w-xs md:max-w-2xl mx-auto max-h-[45vh] md:max-h-[60vh] object-contain"
                />
              ) : (
                <div className="w-64 h-64 bg-muted rounded flex items-center justify-center text-muted-foreground text-sm">
                  {product.name}
                </div>
              )}
            </div>

            {/* Thumbnails — AMBIENTADAS images */}
            <div className="flex gap-3 mt-1 md:mt-2 justify-center">
              {ambientadas.length > 0
                ? ambientadas.map((thumb, i) => (
                    <div
                      key={i}
                      className="w-11 h-11 md:w-14 md:h-14 border border-border overflow-hidden"
                    >
                      <img
                        src={thumb}
                        alt={`Ambientada ${i + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                : gallery.slice(0, 3).map((thumb, i) => (
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
            <DetailsPanel
              product={product}
              colores={colores}
              activeFeature={activeFeature}
              setActiveFeature={setActiveFeature}
              openAccordion={openAccordion}
              toggleAccordion={toggleAccordion}
            />
          </div>
        </div>
      </section>

      {/* Mobile: details content flows after */}
      <div className="md:hidden border-t border-border">
        <DetailsPanel
          product={product}
          colores={colores}
          activeFeature={activeFeature}
          setActiveFeature={setActiveFeature}
          openAccordion={openAccordion}
          toggleAccordion={toggleAccordion}
        />
      </div>
    </>
  );
});

/** Right-side details panel — extracted to avoid inline render function */
const DetailsPanel = memo(function DetailsPanel({
  product,
  colores,
  activeFeature,
  setActiveFeature,
  openAccordion,
  toggleAccordion,
}: {
  product: ChairProduct;
  colores: string[];
  activeFeature: number | null;
  setActiveFeature: (i: number | null) => void;
  openAccordion: string | null;
  toggleAccordion: (name: string) => void;
}) {
  return (
    <>
      {/* Descripción */}
      <div className="px-6 py-6 border-b border-border">
        <p className="text-xs leading-relaxed text-muted-foreground max-w-md">
          {product.description} Así es {product.name}.
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
            <img
              src={chairFeatures}
              alt="Diagrama de características"
              width={180}
              height={180}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${activeFeature === null ? "opacity-100" : "opacity-0"}`}
            />
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

      {/* Colores disponibles — dynamic from COLORES folder */}
      {colores.length > 0 && (
        <div className="px-6 py-6 border-b border-border">
          <h3 className="font-extrabold text-base mb-3 text-foreground">Colores disponibles:</h3>
          <div className="flex gap-3 flex-wrap">
            {colores.map((src, i) => (
              <div key={i} className="w-16 h-12 rounded-sm overflow-hidden border border-border">
                <img src={src} alt={`Color ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

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
                Información sobre {item.toLowerCase()} del producto {product.name}.
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
});

export default SillaDetalle;
