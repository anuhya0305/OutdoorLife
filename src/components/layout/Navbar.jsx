import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/login");
  };
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector(
    (state) => state.wishlist.wishlistItems
  );
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 md:px-8 py-4">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-2xl md:text-3xl">🏕️</span>

          <h1 className="text-xl md:text-3xl font-bold text-green-700">
            OutdoorLife
          </h1>
        </NavLink>
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        {/* Menu */}
        <div className="hidden md:flex items-center gap-8">

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
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/wishlist"
            className="relative hover:text-red-500 transition"
          >
            <FaHeart size={20} />

            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {wishlistItems.length}
            </span>
          </NavLink>

          <NavLink to="/cart" className="relative hover:text-green-700 transition">
            <FaShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          </NavLink>


          {loggedInUser ? (
            <div className="flex items-center gap-4">

              <NavLink
                to="/orders"
                className="hover:text-green-700"
              >
                My Orders
              </NavLink>

              <NavLink
                to="/profile"
                className="font-semibold text-green-700 hover:underline"
              >
                Hi, {loggedInUser.name}
              </NavLink>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>

            </div>

          ) : (
            <NavLink
              to="/login"
              className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
            >
              <FaUser />
              Login
            </NavLink>
          )}

        </div>

      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md px-6 py-4">

          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:text-green-700"
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:text-green-700"
          >
            Shop
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:text-green-700"
          >
            Contact
          </NavLink>

          <NavLink
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:text-red-500"
          >
            ❤️ Wishlist ({wishlistItems.length})
          </NavLink>

          <NavLink
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:text-green-700"
          >
            🛒 Cart ({cartItems.length})
          </NavLink>

          {loggedInUser && (
            <>
              <NavLink
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="block py-2 hover:text-green-700"
              >
                My Orders
              </NavLink>

              <NavLink
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="block py-2 hover:text-green-700"
              >
                Hi, {loggedInUser.name}
              </NavLink>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}

          {!loggedInUser && (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block mt-3 bg-green-700 text-white text-center py-2 rounded-lg"
            >
              Login
            </NavLink>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;