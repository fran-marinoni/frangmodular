import Header from "@/components/Header";
import ProductSection from "@/components/ProductSection";
import RelatedProducts from "@/components/RelatedProducts";

const ApolloProduct = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="border-t border-border">
        <ProductSection />
        <RelatedProducts />
      </main>
    </div>
  );
};

export default ApolloProduct;
