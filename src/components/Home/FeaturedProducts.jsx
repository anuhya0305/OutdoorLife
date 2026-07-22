import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../../services/productService";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-[1400px] mx-auto px-8">

        <h2 className="text-4xl font-bold text-center mb-14">
          Featured Products
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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