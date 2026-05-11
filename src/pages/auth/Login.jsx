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
        <div className="font-['Poppins']">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#113D32]">
                    Login to your account
                </h2>
                <p className="text-gray-400 text-sm mt-1">Please enter your details</p>
            </div>

            {/* ERROR ALERT */}
            {error && (
                <div className="bg-red-50 mb-5 p-4 text-xs text-red-600 rounded-2xl flex items-center border border-red-100 animate-pulse">
                    <BsFillExclamationDiamondFill className="me-2 text-lg" />
                    <span className="font-bold">{error}</span>
                </div>
            )}

            {/* LOADING OVERLAY (Optional but clean) */}
            {loading && (
                <div className="flex items-center justify-center mb-5 text-[#3AB449] text-sm font-bold">
                    <ImSpinner2 className="me-2 animate-spin text-xl" />
                    Authenticating...
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* EMAIL / USERNAME */}
                <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                        Email or Username
                    </label>

                    <div className="relative group">
                        <input
                            type="text"
                            name="email"
                            required
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 pl-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#3AB449]/20 focus:border-[#3AB449] placeholder-gray-300"
                            placeholder="emilys"
                        />
                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 group-focus-within:text-[#3AB449] transition-colors" />
                    </div>
                </div>

                {/* PASSWORD */}
                <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                        Password
                    </label>

                    <div className="relative group">
                        <input
                            type="password"
                            name="password"
                            required
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 pl-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#3AB449]/20 focus:border-[#3AB449] placeholder-gray-300"
                            placeholder="••••••••"
                        />
                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 group-focus-within:text-[#3AB449] transition-colors" />
                    </div>
                </div>

                {/* FORGOT PASSWORD */}
                <div className="flex justify-end">
                    <span className="text-xs font-bold text-[#113D32] hover:text-[#3AB449] cursor-pointer transition-colors">
                        Forgot Password?
                    </span>
                </div>

                {/* LOGIN BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#113D32] hover:bg-[#1a5c4c] text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-900/10 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                    {loading ? "Please wait..." : "Sign In"}
                </button>
            </form>

            {/* REGISTER LINK */}
            <div className="text-center mt-8">
                <p className="text-sm text-gray-400 font-medium">
                    Don’t have an account?{" "}
                    <span className="text-[#3AB449] font-bold cursor-pointer hover:underline underline-offset-4">
                        Create Account
                    </span>
                </p>
            </div>
        </div>
    );
}