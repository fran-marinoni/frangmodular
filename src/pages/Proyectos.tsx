import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import FooterSection from "@/components/home/FooterSection";
import { getAllCategories } from "@/lib/projectsData";

import servDiseno from "@/assets/projects/serv-diseno.png";
import servOffice from "@/assets/projects/serv-office.png";
import servConsultoria from "@/assets/projects/serv-consultoria.png";

import proyCorporativo from "@/assets/projects/proy-corporativo.png";
import proyEducacion from "@/assets/projects/proy-educacion.png";
import proySalud from "@/assets/projects/proy-salud.png";
import proyHospitalidad from "@/assets/projects/proy-hospitalidad.png";
import proyRetail from "@/assets/projects/proy-retail.png";

const services = [
  { title: "Diseño\nArquitectónico.", image: servDiseno },
  { title: "Office Book.", image: servOffice },
  { title: "Consultoría y\nfabricación de\nmobiliario.", image: servConsultoria },
];

const categoryImages: Record<string, string> = {
  corporativo: proyCorporativo,
  educacion: proyEducacion,
  salud: proySalud,
  hospitalidad: proyHospitalidad,
  retail: proyRetail,
};

const categoryDescriptions: Record<string, string> = {
  corporativo: "Generación Modular diseña y fabrica mobiliario para espacios corporativos que responden a las necesidades reales de uso diario. Áreas administrativas equipadas con soluciones modulares que equilibran durabilidad, ergonomía y funcionalidad.",
  educacion: "Generación Modular diseña y fabrica mobiliario para espacios educativos que fomentan el aprendizaje y la colaboración. Aulas y áreas comunes con soluciones que combinan funcionalidad y diseño.",
  salud: "Generación Modular diseña y fabrica mobiliario para espacios de salud que priorizan la funcionalidad, higiene y comodidad tanto para profesionales como para pacientes.",
  hospitalidad: "Generación Modular diseña y fabrica mobiliario para espacios de hospitalidad que crean experiencias memorables. Hoteles, restaurantes y espacios de servicio con diseño funcional.",
  retail: "Generación Modular diseña y fabrica mobiliario para espacios comerciales que potencian la experiencia de compra. Exhibiciones y áreas de venta con diseño atractivo y funcional.",
};

const allCategories = getAllCategories();
const projects = allCategories.map((cat, idx) => ({
  num: String(idx + 1).padStart(2, "0"),
  slug: cat.slug,
  title: cat.title,
  image: categoryImages[cat.slug] || "/placeholder.svg",
  description: categoryDescriptions[cat.slug] || "",
  years: cat.years,
}));

const Proyectos = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Servicios Section */}
        <section className="pt-8 md:pt-12 pb-0">
          {/* Header row */}
          <div className="px-6 md:px-8 flex flex-col md:flex-row md:items-end gap-4 md:gap-16 mb-8 md:mb-10">
            <h2 className="font-display text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-black leading-none text-foreground shrink-0">
              Servicios.
            </h2>
            <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed max-w-xs md:pb-2">
              En Generación Modular damos vida a tus proyectos a través de un acompañamiento integral en cuanto a planificación, diseño y fabricación de mobiliario.
            </p>
          </div>

          {/* Desktop: images row + titles row */}
          <div className="hidden md:grid grid-cols-3">
            {services.map((service, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="hidden md:grid grid-cols-3 border-t border-border">
            {services.map((service, i) => (
              <div
                key={i}
                className={`p-5 md:p-6 flex flex-col ${i < services.length - 1 ? "border-r border-border" : ""}`}
              >
                <h3 className="font-display text-lg md:text-xl font-black text-foreground whitespace-pre-line leading-tight mb-4">
                  {service.title}
                </h3>
                <button className="self-start bg-primary text-primary-foreground text-[10px] font-bold px-5 py-2 border-2 border-foreground hover:bg-primary/80 transition-colors tracking-wider mt-auto rounded-[8px]">
                  Ver más
                </button>
              </div>
            ))}
          </div>

          {/* Mobile: image + title paired per card */}
          <div className="md:hidden flex flex-col">
            {services.map((service, i) => (
              <div key={i} className={`${i < services.length - 1 ? "border-b border-border" : ""}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col">
                  <h3 className="font-display text-lg font-black text-foreground whitespace-pre-line leading-tight mb-3">
                    {service.title}
                  </h3>
                  <button className="self-start bg-primary text-primary-foreground text-[10px] font-bold px-5 py-2 border-2 border-foreground hover:bg-primary/80 transition-colors tracking-wider rounded-[8px]">
                    Ver más
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Nuestros Proyectos Section */}
        <section className="bg-primary text-primary-foreground">
          <div className="px-6 md:px-8 py-10 md:py-14">
            <h2 className="font-display text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-black leading-none">
              Nuestros <span className="font-black">PROYECTOS.</span>
            </h2>
          </div>
        </section>

        {/* Projects List */}
        {projects.map((project, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <section
              key={project.num}
              className="border-b border-border"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className={`overflow-hidden md:w-[40%] lg:w-[45%] shrink-0 ${isEven ? "md:order-2" : ""}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: '4/3' }}
                  />
                </div>

                {/* Content */}
                <div className={`px-6 md:px-10 lg:px-14 py-8 md:py-12 flex flex-col gap-6 md:gap-8 md:w-[60%] lg:w-[55%] ${isEven ? "md:order-1" : ""}`}>
                  {/* Title */}
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[2.5rem] md:text-[3rem] font-black text-foreground leading-none">
                      {project.num}
                    </span>
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-foreground self-center" />
                    <span className="font-display text-[1.8rem] md:text-[2.2rem] font-black text-foreground leading-none">
                      {project.title}
                    </span>
                  </div>

                  {/* Separator line — full width */}
                  <div className="border-t border-border -mx-6 md:-mx-10 lg:-mx-14" />

                  {/* Description */}
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-md">
                    {project.description}
                  </p>

                  {/* Year buttons */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.years.map((year) => (
                      <button
                        key={year}
                        onClick={() => navigate(`/proyectos/${project.slug}/${year}`)}
                        className="text-[10px] font-bold px-4 py-1.5 border-2 border-foreground bg-primary text-primary-foreground rounded-[8px] tracking-wider hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200"
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <FooterSection />
      </main>
    </div>
  );
};

export default Proyectos;
