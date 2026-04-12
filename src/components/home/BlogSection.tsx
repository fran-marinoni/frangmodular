import blogImage from "@/assets/home/blog-image.jpg";

const BlogSection = () => {
  return (
    <section className="border-t border-border">
      <div className="flex flex-col md:flex-row md:items-stretch md:h-[204px]">
        {/* "Blog." — left */}
        <div className="flex items-center px-6 md:px-8 py-6 md:py-0">
          <h2 className="font-display text-[2.8rem] md:text-[3.2rem] lg:text-[4rem] font-black text-foreground leading-none">
            Blog.
          </h2>
        </div>

        {/* Spacer to push text+image to the right */}
        <div className="hidden md:block flex-1" />

        {/* Text — next to image */}
        <div className="flex flex-col justify-center px-6 md:px-8 py-6 md:py-0 md:shrink-0">
          <h3 className="font-display text-lg md:text-xl font-black text-foreground mb-2">
            Back to the 90s.
          </h3>
          <p className="text-[10px] text-muted-foreground leading-relaxed max-w-[280px]">
            Haga que los escritorios de trabajo pequeños se sientan grandes y atractivos.
          </p>
        </div>

        {/* Image — 245x204 */}
        <div className="md:w-[245px] md:h-[204px] shrink-0 overflow-hidden">
          <img src={blogImage} alt="Blog" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
