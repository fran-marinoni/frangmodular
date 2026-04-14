import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import { getChairBySlugs, getChairImagePaths } from "@/lib/chairsData";
import { useResolvedImages } from "@/hooks/useResolvedImage";
import { resolveChairImage } from "@/lib/chairsData";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";

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
        description={chair.description}
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
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

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

  const accordionSections = [
    { title: "Garantía", content: `Información sobre la garantía de ${chair.name}.` },
    { title: "Certificados", content: `Información sobre certificados de ${chair.name}.` },
    { title: "Catálogo", content: `Descarga el catálogo de ${chair.name}.` },
  ];

  return (
    <>
      <section className="relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 w-full min-h-screen">
          {/* Left Column */}
          <div className="px-4 md:px-6 py-3 md:py-4 md:border-r border-border flex flex-col justify-center min-h-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <Link to="/sillas" className="hover:text-foreground transition-colors">Sillas</Link>
              <span>/</span>
              <Link to={`/sillas/${category.slug}`} className="hover:text-foreground transition-colors">{category.name}</Link>
              <span>/</span>
              <span className="text-foreground">{chair.name}</span>
            </div>

            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none mb-2 md:mb-3 font-black tracking-tight text-center">
              {chair.name}.
            </h1>

            {/* Category label */}
            <div className="flex mt-4 md:mt-6 mb-2 md:mb-3 justify-center w-full">
              <span className="text-xs tracking-wider font-bold pb-1 border-b-2 border-primary text-foreground uppercase">
                {category.name}
              </span>
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
                  className={`w-11 h-11 md:w-14 md:h-14 border overflow-hidden transition-all ${
                    mainImageIndex === i ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`Vista ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column — desktop */}
          <div className="hidden md:flex flex-col overflow-y-auto">
            <DetailsPanel
              chair={chair}
              accordionSections={accordionSections}
              openAccordion={openAccordion}
              setOpenAccordion={setOpenAccordion}
            />
          </div>
        </div>
      </section>

      {/* Mobile details */}
      <div className="md:hidden border-t border-border">
        <DetailsPanel
          chair={chair}
          accordionSections={accordionSections}
          openAccordion={openAccordion}
          setOpenAccordion={setOpenAccordion}
        />
      </div>
    </>
  );
}

function DetailsPanel({
  chair,
  accordionSections,
  openAccordion,
  setOpenAccordion,
}: {
  chair: { name: string; description: string };
  accordionSections: { title: string; content: string }[];
  openAccordion: string | null;
  setOpenAccordion: (v: string | null) => void;
}) {
  return (
    <>
      {/* Description */}
      <div className="px-6 py-6 border-b border-border">
        <p className="text-xs leading-relaxed text-muted-foreground max-w-md">
          {chair.description}
        </p>
      </div>

      {/* Accordion */}
      <div className="flex flex-col">
        {accordionSections.map((section, i) => (
          <div key={i} className={i < accordionSections.length - 1 ? "border-b border-border" : ""}>
            <button
              onClick={() => setOpenAccordion(openAccordion === section.title ? null : section.title)}
              className="w-full flex items-center justify-between px-6 py-3"
            >
              <span className="font-extrabold text-sm text-foreground">{section.title}</span>
              <ChevronDown
                className={`w-5 h-5 text-primary transition-transform ${
                  openAccordion === section.title ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAccordion === section.title && (
              <div className="px-6 pb-3 text-xs text-muted-foreground">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default SillaDetalle;
