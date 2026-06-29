import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Kamar & Fasilitas", href: "#kamar" },
  { label: "Tentang Kami", href: "#tentang" },
];

export default function GuestNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-2 select-none">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00B074]">
              <span className="text-sm font-bold text-white">SZ</span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-[#00B074]">Stay</span>
              <span className="text-[#1a3c2e]">Zone</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg transition-colors hover:text-[#00B074] hover:bg-green-50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              variant="default"
              size="default"
              className="bg-[#00B074] hover:bg-[#00B074]/90 text-white px-5"
              onClick={() => navigate("/login")}
            >
              Masuk / Daftar
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-green-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-green-100 mt-1 pt-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:text-[#00B074] hover:bg-green-50"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 px-1">
              <Button
                variant="default"
                size="default"
                className="w-full bg-[#00B074] hover:bg-[#00B074]/90 text-white"
                onClick={() => { navigate("/login"); setMenuOpen(false); }}
              >
                Masuk / Daftar
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
