import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../redux/wishlistSlice";


const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <Link to={`/shop/${product.id}`}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
        <div className="relative">

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 sm:h-64 object-cover"
          />

          <button
            onClick={() => dispatch(addToWishlist(product))}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-100"
          >
            <FaHeart className="text-red-500" />
          </button>

        </div>

        <div className="p-4 md:p-5">

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            {product.category}
          </span>

          <h3 className="text-lg md:text-xl font-bold mt-4">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mt-3">
            <FaStar className="text-yellow-400" />
            <span>{product.rating}</span>
          </div>

          <div className="mt-4">

            <span className="text-xl md:text-2xl font-bold text-green-700">
              ₹{product.price}
            </span>

            <span className="line-through text-gray-400 ml-2 md:ml-3 text-sm md:text-base">
              ₹{product.oldPrice}
            </span>

          </div>

          <div className="mt-5 flex justify-between">

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
              <FaShoppingCart />
              Add
            </button>

          </div>

        </div>

      </div>
    </Link>
  );
};

export default ProductCard;