import { useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import RelatedProducts from "@/components/RelatedProducts";
import SectionLoader from "@/components/SectionLoader";
import { useCriticalImagePreloader } from "@/hooks/useImagePreloader";

import foto1 from "@/assets/2. ESTACIONES/7. HOME OFFICE/1. LUBE/_DSC0554 copy 2.webp";
import foto2 from "@/assets/2. ESTACIONES/7. HOME OFFICE/1. LUBE/_DSC0568 copy 2.webp";

const heroPhoto = foto1;
const ambientPhotos = [foto2];

const EstacionHomeOffice = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const allImages = [heroPhoto, ...ambientPhotos];
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
      <SEOHead title="Home Office – Estación de trabajo | Generación Modular" description="Soluciones de mobiliario para home office que combinan comodidad, diseño y funcionalidad." canonical="/estaciones/home-office" />
      <Header />
      <main className="border-t border-border">
        <section className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-[85vh]">
            <div className="relative overflow-hidden min-h-[50vh] md:min-h-0">
              <img src={heroPhoto} alt="Estación Home Office" className="w-full h-full object-cover absolute inset-0" />
            </div>
            <div className="flex flex-col">
              <div className="px-6 py-8 md:py-12 flex-1 flex flex-col justify-center">
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-4">Home<br/>Office.</h1>
                <p className="text-xs leading-relaxed text-muted-foreground max-w-sm mb-6">
                  Soluciones de mobiliario para home office que combinan comodidad, diseño y funcionalidad. Trabaja desde casa con la misma calidad que en la oficina.
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
                        <p className="text-xs text-muted-foreground">
                          {item === "Colores disponibles" ? "Consulta con nuestro equipo las opciones de color disponibles." : `Información sobre ${item.toLowerCase()} del producto Home Office.`}
                        </p>
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
              <img src={foto2} alt="Espacio Home Office" className="w-full h-full object-cover absolute inset-0" />
              <div className="absolute inset-0 bg-foreground/30" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10">
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">Tu espacio<br /><span className="italic font-normal">en casa,</span><br />tu oficina.</h2>
              </div>
            </div>
            <div className="flex items-center justify-center p-12 bg-background">
              <p className="text-sm text-muted-foreground text-center max-w-sm">
                Descubre nuestra línea Lube, diseñada específicamente para el trabajo remoto con estilo y ergonomía.
              </p>
            </div>
          </div>
        </section>
        <RelatedProducts />
      </main>
    </div>
  );
};

export default EstacionHomeOffice;
