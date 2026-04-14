import { useParams } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";

const comingSoonNames: Record<string, string> = {
  "sillas-multiproposito": "Sillas Multipropósito",
  "mesas-y-complementos": "Mesas y Complementos",
  "cubik": "Cubik",
  "meeting-box": "Meeting Box",
  "bus-station": "Bus Station",
  "booth": "Booth",
  "textil-acustico": "Textil Acústico",
  "eco-board-acustico": "Eco Board Acústico",
  "madera-acustica": "Madera Acústica",
  "madera": "Madera",
  "aluminio": "Aluminio",
  "sillas-educacion": "Sillas",
  "pupitres": "Pupitres",
  "complementos-educacion": "Complementos",
  "macetas": "Macetas",
  "porta-libros": "Porta Libros",
  "magazine-rack": "Magazine Rack",
  "ganchos-de-mesa": "Ganchos de Mesa",
  "basureros": "Basureros",
  "monitores": "Monitores",
  "libreros": "Libreros",
  "percheros": "Percheros",
};

const ComingSoon = () => {
  const { slug } = useParams();
  const name = (slug && comingSoonNames[slug]) || slug || "Producto";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${name} – Próximamente | Generación Modular`}
        description={`${name} estará disponible próximamente en Generación Modular.`}
        canonical={`/productos/${slug}`}
      />
      <Header />
      <main className="border-t border-border flex items-center justify-center min-h-[80vh]">
        <div className="text-center px-6">
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
            {name}.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-2">Coming Soon</p>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Estamos trabajando en esta sección. Pronto podrás conocer todos los detalles de este producto.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ComingSoon;
