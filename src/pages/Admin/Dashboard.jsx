import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import {
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";

const Dashboard = () => {
  const cards = [
    {
      title: "Total Products",
      value: "28",
      icon: <FaBoxOpen />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Orders",
      value: "154",
      icon: <FaShoppingBag />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Customers",
      value: "89",
      icon: <FaUsers />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Revenue",
      value: "₹2.45L",
      icon: <FaRupeeSign />,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f4f7fb]">

      <Sidebar />

      <div className="flex-1 p-8">

        <Header />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 p-6 border border-gray-100"
            >

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${card.color}`}
              >
                {card.icon}
              </div>

              <h3 className="text-gray-500 mt-5">
                {card.title}
              </h3>

              <h1 className="text-4xl font-bold mt-2">
                {card.value}
              </h1>

              <p className="text-green-600 text-sm mt-3">
                ↑ 12% this month
              </p>

            </div>
          ))}

        </div>

        <div className="grid xl:grid-cols-3 gap-6 mt-8">

          <div className="xl:col-span-2 bg-white rounded-3xl shadow-md p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                Recent Orders
              </h2>

              <button className="text-green-700 font-semibold">
                View All
              </button>

            </div>

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

                <tr className="border-b">

                  <td className="py-4">#ORD001</td>

                  <td>Rahul Sharma</td>

                  <td>₹3,200</td>

                  <td>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Delivered
                    </span>
                  </td>

                </tr>

                <tr className="border-b">

                  <td className="py-4">#ORD002</td>

                  <td>Priya</td>

                  <td>₹5,800</td>

                  <td>
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                      Processing
                    </span>
                  </td>

                </tr>

                <tr>

                  <td className="py-4">#ORD003</td>

                  <td>Arjun</td>

                  <td>₹2,450</td>

                  <td>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      Shipped
                    </span>
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

          <div className="bg-white rounded-3xl shadow-md p-6">

            <h2 className="text-2xl font-bold mb-6">
              Store Performance
            </h2>

            <div className="space-y-5">

              <div>

                <div className="flex justify-between">

                  <span>Sales</span>

                  <span>80%</span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">

                  <div className="bg-green-600 h-3 rounded-full w-4/5"></div>

                </div>

              </div>

              <div>

                <div className="flex justify-between">

                  <span>Orders</span>

                  <span>65%</span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">

                  <div className="bg-orange-500 h-3 rounded-full w-2/3"></div>

                </div>

              </div>

              <div>

                <div className="flex justify-between">

                  <span>Customers</span>

                  <span>92%</span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">

                  <div className="bg-blue-600 h-3 rounded-full w-11/12"></div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;