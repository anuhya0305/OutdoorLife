import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/wishlistSlice";

const Wishlist = () => {
  const wishlistItems = useSelector(
    (state) => state.wishlist.wishlistItems
  );

  const dispatch = useDispatch();

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      <h1 className="text-3xl font-bold mb-8">
        My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <h2>Your wishlist is empty.</h2>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow rounded-lg p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover rounded"
              />

              <h2 className="text-xl font-semibold mt-4">
                {item.name}
              </h2>

              <p className="text-green-700 font-bold mt-2">
                ₹{item.price}
              </p>

              <button
                onClick={() =>
                  dispatch(removeFromWishlist(item.id))
                }
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;