import { useDispatch, useSelector } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-8">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <h2>Your cart is empty.</h2>
        ) : (

          <div className="space-y-6">
            {cartItems.map((item, index) => (

              <div
                key={item.id}
                className="bg-white p-5 rounded-lg shadow flex justify-between items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <h2 className="text-xl font-semibold">
                  {item.name}
                </h2>

                <p>Price : ₹{item.price}</p>

                <div className="flex items-center gap-3 mt-3">

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
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-8 flex justify-end">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold">
                Grand Total: ₹{totalAmount}
              </h2>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;