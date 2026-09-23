import { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import { FaEye } from "react-icons/fa";
import { getOrders } from "../../services/OrderService";


const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data.reverse());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex min-h-screen bg-[#f4f7fb]">

      <Sidebar />

      <div className="flex-1 p-8">

        <Header />

        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <div className="mb-8">

            <h1 className="text-3xl font-bold">
              Order Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage customer orders and update status.
            </p>

          </div>

          <div className="overflow-x-auto">

            {orders.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-3xl font-bold">
                  No Orders Found
                </h2>
              </div>
            ) : (

              <table className="w-full">

                <thead>

                  <tr className="border-b text-left">

                    <th className="py-4">Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>

                  </tr>

                </thead>

                <tbody>

                  {orders.map((order) => (

                    <tr
                      key={order.id}
                      className="border-b hover:bg-gray-50 transition"
                    >

                      <td className="py-5 font-semibold">
                        {order.id}
                      </td>

                      <td>{order.customer.fullName}</td>

                      <td>₹{order.totalAmount}</td>

                      <td>

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${order.payment === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                            }`}
                        >
                          {order.paymentStatus}
                        </span>

                      </td>

                      <td>

                        <select
                          defaultValue={order.orderStatus}
                          className="border rounded-lg px-3 py-2"
                        >
                          <option>Processing</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                        </select>

                      </td>

                      <td>

                        <div className="flex justify-center">

                          <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl">

                            <FaEye />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Orders;