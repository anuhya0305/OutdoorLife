import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/AuthService";

const Login = () => {
    const navigate = useNavigate();

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

        try {
            const result = await loginUser(user.email, user.password);

            if (result.length > 0) {
                alert("Login Successful!");

                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(result[0])
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
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="bg-white p-8 rounded-xl shadow-lg w-[420px]">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Login
                </h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full border p-3 rounded-lg mb-5"
                    />

                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full border p-3 rounded-lg mb-6"
                    />

                    <button type="submit"
                        className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
                    >
                        Login
                    </button>

                    <p className="text-center mt-6">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-green-700 font-semibold hover:underline"
                        >
                            Register
                        </Link>
                    </p> </form>

            </div>

        </div>
    );
};

export default Login;