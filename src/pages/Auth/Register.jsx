import { useState } from "react";
import { registerUser } from "../../services/AuthService";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(user);
      alert("Registration Successful!");
      setUser({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      alert("Registration Failed!");
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[420px]">

        <h1 className="text-3xl font-bold text-center mb-8">
          Create Account
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Full Name"
          />

          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
          />

          <button type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
          >
            Register
          </button>
        </form>

      </div>

    </div>
  );
};

export default Register;