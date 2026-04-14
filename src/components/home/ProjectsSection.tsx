import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import proyCorporativo from "@/assets/home/proy-corporativo.webp";
import proyEducacion from "@/assets/home/proy-educacion.webp";
import proySalud from "@/assets/home/proy-salud.webp";
import proyHospitalidad from "@/assets/home/proy-hospitalidad.webp";

const projectTypes = [
  { num: "01", label: "Corporativo.", image: proyCorporativo },
  { num: "02", label: "Educación.", image: proyEducacion },
  { num: "03", label: "Salud.", image: proySalud },
  { num: "04", label: "Hospitalidad.", image: proyHospitalidad },
];

const ProjectsSection = () => {
  return (
    <section className="border-t border-border pt-12 md:pt-16 pb-0">
      <div className="px-6 md:px-8">
        <Link to="/proyectos" className="font-display text-[2.5rem] md:text-[3rem] lg:text-[3.8rem] font-black mb-10 md:mb-12 text-foreground text-right leading-tight block hover:opacity-80 transition-opacity">
          Nuestros <span className="font-black">PROYECTOS.</span>
        </Link>
      </div>

      {/* Mobile */}
      <div className="md:hidden grid grid-cols-2 gap-px bg-border border-t border-border">
        {projectTypes.map((proj) => (
          <Link key={proj.num} to="/proyectos" className="flex flex-col">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src={proj.image} alt={`Proyecto ${proj.label}`} loading="lazy" width={400} height={533} className="w-full h-full object-cover" />
            </div>
            <div className="bg-background px-4 py-4 flex flex-col items-end text-right border-t border-border">
              <span className="font-display text-[32px] font-black text-foreground leading-none">
                {proj.num}
              </span>
              <div className="flex items-center gap-1 mt-1">
                <ArrowRight className="w-4 h-4 text-foreground" aria-hidden="true" />
                <span className="font-bold text-[16px] text-foreground leading-tight">{proj.label}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <div className="grid grid-cols-4 gap-px bg-border border-t border-border">
          {projectTypes.map((proj) => (
            <div key={proj.num} className="relative aspect-[3/4] overflow-hidden">
              <img src={proj.image} alt={`Proyecto ${proj.label}`} loading="lazy" width={400} height={533} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-px bg-border border-t border-border">
          {projectTypes.map((proj) => (
            <Link
              key={proj.num}
              to="/proyectos"
              className="bg-background px-5 py-6 md:px-6 md:py-8 flex flex-col items-end text-right hover:opacity-80 transition-opacity"
            >
              <span className="font-display text-[40px] md:text-[50px] font-black text-foreground leading-none">
                {proj.num}
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <ArrowRight className="w-5 h-5 text-foreground" aria-hidden="true" />
                <span className="font-bold text-[22px] md:text-[26px] text-foreground leading-tight">{proj.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
