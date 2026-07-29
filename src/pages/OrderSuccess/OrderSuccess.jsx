import { Link } from "react-router-dom";

const OrderSuccess = () => {

  const pendingOrder = JSON.parse(localStorage.getItem("lastOrder"));

  return (
    <div className="max-w-3xl mx-auto py-16 px-5">

      <div className="bg-white shadow-lg rounded-xl p-10 text-center">

        <div className="text-6xl mb-5">✅</div>

        <h1 className="text-3xl font-bold text-green-700">
          Order Placed Successfully!
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for shopping with OutdoorLife.
        </p>

        {pendingOrder && (
          <div className="mt-8 text-left space-y-3">

            <p>
              <strong>Order ID:</strong> {pendingOrder.orderId}
            </p>

            <p>
              <strong>Payment Method:</strong> {pendingOrder.paymentMethod}
            </p>

            <p>
              <strong>Payment Status:</strong> {pendingOrder.paymentStatus}
            </p>

            <p>
              <strong>Total Amount:</strong> ₹{pendingOrder.totalAmount}
            </p>

            <p>
              <strong>Order Status:</strong> {pendingOrder.orderStatus}
            </p>

          </div>
        )}

        <div className="flex gap-5 justify-center mt-10">

          <Link
            to="/shop"
            className="bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg"
          >
            View Orders
          </Link>

        </div>

      </div>

    </div>
  );
};

export default OrderSuccess;