import chairLumi from "@/assets/chair-lumi.png";
import chairUnique from "@/assets/chair-unique.png";
import chairClark from "@/assets/chair-clark.png";

const products = [
  { name: "Lumi.", image: chairLumi },
  { name: "Unique.", image: chairUnique },
  { name: "Clark.", image: chairClark },
];

const RelatedProducts = () => {
  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl px-8 py-10 font-extrabold text-foreground">
          Te podría interesar.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-border">
          {products.map((product, index) => (
            <div
              key={product.name}
              className={`group cursor-pointer p-8 hover:bg-muted/30 transition-colors ${
                index < products.length - 1 ? "md:border-r border-border" : ""
              } ${index > 0 ? "border-t md:border-t-0 border-border" : ""}`}
            >
              <h3 className="font-extrabold text-lg mb-6 text-foreground">{product.name}</h3>
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  width={512}
                  height={512}
                  className={`w-full object-contain group-hover:scale-105 transition-transform duration-300 ${
                    product.name === "Lumi." ? "h-64" : "h-72 md:h-80"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
