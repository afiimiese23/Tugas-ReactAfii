import { useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

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

        try {
            const { data, error } = await supabase
                .from("user")
                .select("*")
                .eq("email", dataForm.email)
                .eq("password", dataForm.password)
                .single();

            if (error || !data) {
                setError("Email atau password salah");
                return;
            }

            localStorage.setItem(
                "user",
                JSON.stringify(data)
            );

            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Welcome to StayZone 🏨
            </h2>

            {error && (
                <div className="bg-red-100 mb-5 p-4 text-sm text-red-600 rounded flex items-center">
                    <BsFillExclamationDiamondFill className="me-2" />
                    {error}
                </div>
            )}

            {loading && (
                <div className="bg-gray-100 mb-5 p-4 text-sm rounded flex items-center">
                    <ImSpinner2 className="me-2 animate-spin" />
                    Processing your login...
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Email */}
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                        Email Address
                    </label>

                    <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="email"
                            name="email"
                            value={dataForm.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#3AB449] focus:ring-4 focus:ring-green-100 outline-none transition"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                        Password
                    </label>

                    <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="password"
                            name="password"
                            value={dataForm.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#3AB449] focus:ring-4 focus:ring-green-100 outline-none transition"
                        />
                    </div>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#113D32] hover:bg-[#0D3027] text-white rounded-2xl py-3 font-semibold shadow-lg shadow-emerald-900/10"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <ImSpinner2 className="animate-spin mr-2" />
                            Signing In...
                        </span>
                    ) : (
                        "Sign In"
                    )}
                </button>
            </form>

            <div className="text-center text-sm text-gray-400 mt-6 space-y-2">
                <p className="cursor-pointer text-green-600">
                    Forgot Password?
                </p>

                <p>
                    Don’t have an account?{" "}
                    <span
                        className="text-green-600 cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}