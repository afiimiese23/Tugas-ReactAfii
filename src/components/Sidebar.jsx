import { 
    MdSpaceDashboard, 
    MdMeetingRoom, 
    MdPeople, 
    MdBookOnline,
    MdError, 
    MdLock, 
    MdBlock 
} from "react-icons/md";

import { FaHotel } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {

    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4 space-x-2 transition-all ${
            isActive
                ? "text-yellow-600 bg-yellow-100 font-bold"
                : "text-gray-600 hover:text-yellow-600 hover:bg-yellow-100"
        }`;

    return (
        <div className="flex min-h-screen w-80 flex-col bg-white p-8 shadow-lg">

            {/* LOGO */}
            <div className="flex flex-col">
                <span className="text-4xl font-bold text-gray-900 flex items-center gap-2">
                    <FaHotel className="text-yellow-600" />
                    LuxuryStay
                </span>
                <span className="font-medium text-gray-400">
                    Hotel Management System
                </span>
            </div>

            {/* MENU */}
            <div className="mt-10">
                <ul className="space-y-3">

                    <li>
                        <NavLink to="/" className={menuClass}>
                            <MdSpaceDashboard className="mr-3 text-xl" />
                            Dashboard
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/rooms" className={menuClass}>
                            <MdMeetingRoom className="mr-3 text-xl" />
                            Rooms
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/booking" className={menuClass}>
                            <MdBookOnline className="mr-3 text-xl" />
                            Booking
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/guests" className={menuClass}>
                            <MdPeople className="mr-3 text-xl" />
                            Guests
                        </NavLink>
                    </li>

                    {/* ERROR PAGES */}
                    <li>
                        <NavLink to="/error-400" className={menuClass}>
                            <MdError className="mr-3 text-xl text-orange-500" />
                            Error 400
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/error-401" className={menuClass}>
                            <MdLock className="mr-3 text-xl text-red-400" />
                            Error 401
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/error-403" className={menuClass}>
                            <MdBlock className="mr-3 text-xl text-red-600" />
                            Error 403
                        </NavLink>
                    </li>

                </ul>
            </div>

            {/* FOOTER */}
            <div className="mt-auto">
                <div className="bg-yellow-500 px-4 py-3 rounded-xl shadow-md mb-8 flex items-center justify-between">
                    <div className="text-white text-sm">
                        <span>Manage your hotel rooms & bookings easily</span>

                        <div className="flex justify-center items-center p-2 mt-3 bg-white rounded-md text-black cursor-pointer hover:bg-gray-100">
                            <span> + Add Room</span>
                        </div>
                    </div>

                    <img 
                        className="w-16 rounded-full ml-4" 
                        src="https://i.pravatar.cc/100" 
                        alt="avatar" 
                    />
                </div>

                <span className="font-bold text-gray-400">
                    LuxuryStay Hotel Admin
                </span>
                <p className="text-gray-400 text-sm">
                    © 2026 All Rights Reserved
                </p>
            </div>

        </div>
    );
}