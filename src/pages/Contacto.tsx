import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import FooterSection from "@/components/home/FooterSection";
import heroImg from "@/assets/contact/hero.jpg";
import showroomChairsImg from "@/assets/contact/showroom-chairs.png";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    tipoCliente: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Contacto – Cotiza tu proyecto"
        description="Contáctanos para cotizar tu proyecto de mobiliario. Visita nuestro showroom en Quito. Teléfono: (02) 511-1157. WhatsApp: 098-747-8458."
        canonical="/contacto"
      />
      <Header />

      {/* Hero: Form + Image */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {/* Left: Image */}
          <div className="bg-background">
            <img
              src={heroImg}
              alt="Contáctanos"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Form — stretches to match image height */}
          <div className="bg-background flex flex-col">
            <div className="px-6 md:px-10 pt-8 md:pt-10">
              <h1 className="text-5xl md:text-6xl font-black leading-none mb-6">
                Contáctanos.
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              {/* Nombre + Apellido */}
              <div className="grid grid-cols-2 border-t border-border flex-1 min-h-[90px]">
                <label className="p-5 px-6 md:px-10 flex flex-col justify-center cursor-text">
                  <span className="text-sm font-bold block mb-1">Nombre:</span>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </label>
                <label className="p-5 px-6 md:px-10 border-l border-border flex flex-col justify-center cursor-text">
                  <span className="text-sm font-bold block mb-1">Apellido</span>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </label>
              </div>

              {/* Correo */}
              <label className="border-t border-border p-5 px-6 md:px-10 flex-1 min-h-[90px] flex flex-col justify-center cursor-text">
                <span className="text-sm font-bold block mb-1">Correo:</span>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </label>

              {/* Teléfono */}
              <label className="border-t border-border p-5 px-6 md:px-10 flex-1 min-h-[90px] flex flex-col justify-center cursor-text">
                <span className="text-sm font-bold block mb-1">Número telefónico:</span>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </label>

              {/* Tipo de cliente */}
              <label className="border-t border-border p-5 px-6 md:px-10 flex-1 min-h-[90px] flex flex-col justify-center cursor-text">
                <span className="text-sm font-bold block mb-1">Tipo de cliente:</span>
                <select
                  name="tipoCliente"
                  value={formData.tipoCliente}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm outline-none text-muted-foreground appearance-none cursor-pointer"
                >
                  <option value="">Persona Natural o Empresa / Organización</option>
                  <option value="natural">Persona Natural</option>
                  <option value="empresa">Empresa / Organización</option>
                </select>
              </label>

              {/* Enviar */}
              <div className="border-t border-border p-4 px-6 md:px-10 flex justify-end items-center">
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Red banner: Agenda una asesoría */}
      <section className="bg-primary text-primary-foreground py-5 px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <h2 className="text-2xl md:text-3xl font-black">Agenda una asesoría</h2>
          <span className="text-lg md:text-xl font-bold">098-747-8458</span>
          <a
            href="https://wa.me/5939877490249"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-foreground text-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-primary-foreground hover:opacity-90 hover:-translate-y-1 transition-all duration-200 tracking-wider"
          >
            Whatsapp
          </a>
        </div>
      </section>

      {/* Visita nuestro Showroom */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {/* Left: Showroom title + image */}
          <div className="bg-background p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-black leading-none mb-8">
              Visita nuestro<br />Showroom.
            </h2>
            <img
              src={showroomChairsImg}
              alt="Showroom sillas"
              className="w-full max-w-[604px] h-auto object-cover"
              width={604}
              height={257}
              loading="lazy"
            />
          </div>

          {/* Right: Address + Map */}
          <div className="bg-background p-8 md:p-12 flex flex-col justify-start">
            <div className="text-sm text-muted-foreground space-y-1 mb-6">
              <p>
                <strong className="text-foreground">Dirección:</strong> Avenida Francisco de Orellana y La Colina (esquina)
              </p>
              <p className="text-foreground font-medium">(02) 511-1157</p>
              <p className="text-primary font-medium">(+593)98-779-0249</p>
            </div>

            <div className="w-full h-[280px] md:h-[320px] border border-border overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.5!2d-79.89741!3d-2.15098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d6dae2f1b5f51%3A0x7b8a7c5d9e4f2a1b!2sObjekt1+%7C+Muebles+y+objetos+de+dise%C3%B1o!5e0!3m2!1ses!2sec!4v1700000000000!5m2!1ses!2sec"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Showroom"
              />
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Contacto;
