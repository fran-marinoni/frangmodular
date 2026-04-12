import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import logo from "@/assets/logo.png";
import productsChairImg from "@/assets/products-menu-chair.png";
import productsOfficeImg from "@/assets/products-menu-office.png";

const navLinks = [
  { label: "HOME", to: "/" },
  { label: "PRODUCTOS", to: "#" },
  { label: "PROYECTOS", to: "/proyectos" },
  { label: "NOSOTROS", to: "/nosotros" },
  { label: "BLOG", to: "/blog" },
  { label: "CONTACTO", to: "/contacto" },
];

const productCategories = [
  {
    number: "01",
    title: "Sillas.",
    items: ["Ejecutivas", "Operativas", "Visitas", "Barra", "Lounge: Sofas y Poltronas", "Estadio"],
  },
  {
    number: "02",
    title: "Estaciones.",
    items: ["Qoni", "Obliq", "Legan", "Wyre", "Ergoflex", "Home Office"],
  },
  {
    number: "03",
    title: "Flexible Spaces.",
    items: ["Sillas multipropósito", "Mesas y complementos"],
  },
  {
    number: "04",
    title: "Archivo.",
    items: ["Cubik"],
  },
  {
    number: "05",
    title: "Booths.",
    items: ["Meeting Box", "Bus Station", "Booth"],
  },
  {
    number: "06",
    title: "Revestimientos.",
    items: ["Textil acústico", "Eco Board acústico", "Madera acústica", "Madera", "Aluminio"],
  },
  {
    number: "07",
    title: "Educación.",
    items: ["Sillas", "Pupitres", "Complementos"],
  },
  {
    number: "08",
    title: "Accesorios.",
    items: ["Macetas", "Porta libros", "Magazine Rack", "Ganchos de mesa", "Basureros", "Monitores", "Libreros", "Percheros"],
  },
];

const MobileProductsAccordion = ({ categories, onClose }: { categories: typeof productCategories; onClose: () => void }) => {
  const [open, setOpen] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>(null);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium tracking-wider hover:bg-muted transition-colors"
      >
        PRODUCTOS
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {open && (
        <div className="bg-muted/50">
          {categories.map((cat) => (
            <div key={cat.number}>
              <button
                onClick={() => setOpenCat(openCat === cat.number ? null : cat.number)}
                className="w-full flex items-center justify-between px-8 py-2.5 text-xs font-bold tracking-wide hover:bg-muted transition-colors"
              >
                <span>{cat.number} {cat.title}</span>
                {openCat === cat.number ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
              {openCat === cat.number && (
                <ul className="pl-12 pr-6 pb-2 space-y-1">
                  {cat.items.map((item) => (
                    <li key={item}>
                      <button onClick={onClose} className="text-xs text-foreground/70 hover:text-foreground py-0.5">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (productsOpen || mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [productsOpen, mobileOpen]);

  const handleNavClick = (label: string) => {
    if (label === "PRODUCTOS") {
      setProductsOpen(!productsOpen);
    } else {
      setProductsOpen(false);
    }
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 md:px-8 py-4 relative z-50">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Generación Modular" className="h-8 w-8 object-contain" />
          <div className="leading-tight">
            <div className="text-xs font-bold tracking-wide">generación</div>
            <div className="text-xs font-bold tracking-wide">modular</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.label)}
              className={`text-xs tracking-wider font-medium hover:text-primary transition-colors ${
                link.label === "PRODUCTOS" && productsOpen
                  ? "text-primary"
                  : (link.to !== "#" && link.to !== "/" && location.pathname.startsWith(link.to)) || location.pathname === link.to
                  ? "underline decoration-primary underline-offset-4"
                  : ""
              }`}
            >
              {link.label === "PRODUCTOS" ? (
                <span>
                  PRODUCTOS
                  <span className="text-primary ml-0.5">+</span>
                </span>
              ) : link.to !== "#" ? (
                <Link to={link.to} className="text-inherit">
                  {link.label}
                </Link>
              ) : (
                link.label
              )}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* Products Mega Menu */}
      {productsOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setProductsOpen(false)}>
          <div
            className="absolute top-16 left-0 right-0 bg-background border-t border-b border-border shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-[1fr_1.2fr_1fr_1fr] border-border">
              {/* Column 1: Sillas + image */}
              <div className="border-r border-border">
                <div className="p-6 pb-4">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-black">01</span>
                  </div>
                  <h3 className="text-2xl font-black mb-3">Sillas.</h3>
                  <ul className="space-y-1">
                    {productCategories[0].items.map((item) => (
                      <li key={item} className="text-xs text-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={productsChairImg}
                    alt="Silla"
                    className="absolute bottom-0 left-0 w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Column 2: Image + Estaciones */}
              <div className="border-r border-border flex flex-col">
                <div className="flex-1 overflow-hidden">
                  <img
                    src={productsOfficeImg}
                    alt="Oficina"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-black">02</span>
                  </div>
                  <h3 className="text-2xl font-black mb-3">Estaciones.</h3>
                  <ul className="space-y-1">
                    {productCategories[1].items.map((item) => (
                      <li key={item} className="text-xs text-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Columns 3+4: Grid 2x3 for categories 03-08 */}
              <div className="col-span-2 grid grid-cols-2 grid-rows-3">
                {productCategories.slice(2).map((cat, i) => (
                  <div
                    key={cat.number}
                    className={`p-6 ${i % 2 === 0 ? "border-r border-border" : ""} ${i < 4 ? "border-b border-border" : ""}`}
                  >
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-lg font-black">{cat.number}</span>
                      <h3 className="text-lg font-black">{cat.title}</h3>
                    </div>
                    {cat.number === "08" ? (
                      <div className="grid grid-cols-2 gap-x-4">
                        <ul className="space-y-1">
                          {cat.items.slice(0, 4).map((item) => (
                            <li key={item} className="text-xs text-foreground">{item}</li>
                          ))}
                        </ul>
                        <ul className="space-y-1">
                          {cat.items.slice(4).map((item) => (
                            <li key={item} className="text-xs text-foreground">{item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <ul className="space-y-1">
                        {cat.items.map((item) => (
                          <li key={item} className="text-xs text-foreground">{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile slide-in menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-foreground/40" />
          <div
            className="absolute top-0 left-0 h-full w-[300px] bg-background shadow-xl animate-in slide-in-from-left duration-300 flex flex-col overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                <img src={logo} alt="Generación Modular" className="h-7 w-7 object-contain" />
                <div className="leading-tight">
                  <div className="text-xs font-bold tracking-wide">generación</div>
                  <div className="text-xs font-bold tracking-wide">modular</div>
                </div>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col py-2">
              {navLinks.map((link) => {
                if (link.label === "PRODUCTOS") {
                  return (
                    <MobileProductsAccordion key={link.label} categories={productCategories} onClose={() => setMobileOpen(false)} />
                  );
                }
                return (
                  <Link
                    key={link.label}
                    to={link.to === "#" ? "#" : link.to}
                    onClick={() => setMobileOpen(false)}
                    className="px-6 py-3 text-sm font-medium tracking-wider hover:bg-muted transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
