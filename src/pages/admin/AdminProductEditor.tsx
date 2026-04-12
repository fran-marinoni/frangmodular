import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, X, Plus, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import RelatedProducts from "@/components/RelatedProducts";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  getProductById,
  getDefaultProduct,
  createProduct,
  updateProduct,
  type Product,
  type ProductFeature,
} from "@/lib/productStore";

const AdminProductEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const existing = id ? getProductById(id) : null;
  const defaults = getDefaultProduct();

  const [name, setName] = useState(existing?.name ?? defaults.name);
  const [description, setDescription] = useState(existing?.description ?? defaults.description);
  const [categories, setCategories] = useState(existing?.categories ?? defaults.categories);
  const [activeCategory, setActiveCategory] = useState(existing?.category ?? defaults.category);
  const [thumbnails, setThumbnails] = useState(existing?.thumbnails ?? defaults.thumbnails);
  const [featuresImage, setFeaturesImage] = useState(existing?.featuresImage ?? defaults.featuresImage);
  const [features, setFeatures] = useState<ProductFeature[]>(existing?.features ?? defaults.features);
  const [colors, setColors] = useState(existing?.colors ?? defaults.colors);
  const [accordionSections, setAccordionSections] = useState(existing?.accordionSections ?? defaults.accordionSections);
  const [coverPoster, setCoverPoster] = useState(existing?.coverPoster ?? defaults.coverPoster);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingImageTarget, setPendingImageTarget] = useState<{ type: string; index?: number } | null>(null);

  const handleImageClick = (type: string, index?: number) => {
    setPendingImageTarget({ type, index });
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !pendingImageTarget) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const { type, index } = pendingImageTarget;
      if (type === "poster") setCoverPoster(dataUrl);
      else if (type === "thumbnail" && index !== undefined) {
        const updated = [...thumbnails];
        updated[index] = dataUrl;
        setThumbnails(updated);
      } else if (type === "featuresImage") setFeaturesImage(dataUrl);
      else if (type === "featureImage" && index !== undefined) {
        const updated = [...features];
        updated[index] = { ...updated[index], image: dataUrl };
        setFeatures(updated);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("El nombre del producto es requerido");
      return;
    }
    const data = {
      name,
      enabled: existing?.enabled ?? true,
      category: activeCategory,
      categories,
      description,
      coverVideo: existing?.coverVideo ?? "",
      coverPoster,
      thumbnails,
      featuresImage,
      features,
      colors,
      accordionSections,
    };
    if (isEdit && id) {
      updateProduct(id, data);
    } else {
      createProduct(data);
    }
    navigate("/admin/products");
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Floating toolbar */}
      <div className="fixed top-4 right-4 z-[100] flex gap-2">
        <Button onClick={handleSave} size="sm" className="gap-2 shadow-lg">
          <Save className="h-4 w-4" /> Guardar
        </Button>
        <Button variant="outline" size="sm" className="gap-2 shadow-lg" onClick={() => navigate("/admin/products")}>
          <X className="h-4 w-4" /> Cancelar
        </Button>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelected} />

      <Header />
      <main className="border-t border-border">
        {/* Mirroring ProductSection structure */}
        <section className="relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 w-full min-h-screen">
            {/* Left Column */}
            <div className="px-4 md:px-6 py-3 md:py-4 md:border-r border-border flex flex-col justify-center min-h-0">
              {/* Editable Name */}
              <div className="text-center mb-2 md:mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre del producto."
                  className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none font-black tracking-tight text-center bg-transparent border-none outline-none w-full placeholder:text-muted-foreground/40 focus:ring-2 focus:ring-primary/30 rounded"
                />
              </div>

              {/* Categories */}
              <div className="flex mt-4 md:mt-6 mb-2 md:mb-3 justify-between w-full max-w-xs mx-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs tracking-wider font-medium pb-1 transition-all border-b-2 ${
                      activeCategory === cat
                        ? "border-primary font-bold text-foreground"
                        : "border-transparent text-muted-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Cover poster image (placeholder for video) */}
              <div
                className="relative flex items-center justify-center flex-1 min-h-[300px] cursor-pointer group"
                onClick={() => handleImageClick("poster")}
              >
                {coverPoster ? (
                  <img src={coverPoster} alt="Product" className="w-full max-w-xs md:max-w-2xl mx-auto max-h-[45vh] md:max-h-[60vh] object-contain" />
                ) : (
                  <div className="w-full max-w-xs md:max-w-md mx-auto h-[300px] border-2 border-dashed border-muted-foreground/30 rounded flex items-center justify-center text-muted-foreground text-xs">
                    Click para subir imagen principal
                  </div>
                )}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-primary bg-background/80 px-3 py-1 rounded">Cambiar imagen</span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-2 justify-center">
                {thumbnails.map((thumb, i) => (
                  <div
                    key={i}
                    className="w-11 h-11 md:w-14 md:h-14 border border-border overflow-hidden cursor-pointer group relative"
                    onClick={() => handleImageClick("thumbnail", i)}
                  >
                    {thumb ? (
                      <img src={thumb} alt={`Vista ${i + 1}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center text-[8px] text-muted-foreground">+</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column — details */}
            <div className="flex flex-col">
              {/* Description */}
              <div className="px-6 py-6 border-b border-border">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descripción del producto..."
                  rows={5}
                  className="text-xs leading-relaxed text-muted-foreground max-w-md w-full bg-transparent border border-border rounded p-3 outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>

              {/* Features */}
              <div className="px-6 py-6 border-b border-border">
                <h3 className="font-extrabold text-base mb-4 text-foreground">Características:</h3>
                <div className="flex gap-6 items-start">
                  <div
                    className="relative w-40 h-40 flex-shrink-0 cursor-pointer"
                    onClick={() => handleImageClick("featuresImage")}
                  >
                    {featuresImage ? (
                      <img src={featuresImage} alt="Features" className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full border-2 border-dashed border-muted-foreground/30 rounded flex items-center justify-center text-[9px] text-muted-foreground">
                        Imagen features
                      </div>
                    )}
                  </div>
                  <ul className="text-xs w-full space-y-1">
                    {features.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 py-2">
                        <span className="text-primary font-bold">{item.num}.</span>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => {
                            const updated = [...features];
                            updated[i] = { ...updated[i], label: e.target.value };
                            setFeatures(updated);
                          }}
                          placeholder={`Característica ${i + 1}`}
                          className="bg-transparent border-b border-border outline-none flex-1 py-1 focus:border-primary"
                        />
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={() => setFeatures([...features, { num: String(features.length + 1), label: "", image: "" }])}
                        className="text-primary text-xs flex items-center gap-1 mt-1"
                      >
                        <Plus className="h-3 w-3" /> Agregar
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Colors */}
              <div className="px-6 py-6 border-b border-border">
                <h3 className="font-extrabold text-base mb-3 text-foreground">Colores disponibles:</h3>
                <div className="flex gap-3 items-center flex-wrap">
                  {colors.map((color, i) => (
                    <div key={i} className="relative group">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => {
                          const updated = [...colors];
                          updated[i] = e.target.value;
                          setColors(updated);
                        }}
                        className="w-16 h-12 rounded-sm border-0 cursor-pointer"
                      />
                      {colors.length > 1 && (
                        <button
                          onClick={() => setColors(colors.filter((_, ci) => ci !== i))}
                          className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-4 h-4 flex items-center justify-center text-[8px] opacity-0 group-hover:opacity-100"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => setColors([...colors, "#CCCCCC"])}
                    className="w-12 h-12 rounded-sm border-2 border-dashed border-muted-foreground/30 flex items-center justify-center text-muted-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Accordion sections */}
              <div className="flex flex-col">
                {accordionSections.map((section, i) => (
                  <div key={i} className={i < accordionSections.length - 1 ? "border-b border-border" : ""}>
                    <div className="flex items-center px-6 py-3 gap-2">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => {
                          const updated = [...accordionSections];
                          updated[i] = { ...updated[i], title: e.target.value };
                          setAccordionSections(updated);
                        }}
                        className="font-extrabold text-sm text-foreground bg-transparent border-none outline-none flex-1"
                        placeholder="Título sección"
                      />
                      <button
                        onClick={() => setOpenAccordion(openAccordion === section.title ? null : section.title)}
                      >
                        <ChevronDown className={`w-5 h-5 text-primary transition-transform ${openAccordion === section.title ? "rotate-180" : ""}`} />
                      </button>
                      <button
                        onClick={() => setAccordionSections(accordionSections.filter((_, si) => si !== i))}
                        className="text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    {openAccordion === section.title && (
                      <div className="px-6 pb-3">
                        <textarea
                          value={section.content}
                          onChange={(e) => {
                            const updated = [...accordionSections];
                            updated[i] = { ...updated[i], content: e.target.value };
                            setAccordionSections(updated);
                          }}
                          placeholder="Contenido de esta sección..."
                          rows={3}
                          className="w-full text-xs text-muted-foreground bg-transparent border border-border rounded p-2 outline-none resize-none"
                        />
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setAccordionSections([...accordionSections, { title: "Nueva sección", content: "" }])}
                  className="px-6 py-3 text-primary text-xs flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" /> Agregar sección
                </button>
              </div>
            </div>
          </div>
        </section>

        <RelatedProducts />
      </main>
    </div>
  );
};

export default AdminProductEditor;
