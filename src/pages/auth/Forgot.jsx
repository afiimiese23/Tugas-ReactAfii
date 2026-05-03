import { FaEnvelope } from "react-icons/fa";

export default function Forgot() {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                Forgot Your Password?
            </h2>
            
            <p className="text-sm text-gray-500 mb-6 text-center">
                Enter your email to receive a password reset link for your hotel account.
            </p>

            <form>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email Address
                    </label>

                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="guest@luxurystay.com"
                        />
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                    Send Reset Link
                </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
                Remember your password? <span className="text-yellow-600 cursor-pointer">Back to Login</span>
            </p>
        </div>
    );
}