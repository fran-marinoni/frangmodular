import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import HeroSection from "@/components/home/HeroSection";
import ModularitySection from "@/components/home/ModularitySection";
import ProductsGrid from "@/components/home/ProductsGrid";
import ProjectsSection from "@/components/home/ProjectsSection";
import BlogSection from "@/components/home/BlogSection";
import ContactSection from "@/components/home/ContactSection";
import FooterSection from "@/components/home/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Generación Modular | Mobiliario modular para oficinas desde 1990"
        description="Diseño y fabricación de mobiliario modular para oficinas, espacios educativos, de salud, hospitalidad y retail. Más de 35 años de experiencia en Ecuador."
        canonical="/"
      />
      <main>
        <HeroSection />
        <ModularitySection />
        <ProductsGrid />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
        <FooterSection />
      </main>
    </div>
  );
};

export default Index;
