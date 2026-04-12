import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImagePlus, Save, X, Link as LinkIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import AdminLayout from "@/components/admin/AdminLayout";
import { createPost, getPostById, updatePost, getDefaultSections, type BlogSection } from "@/lib/blogStore";

import airportImg from "@/assets/blog/airport.jpg";
import chairsImg from "@/assets/blog/chairs.jpg";

/* ── helpers ── */
const placeholder = (text: string) =>
  "text-foreground/30 italic";

function useImageUpload(initial: string, onChange: (v: string) => void) {
  const ref = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { onChange(reader.result as string); };
    reader.readAsDataURL(file);
  };
  return { ref, handleChange, trigger: () => ref.current?.click() };
}

/* ── component ── */
const AdminBlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [sections, setSections] = useState<BlogSection[]>(getDefaultSections());
  const [saving, setSaving] = useState(false);

  const coverUpload = useImageUpload(coverImage, setCoverImage);

  useEffect(() => {
    if (id) {
      const post = getPostById(id);
      if (post) {
        setTitle(post.title);
        setSubtitle(post.subtitle);
        setCoverImage(post.coverImage);
        setSections(post.sections);
      } else {
        navigate("/admin/blogs", { replace: true });
      }
    }
  }, [id, navigate]);

  const updateSection = (idx: number, patch: Partial<BlogSection>) => {
    setSections((prev) => prev.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  };

  const handleSectionImage = (idx: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => updateSection(idx, { image: reader.result as string });
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleSave = () => {
    if (!title.trim()) return;
    setSaving(true);
    if (isEdit && id) {
      updatePost(id, { title, subtitle, coverImage, sections });
    } else {
      createPost({ title, subtitle, coverImage, sections });
    }
    setTimeout(() => navigate("/admin/blogs"), 300);
  };

  /* ── Editable button with popover ── */
  const EditableButton = ({ sectionIdx }: { sectionIdx: number }) => (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground tracking-wider text-center cursor-pointer hover:bg-primary/90 transition-colors"
        >
          {sections[sectionIdx]?.ctaLabel || "Botón"}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4 space-y-3" side="top" align="start">
        <div>
          <label className="text-[10px] font-bold text-foreground/60 uppercase tracking-wider mb-1 block">Texto del botón</label>
          <input
            type="text"
            value={sections[sectionIdx]?.ctaLabel || ""}
            onChange={(e) => updateSection(sectionIdx, { ctaLabel: e.target.value })}
            maxLength={30}
            placeholder="Texto del botón"
            className="w-full text-xs bg-background border border-border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-foreground/60 uppercase tracking-wider mb-1 flex items-center gap-1"><LinkIcon className="h-3 w-3" /> URL destino</label>
          <input
            type="text"
            value={sections[sectionIdx]?.ctaUrl || ""}
            onChange={(e) => updateSection(sectionIdx, { ctaUrl: e.target.value })}
            placeholder="/productos/apollo"
            className="w-full text-xs bg-background border border-border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </PopoverContent>
    </Popover>
  );

  /* ── Editable image block ── */
  const EditableImage = ({ src, onUpload, height }: { src: string; onUpload: () => void; height: string }) => (
    <div className={`relative group cursor-pointer overflow-hidden ${height}`} onClick={onUpload}>
      {src ? (
        <img src={src} alt="" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-muted/50 flex flex-col items-center justify-center gap-2">
          <ImagePlus className="h-8 w-8 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Click para subir imagen</span>
        </div>
      )}
      <div className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="bg-foreground/70 text-background text-[10px] font-bold px-3 py-1.5 rounded">Cambiar imagen</span>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      {/* Floating toolbar */}
      <div className="fixed top-4 right-8 z-50 flex gap-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors shadow-lg"
        >
          <Save className="h-4 w-4" />
          {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Publicar"}
        </button>
        <button
          onClick={() => navigate("/admin/blogs")}
          className="flex items-center gap-2 bg-background text-foreground text-xs font-bold px-4 py-2.5 rounded-md border border-border hover:bg-muted transition-colors shadow-lg"
        >
          <X className="h-4 w-4" />
          Cancelar
        </button>
      </div>

      {/* ═══════ LIVE TEMPLATE ═══════ */}
      <div className="-mx-8 -mt-8 min-h-screen bg-background text-foreground">

        {/* Hero Title */}
        <section className="border-t border-border py-12 md:py-20 text-center px-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={60}
            placeholder="Título del artículo."
            className={`text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 bg-transparent border-none outline-none text-center w-full ${!title ? placeholder("") : ""}`}
          />
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            maxLength={200}
            placeholder="Subtítulo o descripción breve del artículo..."
            rows={3}
            className={`text-sm leading-relaxed text-foreground/70 max-w-xl mx-auto bg-transparent border-none outline-none resize-none text-center w-full ${!subtitle ? placeholder("") : ""}`}
          />
        </section>

        {/* Full-width cover image */}
        <section>
          <input type="file" accept="image/*" ref={coverUpload.ref} onChange={coverUpload.handleChange} className="hidden" />
          <EditableImage src={coverImage} onUpload={coverUpload.trigger} height="h-[400px] md:h-[550px]" />
        </section>

        {/* Section 0: Text + Image (right) */}
        {sections[0] && (
          <section className="border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_577px] gap-px bg-border">
              <div className="bg-background p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <textarea
                  value={sections[0].textLeft || ""}
                  onChange={(e) => updateSection(0, { textLeft: e.target.value })}
                  maxLength={400}
                  placeholder="Primer bloque de texto..."
                  rows={4}
                  className="text-xs leading-relaxed text-foreground/80 mb-4 bg-transparent border-none outline-none resize-none w-full"
                />
                <textarea
                  value={sections[0].textRight || ""}
                  onChange={(e) => updateSection(0, { textRight: e.target.value })}
                  maxLength={400}
                  placeholder="Segundo bloque de texto..."
                  rows={4}
                  className="text-xs leading-relaxed text-foreground/80 mb-8 bg-transparent border-none outline-none resize-none w-full"
                />
                <div>
                  <EditableButton sectionIdx={0} />
                </div>
              </div>
              <div className="bg-background overflow-hidden md:h-[484px]">
                <EditableImage src={sections[0].image || ""} onUpload={() => handleSectionImage(0)} height="h-full" />
              </div>
            </div>
          </section>
        )}

        {/* Section 1: Quote */}
        {sections[1] && (
          <section className="bg-foreground text-background py-16 md:py-24 px-6 text-center">
            <textarea
              value={sections[1].quoteText || ""}
              onChange={(e) => updateSection(1, { quoteText: e.target.value })}
              maxLength={150}
              placeholder="Frase destacada..."
              rows={3}
              className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight max-w-4xl mx-auto bg-transparent border-none outline-none resize-none text-center w-full text-background placeholder:text-background/30"
            />
          </section>
        )}

        {/* Section 2: Text + Image (right) */}
        {sections[2] && (
          <section className="border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_577px] gap-px bg-border">
              <div className="bg-background p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <textarea
                  value={sections[2].textLeft || ""}
                  onChange={(e) => updateSection(2, { textLeft: e.target.value })}
                  maxLength={400}
                  placeholder="Texto de esta sección..."
                  rows={4}
                  className="text-xs leading-relaxed text-foreground/80 mb-4 bg-transparent border-none outline-none resize-none w-full"
                />
                <textarea
                  value={sections[2].textRight || ""}
                  onChange={(e) => updateSection(2, { textRight: e.target.value })}
                  maxLength={400}
                  placeholder="Más texto..."
                  rows={4}
                  className="text-xs leading-relaxed text-foreground/80 mb-8 bg-transparent border-none outline-none resize-none w-full"
                />
                <div>
                  <EditableButton sectionIdx={2} />
                </div>
              </div>
              <div className="bg-background overflow-hidden md:h-[484px]">
                <EditableImage src={sections[2].image || ""} onUpload={() => handleSectionImage(2)} height="h-full" />
              </div>
            </div>
          </section>
        )}

        {/* Section 3: Image (left) + Text */}
        {sections[3] && (
          <section className="border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-[577px_1fr] gap-px bg-border">
              <div className="bg-background overflow-hidden md:h-[484px]">
                <EditableImage src={sections[3].image || ""} onUpload={() => handleSectionImage(3)} height="h-[400px] md:h-full" />
              </div>
              <div className="bg-background p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <textarea
                  value={sections[3].textLeft || ""}
                  onChange={(e) => updateSection(3, { textLeft: e.target.value })}
                  maxLength={400}
                  placeholder="Texto de esta sección..."
                  rows={4}
                  className="text-xs leading-relaxed text-foreground/80 mb-4 bg-transparent border-none outline-none resize-none w-full"
                />
                <textarea
                  value={sections[3].textRight || ""}
                  onChange={(e) => updateSection(3, { textRight: e.target.value })}
                  maxLength={400}
                  placeholder="Más texto..."
                  rows={4}
                  className="text-xs leading-relaxed text-foreground/80 bg-transparent border-none outline-none resize-none w-full"
                />
              </div>
            </div>
          </section>
        )}

        {/* Section 4: Text + Image (right) */}
        {sections[4] && (
          <section className="border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_577px] gap-px bg-border">
              <div className="bg-background p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <textarea
                  value={sections[4].textLeft || ""}
                  onChange={(e) => updateSection(4, { textLeft: e.target.value })}
                  maxLength={400}
                  placeholder="Texto final..."
                  rows={4}
                  className="text-xs leading-relaxed text-foreground/80 mb-8 bg-transparent border-none outline-none resize-none w-full"
                />
                <div>
                  <EditableButton sectionIdx={4} />
                </div>
              </div>
              <div className="bg-background overflow-hidden md:h-[484px]">
                <EditableImage src={sections[4].image || ""} onUpload={() => handleSectionImage(4)} height="h-full" />
              </div>
            </div>
          </section>
        )}

        {/* Publicaciones recientes (non-editable preview) */}
        <section className="border-t border-border py-16 md:py-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            Publicaciones recientes.
          </h2>
        </section>

        <section className="border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            <div className="bg-background flex flex-col">
              <div className="overflow-hidden">
                <img src={airportImg} alt="Preview" className="w-full h-[280px] md:h-[320px] object-cover opacity-40" />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-black leading-tight text-foreground/40">
                  Artículo relacionado
                </h3>
              </div>
            </div>
            <div className="bg-background flex flex-col">
              <div className="overflow-hidden">
                <img src={chairsImg} alt="Preview" className="w-full h-[280px] md:h-[320px] object-cover opacity-40" />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-black leading-tight text-foreground/40">
                  Artículo relacionado
                </h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogEditor;
