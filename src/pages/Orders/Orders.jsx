import { useEffect, useState } from "react";
import { getOrders } from "../../services/OrderService";

const Orders = () => {

  const [orders, setOrders] = useState([]);



  useEffect(() => {
    getOrders().then((data) => setOrders(data.reverse())).catch((error) => console.error(error));
  }, []);

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">
          No Orders Found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-8 md:pt-12 pb-12 md:pb-20 px-4 md:px-6 min-h-screen bg-gray-100">

      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        My Orders
      </h1>

      <div className="space-y-8">

        {orders.map((order) => (

          <div
            key={order.orderId}
            className="bg-white shadow rounded-xl p-5 md:p-6"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <p>
                <strong>Order ID:</strong> {order.orderId}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.orderDate).toLocaleString()}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                {order.paymentMethod}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {order.orderStatus}
              </p>

              <p>
                <strong>Payment Status:</strong>{" "}
                {order.paymentStatus}
              </p>

              <p>
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>

            </div>

            <hr className="my-5" />

            <h3 className="font-bold mb-3">
              Delivery Address
            </h3>

            <p>
              {order.customer.fullName}
            </p>

            <p>
              {order.customer.houseNo},
              {" "}
              {order.customer.building}
            </p>

            <p>
              {order.customer.street}
            </p>

            <p>
              {order.customer.landmark}
            </p>

            <p>
              {order.customer.city},
              {" "}
              {order.customer.state}
            </p>

            <p>
              {order.customer.pincode}
            </p>

            <hr className="my-5" />

            <h3 className="font-bold mb-3">
              Products
            </h3>

            <div className="space-y-4">

              {order.items.map((item) => (

                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:justify-between gap-2 border-b pb-3"
                >

                  <span className="font-medium break-words">
                    {item.name}
                  </span>

                  <span className="font-semibold">
                    {item.quantity} × ₹{item.price}
                  </span>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Orders;