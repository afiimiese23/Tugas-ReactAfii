import { Outlet } from "react-router-dom";
import { FaHotel } from "react-icons/fa";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-white">
            
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

                {/* Logo */}
                <div className="flex flex-col items-center justify-center mb-6">
                    <div className="flex items-center gap-2 text-yellow-600 text-3xl font-bold">
                        <FaHotel />
                        <span>LuxuryStay</span>
                    </div>
                    <span className="text-gray-400 text-sm">
                        Hotel Booking & Management
                    </span>
                </div>

                {/* Form (Login/Register) */}
                <Outlet />

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    © 2026 LuxuryStay Hotel. All rights reserved.
                </p>
            </div>
        </div>
    );
}