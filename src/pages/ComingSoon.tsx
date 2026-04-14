import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import FooterSection from "@/components/home/FooterSection";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEOHead
        title="Próximamente – Generación Modular"
        description="Esta sección estará disponible pronto."
        noindex
      />
      <Header />
      <main className="flex-1 flex items-center justify-center border-t border-border">
        <div className="text-center px-6 py-24 md:py-32">
          <h1 className="font-display text-[3rem] md:text-[5rem] lg:text-[6.5rem] font-black leading-[0.9] tracking-tighter mb-6">
            Próxima<span className="font-normal italic">mente.</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
            Estamos trabajando en esta sección.<br />
            Muy pronto estará disponible.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default ComingSoon;
