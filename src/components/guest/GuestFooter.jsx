import { MapPin, Phone, Mail, Share2, Globe, AtSign } from "lucide-react";

export default function GuestFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a3c2e] text-green-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00B074]">
                <span className="text-sm font-bold text-white">SZ</span>
              </div>
              <span className="text-xl font-bold text-white">StayZone</span>
            </div>
            <p className="text-sm leading-relaxed text-green-200/70 max-w-xs">
              Hotel premium bintang lima yang menyediakan pengalaman menginap
              terbaik di pusat kota Jakarta.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {[
                { Icon: Share2, label: "Share" },
                { Icon: Globe, label: "Website" },
                { Icon: AtSign, label: "Email" },
              ].map(({ Icon, label }) => (
                <button key={label} aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-green-200 hover:bg-[#00B074] hover:text-white transition-colors">
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Navigasi
            </h3>
            <ul className="space-y-2">
              {["Beranda", "Kamar & Fasilitas", "Tentang Kami", "Kontak"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-green-200/70 hover:text-[#00B074] transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-green-200/70">
                <MapPin size={15} className="mt-0.5 shrink-0 text-[#00B074]" />
                <span>Jl. Sudirman No. 88, Jakarta Selatan, 12930</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-green-200/70">
                <Phone size={15} className="shrink-0 text-[#00B074]" />
                <span>(021) 5500-8800</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-green-200/70">
                <Mail size={15} className="shrink-0 text-[#00B074]" />
                <span>info@stayzone.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-green-200/40">
            &copy; {year} StayZone Hotel. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-xs text-green-200/30">
            By : Nur Afifah
          </p>
        </div>
      </div>
    </footer>
  );
}
