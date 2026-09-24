import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, adminLogin } from "../../services/AuthService";
import { FaUser, FaUserShield } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();

    const [loginType, setLoginType] = useState("user");

    const [user, setUser] = useState({
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

        // ADMIN LOGIN
        if (loginType === "admin") {

            try {
                const token = await adminLogin(user.email, user.password);

                if (token) {
                    localStorage.setItem("adminToken", token);
                    navigate("/admin/dashboard");
                } else {
                    alert("Invalid Admin Credentials");
                }
            } catch (error) {
                console.error(error);
                alert("Login Failed");
            }

            return;
        }

        // USER LOGIN
        try {
            const result = await loginUser(
                user.email,
                user.password
            );

            if (result) {
                alert("Login Successful!");

                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(result)
                );

                navigate("/");

            } else {
                alert("Invalid Email or Password");
            }

        } catch (error) {
            console.error(error);
            alert("Login Failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex justify-center items-center px-4">

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-[420px]">

                {/* Logo */}

                <div className="flex justify-center mb-5">

                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center shadow-md">

                        <span className="text-4xl">
                            🏕️
                        </span>

                    </div>

                </div>

                <h1 className="text-4xl font-bold text-center">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-7">
                    Login to continue your outdoor adventure.
                </p>


                {/* USER / ADMIN */}

                <div className="grid grid-cols-2 gap-3 mb-7">

                    <button
                        type="button"
                        onClick={() => setLoginType("user")}
                        className={`py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all ${
                            loginType === "user"
                                ? "bg-green-700 text-white shadow-md"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        <FaUser />
                        User
                    </button>


                    <button
                        type="button"
                        onClick={() => setLoginType("admin")}
                        className={`py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all ${
                            loginType === "admin"
                                ? "bg-green-700 text-white shadow-md"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        <FaUserShield />
                        Admin
                    </button>

                </div>


                <form onSubmit={handleSubmit}>

                    {/* Email */}

                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder={
                            loginType === "admin"
                                ? "Admin Email"
                                : "Email"
                        }
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        required
                    />


                    {/* Password */}

                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Password"
                        autoComplete="current-password"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        required
                    />


                    {/* Login */}

                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-green-800 hover:shadow-xl transition-all duration-300"
                    >
                        {loginType === "admin"
                            ? "Login as Admin"
                            : "Login"}
                    </button>


                    {/* USER ONLY */}

                    {loginType === "user" && (
                        <>
                            <div className="flex items-center my-6">

                                <div className="flex-1 border-t border-gray-300"></div>

                                <span className="px-3 text-gray-400 text-sm">
                                    OR
                                </span>

                                <div className="flex-1 border-t border-gray-300"></div>

                            </div>

                            <p className="text-center text-gray-600">

                                New to OutdoorLife?{" "}

                                <Link
                                    to="/register"
                                    className="text-green-700 font-bold hover:text-green-800 transition"
                                >
                                    Register
                                </Link>

                            </p>
                        </>
                    )}

                </form>

            </div>

        </div>
    );
};

export default Login;