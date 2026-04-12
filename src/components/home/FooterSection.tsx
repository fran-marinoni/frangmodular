import footerLogo from "@/assets/footer-logo.png";
import igIcon from "@/assets/social/instagram.png";
import pinterestIcon from "@/assets/social/pinterest.png";
import tiktokIcon from "@/assets/social/tiktok.png";
import linkedinIcon from "@/assets/social/linkedin.png";

const FooterSection = () => {
  return (
    <>
      {/* CTA Bar */}
      <section className="border-t border-border bg-background">
        <div className="px-6 md:px-8 py-5 md:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h3 className="font-display text-lg md:text-xl font-black leading-tight text-foreground">
            Damos vida a tus proyectos<br />¡Contáctanos!
          </h3>
          <div className="flex items-center gap-5">
            <span className="font-bold text-lg md:text-xl tracking-wide text-foreground">098-747-8458</span>
            <button className="bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider">
              Whatsapp
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="px-6 md:px-8 py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Logo & social */}
            <div className="md:col-span-3">
              <div className="mb-5">
                <img src={footerLogo} alt="Generación Modular" className="h-8 object-contain" />
              </div>
              <div className="flex items-center gap-3 mb-6">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src={igIcon} alt="Instagram" className="w-[18px] h-[18px] object-contain" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src={pinterestIcon} alt="Pinterest" className="w-[15px] h-[15px] object-contain" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src={tiktokIcon} alt="TikTok" className="w-[15px] h-[18px] object-contain" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src={linkedinIcon} alt="LinkedIn" className="w-[18px] h-[18px] object-contain" />
                </a>
              </div>
              <div>
                <p className="text-[10px] opacity-70 mb-2">Suscríbete a nuestro newsletter</p>
                <div className="flex gap-0">
                  <input
                    type="email"
                    placeholder="Email"
                    className="bg-transparent border border-primary-foreground/40 text-[10px] px-3 py-1.5 w-28 placeholder:text-primary-foreground/50 text-primary-foreground"
                  />
                  <button className="bg-primary-foreground text-primary text-[10px] font-bold px-4 py-1.5 tracking-wider border border-primary-foreground/40 -ml-px">
                    ENVIAR
                  </button>
                </div>
              </div>
            </div>

            {/* Showroom */}
            <div className="md:col-span-5">
              <h4 className="font-bold text-[12px] mb-3 tracking-wide">Showroom</h4>
              <div className="text-[10px] opacity-70 space-y-1 leading-relaxed">
                <p>Dirección showroom: Av. Francisco de Orellana 6, Quito, 170517</p>
                <p>Dirección fábrica: Pasaje #63 C</p>
                <p>Atrás del Colegio Británico</p>
                <p>Telf: 02-5111157</p>
                <p>Cel: 098-747-8458</p>
                <p>Horarios de atención: 9am – 6pm</p>
              </div>
            </div>

            {/* Mapa del sitio */}
            <div className="md:col-span-4">
              <h4 className="font-bold text-[12px] mb-3 tracking-wide">Mapa del sitio</h4>
              <ul className="text-[10px] opacity-70 space-y-2">
                <li><a href="/productos/apollo" className="hover:opacity-100 transition-opacity">Productos</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Proyectos</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Nosotros</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Blog</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Contacto</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
