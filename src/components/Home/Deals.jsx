import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getDealProducts } from "../../services/ProductService";

const Deals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getDealProducts().then((data) => setProducts(data));
  }, []);

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          🔥 Deals of the Week
        </h2>

        <p className="text-gray-600 text-center text-sm md:text-base mb-10 md:mb-12">
          Grab these amazing outdoor products at discounted prices.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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

export default Deals;