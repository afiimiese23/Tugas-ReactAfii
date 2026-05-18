import { 
    MdSpaceDashboard, 
    MdPeople, 
    MdListAlt, 
    MdSettings, 
    MdLogout,
    MdMeetingRoom,
    MdPersonSearch
} from "react-icons/md";
import { FaHotel } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    // Fungsi class untuk NavLink agar sesuai dengan desain StayZone
    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-3 space-x-3 transition-all ${
            isActive
                ? "text-white bg-[#ffffff20] font-semibold" // Putih transparan saat aktif
                : "text-gray-400 hover:text-white hover:bg-[#ffffff10]" // Abu-abu saat idle
        }`;

    return (
        <div className="flex min-h-screen w-64 flex-col bg-[#113D32] p-6 shadow-xl text-white">

            {/* LOGO - Identitas StayZone */}
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                    <FaHotel className="text-[#113D32] text-xl" />
                </div>
                <span className="text-2xl font-bold tracking-tight">
                    StayZone
                </span>
            </div>

            {/* MENU UTAMA */}
            <div className="flex-1">
                <ul className="space-y-2">
                    <li>
                        <NavLink to="/" className={menuClass}>
                            <MdSpaceDashboard className="text-xl" />
                            <span className="text-sm">Dashboard</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/guests" className={menuClass}>
                            <MdPeople className="text-xl" />
                            <span className="text-sm">Guest List</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/guest-details" className={menuClass}>
                            <MdPersonSearch className="text-xl" />
                            <span className="text-sm">Guest Details</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/employers" className={menuClass}>
                            <MdListAlt className="text-xl" />
                            <span className="text-sm">Employers List</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/rooms" className={menuClass}>
                            <MdMeetingRoom className="text-xl" />
                            <span className="text-sm">Room List</span>
                        </NavLink>
                    </li>

                    {/* COMPONENTS */}
                    <li>
                        <NavLink id="menu-4" to="/components" className={menuClass}>
                            <MdListAlt className="mr-4 text-xl" />
                            Components
                        </NavLink>
                    </li>  

                    <li>
                        <NavLink to="/settings" className={menuClass}>
                            <MdSettings className="text-xl" />
                            <span className="text-sm">Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* FOOTER MENU - Logout */}
            <div className="mt-auto pt-6 border-t border-[#ffffff10]">
                <ul className="space-y-2">
                    <li>
                        <NavLink to="/logout" className={menuClass}>
                            <MdLogout className="text-xl" />
                            <span className="text-sm">Logout</span>
                        </NavLink>
                    </li>
                </ul>
                
                {/* Brand Info (Opsional) */}
                <div className="mt-6 px-3">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold opacity-50">
                        StayZone Admin v1.0
                    </p>
                </div>
            </div>

        </div>
    );
}