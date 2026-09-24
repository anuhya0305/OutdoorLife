import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="min-h-[70vh] bg-gray-100 flex justify-center items-center px-4 py-12">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">

        <div className="w-20 h-20 mx-auto bg-green-100 text-green-700 rounded-full flex items-center justify-center text-3xl font-bold">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
        <p className="text-gray-500 mt-1 break-all">{user.email}</p>

        <div className="grid grid-cols-2 gap-3 mt-8">
          <Link to="/orders" className="border rounded-lg py-3 font-medium hover:bg-green-50 hover:border-green-600 transition">
            My Orders
          </Link>
          <Link to="/wishlist" className="border rounded-lg py-3 font-medium hover:bg-green-50 hover:border-green-600 transition">
            Wishlist
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;
