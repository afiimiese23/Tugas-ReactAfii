import { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { Menu, X, LogOut, Home, BedDouble, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clearSession, getSession } from "@/lib/auth";

const NAV_LINKS = [
  { to: "/member/dashboard", label: "Beranda",       icon: Home },
  { to: "/member/rooms",     label: "Katalog Kamar", icon: BedDouble },
  { to: "/member/bookings",  label: "Booking Saya",  icon: ClipboardList },
];

export default function MemberNavbar() {
  const navigate  = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const session = getSession();

  function handleLogout() { clearSession(); navigate("/"); }

  const initials = session?.nama
    ? session.nama.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "M";

  const linkClass = ({ isActive }) =>
    `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      isActive ? "text-[#00B074] bg-green-50 font-semibold" : "text-gray-600 hover:text-[#00B074] hover:bg-green-50"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
      isActive ? "text-[#00B074] bg-green-50 font-semibold" : "text-gray-600 hover:text-[#00B074] hover:bg-green-50"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2 select-none cursor-pointer" onClick={() => navigate("/member/dashboard")}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00B074]">
              <span className="text-sm font-bold text-white">SZ</span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-[#00B074]">Stay</span><span className="text-[#1a3c2e]">Zone</span>
            </span>
            <span className="hidden sm:inline-block text-xs font-semibold bg-[#00B074]/10 text-[#00B074] px-2 py-0.5 rounded-full ml-1">Member</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === "/member/dashboard"} className={linkClass}>{label}</NavLink>
            ))}
          </nav>

          {/* User + Logout */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-green-50 px-3 py-1.5 border border-green-100">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00B074] text-white text-xs font-bold">{initials}</div>
              <div className="text-left">
                <p className="text-xs font-semibold text-[#1a3c2e] leading-tight max-w-[120px] truncate">{session?.nama || "Member"}</p>
                <p className="text-[10px] text-gray-400 leading-tight">Member StayZone</p>
              </div>
            </div>
            <Button variant="outline" size="sm"
              className="border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 gap-1.5"
              onClick={handleLogout}>
              <LogOut size={13} /> Keluar
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-green-50"
            onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-green-100 mt-1 pt-3 space-y-1">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-50 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00B074] text-white text-xs font-bold">{initials}</div>
              <div>
                <p className="text-sm font-semibold text-[#1a3c2e]">{session?.nama || "Member"}</p>
                <p className="text-xs text-gray-400">Member StayZone</p>
              </div>
            </div>

            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} end={to === "/member/dashboard"}
                className={mobileLinkClass}
                onClick={() => setMenuOpen(false)}>
                <Icon size={14} /> {label}
              </NavLink>
            ))}

            <div className="pt-2 px-1">
              <Button variant="outline" size="sm"
                className="w-full border-red-200 text-red-500 hover:bg-red-50 gap-1.5"
                onClick={() => { handleLogout(); setMenuOpen(false); }}>
                <LogOut size={13} /> Keluar
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
