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
      <Header />
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
