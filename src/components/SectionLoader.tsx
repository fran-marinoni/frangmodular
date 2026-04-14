/**
 * Shared section-level loading screen.
 * Matches the brand preloader used across the app (Proyectos, Sillas, etc.).
 */
const SectionLoader = ({ label = "Cargando" }: { label?: string }) => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background gap-6">
    <h2 className="font-display text-[2rem] md:text-[2.5rem] font-black tracking-tighter text-foreground leading-none">
      Generación<br />
      <span className="font-normal italic">Modular.</span>
    </h2>
    <div className="w-48 md:w-64 h-[3px] bg-muted rounded-full overflow-hidden">
      <div className="h-full bg-primary rounded-full animate-loading-grow" />
    </div>
    <p className="text-muted-foreground text-xs tracking-widest uppercase">{label}</p>
  </div>
);

export default SectionLoader;
