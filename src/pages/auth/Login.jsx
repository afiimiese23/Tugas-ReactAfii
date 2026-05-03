import axios from "axios";
import { useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        axios
            .post("https://dummyjson.com/user/login", {
                username: dataForm.email,
                password: dataForm.password,
            })
            .then((response) => {
                if (response.status !== 200) {
                    setError(response.data.message);
                    return;
                }

                navigate("/");
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.message || "Login failed");
                } else {
                    setError(err.message || "Network error");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Welcome to LuxuryStay 🏨
            </h2>

            {/* ERROR */}
            {error && (
                <div className="bg-red-100 mb-5 p-4 text-sm text-red-600 rounded flex items-center">
                    <BsFillExclamationDiamondFill className="me-2" />
                    {error}
                </div>
            )}

            {/* LOADING */}
            {loading && (
                <div className="bg-gray-100 mb-5 p-4 text-sm rounded flex items-center">
                    <ImSpinner2 className="me-2 animate-spin" />
                    Processing your login...
                </div>
            )}

            <form onSubmit={handleSubmit}>
                
                {/* EMAIL */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>

                    <div className="relative">
                        <input
                            type="text"
                            name="email"
                            onChange={handleChange}
                            className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="guest@luxurystay.com"
                        />
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* PASSWORD */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>

                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="********"
                        />
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                    Login
                </button>
            </form>

            {/* EXTRA */}
            <div className="text-center text-sm text-gray-400 mt-6 space-y-2">
                <p className="cursor-pointer text-yellow-600">
                    Forgot Password?
                </p>
                <p>
                    Don’t have an account?{" "}
                    <span className="text-yellow-600 cursor-pointer">
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}