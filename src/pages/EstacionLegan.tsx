import { useState, useCallback } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import RelatedProducts from "@/components/RelatedProducts";

// Ambient photos
import fotoA from "@/assets/2. ESTACIONES/3. LEGAN/Fotos/A.webp";

// Configurations
import configGerencia1 from "@/assets/2. ESTACIONES/3. LEGAN/Configuraciones/Gerencia/1 ok.webp";
import configGerencia2 from "@/assets/2. ESTACIONES/3. LEGAN/Configuraciones/Gerencia/2 OK.webp";
import configMesa from "@/assets/2. ESTACIONES/3. LEGAN/Configuraciones/Mesa Reuniones/3 OK.webp";
import configMesa2 from "@/assets/2. ESTACIONES/3. LEGAN/Configuraciones/Mesa Reuniones/british-whitebg_(3)_copy.webp";
import configMesa3 from "@/assets/2. ESTACIONES/3. LEGAN/Configuraciones/Mesa Reuniones/british-whitebg_(4)_copy.webp";

// Materials
import materiales from "@/assets/2. ESTACIONES/3. LEGAN/Materiales/Axonometra.webp";

const configImages = [
  { src: configGerencia1, label: "Gerencia" },
  { src: configGerencia2, label: "Gerencia" },
  { src: configMesa, label: "Mesa de Reuniones" },
  { src: configMesa2, label: "Mesa de Reuniones" },
  { src: configMesa3, label: "Mesa de Reuniones" },
];

const EstacionLegan = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const toggleAccordion = useCallback(
    (name: string) => setOpenAccordion((prev) => (prev === name ? null : name)),
    []
  );

  const prevSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev === 0 ? configImages.length - 1 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev === configImages.length - 1 ? 0 : prev + 1));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Legan – Estación de trabajo | Generación Modular"
        description="Legan reúne premisas de modularidad, diseño y cuidado del producto. Usa un sistema modular para descubrir espacios con valor en tu entorno corporativo."
        canonical="/estaciones/legan"
      />
      <Header />

      <main className="border-t border-border">
        {/* BLOQUE SUPERIOR — Hero Producto */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-[85vh]">
            {/* Izquierda — Foto lifestyle */}
            <div className="relative overflow-hidden min-h-[50vh] md:min-h-0">
              <img
                src={fotoA}
                alt="Estación Legan ambientada"
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>

            {/* Derecha — Info + Acordeones */}
            <div className="flex flex-col border-l border-border">
              {/* Título + Descripción + Botón */}
              <div className="px-8 py-10 md:py-14 flex-1 flex flex-col justify-center">
                <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4">
                  Legan.
                </h1>
                <p className="text-xs leading-relaxed text-muted-foreground max-w-sm mb-6">
                  Legan esta pensada para espacios donde la mesa es el elemento central del proyecto. Sus proporciones y presencia formal lo hacen adecuado tanto para despachos ejecutivos como para salas de reunión corporativas.
                </p>
              </div>

              {/* Acordeones — ancho completo */}
              <div className="border-t border-border">
                {["Características", "Materiales", "Colores disponibles"].map((item) => (
                  <div key={item} className="border-b border-border last:border-b-0">
                    <button
                      onClick={() => toggleAccordion(item)}
                      className="w-full flex items-center justify-between px-8 py-4"
                    >
                      <span className="font-extrabold text-sm text-foreground">{item}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-primary transition-transform ${
                          openAccordion === item ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openAccordion === item && (
                      <div className="px-8 pb-4">
                        {item === "Materiales" ? (
                          <img
                            src={materiales}
                            alt="Materiales Legan"
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

        {/* BLOQUE INFERIOR — Contenido + Carrusel */}
        <section className="border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
            {/* Izquierda — Tagline + Links + Botón */}
            <div className="flex flex-col justify-end p-8 md:p-12 bg-muted/40">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-8">
                Nuevos espacios<br />
                <span className="italic font-normal">para nuevos</span><br />
                líderes.
              </h2>
            </div>

            {/* Derecha — Carrusel */}
            <div className="relative flex items-center justify-center bg-background border-l border-border min-h-[50vh] md:min-h-0">
              <img
                src={configImages[carouselIndex].src}
                alt={configImages[carouselIndex].label}
                className="w-full h-full object-contain p-8 md:p-12"
                loading="lazy"
              />

              {/* Flechas rojas cuadradas */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Productos relacionados */}
        <RelatedProducts />
      </main>
    </div>
  );
};

export default EstacionLegan;
