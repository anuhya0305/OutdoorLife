import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import { getMessages, getStats } from "../../services/AdminService";
import {
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";

const STATUS_STYLE = {
  Processing: { badge: "bg-orange-100 text-orange-600", bar: "bg-orange-500" },
  Shipped: { badge: "bg-blue-100 text-blue-700", bar: "bg-blue-600" },
  Delivered: { badge: "bg-green-100 text-green-700", bar: "bg-green-600" },
  Cancelled: { badge: "bg-red-100 text-red-600", bar: "bg-red-500" },
};

const rupees = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getStats(), getMessages()])
      .then(([s, m]) => {
        setStats(s);
        setMessages(m);
      })
      .catch(() => setError("Couldn't load dashboard data. Your session may have expired; log in again."));
  }, []);

  if (error) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-[#f4f7fb]">
        <Sidebar />
        <div className="flex-1 min-w-0 p-4 md:p-8"><Header /><p className="mt-8 text-red-600">{error}</p></div>
      </div>
    );
  }

  const cards = [
    { title: "Total Products", value: stats?.products, icon: <FaBoxOpen />, color: "bg-green-100 text-green-700" },
    { title: "Orders", value: stats?.orders, icon: <FaShoppingBag />, color: "bg-orange-100 text-orange-600" },
    { title: "Customers", value: stats?.customers, icon: <FaUsers />, color: "bg-blue-100 text-blue-600" },
    { title: "Revenue", value: stats && rupees(stats.revenue), icon: <FaRupeeSign />, color: "bg-purple-100 text-purple-700" },
  ];

  const byStatus = stats?.ordersByStatus || {};

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f4f7fb]">

      <Sidebar />

      <div className="flex-1 min-w-0 p-4 md:p-8">

        <Header />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 p-6 border border-gray-100"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${card.color}`}>
                {card.icon}
              </div>
              <h3 className="text-gray-500 mt-5">{card.title}</h3>
              <h1 className="text-4xl font-bold mt-2">{card.value ?? "…"}</h1>
            </div>
          ))}
        </div>

        <div className="grid xl:grid-cols-3 gap-6 mt-8">

          <div className="xl:col-span-2 bg-white rounded-3xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recent Orders</h2>
              <Link to="/admin/orders" className="text-green-700 font-semibold">View All</Link>
            </div>

            {stats?.recentOrders?.length === 0 ? (
              <p className="text-gray-500">No orders yet.</p>
            ) : (
              <table className="w-full">
                <thead className="text-left border-b">
                  <tr>
                    <th className="py-3">Order</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentOrders?.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-4">{order.orderId}</td>
                      <td>{order.customer?.fullName}</td>
                      <td>{rupees(order.totalAmount || 0)}</td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-sm ${STATUS_STYLE[order.orderStatus]?.badge || STATUS_STYLE.Processing.badge}`}>
                          {order.orderStatus || "Processing"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Orders by Status</h2>
            <div className="space-y-5">
              {Object.keys(STATUS_STYLE).map((status) => {
                const count = byStatus[status] || 0;
                const pct = stats?.orders ? Math.round((count / stats.orders) * 100) : 0;
                return (
                  <div key={status}>
                    <div className="flex justify-between">
                      <span>{status}</span>
                      <span>{count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                      <div className={`${STATUS_STYLE[status].bar} h-3 rounded-full`} style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-md p-6 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Contact Messages</h2>
            <span className="text-gray-500">{stats?.subscribers ?? "…"} newsletter subscribers</span>
          </div>
          {messages.length === 0 ? (
            <p className="text-gray-500">No messages yet.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className="border-b last:border-0 pb-4">
                  <p className="font-semibold">
                    {m.name} <span className="text-gray-500 font-normal">· {m.email} · {new Date(m.createdAt).toLocaleString()}</span>
                  </p>
                  <p className="text-gray-700 mt-1 whitespace-pre-line">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
