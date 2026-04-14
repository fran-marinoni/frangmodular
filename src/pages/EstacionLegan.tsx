import { useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import RelatedProducts from "@/components/RelatedProducts";
import SectionLoader from "@/components/SectionLoader";
import { useCriticalImagePreloader } from "@/hooks/useImagePreloader";

// Ambient photos
import fotoA from "@/assets/2. ESTACIONES/3. LEGAN/Fotos/A.webp";
import fotoB from "@/assets/2. ESTACIONES/3. LEGAN/Fotos/B.webp";
import fotoC from "@/assets/2. ESTACIONES/3. LEGAN/Fotos/C.webp";
import fotoD from "@/assets/2. ESTACIONES/3. LEGAN/Fotos/D.webp";

// Configurations
import configGerencia1 from "@/assets/2. ESTACIONES/3. LEGAN/Configuraciones/Gerencia/1 ok.webp";
import configGerencia2 from "@/assets/2. ESTACIONES/3. LEGAN/Configuraciones/Gerencia/2 OK.webp";
import configMesa from "@/assets/2. ESTACIONES/3. LEGAN/Configuraciones/Mesa Reuniones/3 OK.webp";
import configMesa2 from "@/assets/2. ESTACIONES/3. LEGAN/Configuraciones/Mesa Reuniones/british-whitebg_(3)_copy.webp";
import configMesa3 from "@/assets/2. ESTACIONES/3. LEGAN/Configuraciones/Mesa Reuniones/british-whitebg_(4)_copy.webp";

// Materials
import materiales from "@/assets/2. ESTACIONES/3. LEGAN/Materiales/Axonometra.webp";

const heroPhoto = fotoA;
const configImages = [
  { src: configGerencia1, label: "Gerencia" },
  { src: configGerencia2, label: "Gerencia" },
  { src: configMesa, label: "Mesa de Reuniones" },
  { src: configMesa2, label: "Mesa de Reuniones" },
  { src: configMesa3, label: "Mesa de Reuniones" },
];

const ambientPhotos = [fotoB, fotoC, fotoD];

const EstacionLegan = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const allImages = [heroPhoto, ...configImages.map((c) => c.src), ...ambientPhotos, materiales];
  // Only wait for the hero photo to render the page
  const imagesReady = useCriticalImagePreloader(allImages, 1, 300);

  const toggleAccordion = useCallback(
    (name: string) => setOpenAccordion((prev) => (prev === name ? null : name)),
    []
  );

  if (!imagesReady) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <SectionLoader label="Cargando estación" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Legan – Estación de trabajo | Generación Modular"
        description="Legan reúne premisas de modularidad, diseño y cuidado del producto. Usa un sistema modular para descubrir espacios con valor en tu entorno corporativo."
        canonical="/estaciones/legan"
      />
      <Header />

      <main className="border-t border-border">
        {/* Hero Section: Photo left + Info right */}
        <section className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-[85vh]">
            {/* Left — Ambient photo */}
            <div className="relative overflow-hidden min-h-[50vh] md:min-h-0">
              <img
                src={heroPhoto}
                alt="Estación Legan ambientada"
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>

            {/* Right — Product info */}
            <div className="flex flex-col">
              {/* Title + Description */}
              <div className="px-6 py-8 md:py-12 flex-1 flex flex-col justify-center">
                <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4">
                  Legan.
                </h1>
                <p className="text-xs leading-relaxed text-muted-foreground max-w-sm mb-6">
                  Legan reúne premisas de modularidad, diseño y cuidado del producto. Tus colaboradores disfrutarán de la comodidad que la tecnología le aporta. Usa un sistema modular para descubrir espacios con valor en tu entorno corporativo.
                </p>
              </div>

              {/* Accordions */}
              <div className="border-t border-border">
                {["Complementos", "Materiales", "Colores disponibles"].map((item) => (
                  <div key={item} className="border-b border-border last:border-b-0">
                    <button
                      onClick={() => toggleAccordion(item)}
                      className="w-full flex items-center justify-between px-6 py-4"
                    >
                      <span className="font-extrabold text-sm text-foreground">{item}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-primary transition-transform ${
                          openAccordion === item ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openAccordion === item && (
                      <div className="px-6 pb-4">
                        {item === "Materiales" ? (
                          <img
                            src={materiales}
                            alt="Materiales Legan"
                loading="lazy"
                            className="w-full max-w-md object-contain"
                          />
                        ) : item === "Colores disponibles" ? (
                          <p className="text-xs text-muted-foreground">
                            Consulta con nuestro equipo las opciones de color disponibles para Legan.
                          </p>
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            Información sobre {item.toLowerCase()} del producto Legan.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Configurations Section */}
        <section className="border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
            {/* Left — Ambient photo with tagline */}
            <div className="relative overflow-hidden min-h-[50vh] md:min-h-0 bg-muted">
              <img
                src={fotoB}
                alt="Espacio Legan"
                loading="lazy"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-foreground/30" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10">
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                  Nuevos espacios<br />
                  <span className="italic font-normal">para nuevos</span><br />
                  líderes.
                </h2>
              </div>
            </div>

            {/* Right — Configuration grid */}
            <div className="grid grid-cols-2 grid-rows-2">
              {configImages.slice(0, 4).map((config, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden border-border ${
                    i % 2 === 0 ? "border-r" : ""
                  } ${i < 2 ? "border-b" : ""}`}
                >
                  <img
                    src={config.src}
                    alt={config.label}
                loading="lazy"
                    className="w-full h-full object-contain p-4 bg-background"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Products */}
        <RelatedProducts />
      </main>
    </div>
  );
};

export default EstacionLegan;
