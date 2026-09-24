import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { addToWishlist } from "../../redux/wishlistSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/ProductService";
import { FaShoppingCart, FaHeart, FaStar } from "react-icons/fa";
import Reviews from "./components/Reviews";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (state) => state.wishlist.wishlistItems
  );

  const [product, setProduct] = useState(null);

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product?.id
  );
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
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    dispatch(addToWishlist(product));
    toast.success(`${product.name} added to wishlist!`);
  };
  return (
    <div className="pt-8 md:pt-12 pb-12 md:pb-20 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 sm:h-96 lg:h-[500px] object-cover rounded-xl"
        />

        <div>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            {product.category}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold mt-5">
            {product.name}
          </h1>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-5">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mt-5">
            <FaStar className="text-yellow-400" />
            <span>{product.rating}</span>
          </div>

          <div className="mt-6">
            <span className="text-3xl md:text-4xl font-bold text-green-700">
              ₹{product.price}
            </span>

            <span className="ml-3 md:ml-4 line-through text-gray-400 text-lg md:text-xl">
              ₹{product.oldPrice}
            </span>
          </div>

          <p className="mt-6 font-semibold">
            Stock : {product.stock}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <button
              onClick={handleAddToCart}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            <button
              onClick={handleWishlist}
              className={`border px-6 py-3 rounded-lg transition w-full sm:w-auto flex items-center justify-center ${isWishlisted
                ? "bg-red-500 text-white"
                : "hover:bg-red-500 hover:text-white"
                }`}
            >
              <FaHeart />
            </button>

          </div>

        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 md:mt-10 px-4">
        <Reviews productId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetails;