import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    return (
        <div className="font-['Poppins']">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#113D32]">
                    Create your account
                </h2>
                <p className="text-gray-400 text-sm mt-1">Join the StayZone management team</p>
            </div>

            <form className="space-y-4">
                
                {/* FULL NAME */}
                <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                        Full Name
                    </label>
                    <div className="relative group">
                        <input
                            type="text"
                            required
                            className="w-full px-5 py-3.5 pl-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#3AB449]/20 focus:border-[#3AB449] placeholder-gray-300"
                            placeholder="John Doe"
                        />
                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 group-focus-within:text-[#3AB449] transition-colors" />
                    </div>
                </div>

                {/* EMAIL */}
                <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                        Email Address
                    </label>
                    <div className="relative group">
                        <input
                            type="email"
                            required
                            className="w-full px-5 py-3.5 pl-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#3AB449]/20 focus:border-[#3AB449] placeholder-gray-300"
                            placeholder="john@stayzone.com"
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
                            required
                            className="w-full px-5 py-3.5 pl-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#3AB449]/20 focus:border-[#3AB449] placeholder-gray-300"
                            placeholder="••••••••"
                        />
                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 group-focus-within:text-[#3AB449] transition-colors" />
                    </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="pb-2">
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                        Confirm Password
                    </label>
                    <div className="relative group">
                        <input
                            type="password"
                            required
                            className="w-full px-5 py-3.5 pl-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#3AB449]/20 focus:border-[#3AB449] placeholder-gray-300"
                            placeholder="••••••••"
                        />
                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 group-focus-within:text-[#3AB449] transition-colors" />
                    </div>
                </div>

                {/* REGISTER BUTTON */}
                <button
                    type="submit"
                    className="w-full bg-[#113D32] hover:bg-[#1a5c4c] text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-900/10 transition duration-300 mt-2"
                >
                    Create Account
                </button>
            </form>

            {/* LOGIN LINK */}
            <div className="text-center mt-8">
                <p className="text-sm text-gray-400 font-medium">
                    Already have an account?{" "}
                    <span 
                        onClick={() => navigate("/auth/login")}
                        className="text-[#3AB449] font-bold cursor-pointer hover:underline underline-offset-4"
                    >
                        Sign In
                    </span>
                </p>
            </div>
        </div>
    );
}