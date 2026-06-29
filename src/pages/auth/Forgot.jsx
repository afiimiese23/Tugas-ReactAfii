import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

export default function Forgot() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        // Simulasi pengiriman link reset
        setTimeout(() => {
            setLoading(false);
            setSent(true);
        }, 800);
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                Lupa Password?
            </h2>
            <p className="text-sm text-gray-500 mb-6 text-center">
                Masukkan email akun Anda untuk menerima link reset password.
            </p>

            {sent ? (
                <div className="rounded-2xl bg-green-50 border border-green-200 p-5 text-center space-y-3">
                    <div className="text-4xl">📩</div>
                    <p className="text-sm font-semibold text-[#1a3c2e]">
                        Link reset password telah dikirim!
                    </p>
                    <p className="text-xs text-gray-500">
                        Silakan cek inbox email <span className="font-medium text-[#00B074]">{email}</span>.
                    </p>
                    <button
                        onClick={() => navigate("/login")}
                        className="mt-2 w-full bg-[#113D32] hover:bg-[#0D3027] text-white rounded-2xl py-2.5 font-semibold text-sm transition"
                    >
                        Kembali ke Login
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block"
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#3AB449] focus:ring-4 focus:ring-green-100 outline-none transition"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#113D32] hover:bg-[#0D3027] text-white rounded-2xl py-3 font-semibold shadow-lg shadow-emerald-900/10 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <ImSpinner2 className="animate-spin mr-2" />
                                Mengirim...
                            </span>
                        ) : (
                            "Kirim Link Reset"
                        )}
                    </button>
                </form>
            )}

            {!sent && (
                <p className="text-center text-sm text-gray-400 mt-6">
                    Ingat password Anda?{" "}
                    <span
                        className="text-green-600 cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Kembali ke Login
                    </span>
                </p>
            )}
        </div>
    );
}
