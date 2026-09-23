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
    localStorage.removeItem("isAdmin");
    navigate("/admin");
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
      isActive
        ? "bg-green-700 text-white shadow-lg"
        : "text-gray-700 hover:bg-green-100 hover:text-green-700"
    }`;

  return (
    <aside className="w-72 bg-white shadow-2xl min-h-screen p-6 border-r">

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-green-700">
          🏕️ OutdoorLife
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Admin Dashboard
        </p>
      </div>

      <nav className="space-y-3">

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
        className="mt-12 w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
      >
        <FaSignOutAlt />
        Logout
      </button>

    </aside>
  );
};

export default Sidebar;