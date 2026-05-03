import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

export default function Register() {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Join LuxuryStay 🏨
            </h2>

            <form>
                
                {/* NAME */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>

                    <div className="relative">
                        <input
                            type="text"
                            className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="John Doe"
                        />
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* EMAIL */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>

                    <div className="relative">
                        <input
                            type="email"
                            className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="guest@luxurystay.com"
                        />
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* PASSWORD */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>

                    <div className="relative">
                        <input
                            type="password"
                            className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="********"
                        />
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                    </label>

                    <div className="relative">
                        <input
                            type="password"
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
                    Register
                </button>
            </form>

            {/* EXTRA */}
            <p className="text-center text-sm text-gray-400 mt-6">
                Already have an account?{" "}
                <span className="text-yellow-600 cursor-pointer">
                    Login
                </span>
            </p>
        </div>
    );
}