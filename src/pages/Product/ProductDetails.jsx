import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/ProductService";
import { FaShoppingCart, FaHeart, FaStar } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProducts().then((data) => {
      const selected = data.find(
        (item) => String(item.id) === String(id)
       );
      setProduct(selected);
    });
  }, [id]);

  if (!product) {
    return (
      <h2 className="text-center text-2xl mt-40">
        Loading...
      </h2>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="pt-28 pb-20 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 grid md:grid-cols-2 gap-10">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[500px] object-cover rounded-xl"
        />

        <div>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold mt-5">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-5">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mt-5">
            <FaStar className="text-yellow-400" />
            <span>{product.rating}</span>
          </div>

          <div className="mt-6">
            <span className="text-4xl font-bold text-green-700">
              ₹{product.price}
            </span>

            <span className="ml-4 line-through text-gray-400 text-xl">
              ₹{product.oldPrice}
            </span>
          </div>

          <p className="mt-6 font-semibold">
            Stock : {product.stock}
          </p>

          <div className="flex gap-5 mt-8">

            <button
              onClick={handleAddToCart}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            <button className="border px-6 py-3 rounded-lg hover:bg-red-500 hover:text-white">
              <FaHeart />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;