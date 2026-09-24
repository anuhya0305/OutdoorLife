import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/ProductService";
import ProductCard from "../../components/Home/ProductCard";
import SearchBar from "../../components/Shop/SearchBar";
import CategoryFilter from "../../components/Shop/CategoryFilter";
import SortDropdown from "../../components/Shop/SortDropdown";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  if (sortOrder === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOrder === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="pt-8 md:pt-12 pb-12 md:pb-20 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Shop Outdoor Gear
        </h1>

        <p className="text-center text-gray-500 text-sm md:text-base mt-3">
          Search your favorite camping equipment.
        </p>

        <div className="flex flex-col lg:flex-row gap-4 mt-8 md:mt-10 mb-8 md:mb-10">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <SortDropdown
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Shop;