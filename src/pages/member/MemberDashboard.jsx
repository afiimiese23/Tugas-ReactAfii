import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSession, validateVoucher, redeemVoucher } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import MemberTierCard from "@/components/member/MemberTierCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BedDouble, Users, Search } from "lucide-react";

const ROOMS = [
  { id: 1, name: "Standard Room",     cat: "Standard", bed: "Twin Bed",          max: 2, price: 450000,  stok: 5, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80" },
  { id: 2, name: "Deluxe Room",        cat: "Deluxe",   bed: "Queen Bed",         max: 2, price: 750000,  stok: 3, img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80" },
  { id: 3, name: "Executive Suite",    cat: "Suite",    bed: "King Bed",          max: 3, price: 1200000, stok: 2, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80" },
  { id: 4, name: "Family Room",        cat: "Standard", bed: "2 Queen Beds",      max: 4, price: 1100000, stok: 4, img: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&q=80" },
  { id: 5, name: "Presidential Suite", cat: "Suite",    bed: "King + Living",     max: 4, price: 3500000, stok: 1, img: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=600&q=80" },
  { id: 6, name: "Junior Suite",       cat: "Suite",    bed: "King Bed",          max: 2, price: 950000,  stok: 3, img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80" },
];

const rp = (n) => "Rp " + Number(n).toLocaleString("id-ID");
const fmt = (s) => s ? new Date(s).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "—";
const nights = (a, b) => a && b ? Math.max(0, Math.floor((new Date(b) - new Date(a)) / 86400000)) : 0;

export default function MemberDashboard() {
  const navigate  = useNavigate();
  const session   = getSession();

  const [bookings, setBookings]   = useState([]);
  const [search, setSearch]       = useState("");
  const [cat, setCat]             = useState("Semua");
  const [room, setRoom]           = useState(null);
  const [form, setForm]           = useState({ checkIn: "", checkOut: "", catatan: "" });
  const [voucher, setVoucher]     = useState({ code: "", valid: false, err: "" });
  const [loading, setLoading]     = useState(false);

  useEffect(() => { if (session?.id) load(); }, []);

  async function load() {
    const { data } = await supabase.from("bookings")
      .select("id_bookings, nama_kamar, start_date, end_date, total_harga, status")
      .eq("id_user", Number(session.id)).order("created_at", { ascending: false });
    setBookings(data || []);
  }

  async function applyVoucher() {
    const res = await validateVoucher(voucher.code);
    setVoucher(v => ({ ...v, valid: res.valid, err: res.error || "" }));
  }

  async function handleBook(e) {
    e.preventDefault();
    if (!room) return;
    setLoading(true);
    const n   = nights(form.checkIn, form.checkOut);
    const sub = room.price * n;
    const tax = Math.round(sub * 0.1);
    const disc = voucher.valid ? Math.round(sub * 0.2) : 0;
    const total = sub + tax - disc;

    if (voucher.valid) await redeemVoucher();

    const { error } = await supabase.from("bookings").insert([{
      id_user: Number(session.id), nama_kamar: room.name,
      start_date: form.checkIn, end_date: form.checkOut,
      kode_voucher: voucher.valid ? voucher.code : null,
      catatan: form.catatan || null, total_harga: total, status: "Pending",
    }]);

    setLoading(false);
    if (error) { alert(error.message); return; }
    setRoom(null); setForm({ checkIn: "", checkOut: "", catatan: "" }); setVoucher({ code: "", valid: false, err: "" });
    load();
  }

  if (!session || session.role !== "user") {
    return <div className="flex items-center justify-center min-h-screen"><button onClick={() => navigate("/login")} className="bg-[#00B074] text-white px-6 py-3 rounded-xl font-bold">Login</button></div>;
  }

  const filtered = ROOMS
    .filter(r => cat === "Semua" || r.cat === cat)
    .filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()));

  const totalNights = bookings.filter(b => b.status !== "Cancelled")
    .reduce((s, b) => s + nights(b.start_date, b.end_date), 0);

  const n  = nights(form.checkIn, form.checkOut);
  const sub = room ? room.price * n : 0;
  const total = sub + Math.round(sub * 0.1) - (voucher.valid ? Math.round(sub * 0.2) : 0);
  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">

      {/* Welcome + Stats */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-[#1a3c2e] to-[#0f2d20] p-6 text-white">
          <p className="text-xs text-green-300/60 uppercase tracking-widest mb-1">Member Dashboard</p>
          <h1 className="text-xl font-bold">Selamat datang, {session.nama}! 👋</h1>
          {session.voucher && <p className="text-sm text-green-200/60 mt-1">Voucher aktif: <span className="font-mono font-bold text-[#00B074]">{session.voucher}</span></p>}
          <div className="flex gap-3 mt-4">
            {[{ label: "Total Booking", val: bookings.length }, { label: "Total Malam", val: totalNights }].map(s => (
              <div key={s.label} className="bg-white/10 rounded-xl px-4 py-3 border border-white/20">
                <p className="text-xs text-green-200/60">{s.label}</p>
                <p className="text-xl font-bold">{s.val}</p>
              </div>
            ))}
          </div>
        </div>
        <MemberTierCard totalNights={totalNights} />
      </div>

      {/* Katalog */}
      <section>
        <h2 className="text-xl font-bold text-[#1a3c2e] mb-1">Katalog Kamar</h2>
        <p className="text-sm text-gray-400 mb-4">Pilih kamar dan buat reservasi langsung.</p>
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari kamar..."
              className="pl-8 pr-4 py-2 text-xs rounded-xl border border-green-200 bg-white focus:outline-none focus:border-[#00B074] w-52" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Semua","Standard","Deluxe","Suite"].map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${cat === c ? "bg-[#00B074] text-white" : "bg-white border border-green-200 text-gray-500 hover:border-[#00B074]"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(r => (
            <div key={r.id} className="group rounded-2xl border border-green-100 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="relative h-44 overflow-hidden">
                <img src={r.img} alt={r.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
                  <p className="text-white font-bold text-sm">{rp(r.price)}<span className="font-normal text-white/70 text-xs"> / malam</span></p>
                </div>
                {r.stok <= 2 && r.stok > 0 && <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Sisa {r.stok}</span>}
                {r.stok === 0 && <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Penuh</span>}
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-[#1a3c2e] text-sm">{r.name}</h3>
                  <div className="flex gap-3 text-xs text-gray-400 mt-0.5">
                    <span className="flex items-center gap-1"><BedDouble size={10} />{r.bed}</span>
                    <span className="flex items-center gap-1"><Users size={10} />Maks. {r.max}</span>
                  </div>
                </div>
                <button disabled={r.stok === 0} onClick={() => setRoom(r)}
                  className={`w-full py-2 rounded-xl text-sm font-bold transition-colors ${r.stok === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#00B074] hover:bg-[#00B074]/90 text-white"}`}>
                  {r.stok === 0 ? "Tidak Tersedia" : "Pesan Kamar Ini"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Riwayat Booking */}
      <section>
        <h2 className="text-xl font-bold text-[#1a3c2e] mb-1">Booking Saya</h2>
        <p className="text-sm text-gray-400 mb-4">Riwayat dan status reservasi Anda.</p>
        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-green-200 bg-white py-12 text-center text-gray-400 text-sm">Belum ada booking.</div>
        ) : (
          <div className="space-y-3">
            {bookings.map(b => {
              const img = ROOMS.find(r => r.name === b.nama_kamar)?.img || ROOMS[0].img;
              return (
                <div key={b.id_bookings} className="rounded-2xl bg-white border border-green-100 p-4 flex gap-4 shadow-sm">
                  <img src={img} alt={b.nama_kamar} className="w-20 h-14 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-[#1a3c2e] text-sm">{b.nama_kamar}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        b.status === "Pending" ? "bg-amber-100 text-amber-700" :
                        b.status === "Confirmed" ? "bg-green-100 text-green-700" :
                        b.status === "Check-in" ? "bg-blue-100 text-blue-700" :
                        b.status === "Cancelled" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
                        {b.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{fmt(b.start_date)} → {fmt(b.end_date)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-400">Total</p>
                    <p className="font-bold text-[#00B074] text-sm">{rp(b.total_harga)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Dialog Booking */}
      <Dialog open={!!room} onOpenChange={v => !v && setRoom(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#1a3c2e]">Pesan — {room?.name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleBook} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-500">Check-in</label>
                <input type="date" required min={today} value={form.checkIn}
                  onChange={e => setForm(f => ({ ...f, checkIn: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#00B074]" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Check-out</label>
                <input type="date" required min={form.checkIn || today} value={form.checkOut}
                  onChange={e => setForm(f => ({ ...f, checkOut: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#00B074]" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500">Kode Voucher (opsional)</label>
              <div className="flex gap-2 mt-1">
                <input value={voucher.code} disabled={voucher.valid}
                  onChange={e => setVoucher(v => ({ ...v, code: e.target.value.toUpperCase(), valid: false, err: "" }))}
                  placeholder="SZ-XXXXXX" className="flex-1 px-3 py-2 text-sm rounded-xl border border-gray-200 font-mono focus:outline-none focus:border-[#00B074]" />
                {voucher.valid
                  ? <button type="button" onClick={() => setVoucher({ code: "", valid: false, err: "" })} className="px-3 py-2 text-xs text-red-500 border border-red-200 rounded-xl">Hapus</button>
                  : <button type="button" onClick={applyVoucher} className="px-3 py-2 text-xs bg-[#1a3c2e] text-white rounded-xl">Pakai</button>}
              </div>
              {voucher.valid && <p className="text-xs text-emerald-600 mt-1">✓ Diskon 20% diterapkan!</p>}
              {voucher.err   && <p className="text-xs text-red-500 mt-1">{voucher.err}</p>}
            </div>

            <textarea value={form.catatan} onChange={e => setForm(f => ({ ...f, catatan: e.target.value }))}
              placeholder="Catatan / permintaan khusus (opsional)" rows={2}
              className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 resize-none focus:outline-none focus:border-[#00B074]" />

            {n > 0 && (
              <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-sm space-y-1">
                <div className="flex justify-between text-gray-600"><span>{rp(room?.price)} × {n} malam</span><span>{rp(sub)}</span></div>
                <div className="flex justify-between text-xs text-gray-400"><span>Pajak 10%</span><span>{rp(Math.round(sub * 0.1))}</span></div>
                {voucher.valid && <div className="flex justify-between text-xs text-emerald-600 font-semibold"><span>Diskon 20%</span><span>−{rp(Math.round(sub * 0.2))}</span></div>}
                <div className="flex justify-between font-bold text-[#00B074] border-t border-green-200 pt-1"><span>Total</span><span>{rp(total)}</span></div>
              </div>
            )}

            <button type="submit" disabled={loading || n === 0}
              className="w-full py-2.5 rounded-xl bg-[#00B074] text-white font-bold text-sm disabled:opacity-50 hover:bg-[#00B074]/90 transition-colors">
              {loading ? "Menyimpan..." : "Konfirmasi Reservasi"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}