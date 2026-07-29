import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "../../services/productService";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getFeaturedProducts().then((data) => setProducts(data));
  }, []);

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-14">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;