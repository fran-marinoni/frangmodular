import { Link } from "react-router-dom";
import Header from "@/components/Header";
import FooterSection from "@/components/home/FooterSection";

import heroImg from "@/assets/home/blog-image.jpg";
import airportImg from "@/assets/blog/airport.jpg";
import chairsImg from "@/assets/blog/chairs.jpg";
import loungeImg from "@/assets/blog/lounge.jpg";

const blogPosts = [
  {
    image: airportImg,
    title: "Aeropuerto Mariscal Sucre.",
    description:
      "Conoce nuestra participación en la ampliación de la terminal del aeropuerto de Quito. Un proyecto que responde a nuevas dinámicas de movilidad, optimizando funcionalidad, flujo y confort para miles de usuarios diarios.",
  },
  {
    image: chairsImg,
    title: "La comodidad no se negocia.",
    description:
      "Descubre cómo nuestra línea de sillas de oficina combina ergonomía, tecnología y diseño para mejorar la postura, aumentar la productividad y adaptarse a distintos entornos laborales.",
  },
  {
    image: loungeImg,
    title: "35 años de Generación Modular.",
    description:
      "Un vistazo a la trayectoria de Generación Modular, desde sus inicios hasta hoy. Tres décadas y media desarrollando soluciones para espacios corporativos, educativos, hospitalarios y de hospitalidad.",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          <div className="overflow-hidden">
            <img
              src={heroImg}
              alt="Back to the 90s"
              loading="lazy"
              className="w-full h-[350px] md:h-[500px] object-cover"
            />
          </div>
          <div className="bg-background p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6">
              Back to<br />the 90s.
            </h1>
            <p className="text-sm leading-relaxed text-foreground/70 max-w-md mb-8">
              Un recorrido por la década en la que nació Generación Modular.
              Exploramos cómo la estética, la cultura y la innovación de los 90
              siguen influyendo en nuestra nueva campaña y en la forma en que
              concebimos los espacios hoy.
            </p>
            <div>
              <Link to="/blog/back-to-the-90s">
                <button className="bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider">
                  Artículo completo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Cards */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {blogPosts.map((post, i) => (
            <div key={i} className="bg-background flex flex-col">
              <div className="overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-[250px] md:h-[280px] object-cover"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h2 className="text-2xl md:text-3xl font-black leading-tight mb-4">
                  {post.title}
                </h2>
                <p className="text-xs leading-relaxed text-foreground/70 mb-6 flex-1">
                  {post.description}
                </p>
                <div>
                  <button className="bg-primary text-primary-foreground text-[11px] font-bold px-6 py-2.5 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider">
                    Artículo completo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Blog;
