import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="pt-24 md:pt-28 pb-12 md:pb-20 min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <h2>Your cart is empty.</h2>
        ) : (

          <div className="space-y-6">
            {cartItems.map((item) => (

              <div
                key={item.id}
                className="bg-white p-5 rounded-lg shadow flex flex-col lg:flex-row items-center lg:justify-between gap-5 text-center lg:text-left"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 md:w-24 md:h-24 object-cover rounded-lg"
                />

                <h2 className="text-lg md:text-xl font-semibold">
                  {item.name}
                </h2>

                <p>Price : ₹{item.price}</p>

                <div className="flex items-center justify-center gap-3 mt-3">

                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="bg-gray-300 px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="bg-gray-300 px-3 py-1 rounded"
                  >
                    +
                  </button>

                </div>

                <p className="mt-3 font-bold">
                  Total : ₹{item.price * item.quantity}
                </p>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-8 flex justify-center lg:justify-end">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">

              <h2 className="text-2xl font-bold mb-4">
                Grand Total: ₹{totalAmount}
              </h2>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
              >
                Proceed to Checkout
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;