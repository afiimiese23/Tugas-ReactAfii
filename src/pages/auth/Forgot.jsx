import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Forgot() {
    const navigate = useNavigate();

    return (
        <div className="font-['Poppins']">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#113D32]">
                    Forgot Password?
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                    Enter your email to receive a reset link.
                </p>
            </div>

            <form className="space-y-6">
                {/* EMAIL ADDRESS */}
                <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                        Email Address
                    </label>
                    <div className="relative group">
                        <input
                            type="email"
                            required
                            className="w-full px-5 py-3.5 pl-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#3AB449]/20 focus:border-[#3AB449] placeholder-gray-300"
                            placeholder="admin@stayzone.com"
                        />
                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 group-focus-within:text-[#3AB449] transition-colors" />
                    </div>
                </div>

                {/* RESET BUTTON */}
                <button
                    type="submit"
                    className="w-full bg-[#113D32] hover:bg-[#1a5c4c] text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-900/10 transition duration-300"
                >
                    Send Reset Link
                </button>
            </form>

            {/* BACK TO LOGIN */}
            <div className="text-center mt-8">
                <p className="text-sm text-gray-400 font-medium">
                    Remember your password?{" "}
                    <span 
                        onClick={() => navigate("/auth/login")}
                        className="text-[#3AB449] font-bold cursor-pointer hover:underline underline-offset-4"
                    >
                        Back to Login
                    </span>
                </p>
            </div>
        </div>
    );
}