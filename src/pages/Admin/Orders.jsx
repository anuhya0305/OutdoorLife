import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getAllOrders, updateOrderStatus } from "../../services/AdminService";

const STATUSES = ["Processing", "Shipped", "Delivered", "Cancelled"];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    getAllOrders()
      .then((data) => setOrders(data.reverse()))
      .catch((error) => console.error(error));
  }, []);

  const handleStatus = async (order, orderStatus) => {
    try {
      await updateOrderStatus(order.id, orderStatus);
      setOrders(orders.map((o) => (o.id === order.id ? { ...o, orderStatus } : o)));
      toast.success(`${order.orderId} marked ${orderStatus}`);
    } catch (error) {
      toast.error(error.response?.data?.error || "Couldn't update the status");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7fb]">

      <Sidebar />

      <div className="flex-1 p-8">

        <Header />

        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <div className="mb-8">
            <h1 className="text-3xl font-bold">Order Management</h1>
            <p className="text-gray-500 mt-2">Manage customer orders and update status.</p>
          </div>

          <div className="overflow-x-auto">

            {orders.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-3xl font-bold">No Orders Found</h2>
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
                    <th className="text-center">Details</th>
                  </tr>
                </thead>

                <tbody>

                  {orders.map((order) => (
                    <Fragment key={order.id}>

                      <tr className="border-b hover:bg-gray-50 transition">

                        <td className="py-5 font-semibold">{order.orderId}</td>

                        <td>{order.customer?.fullName}</td>

                        <td>₹{order.totalAmount}</td>

                        <td>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${order.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                              }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </td>

                        <td>
                          <select
                            value={order.orderStatus || "Processing"}
                            onChange={(e) => handleStatus(order, e.target.value)}
                            className="border rounded-lg px-3 py-2"
                          >
                            {STATUSES.map((s) => <option key={s}>{s}</option>)}
                          </select>
                        </td>

                        <td>
                          <div className="flex justify-center">
                            <button
                              onClick={() => setOpenId(openId === order.id ? null : order.id)}
                              aria-label={openId === order.id ? "Hide order details" : "Show order details"}
                              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl"
                            >
                              {openId === order.id ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </td>

                      </tr>

                      {openId === order.id && (
                        <tr className="bg-gray-50 border-b">
                          <td colSpan={6} className="p-5">
                            <div className="grid md:grid-cols-2 gap-6 text-sm">
                              <div>
                                <h3 className="font-bold mb-2">Items</h3>
                                {order.items?.map((item) => (
                                  <p key={item.id}>{item.quantity} × {item.name} (₹{item.price})</p>
                                ))}
                                <p className="mt-2 text-gray-500">
                                  Placed {new Date(order.orderDate).toLocaleString()} · {order.paymentMethod}
                                  {order.coupon ? ` · coupon ${order.coupon}` : ""}
                                </p>
                              </div>
                              <div>
                                <h3 className="font-bold mb-2">Deliver to</h3>
                                <p>{order.customer?.fullName} · {order.customer?.phone}</p>
                                <p>{[order.customer?.houseNo, order.customer?.building, order.customer?.street].filter(Boolean).join(", ")}</p>
                                <p>{[order.customer?.city, order.customer?.state, order.customer?.pincode].filter(Boolean).join(", ")}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}

                    </Fragment>
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
