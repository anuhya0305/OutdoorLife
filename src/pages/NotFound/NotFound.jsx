import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-gray-100">
      <span className="text-6xl">🧭</span>
      <h1 className="text-5xl font-bold text-green-700 mt-4">404</h1>
      <p className="text-xl font-semibold mt-2">This trail doesn't exist</p>
      <p className="text-gray-500 mt-2">The page you're looking for was moved or never existed.</p>
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Link to="/" className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition">
          Back to Home
        </Link>
        <Link to="/shop" className="border border-green-700 text-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition">
          Browse the Shop
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
