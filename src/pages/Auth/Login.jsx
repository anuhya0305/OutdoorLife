import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="bg-white p-8 rounded-xl shadow-lg w-[420px]">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded-lg mb-5"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded-lg mb-6"
                />

                <button
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
                </p>

            </div>

        </div>
    );
};

export default Login;