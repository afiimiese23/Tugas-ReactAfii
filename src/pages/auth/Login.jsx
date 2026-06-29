import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../lib/auth";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState("");
    const [form, setForm]       = useState({ email: "", password: "" });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { success, role, error: errMsg } = await signIn(form.email, form.password);

        setLoading(false);

        if (!success) {
            setError(errMsg || "Email atau password salah.");
            return;
        }

        // Redirect berdasarkan role
        if (role === "admin") {
            navigate("/admin/dashboard", { replace: true });
        } else {
            // role === "user" → Member Dashboard
            navigate("/member/dashboard", { replace: true });
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Welcome to StayZone 🏨
            </h2>

            {/* Error Alert */}
            {error && (
                <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 mb-5">
                    <span className="text-red-500 text-lg leading-none mt-0.5">⚠</span>
                    <p className="text-sm text-red-600">{error}</p>
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
                            type="email" name="email"
                            value={form.email} onChange={handleChange}
                            required placeholder="your@email.com"
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
                            type="password" name="password"
                            value={form.password} onChange={handleChange}
                            required placeholder="••••••••"
                            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#3AB449] focus:ring-4 focus:ring-green-100 outline-none transition"
                        />
                    </div>
                </div>

                <button
                    type="submit" disabled={loading}
                    className="w-full bg-[#113D32] hover:bg-[#0D3027] text-white rounded-2xl py-3 font-semibold shadow-lg shadow-emerald-900/10 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <ImSpinner2 className="animate-spin" /> Signing In...
                        </span>
                    ) : "Sign In"}
                </button>
            </form>

            <div className="text-center text-sm text-gray-400 mt-6 space-y-2">
                <p className="cursor-pointer text-green-600 hover:underline" onClick={() => navigate("/forgot")}>
                    Forgot Password?
                </p>
                <p>
                    Don't have an account?{" "}
                    <span className="text-green-600 cursor-pointer hover:underline" onClick={() => navigate("/register")}>
                        Register
                    </span>
                </p>
                <p className="pt-1">
                    <span className="text-gray-400 cursor-pointer hover:text-[#00B074] hover:underline text-xs" onClick={() => navigate("/")}>
                        ← Kembali ke Landing Page
                    </span>
                </p>
            </div>
        </div>
    );
}
