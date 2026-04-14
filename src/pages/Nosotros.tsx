import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import FooterSection from "@/components/home/FooterSection";

import foundersImg from "@/assets/nosotros/founders.webp";
import equipmentImg from "@/assets/nosotros/equipment.webp";
import cncImg from "@/assets/nosotros/cnc.webp";
import machineImg from "@/assets/nosotros/machine.webp";
import workersImg from "@/assets/nosotros/workers.webp";
import teamProjectImg from "@/assets/nosotros/team-project.webp";
import factoryImg from "@/assets/nosotros/factory.webp";
import showroomImg from "@/assets/nosotros/showroom.webp";
import truckImg from "@/assets/nosotros/truck.webp";

const Nosotros = () => {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Nosotros – Más de 35 años fabricando mobiliario"
        description="Generación Modular es una empresa ecuatoriana de manufactura enfocada en diseño y fabricación de mobiliario modular desde 1990. 3,000 m² de fábrica, +2,153 proyectos."
        canonical="/nosotros"
      />
      <Header />

      {/* Hero: Desde 1990 */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_745px] gap-px bg-border">
          {/* Left: Text */}
          <div className="bg-background p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl font-black leading-none mb-6">
              Desde<br />1990.
            </h1>
            <p className="text-xs leading-relaxed text-foreground/80 max-w-sm mb-6">
              <span className="font-bold">Generación Modular</span> es una empresa ecuatoriana
              de manufactura, enfocada en el diseño y
              fabricación de mobiliario.
            </p>
            <p className="text-xs leading-relaxed text-foreground/80 max-w-sm">
              Nuestra misión es diseñar muebles y planificar
              espacios flexibles y funcionales, que se adapten a
              los cambios programáticos de nuestros clientes,
              mejorando su productividad y calidad de vida.
            </p>
          </div>

          {/* Right: Founders image */}
          <div className="overflow-hidden">
            <img
              src={foundersImg}
              alt="Fundadores"
              loading="lazy"
              className="w-full h-[528px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* +35 años section */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {/* Left: Workers image */}
          <div className="overflow-hidden">
            <img
              src={workersImg}
              alt="Trabajadores"
              loading="lazy"
              className="w-[688px] h-[662px] object-cover"
            />
          </div>

          {/* Right: Stats */}
          <div className="bg-[#F2F0EB] flex flex-col justify-center">
            <div className="p-8 md:p-12 pb-6">
              <h2 className="text-5xl md:text-6xl font-black leading-tight mb-4">
                +35 años en<br />la industria.
              </h2>
              <p className="text-sm leading-relaxed text-foreground/70 max-w-md">
                Más de tres décadas fabricando mobiliario para oficinas
                corporativas, espacios comerciales, hoteles y proyectos
                residenciales <span className="font-bold text-foreground">a nivel nacional.</span>
              </p>
            </div>

            {/* Stats - full width */}
            <div className="mt-auto flex flex-col gap-px bg-border">
              <div className="bg-[#F2F0EB] text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200 py-4 px-8 md:px-12 flex items-baseline gap-3 cursor-pointer border-t border-border">
                <span className="text-3xl md:text-4xl font-black">3,000 m²</span>
                <span className="text-sm font-bold">maquinaria instalada.</span>
              </div>
              <div className="bg-[#F2F0EB] text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200 py-4 px-8 md:px-12 flex items-baseline gap-3 cursor-pointer">
                <span className="text-3xl md:text-4xl font-black">400,750 m²</span>
                <span className="text-sm font-bold">mobiliario instalado.</span>
              </div>
              <div className="bg-[#F2F0EB] text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200 py-4 px-8 md:px-12 flex items-baseline gap-3 cursor-pointer">
                <span className="text-3xl md:text-4xl font-black">2,153</span>
                <span className="text-sm font-bold">proyectos realizados.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border">
          {/* Valores title - red bg */}
          <div className="bg-primary text-primary-foreground p-8 md:p-12 flex items-center">
            <h2 className="text-4xl md:text-5xl font-black text-center">Valores.</h2>
          </div>
          {/* Funcionalidad */}
          <div className="flex flex-col bg-background">
            <img src={equipmentImg} alt="Funcionalidad" loading="lazy" className="w-full h-[298px] object-cover" />
            <div className="p-4 md:p-6">
              <h3 className="text-lg font-black">Funcionalidad.</h3>
            </div>
          </div>
          {/* Diseño y Calidad */}
          <div className="flex flex-col bg-background">
            <img src={cncImg} alt="Diseño y Calidad" loading="lazy" className="w-full h-[298px] object-cover" />
            <div className="p-4 md:p-6">
              <h3 className="text-lg font-black">Diseño<br />y Calidad.</h3>
            </div>
          </div>
          {/* Flexibilidad */}
          <div className="flex flex-col bg-background">
            <img src={machineImg} alt="Flexibilidad" loading="lazy" className="w-full h-[298px] object-cover" />
            <div className="p-4 md:p-6">
              <h3 className="text-lg font-black">Flexibilidad.</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Hecho por expertos */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_745px] gap-px bg-border">
          <div className="bg-background p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              Hecho por<br />expertos.
            </h2>
            <p className="text-xs leading-relaxed text-foreground/80 max-w-sm">
              Un equipo técnico con décadas de experiencia en
              fabricación de mobiliario modular, reforzado por la
              nueva generación que integra tecnología y
              procesos industriales. De lo técnico al arte de
              instalación, cada proyecto cuenta con personal
              capacitado que conoce el proceso completo.
            </p>
          </div>
          <div className="overflow-hidden">
            <img
              src={teamProjectImg}
              alt="Proyecto de equipo"
              loading="lazy"
              className="w-full h-[528px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Puntos de Operación */}
      <section className="border-t border-border bg-primary text-primary-foreground py-8 md:py-10">
        <div className="px-8 md:px-12">
          <h2 className="text-3xl md:text-4xl font-black">
            Puntos de <span className="font-black uppercase">Operación.</span>
          </h2>
        </div>
      </section>

      {/* 01 02 03 Grid */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          <div className="bg-background">
            <div className="overflow-hidden">
              <img src={factoryImg} alt="Fábrica" loading="lazy" className="w-full aspect-[4/3] object-cover" />
            </div>
            <div className="p-6 md:p-8 flex items-baseline gap-3">
              <span className="text-4xl md:text-5xl font-black">01</span>
              <span className="text-sm text-foreground/60">→</span>
              <h3 className="text-xl font-black">Fábrica.</h3>
            </div>
          </div>
          <div className="bg-background">
            <div className="overflow-hidden">
              <img src={showroomImg} alt="Showroom" loading="lazy" className="w-full aspect-[4/3] object-cover" />
            </div>
            <div className="p-6 md:p-8 flex items-baseline gap-3">
              <span className="text-4xl md:text-5xl font-black">02</span>
              <span className="text-sm text-foreground/60">→</span>
              <h3 className="text-xl font-black">Showroom.</h3>
            </div>
          </div>
          <div className="bg-background">
            <div className="overflow-hidden">
              <img src={truckImg} alt="Cobertura nacional" loading="lazy" className="w-full aspect-[4/3] object-cover" />
            </div>
            <div className="p-6 md:p-8 flex items-baseline gap-3">
              <span className="text-4xl md:text-5xl font-black">03</span>
              <span className="text-sm text-foreground/60">→</span>
              <h3 className="text-xl font-black">Cobertura<br />nacional.</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="border-t border-border py-16 md:py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-black leading-tight mb-8">
          35 años dando vida<br />a tus proyectos.
        </h2>
        <button className="bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider">
          Cuéntanos tu proyecto
        </button>
      </section>

      <FooterSection />
    </div>
  );
};

export default Nosotros;
