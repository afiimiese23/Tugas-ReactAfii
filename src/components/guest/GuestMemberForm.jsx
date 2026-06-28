import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Gift, CheckCircle2, User, Mail, Phone, Loader2 } from "lucide-react";

const LOYALTY_TIERS = [
  {
    tier: "Bronze",
    nights: "1–3 Malam",
    benefit: "Free Welcome Drink",
    icon: "🥉",
    color: "border-amber-700/30 bg-amber-50",
    badge: "bg-amber-700/10 text-amber-800",
  },
  {
    tier: "Silver",
    nights: "4–10 Malam",
    benefit: "Diskon 10% & Late Check-out",
    icon: "🥈",
    color: "border-gray-300 bg-gray-50",
    badge: "bg-gray-200 text-gray-700",
  },
  {
    tier: "Gold",
    nights: "11–20 Malam",
    benefit: "Free Breakfast & Room Upgrade",
    icon: "🥇",
    color: "border-yellow-400/50 bg-yellow-50",
    badge: "bg-yellow-100 text-yellow-800",
  },
  {
    tier: "Platinum",
    nights: ">20 Malam",
    benefit: "Executive Lounge & Antar Jemput Bandara",
    icon: "💎",
    color: "border-[#00B074]/40 bg-green-50",
    badge: "bg-[#00B074]/10 text-[#1a3c2e]",
  },
];

export default function GuestMemberForm() {
  const [form, setForm] = useState({ nama: "", email: "", whatsapp: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  // null | { nama, email, whatsapp, voucher, timestamp }
  const [successData, setSuccessData] = useState(null);
  const [members, setMembers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("stayzone_members") || "[]");
    } catch {
      return [];
    }
  });

  // ── Validation ─────────────────────────────────────────────────────────────
  function validate() {
    const e = {};
    if (!form.nama.trim()) e.nama = "Nama lengkap wajib diisi.";
    if (!form.email.trim()) e.email = "Email wajib diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Format email tidak valid.";
    if (!form.whatsapp.trim()) e.whatsapp = "Nomor WhatsApp wajib diisi.";
    else if (!/^[0-9+\-\s]{8,15}$/.test(form.whatsapp))
      e.whatsapp = "Format nomor tidak valid.";
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    // Simulasi async (500ms)
    setTimeout(() => {
      const voucher = "SZ-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      const newMember = {
        ...form,
        voucher,
        timestamp: new Date().toISOString(),
      };
      const updated = [...members, newMember];
      setMembers(updated);
      try {
        localStorage.setItem("stayzone_members", JSON.stringify(updated));
      } catch { /* kuota penuh */ }
      setSuccessData(newMember);
      setForm({ nama: "", email: "", whatsapp: "" });
      setLoading(false);
    }, 500);
  }

  function handleDaftarLagi() {
    setSuccessData(null);
  }

  return (
    <section id="member" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Loyalty Tiers ── */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00B074] mb-2">
            Program Loyalitas
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a3c2e]">
            Semakin Sering Menginap, Semakin Banyak Keuntungan
          </h2>
          <p className="mt-2 text-gray-500 text-sm max-w-lg mx-auto">
            Setiap malam di StayZone mendekatkan Anda ke reward eksklusif berikutnya.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {LOYALTY_TIERS.map((t) => (
            <div
              key={t.tier}
              className={`rounded-xl border p-4 flex flex-col gap-2 ${t.color} transition-transform hover:-translate-y-0.5`}
            >
              <span className="text-2xl">{t.icon}</span>
              <div>
                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold mb-1 ${t.badge}`}>
                  {t.tier}
                </span>
                <p className="text-xs text-gray-500 font-medium">{t.nights}</p>
              </div>
              <p className="text-sm font-semibold text-[#1a3c2e] leading-snug">
                {t.benefit}
              </p>
            </div>
          ))}
        </div>

        {/* ── CRM Lead Capture Form ── */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-[#1a3c2e] to-[#0f2d20] p-8 shadow-xl text-white">

            {/* Header */}
            <div className="flex items-start gap-3 mb-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00B074]">
                <Gift size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold leading-tight">
                  Gabung StayZone Rewards & Dapatkan Voucher Diskon 20%
                </h3>
                <p className="text-green-200/70 text-sm mt-0.5">
                  untuk Reservasi Pertama Anda!
                </p>
              </div>
            </div>

            {/* ── Success State ── */}
            {successData ? (
              <div className="rounded-xl bg-[#00B074]/20 border border-[#00B074]/40 p-6 text-center space-y-3">
                <CheckCircle2 size={40} className="text-[#00B074] mx-auto" />
                <p className="text-base font-semibold text-white">
                  Terima kasih{" "}
                  <span className="text-[#00B074]">{successData.nama}</span>,
                  pendaftaran member StayZone berhasil!
                </p>
                <p className="text-sm text-green-200/80">
                  Kode voucher telah dikirim ke WhatsApp Anda.
                </p>
                <div className="inline-flex items-center gap-2 rounded-lg bg-[#00B074]/30 px-4 py-2 border border-[#00B074]/50">
                  <span className="text-xs text-green-200/70">Kode Voucher:</span>
                  <span className="font-mono font-bold text-white text-sm tracking-widest">
                    {successData.voucher}
                  </span>
                </div>
                <p className="text-xs text-green-200/50 pt-1">
                  Total anggota terdaftar: {members.length} member
                </p>
                <Button
                  onClick={handleDaftarLagi}
                  variant="outline"
                  size="sm"
                  className="mt-2 border-green-400/30 text-green-200 hover:bg-white/10 bg-transparent"
                >
                  Daftar Akun Lain
                </Button>
              </div>
            ) : (
              /* ── Form State ── */
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Nama */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-green-100">
                    Nama Lengkap <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <Input
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap Anda"
                      className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:border-[#00B074] focus-visible:ring-[#00B074]/30"
                    />
                  </div>
                  {errors.nama && (
                    <p className="text-xs text-red-400">{errors.nama}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-green-100">
                    Alamat Email <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <Input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="contoh@email.com"
                      className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:border-[#00B074] focus-visible:ring-[#00B074]/30"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* WhatsApp */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-green-100">
                    Nomor WhatsApp <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <Input
                      name="whatsapp"
                      type="tel"
                      value={form.whatsapp}
                      onChange={handleChange}
                      placeholder="+62 812 3456 7890"
                      className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:border-[#00B074] focus-visible:ring-[#00B074]/30"
                    />
                  </div>
                  {errors.whatsapp && (
                    <p className="text-xs text-red-400">{errors.whatsapp}</p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 bg-[#00B074] hover:bg-[#00B074]/90 text-white font-semibold text-sm shadow-lg shadow-green-900/30 mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="animate-spin mr-2" />
                      Mendaftarkan...
                    </>
                  ) : (
                    <>
                      <Gift size={15} className="mr-2" />
                      Daftar Member & Klaim Voucher
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-green-200/40 pt-1">
                  Data Anda aman dan tidak akan disebarkan ke pihak ketiga.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
