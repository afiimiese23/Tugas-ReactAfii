import { FaBell, FaSearch, FaHotel } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    return (
        <div id="header-container" className="flex justify-between items-center p-4 bg-white shadow-sm">
            
            {/* Logo + Search */}
            <div className="flex items-center gap-4 w-full">
                
                {/* Logo Hotel */}
                <div className="flex items-center gap-2 text-yellow-600 font-semibold text-lg">
                    <FaHotel />
                    <span>LuxuryStay</span>
                </div>

                {/* Search */}
                <div id="search-bar" className="relative w-full max-w-lg">
                    <input
                        id="search-input"
                        className="border border-gray-200 p-2 pr-10 bg-gray-50 w-full rounded-md outline-none"
                        type="text"
                        placeholder="Search rooms, guests, bookings..."
                    />
                    <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Icons */}
            <div id="icons-container" className="flex items-center space-x-4">
                
                {/* Booking Notification */}
                <div className="relative p-3 bg-yellow-100 rounded-2xl text-yellow-600 cursor-pointer">
                    <FaBell />
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-yellow-200 rounded-full px-2 py-1 text-xs">
                        12
                    </span>
                </div>

                {/* Hotel Analytics */}
                <div className="p-3 bg-gray-100 rounded-2xl cursor-pointer">
                    <FcAreaChart />
                </div>

                {/* Settings */}
                <div className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer">
                    <SlSettings />
                </div>

                {/* Profile */}
                <div className="flex items-center space-x-4 border-l pl-4 border-gray-300">
                    <span>
                        Welcome, <b>Guest</b>
                    </span>
                    <img
                        src="https://avatar.iran.liara.run/public/28"
                        className="w-10 h-10 rounded-full"
                    />
                </div>
            </div>
        </div>
    );
}