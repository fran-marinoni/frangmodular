import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import FooterSection from "@/components/home/FooterSection";
import { getCategoryBySlug } from "@/lib/projectsData";
import NotFound from "@/pages/NotFound";

const ProyectoCategoria = () => {
  const { category, year } = useParams();
  const navigate = useNavigate();
  const data = category ? getCategoryBySlug(category) : undefined;

  if (!data || !year || !data.years.includes(year)) return <NotFound />;

  const items = data.projects[year] || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Title row */}
        <section className="px-6 md:px-8 pt-8 md:pt-12 pb-6">
          <div className="flex items-end justify-between">
            <h1 className="font-display text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-black leading-none text-foreground">
              {data.title}
            </h1>
            <span className="font-display text-[2rem] md:text-[3rem] lg:text-[4rem] font-black leading-none text-primary">
              {year}
            </span>
          </div>
        </section>

        {/* Projects grid */}
        <section className="px-0">
          {items.length === 0 ? (
            <div className="px-6 md:px-8 py-20 text-center">
              <p className="text-muted-foreground text-sm">No hay proyectos para este año.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3">
              {items.map((item, i) => (
                <div key={i} className="relative group overflow-hidden">
                  {/* Image */}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Overlay with name + button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 md:p-6">
                    <h3 className="font-display text-sm md:text-lg lg:text-xl font-black text-white leading-tight whitespace-pre-line mb-2 md:mb-3">
                      {item.name}
                    </h3>
                    <button className="self-start bg-primary text-primary-foreground text-[9px] md:text-[10px] font-bold px-4 py-1.5 border-2 border-primary rounded-[8px] tracking-wider hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200">
                      Ver proyecto
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Year navigation */}
        <section className="px-6 md:px-8 py-8 flex flex-wrap gap-2 justify-center">
          {data.years.map((y) => (
            <button
              key={y}
              onClick={() => navigate(`/proyectos/${category}/${y}`)}
              className={`text-[10px] font-bold px-4 py-1.5 border-2 rounded-[8px] tracking-wider transition-all duration-200 hover:-translate-y-1 ${
                y === year
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-foreground bg-primary text-primary-foreground hover:bg-primary/80"
              }`}
            >
              {y}
            </button>
          ))}
        </section>

        <FooterSection />
      </main>
    </div>
  );
};

export default ProyectoCategoria;
