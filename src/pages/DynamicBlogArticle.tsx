import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import FooterSection from "@/components/home/FooterSection";
import { getPostBySlug, getAllPosts } from "@/lib/blogStore";
import NotFound from "./NotFound";

const DynamicBlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <NotFound />;

  const recentPosts = getAllPosts().filter((p) => p.id !== post.id).slice(0, 2);
  const s = post.sections;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Title */}
      <section className="border-t border-border py-12 md:py-20 text-center px-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6">
          {post.title}
        </h1>
        {post.subtitle && (
          <p className="text-sm leading-relaxed text-foreground/70 max-w-xl mx-auto">
            {post.subtitle}
          </p>
        )}
      </section>

      {/* Full-width cover image */}
      <section>
        <img src={post.coverImage} alt={post.title} className="w-full h-[400px] md:h-[550px] object-cover" />
      </section>

      {/* Section 0: Text + Image right */}
      {s[0] && (s[0].textLeft || s[0].textRight || s[0].image) && (
        <section className="border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_577px] gap-px bg-border">
            <div className="bg-background p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              {s[0].textLeft && <p className="text-xs leading-relaxed text-foreground/80 mb-4">{s[0].textLeft}</p>}
              {s[0].textRight && <p className="text-xs leading-relaxed text-foreground/80 mb-8">{s[0].textRight}</p>}
              {s[0].ctaLabel && (
                <div>
                  {s[0].ctaUrl ? (
                    <Link to={s[0].ctaUrl} className="bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider inline-block">
                      {s[0].ctaLabel}
                    </Link>
                  ) : (
                    <button className="bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider">
                      {s[0].ctaLabel}
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="bg-background overflow-hidden md:h-[484px]">
              {s[0].image && <img src={s[0].image} alt="" className="w-full h-full object-cover" loading="lazy" />}
            </div>
          </div>
        </section>
      )}

      {/* Section 1: Quote */}
      {s[1]?.quoteText && (
        <section className="bg-foreground text-background py-16 md:py-24 px-6 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight max-w-4xl mx-auto">
            {s[1].quoteText}
          </h2>
        </section>
      )}

      {/* Section 2: Text + Image right */}
      {s[2] && (s[2].textLeft || s[2].textRight || s[2].image) && (
        <section className="border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_577px] gap-px bg-border">
            <div className="bg-background p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              {s[2].textLeft && <p className="text-xs leading-relaxed text-foreground/80 mb-4">{s[2].textLeft}</p>}
              {s[2].textRight && <p className="text-xs leading-relaxed text-foreground/80 mb-8">{s[2].textRight}</p>}
              {s[2].ctaLabel && (
                <div>
                  {s[2].ctaUrl ? (
                    <Link to={s[2].ctaUrl} className="bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider inline-block">
                      {s[2].ctaLabel}
                    </Link>
                  ) : (
                    <button className="bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider">
                      {s[2].ctaLabel}
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="bg-background overflow-hidden md:h-[484px]">
              {s[2].image && <img src={s[2].image} alt="" className="w-full h-full object-cover" loading="lazy" />}
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Image left + Text */}
      {s[3] && (s[3].textLeft || s[3].textRight || s[3].image) && (
        <section className="border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-[577px_1fr] gap-px bg-border">
            <div className="bg-background overflow-hidden md:h-[484px]">
              {s[3].image && <img src={s[3].image} alt="" className="w-full h-[400px] md:h-full object-cover" loading="lazy" />}
            </div>
            <div className="bg-background p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              {s[3].textLeft && <p className="text-xs leading-relaxed text-foreground/80 mb-4">{s[3].textLeft}</p>}
              {s[3].textRight && <p className="text-xs leading-relaxed text-foreground/80">{s[3].textRight}</p>}
            </div>
          </div>
        </section>
      )}

      {/* Section 4: Text + Image right */}
      {s[4] && (s[4].textLeft || s[4].image) && (
        <section className="border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_577px] gap-px bg-border">
            <div className="bg-background p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              {s[4].textLeft && <p className="text-xs leading-relaxed text-foreground/80 mb-8">{s[4].textLeft}</p>}
              {s[4].ctaLabel && (
                <div>
                  {s[4].ctaUrl ? (
                    <Link to={s[4].ctaUrl} className="bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider inline-block">
                      {s[4].ctaLabel}
                    </Link>
                  ) : (
                    <button className="bg-primary text-primary-foreground text-[11px] font-bold px-8 py-3 rounded-[10px] border-2 border-foreground hover:bg-primary/80 hover:-translate-y-1 transition-all duration-200 tracking-wider">
                      {s[4].ctaLabel}
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="bg-background overflow-hidden md:h-[484px]">
              {s[4].image && <img src={s[4].image} alt="" className="w-full h-full object-cover" loading="lazy" />}
            </div>
          </div>
        </section>
      )}

      {/* Publicaciones recientes */}
      {recentPosts.length > 0 && (
        <>
          <section className="border-t border-border py-16 md:py-20 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              Publicaciones recientes.
            </h2>
          </section>
          <section className="border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {recentPosts.map((rp) => (
                <Link to={`/blog/${rp.slug}`} key={rp.id} className="bg-background flex flex-col">
                  <div className="overflow-hidden">
                    <img src={rp.coverImage} alt={rp.title} loading="lazy" className="w-full h-[280px] md:h-[320px] object-cover" />
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl md:text-3xl font-black leading-tight">{rp.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      <FooterSection />
    </div>
  );
};

export default DynamicBlogArticle;
