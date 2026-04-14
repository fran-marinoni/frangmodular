import { useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import RelatedProducts from "@/components/RelatedProducts";
import SectionLoader from "@/components/SectionLoader";
import { useCriticalImagePreloader } from "@/hooks/useImagePreloader";

import fotoA from "@/assets/2. ESTACIONES/4. WYRE/Fotos/A.webp";
import fotoB from "@/assets/2. ESTACIONES/4. WYRE/Fotos/B.webp";
import fotoC from "@/assets/2. ESTACIONES/4. WYRE/Fotos/C.webp";
import fotoD from "@/assets/2. ESTACIONES/4. WYRE/Fotos/D.webp";

import configGer1 from "@/assets/2. ESTACIONES/4. WYRE/Configuraciones/Gerencias/WYRE 8.webp";
import configGer2 from "@/assets/2. ESTACIONES/4. WYRE/Configuraciones/Gerencias/WYRE 9.webp";
import configMesa1 from "@/assets/2. ESTACIONES/4. WYRE/Configuraciones/Mesa de Reuniones/WYRE 7.webp";
import configOp1 from "@/assets/2. ESTACIONES/4. WYRE/Configuraciones/Operativos/WYRE 1.webp";

import materiales from "@/assets/2. ESTACIONES/4. WYRE/Materiales/Axonometra.webp";

const heroPhoto = fotoA;
const configImages = [
  { src: configGer1, label: "Gerencia" },
  { src: configGer2, label: "Gerencia" },
  { src: configMesa1, label: "Mesa de Reuniones" },
  { src: configOp1, label: "Operativo" },
];
const ambientPhotos = [fotoB, fotoC, fotoD];

const EstacionWyre = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const allImages = [heroPhoto, ...configImages.map((c) => c.src), ...ambientPhotos, materiales];
  const imagesReady = useCriticalImagePreloader(allImages, 1, 300);
  const toggleAccordion = useCallback(
    (name: string) => setOpenAccordion((prev) => (prev === name ? null : name)),
    []
  );

  if (!imagesReady) {
    return (<div className="min-h-screen bg-background"><Header /><SectionLoader label="Cargando estación" /></div>);
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Wyre – Estación de trabajo | Generación Modular" description="Wyre es una estación de trabajo con diseño modular, funcional y contemporáneo para espacios corporativos." canonical="/estaciones/wyre" />
      <Header />
      <main className="border-t border-border">
        <section className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-[85vh]">
            <div className="relative overflow-hidden min-h-[50vh] md:min-h-0">
              <img src={heroPhoto} alt="Estación Wyre ambientada" className="w-full h-full object-cover absolute inset-0" />
            </div>
            <div className="flex flex-col">
              <div className="px-6 py-8 md:py-12 flex-1 flex flex-col justify-center">
                <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4">Wyre.</h1>
                <p className="text-xs leading-relaxed text-muted-foreground max-w-sm mb-6">
                  Wyre redefine el espacio de trabajo con un diseño modular, funcional y contemporáneo. Ideal para entornos corporativos que buscan versatilidad y estética.
                </p>
              </div>
              <div className="border-t border-border">
                {["Complementos", "Materiales", "Colores disponibles"].map((item) => (
                  <div key={item} className="border-b border-border last:border-b-0">
                    <button onClick={() => toggleAccordion(item)} className="w-full flex items-center justify-between px-6 py-4">
                      <span className="font-extrabold text-sm text-foreground">{item}</span>
                      <ChevronDown className={`w-5 h-5 text-primary transition-transform ${openAccordion === item ? "rotate-180" : ""}`} />
                    </button>
                    {openAccordion === item && (
                      <div className="px-6 pb-4">
                        {item === "Materiales" ? (
                          <img src={materiales} alt="Materiales Wyre" className="w-full max-w-md object-contain" />
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            {item === "Colores disponibles" ? "Consulta con nuestro equipo las opciones de color disponibles para Wyre." : `Información sobre ${item.toLowerCase()} del producto Wyre.`}
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
        <section className="border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
            <div className="relative overflow-hidden min-h-[50vh] md:min-h-0 bg-muted">
              <img src={fotoB} alt="Espacio Wyre" className="w-full h-full object-cover absolute inset-0" />
              <div className="absolute inset-0 bg-foreground/30" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10">
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">Nuevos espacios<br /><span className="italic font-normal">para nuevos</span><br />líderes.</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-2">
              {configImages.slice(0, 4).map((config, i) => (
                <div key={i} className={`relative overflow-hidden border-border ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""}`}>
                  <img src={config.src} alt={config.label} className="w-full h-full object-contain p-4 bg-background" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <RelatedProducts />
      </main>
    </div>
  );
};

export default EstacionWyre;
