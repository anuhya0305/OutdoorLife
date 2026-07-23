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
            className="w-full h-64 object-cover rounded-lg"
          />

          <button
            onClick={() => dispatch(addToWishlist(product))}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-100"
          >
            <FaHeart className="text-red-500" />
          </button>

        </div>

        <div className="p-5">

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            {product.category}
          </span>

          <h3 className="text-xl font-bold mt-4">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mt-3">
            <FaStar className="text-yellow-400" />
            <span>{product.rating}</span>
          </div>

          <div className="mt-4">

            <span className="text-2xl font-bold text-green-700">
              ₹{product.price}
            </span>

            <span className="line-through text-gray-400 ml-3">
              ₹{product.oldPrice}
            </span>

          </div>

          <div className="mt-5 flex justify-between">

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg flex items-center gap-2">
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