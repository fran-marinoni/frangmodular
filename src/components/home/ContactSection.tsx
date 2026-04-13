import contact1 from "@/assets/home/contact-1-opt.webp";
import contact2 from "@/assets/home/contact-2-opt.webp";
import logo from "@/assets/logo-opt.webp";

const ContactSection = () => {
  return (
    <section className="border-t border-b border-border">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr]">
        {/* Left — Conecta */}
        <div className="px-6 md:px-8 py-10 md:py-14">
          <h2 className="font-display text-[1.8rem] md:text-[2.2rem] font-black mb-5 text-foreground leading-tight">
            Conecta<br />con nosotros.
          </h2>

          <div className="flex items-start gap-3 mb-5">
            <img src={logo} alt="Generación Modular" width={40} height={40} className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm text-foreground">generación.modular</p>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[320px]">
                Creamos espacios de trabajo con infinitas posibilidades de diseño desde 1990. Oficinas | Hospitales | Educación
                <br />Catálogo de oficinas y sillas 2025
              </p>
            </div>
          </div>

          {/* Instagram images */}
          <div className="flex gap-2 mb-5">
            <div className="flex-1 aspect-square overflow-hidden">
              <img src={contact1} alt="Oficina moderna" loading="lazy" width={300} height={300} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 aspect-square overflow-hidden">
              <img src={contact2} alt="Sala de reuniones moderna" loading="lazy" width={300} height={300} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <a href="#" className="text-xs font-bold bg-[#333333] text-white px-4 py-2 rounded-[10px] border border-foreground hover:opacity-90 transition-opacity">
              Load more
            </a>
            <a href="#" className="text-xs font-bold bg-[#528BCC] text-white px-4 py-2 rounded-[10px] border border-foreground hover:opacity-90 transition-opacity">
              Follow on Instagram
            </a>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="hidden md:block bg-border" />

        {/* Right — Showroom */}
        <div className="px-6 md:px-8 py-10 md:py-14">
          <h2 className="font-display text-[1.8rem] md:text-[2.2rem] font-black mb-5 text-foreground leading-tight">
            Visita nuestro<br />Showroom.
          </h2>
          <div className="text-sm text-muted-foreground space-y-1 mb-5">
            <p><strong className="text-foreground">Dirección:</strong> Avenida Francisco de Orellana y La Colina (esquina)</p>
            <p className="text-foreground font-medium">(02) 511-1157</p>
            <p className="text-[#E1553E] font-medium">(+593)98-779-0249</p>
          </div>

          {/* Google Maps embed */}
          <div className="w-full h-[250px] md:h-[280px] border border-border overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.5!2d-79.89741!3d-2.15098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d6dae2f1b5f51%3A0x7b8a7c5d9e4f2a1b!2sObjekt1+%7C+Muebles+y+objetos+de+dise%C3%B1o!5e0!3m2!1ses!2sec!4v1700000000000!5m2!1ses!2sec"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Showroom Generación Modular en Quito"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
