import { FaSearch, FaBell, FaRegHeart, FaRegEnvelope, FaRegCommentDots } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();

    const getTitle = () => {
        if (location.pathname.startsWith("/rooms")) return "Rooms List";
        if (location.pathname.startsWith("/guests")) return "Guests List";
        if (location.pathname.startsWith("/booking")) return "Booking List";
        if (location.pathname.startsWith("/settings")) return "Settings";
        if (location.pathname.startsWith("/employers")) return "Employers List";
        return "Dashboard";
    };

    return (
        <header className="bg-white py-4 flex justify-between items-center px-10 shadow-sm sticky top-0 z-10 font-['Poppins']">

            <h2 className="text-2xl font-bold text-black">
                {getTitle()}
            </h2>

            <div className="flex items-center space-x-10">

                {/* Search Bar */}
                <div className="relative hidden md:block">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="bg-[#F5F5F5] border-none rounded-xl py-3 px-6 pr-12 text-sm text-gray-500 focus:ring-1 focus:ring-[#113D32] w-72 transition-all"
                    />
                    {/* Icon Search */}
                    <FaSearch className="absolute right-5 top-4 text-gray-400 text-sm" />
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-6 text-[#113D32] text-xl">
                    <FaRegHeart className="cursor-pointer" />
                    <FaRegEnvelope className="cursor-pointer" />
                    <FaBell className="cursor-pointer" />
                    <FaRegCommentDots className="cursor-pointer" />
                </div>

                {/* Profile */}
                <div className="flex items-center">
                    <img 
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
                        alt="Profile" 
                        className="w-12 h-12 rounded-xl object-cover shadow-sm"
                    />
                </div>

            </div>

        </header>
    );
}