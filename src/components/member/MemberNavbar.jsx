import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { clearSession, getSession } from "@/lib/auth";

const LINKS = [
  { to: "/member/dashboard", label: "Beranda" },
  { to: "/member/rooms",     label: "Katalog Kamar" },
  { to: "/member/bookings",  label: "Booking Saya" },
];

export default function MemberNavbar() {
  const navigate = useNavigate();
  const session  = getSession();
  const [open, setOpen] = useState(false);

  function logout() { clearSession(); navigate("/"); }

  const cls = ({ isActive }) =>
    `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      isActive ? "text-[#00B074] font-semibold" : "text-gray-600 hover:text-[#00B074]"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex h-16 items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/member/dashboard")}>
          <div className="w-8 h-8 bg-[#00B074] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SZ</span>
          </div>
          <span className="font-bold text-[#1a3c2e] text-lg">StayZone</span>
          <span className="text-xs bg-[#00B074]/10 text-[#00B074] font-semibold px-2 py-0.5 rounded-full">Member</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map(l => <NavLink key={l.to} to={l.to} className={cls}>{l.label}</NavLink>)}
        </nav>

        {/* User info + logout */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 bg-green-50 border border-green-100 px-3 py-1.5 rounded-xl">
            <div className="w-7 h-7 bg-[#00B074] rounded-full flex items-center justify-center text-white text-xs font-bold">
              {session?.nama?.charAt(0).toUpperCase() || "M"}
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1a3c2e]">{session?.nama || "Member"}</p>
              <p className="text-[10px] text-gray-400">Member StayZone</p>
            </div>
          </div>
          <button onClick={logout}
            className="text-sm text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
            Keluar
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-gray-600" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 px-4 py-3 space-y-1 bg-white">
          {LINKS.map(l => (
            <NavLink key={l.to} to={l.to} className={cls} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <button onClick={logout}
            className="w-full text-left text-sm text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors mt-2">
            Keluar
          </button>
        </div>
      )}
    </header>
  );
}