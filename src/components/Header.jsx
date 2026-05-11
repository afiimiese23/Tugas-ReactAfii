import { 
    FaSearch, 
    FaBell, 
    FaRegHeart, 
    FaRegEnvelope, 
    FaRegCommentDots 
} from "react-icons/fa";

import { useLocation } from "react-router-dom";

export default function Header() {

    const location = useLocation();

    const getTitle = () => {
        if (location.pathname.startsWith("/rooms")) {
            return "Rooms";
        }

        if (location.pathname.startsWith("/guests")) {
            return "Guests";
        }

        if (location.pathname.startsWith("/booking")) {
            return "Booking";
        }

        if (location.pathname.startsWith("/settings")) {
            return "Settings";
        }

        if (location.pathname.startsWith("/employers")) {
            return "Employers";
        }

        return "Dashboard";
    };

    return (
        <header className="bg-white p-4 flex justify-between items-center px-8 shadow-sm sticky top-0 z-10 font-['Poppins']">

            {/* Dynamic Title */}
            <h2 className="text-xl font-bold text-gray-800">
                {getTitle()}
            </h2>

            <div className="flex items-center space-x-6">

                {/* Search Bar */}
                <div className="relative hidden md:block">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="bg-[#EEEEEE] border-none rounded-full py-2 px-10 text-sm focus:ring-2 focus:ring-[#113D32] w-64 transition-all"
                    />

                    <FaSearch className="absolute left-4 top-3 text-gray-400 text-xs" />
                </div>

                {/* Icons */}
                <div className="flex space-x-5 text-gray-600 text-lg border-r border-gray-100 pr-6">

                    <FaRegHeart className="cursor-pointer hover:text-[#113D32] transition-colors" />

                    <FaRegEnvelope className="cursor-pointer hover:text-[#113D32] transition-colors" />

                    <FaBell className="cursor-pointer hover:text-[#113D32] transition-colors" />

                    <FaRegCommentDots className="cursor-pointer hover:text-[#113D32] transition-colors" />

                </div>

                {/* Profile */}
                <div className="flex items-center">
                    <img 
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover"
                    />
                </div>

            </div>

        </header>
    );
}