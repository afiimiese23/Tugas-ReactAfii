import { Outlet } from "react-router-dom";
import { FaHotel } from "react-icons/fa";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4">

            <div className="bg-white p-8 rounded-[32px] shadow-sm w-full max-w-md">

                {/* Logo */}
                <div className="flex flex-col items-center justify-center mb-8">

                    <div className="w-20 h-20 rounded-[24px] bg-[#113D32] flex items-center justify-center shadow-lg shadow-emerald-900/10">
                        <FaHotel className="text-white text-3xl" />
                    </div>

                    <h1 className="text-3xl font-extrabold text-[#113D32] mt-4">
                        StayZone
                    </h1>

                    <p className="text-[#3AB449] font-semibold text-sm mt-1">
                        Hotel Management System
                    </p>
                </div>

                <Outlet />

                <div className="border-t border-gray-100 mt-8 pt-6">
                    <p className="text-center text-xs text-gray-400">
                        © 2026 StayZone Hotel. All rights reserved.
                    </p>
                </div>

            </div>
        </div>
    );
}