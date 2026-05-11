import { Outlet } from "react-router-dom";
import { FaHotel } from "react-icons/fa";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] font-['Poppins']">
            
            <div className="bg-white p-10 shadow-sm border border-gray-100 w-full max-w-md mx-4">

                <div className="flex flex-col items-center justify-center mb-8">
                    <div className="flex items-center gap-3 text-[#113D32] text-4xl font-bold">
                        <div className="bg-[#3AB449] p-2 rounded-xl text-white shadow-lg shadow-green-100">
                            <FaHotel />
                        </div>
                        <span className="tracking-tight">Stay<span className="text-[#3AB449]">Zone</span></span>
                    </div>
                    <div className="mt-4 flex flex-col items-center">
                        <span className="text-[#113D32] font-bold text-lg">Welcome Back!</span>
                        <p className="text-gray-400 text-xs mt-1 font-medium">
                            Manage your hotel booking & management
                        </p>
                    </div>
                </div>

                <div className="auth-content">
                    <Outlet />
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50 flex flex-col items-center">
                    <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                        © 2026 StayZone Hotel.
                    </p>
                    <p className="text-[10px] text-gray-300 mt-1">All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}