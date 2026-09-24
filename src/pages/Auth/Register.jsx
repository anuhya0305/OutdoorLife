import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/AuthService";

const inputClass =
  "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const session = await registerUser(user);
      localStorage.setItem("loggedInUser", JSON.stringify(session));
      alert("Registration Successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.error || "Registration Failed!");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex justify-center items-center px-4 py-12">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-[420px]">

        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center shadow-md">
            <span className="text-4xl">🏕️</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-7">
          Join OutdoorLife and start your next adventure.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label htmlFor="name" className="block font-medium mb-2">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Your name"
              autoComplete="name"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-2">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium mb-2">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              autoComplete="new-password"
              minLength={6}
              required
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-green-800 hover:shadow-xl transition-all duration-300 disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-bold hover:text-green-800 transition">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Register;
