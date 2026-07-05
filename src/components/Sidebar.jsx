import { MdSpaceDashboard, MdPeople, MdListAlt, MdSettings, MdLogout, MdMeetingRoom, MdPerson, MdBookOnline } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "@/lib/auth";

export default function Sidebar() {
    const navigate = useNavigate();

    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-3 space-x-3 transition-all ${
            isActive
                ? "text-white bg-[#ffffff20] font-semibold"
                : "text-gray-400 hover:text-white hover:bg-[#ffffff10]"
        }`;

    const handleLogout = () => {
        signOut();
        navigate("/");
    };

    return (
        <div className="flex min-h-screen w-64 flex-col bg-[#113D32] p-6 shadow-xl text-white">

            {/* LOGO */}
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#3AB449] to-[#113D32] flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">SZ</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-white">StayZone</span>
            </div>

            {/* MENU */}
            <div className="flex-1">
                <ul className="space-y-1">
                    <li>
                        <NavLink to="/admin/dashboard" className={menuClass}>
                            <MdSpaceDashboard className="text-xl shrink-0" />
                            <span className="text-sm">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/booking" className={menuClass}>
                            <MdBookOnline className="text-xl shrink-0" />
                            <span className="text-sm">Booking</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/guests" className={menuClass}>
                            <MdPeople className="text-xl shrink-0" />
                            <span className="text-sm">Guest List</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/employers" className={menuClass}>
                            <MdListAlt className="text-xl shrink-0" />
                            <span className="text-sm">Employers</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/rooms" className={menuClass}>
                            <MdMeetingRoom className="text-xl shrink-0" />
                            <span className="text-sm">Room List</span>
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/admin/user" className={menuClass}>
                            <MdPerson className="text-xl shrink-0" />
                            <span className="text-sm">User</span>
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink to="/admin/settings" className={menuClass}>
                            <MdSettings className="text-xl shrink-0" />
                            <span className="text-sm">Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* FOOTER */}
            <div className="mt-auto pt-6 border-t border-[#ffffff10]">
                <button onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center rounded-xl p-3 space-x-3 transition-all text-gray-400 hover:text-white hover:bg-[#ffffff10]">
                    <MdLogout className="text-xl" />
                    <span className="text-sm">Logout</span>
                </button>
                <div className="mt-6 px-3">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold opacity-50">
                        StayZone Admin v1.0
                    </p>
                </div>
            </div>
        </div>
    );
}