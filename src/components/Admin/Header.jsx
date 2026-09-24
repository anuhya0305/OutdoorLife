import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white rounded-3xl shadow-md px-5 md:px-8 py-5 flex flex-wrap gap-4 items-center justify-between border border-gray-100">

      <div>
        <h1 className="text-3xl font-bold">
          Good Evening 👋
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back to OutdoorLife Admin Dashboard
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="relative hidden md:block">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="pl-11 pr-4 py-3 w-72 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>

        <button className="relative w-12 h-12 rounded-2xl bg-gray-100 hover:bg-green-100 transition flex items-center justify-center">

          <FaBell className="text-xl text-gray-700" />

          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500"></span>

        </button>

        <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-200">

          <FaUserCircle className="text-4xl text-green-700" />

          <div>

            <h3 className="font-semibold">
              Admin
            </h3>

            <p className="text-sm text-gray-500">
              Super Admin
            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Header;