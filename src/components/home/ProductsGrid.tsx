import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import prodSillas from "@/assets/home/prod-sillas.jpg";
import prodFlexible from "@/assets/home/prod-flexible.jpg";
import prodGerenciales from "@/assets/home/prod-gerenciales.jpg";
import prodOperativas from "@/assets/home/prod-operativas.jpg";
import prodLounge from "@/assets/home/prod-lounge.jpg";

const ProductsGrid = () => {
  return (
    <section className="border-t border-border pt-12 md:pt-16 pb-0">
      <div className="px-6 md:px-8">
        <h2 className="font-display text-[2.5rem] md:text-[3rem] lg:text-[3.8rem] font-black mb-10 md:mb-12 text-foreground leading-tight">
          Nuestros <span className="font-black">PRODUCTOS.</span>
        </h2>
      </div>
      <div className="flex flex-col gap-px bg-black">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-px md:[grid-template-columns:330fr_330fr_619fr]">
            {[
              { img: prodSillas, label: "Sillas Ergonómicas.", to: "/productos/apollo" },
              { img: prodFlexible, label: "Flexible Spaces.", to: "/productos" },
              { img: prodGerenciales, label: "Líneas de oficina gerenciales.", to: "/productos" },
            ].map((item) => (
              <Link key={item.label} to={item.to} className="group bg-background relative overflow-hidden">
                <div className="relative min-h-[220px] md:min-h-[300px] lg:min-h-[340px]">
                  <img src={item.img} alt={item.label} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 flex items-center gap-1.5 z-10">
                    <ArrowRight className="w-3.5 h-3.5 text-background" />
                    <span className="font-bold text-[11px] text-background">{item.label}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-px md:[grid-template-columns:619fr_330fr_330fr]">
          <Link to="/productos" className="group bg-background relative overflow-hidden">
            <div className="relative min-h-[200px] md:min-h-[270px] lg:min-h-[300px]">
              <img src={prodOperativas} alt="Líneas de oficina operativas" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-1.5 z-10">
                <ArrowRight className="w-3.5 h-3.5 text-background" />
                <span className="font-bold text-[11px] text-background">Líneas de oficina operativas.</span>
              </div>
            </div>
          </Link>

          <Link to="/productos" className="group bg-background relative overflow-hidden">
            <div className="relative min-h-[200px] md:min-h-[270px] lg:min-h-[300px]">
              <img src={prodLounge} alt="Lounge" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-1.5 z-10">
                <ArrowRight className="w-3.5 h-3.5 text-background" />
                <span className="font-bold text-[11px] text-background">Lounge.</span>
              </div>
            </div>
          </Link>

          <div className="bg-primary text-primary-foreground p-10 md:p-12 flex flex-col justify-between min-h-[200px] md:min-h-[270px] lg:min-h-[300px]">
            <h3 className="font-display text-[2.2rem] md:text-[2.8rem] lg:text-[3.5rem] font-black leading-[0.95]">
              Catálogo<br />completo.
            </h3>
            <div className="flex justify-end mt-auto">
              <ArrowRight className="w-10 h-10 md:w-12 md:h-12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;
