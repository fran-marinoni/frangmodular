import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import ProductSection from "@/components/ProductSection";
import RelatedProducts from "@/components/RelatedProducts";

const ApolloProduct = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Apollo – Silla ejecutiva ergonómica"
        description="Silla ejecutiva Apollo de Generación Modular. Diseño ergonómico con cabecero, apoyabrazos fijos, mecanismo Knee Tilt y base de aluminio. Disponible en 3 colores."
        canonical="/productos/apollo"
        ogType="product"
      />
      <Header />
      <main className="border-t border-border">
        <ProductSection />
        <RelatedProducts />
      </main>
    </div>
  );
};

export default ApolloProduct;
