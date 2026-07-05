import { FaBell, FaRegHeart, FaRegEnvelope, FaRegCommentDots } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { getSession } from "@/lib/auth";

const TITLES = [
  ["/admin/guests",    "Guest List"],
  ["/admin/booking",   "Booking List"],
  ["/admin/rooms",     "Room List"],
  ["/admin/employers", "Employers List"],
  ["/admin/user",      "User"],
  ["/admin/settings",  "Settings"],
  ["/admin/dashboard", "Dashboard"],
  ["/admin",           "Dashboard"],
];

export default function Header() {
  const location = useLocation();
  const session  = getSession();

  const title = TITLES.find(([path]) => location.pathname.startsWith(path))?.[1] ?? "Dashboard";

  return (
    <header className="bg-white px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-10">
      {/* Title */}
      <h2 className="text-lg font-bold text-[#113D32]">{title}</h2>
      <div className="flex items-center gap-6">

        {/* Icons */}
        <div className="flex items-center gap-5 text-gray-400 text-lg border-r border-gray-100 pr-6">
          <FaRegHeart      className="cursor-pointer hover:text-[#113D32] transition-colors" />
          <FaRegEnvelope   className="cursor-pointer hover:text-[#113D32] transition-colors" />
          <FaBell          className="cursor-pointer hover:text-[#113D32] transition-colors" />
          <FaRegCommentDots className="cursor-pointer hover:text-[#113D32] transition-colors" />
        </div>

        {/* Profile — avatar inisial dari session, sama seperti di Settings */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#3AB449] to-[#113D32] flex items-center justify-center shadow-lg mb-3">
            <span className="text-white font-bold text-sm">
              {(session?.nama || "A").split(" ").slice(0, 2).map(w => w[0].toUpperCase()).join("")}
            </span>
          </div>
          {session && (
            <div className="hidden md:block">
              <p className="text-xs font-bold text-[#113D32] leading-tight">{session.nama}</p>
              <p className="text-[10px] text-gray-400 leading-tight capitalize">{session.role}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}