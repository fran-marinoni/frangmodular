import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import prodSillas from "@/assets/home/prod-sillas.webp";
import prodFlexible from "@/assets/home/prod-flexible.webp";
import prodGerenciales from "@/assets/home/prod-gerenciales.webp";
import prodOperativas from "@/assets/home/prod-operativas.webp";
import prodLounge from "@/assets/home/prod-lounge.webp";

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
              { img: prodSillas, label: "Sillas Ergonómicas.", to: "/sillas" },
              { img: prodFlexible, label: "Flexible Spaces.", to: "/sillas" },
              { img: prodGerenciales, label: "Líneas de oficina gerenciales.", to: "/sillas/ejecutivas" },
            ].map((item) => (
              <Link key={item.label} to={item.to} className="group bg-background relative overflow-hidden">
                <div className="relative min-h-[220px] md:min-h-[300px] lg:min-h-[340px]">
                  <img src={item.img} alt={item.label} loading="lazy" width={619} height={340} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 flex items-center gap-1.5 z-10">
                    <ArrowRight className="w-3.5 h-3.5 text-background" aria-hidden="true" />
                    <span className="font-bold text-[11px] text-background">{item.label}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-px md:[grid-template-columns:619fr_330fr_330fr]">
          <Link to="/sillas/operativas" className="group bg-background relative overflow-hidden">
            <div className="relative min-h-[200px] md:min-h-[270px] lg:min-h-[300px]">
              <img src={prodOperativas} alt="Líneas de oficina operativas" loading="lazy" width={619} height={300} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-1.5 z-10">
                <ArrowRight className="w-3.5 h-3.5 text-background" aria-hidden="true" />
                <span className="font-bold text-[11px] text-background">Líneas de oficina operativas.</span>
              </div>
            </div>
          </Link>

          <Link to="/sillas/lounge" className="group bg-background relative overflow-hidden">
            <div className="relative min-h-[200px] md:min-h-[270px] lg:min-h-[300px]">
              <img src={prodLounge} alt="Lounge" loading="lazy" width={330} height={300} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-1.5 z-10">
                <ArrowRight className="w-3.5 h-3.5 text-background" aria-hidden="true" />
                <span className="font-bold text-[11px] text-background">Lounge.</span>
              </div>
            </div>
          </Link>

          <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); window.dispatchEvent(new Event('open-products-menu')); }} className="bg-primary text-primary-foreground p-10 md:p-12 flex flex-col justify-between min-h-[200px] md:min-h-[270px] lg:min-h-[300px] hover:bg-primary/90 transition-colors text-left">
            <h3 className="font-display text-[2.2rem] md:text-[2.8rem] lg:text-[3.5rem] font-black leading-[0.95]">
              Catálogo<br />completo.
            </h3>
            <div className="flex justify-end mt-auto">
              <ArrowRight className="w-10 h-10 md:w-12 md:h-12" aria-hidden="true" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;
