import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import RelatedProducts from "@/components/RelatedProducts";
import { getProductBySlug } from "@/lib/productStore";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import NotFound from "@/pages/NotFound";

const DynamicProduct = () => {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [activeCategory, setActiveCategory] = useState(product?.category ?? "");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  if (!product) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="border-t border-border">
        <section className="relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 w-full min-h-screen">
            {/* Left Column */}
            <div className="px-4 md:px-6 py-3 md:py-4 md:border-r border-border flex flex-col justify-center min-h-0">
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none mb-2 md:mb-3 font-black tracking-tight text-center">
                {product.name}.
              </h1>

              <div className="flex mt-4 md:mt-6 mb-2 md:mb-3 justify-between w-full max-w-xs mx-auto">
                {product.categories.map((cat) => (
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

              <div className="relative flex items-center justify-center flex-1 min-h-[200px]">
                {product.coverPoster ? (
                  <img
                    src={product.coverPoster}
                    alt={product.name}
                    className="w-full max-w-xs md:max-w-2xl mx-auto max-h-[45vh] md:max-h-[60vh] object-contain"
                  />
                ) : (
                  <div className="w-64 h-64 bg-muted rounded flex items-center justify-center text-muted-foreground text-sm">
                    Sin imagen
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-1 md:mt-2 justify-center">
                {product.thumbnails.filter(Boolean).map((thumb, i) => (
                  <div key={i} className="w-11 h-11 md:w-14 md:h-14 border border-border overflow-hidden">
                    <img src={thumb} alt={`Vista ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column — desktop */}
            <div className="hidden md:flex flex-col">
              <DetailsContent product={product} openAccordion={openAccordion} setOpenAccordion={setOpenAccordion} activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
            </div>
          </div>
        </section>

        {/* Mobile details */}
        <div className="md:hidden border-t border-border">
          <DetailsContent product={product} openAccordion={openAccordion} setOpenAccordion={setOpenAccordion} activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
        </div>

        <RelatedProducts />
      </main>
    </div>
  );
};

function DetailsContent({
  product,
  openAccordion,
  setOpenAccordion,
  activeFeature,
  setActiveFeature,
}: {
  product: ReturnType<typeof getProductBySlug> & {};
  openAccordion: string | null;
  setOpenAccordion: (v: string | null) => void;
  activeFeature: number | null;
  setActiveFeature: (v: number | null) => void;
}) {
  return (
    <>
      {/* Description */}
      <div className="px-6 py-6 border-b border-border">
        <p className="text-xs leading-relaxed text-muted-foreground max-w-md">{product.description}</p>
      </div>

      {/* Features */}
      {product.features.some((f) => f.label) && (
        <div className="px-6 py-6 border-b border-border">
          <h3 className="font-extrabold text-base mb-4 text-foreground">Características:</h3>
          <div className="flex gap-6 items-start" onMouseLeave={() => setActiveFeature(null)}>
            {product.featuresImage && (
              <div className="relative w-40 h-40 flex-shrink-0">
                <img
                  src={product.featuresImage}
                  alt="Features"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <ul className="text-xs w-full">
              {product.features.filter((f) => f.label).map((item, i) => (
                <li
                  key={i}
                  onMouseEnter={() => setActiveFeature(i)}
                  className={`cursor-pointer transition-colors duration-200 py-3 px-3 -mx-2 rounded min-h-[44px] flex items-center ${
                    activeFeature === i ? "text-primary font-bold bg-primary/5" : ""
                  }`}
                >
                  <span className="text-primary font-bold mr-1">{item.num}.</span> {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Colors */}
      {product.colors.length > 0 && (
        <div className="px-6 py-6 border-b border-border">
          <h3 className="font-extrabold text-base mb-3 text-foreground">Colores disponibles:</h3>
          <div className="flex gap-3">
            {product.colors.map((color, i) => (
              <div key={i} className="w-16 h-12 rounded-sm" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
      )}

      {/* Accordion */}
      <div className="flex flex-col">
        {product.accordionSections.map((section, i) => (
          <div key={i} className={i < product.accordionSections.length - 1 ? "border-b border-border" : ""}>
            <button
              onClick={() => setOpenAccordion(openAccordion === section.title ? null : section.title)}
              className="w-full flex items-center justify-between px-6 py-3"
            >
              <span className="font-extrabold text-sm text-foreground">{section.title}</span>
              <ChevronDown className={`w-5 h-5 text-primary transition-transform ${openAccordion === section.title ? "rotate-180" : ""}`} />
            </button>
            {openAccordion === section.title && (
              <div className="px-6 pb-3 text-xs text-muted-foreground">
                {section.content || `Información sobre ${section.title.toLowerCase()} del producto.`}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default DynamicProduct;
