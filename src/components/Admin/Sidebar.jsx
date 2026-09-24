import {
  FaTachometerAlt,
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const menuClass = ({ isActive }) =>
    `flex shrink-0 items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
      isActive
        ? "bg-green-700 text-white shadow-lg"
        : "text-gray-700 hover:bg-green-100 hover:text-green-700"
    }`;

  return (
    <aside className="w-full lg:w-72 bg-white shadow-2xl lg:min-h-screen p-4 lg:p-6 border-b lg:border-b-0 lg:border-r">

      <div className="mb-4 lg:mb-10">
        <h1 className="text-2xl lg:text-3xl font-bold text-green-700">
          🏕️ OutdoorLife
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Admin Dashboard
        </p>
      </div>

      <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-3 lg:overflow-visible">

        <NavLink
          to="/admin/dashboard"
          className={menuClass}
        >
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className={menuClass}
        >
          <FaBoxOpen />
          Products
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={menuClass}
        >
          <FaClipboardList />
          Orders
        </NavLink>

      </nav>

      <button
        onClick={handleLogout}
        className="mt-4 lg:mt-12 w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
      >
        <FaSignOutAlt />
        Logout
      </button>

    </aside>
  );
};

export default Sidebar;