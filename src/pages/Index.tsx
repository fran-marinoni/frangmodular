import { lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import HeroSection from "@/components/home/HeroSection";

const ModularitySection = lazy(() => import("@/components/home/ModularitySection"));
const ProductsGrid = lazy(() => import("@/components/home/ProductsGrid"));
const ProjectsSection = lazy(() => import("@/components/home/ProjectsSection"));
const BlogSection = lazy(() => import("@/components/home/BlogSection"));
const ContactSection = lazy(() => import("@/components/home/ContactSection"));
const FooterSection = lazy(() => import("@/components/home/FooterSection"));

const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="min-h-[200px]" />}>
    {children}
  </Suspense>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Generación Modular | Mobiliario modular para oficinas desde 1990"
        description="Diseño y fabricación de mobiliario modular para oficinas, espacios educativos, de salud, hospitalidad y retail. Más de 35 años de experiencia en Ecuador."
        canonical="/"
      />
      <Header />
      <main>
        <HeroSection />
        <LazySection><ModularitySection /></LazySection>
        <LazySection><ProductsGrid /></LazySection>
        <LazySection><ProjectsSection /></LazySection>
        <LazySection><BlogSection /></LazySection>
        <LazySection><ContactSection /></LazySection>
        <LazySection><FooterSection /></LazySection>
      </main>
    </div>
  );
};

export default Index;
