import { Link } from "react-router-dom";
import Header from "@/components/Header";
import FooterSection from "@/components/home/FooterSection";

import heroImg from "@/assets/home/blog-image.jpg";
import retroImg from "@/assets/blog/retro-items.jpg";
import yellowArtImg from "@/assets/blog/yellow-art.jpg";
import officeMeetingImg from "@/assets/blog/office-meeting.jpg";
import darkOfficeImg from "@/assets/blog/dark-office.jpg";
import airportImg from "@/assets/blog/airport.jpg";
import chairsImg from "@/assets/blog/chairs.jpg";

const BlogArticle90s = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Title */}
      <section className="border-t border-border py-12 md:py-20 text-center px-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6">
          Back to the 90s.
        </h1>
        <p className="text-sm leading-relaxed text-foreground/70 max-w-xl mx-auto">
          Un recorrido por la década en la que nació Generación Modular. Exploramos cómo la
          estética, la cultura y la innovación de los 90 siguen influyendo en nuestra nueva
          campaña y en la forma en que concebimos los espacios hoy.
        </p>
      </section>

      {/* Full-width hero image */}
      <section>
        <img
          src={heroImg}
          alt="Back to the 90s"
          className="w-full h-[400px] md:h-[550px] object-cover"
        />
      </section>

      {/* Text + retro image */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_577px] gap-px bg-border">
          <div className="bg-background p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <p className="text-xs leading-relaxed text-foreground/80 mb-4">
              Hay décadas que no solo pasan, sino que se quedan. Los años 90 fueron una
              de esas memorias donde todo parecía estar en transición: lo análogo y lo
              digital convivían, el diseño comenzaba a explorar nuevas formas y las
              marcas empezaban a construir identidades más cercanas, más humanas. En
              medio de ese contexto nació Generación Modular.
            </p>
            <p className="text-xs leading-relaxed text-foreground/80 mb-8">
              Volver a los 90 no es solo un ejercicio de nostalgia. Es una forma de
              reconectar con el origen de una marca y su manera de pensar el diseño: práctico,
              funcional, pero también abierto y experimental. En esa época, los espacios
              corporativos empezaban a transformarse, pasando de estructuras rígidas
              para dar paso a configuraciones más dinámicas. La modularidad no era solo
              una solución técnica, era una respuesta a nuevas formas de trabajar.
            </p>
            <div>
              <button className="bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider">
                Ver Film
              </button>
            </div>
          </div>
          <div className="bg-background overflow-hidden md:h-[484px]">
            <img
              src={retroImg}
              alt="Objetos retro de los 90"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Big quote */}
      <section className="bg-foreground text-background py-16 md:py-24 px-6 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight max-w-4xl mx-auto">
          Volver a los 90 no es solo un ejercicio de nostalgia.
        </h2>
      </section>

      {/* Text left + office image right */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_577px] gap-px bg-border">
          <div className="bg-background p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <p className="text-xs leading-relaxed text-foreground/80 mb-4">
              Nuestra nueva campaña tiene ese espíritu, como punto de partida.
              Colores, texturas y referencias visuales evocan una estética que
              invitó a toda una generación pero reinterpretada desde el presente.
              No se trata de repetir el pasado, sino de entender que lo hecho
              relevante y traerlo a hoy con intención.
            </p>
            <p className="text-xs leading-relaxed text-foreground/80 mb-8">
              En los 90, diseñar implicaba resolver. Hoy, además de resolver, implica
              conectar. Sin embargo, hoy algo que no ha cambiado es la importancia
              de crear espacios que funcionen, que se adapten y que acompañen a
              las personas en su día a día. Esa idea sigue siendo el centro de lo que
              hacemos.
            </p>
            <div>
              <button className="bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider">
                Ver Línea Legan
              </button>
            </div>
          </div>
          <div className="bg-background overflow-hidden md:h-[484px]">
            <img
              src={officeMeetingImg}
              alt="Oficina moderna"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Yellow art + text */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-[577px_1fr] gap-px bg-border">
          <div className="bg-background overflow-hidden md:h-[484px]">
            <img
              src={yellowArtImg}
              alt="Arte contemporáneo"
              loading="lazy"
              className="w-full h-[400px] md:h-full object-cover"
            />
          </div>
          <div className="bg-background p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <p className="text-xs leading-relaxed text-foreground/80 mb-4">
              En ese regreso también reposa una reflexión sobre el ritmo. Los 90
              tenían otra velocidad, otro tipo de atención al detalle. Hoy, en un
              contexto mucho más acelerado, nuestros espacios se vuelven
              relevantes. Pensar los espacios con intención, entender cómo se
              habitan y cómo evolucionan, es parte de un diseño que no responde
              solo a tendencias, sino a necesidades reales.
            </p>
            <p className="text-xs leading-relaxed text-foreground/80">
              Mirar atrás también nos permite reconocer la capacidad de
              adaptación que ha definido a Generación Modular desde sus inicios.
              Lo modular no es solo un sistema constructivo, es una lógica de
              pensamiento flexible, escalable, abierta al cambio. Ese principio, que
              comenzó a tomar forma en los 90, sigue guiando cada proyecto, cada
              decisión y cada espacio que diseñamos.
            </p>
          </div>
        </div>
      </section>

      {/* CTA + dark office image side by side */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_577px] gap-px bg-border">
          <div className="bg-background p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <p className="text-xs leading-relaxed text-foreground/80 mb-8">
              "Back to the 90's" es, en el fondo, una forma de reconocer por qué
              empezamos. Una pausa para mirar atrás y reconocer que muchas de
              las decisiones que tomamos hoy tienen su raíz en ese momento inicial.
              Porque entender de dónde venimos también es una forma de
              proyectar hacia dónde vamos.
            </p>
            <div>
              <button className="bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider">
                Ver catálogo completo
              </button>
            </div>
          </div>
          <div className="bg-background overflow-hidden md:h-[484px]">
            <img
              src={darkOfficeImg}
              alt="Oficina moderna"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Publicaciones recientes */}
      <section className="border-t border-border py-16 md:py-20 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
          Publicaciones recientes.
        </h2>
      </section>

      <section className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          <div className="bg-background flex flex-col">
            <div className="overflow-hidden">
              <img src={airportImg} alt="Aeropuerto Mariscal Sucre" loading="lazy" className="w-full h-[280px] md:h-[320px] object-cover" />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-black leading-tight">
                Aeropuerto<br />Mariscal Sucre.
              </h3>
            </div>
          </div>
          <div className="bg-background flex flex-col">
            <div className="overflow-hidden">
              <img src={chairsImg} alt="La comodidad no se negocia" loading="lazy" className="w-full h-[280px] md:h-[320px] object-cover" />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-black leading-tight">
                La comodidad<br />no se negocia.
              </h3>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default BlogArticle90s;
