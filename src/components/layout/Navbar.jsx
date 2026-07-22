import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-3xl">🏕️</span>
          <h1 className="text-3xl font-bold text-green-700">
            OutdoorLife
          </h1>
        </NavLink>

        {/* Menu */}
        <div className="flex items-center gap-8">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-green-700 font-semibold border-b-2 border-green-700 pb-1"
                : "text-gray-700 hover:text-green-700 transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "text-green-700 font-semibold border-b-2 border-green-700 pb-1"
                : "text-gray-700 hover:text-green-700 transition"
            }
          >
            Shop
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-green-700 font-semibold border-b-2 border-green-700 pb-1"
                : "text-gray-700 hover:text-green-700 transition"
            }
          >
            Contact
          </NavLink>

        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">

          <NavLink to="/cart" className="relative hover:text-green-700 transition">
            <FaShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          </NavLink>


          <NavLink
            to="/login"
            className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
          >
            <FaUser />
            Login
          </NavLink>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;