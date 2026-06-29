import { useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { getSession, validateVoucher, redeemVoucher } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  BedDouble, Users, Search, CheckCircle2,
  CalendarDays, Tag, AlertCircle, Loader2, X,
} from "lucide-react";

// ─── Data Kamar ───────────────────────────────────────────────────────────────
const ROOMS = [
  { id: 1, name: "Standard Room",      category: "Standard", bedType: "Twin Bed",              maxGuest: 2, priceNum: 450000,  price: "Rp 450.000",   stok: 5, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format&fit=crop&q=80",  badges: [{ label: "Free Wi-Fi", variant: "secondary" }, { label: "Non-Smoking", variant: "outline" }] },
  { id: 2, name: "Deluxe Room",         category: "Deluxe",   bedType: "Queen Bed",             maxGuest: 2, priceNum: 750000,  price: "Rp 750.000",   stok: 3, image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&auto=format&fit=crop&q=80",  badges: [{ label: "Breakfast", variant: "default" }, { label: "City View", variant: "outline" }] },
  { id: 3, name: "Executive Suite",     category: "Suite",    bedType: "King Bed",              maxGuest: 3, priceNum: 1200000, price: "Rp 1.200.000", stok: 2, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80",  badges: [{ label: "Breakfast", variant: "default" }, { label: "Butler", variant: "outline" }] },
  { id: 4, name: "Family Room",         category: "Standard", bedType: "2 Queen Beds",          maxGuest: 4, priceNum: 1100000, price: "Rp 1.100.000", stok: 4, image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&auto=format&fit=crop&q=80",  badges: [{ label: "Breakfast", variant: "default" }, { label: "Kids Friendly", variant: "outline" }] },
  { id: 5, name: "Presidential Suite",  category: "Suite",    bedType: "King + Living Room",    maxGuest: 4, priceNum: 3500000, price: "Rp 3.500.000", stok: 1, image: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=600&auto=format&fit=crop&q=80",  badges: [{ label: "Breakfast", variant: "default" }, { label: "Jacuzzi", variant: "outline" }] },
  { id: 6, name: "Junior Suite",        category: "Suite",    bedType: "King Bed",              maxGuest: 2, priceNum: 950000,  price: "Rp 950.000",   stok: 3, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&auto=format&fit=crop&q=80",  badges: [{ label: "Free Wi-Fi", variant: "secondary" }, { label: "Lounge", variant: "outline" }] },
];

const CATEGORIES = ["Semua", "Standard", "Deluxe", "Suite"];

function calcNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  return Math.max(0, Math.floor((new Date(checkOut) - new Date(checkIn)) / 86400000));
}

function fmtRp(n) {
  return "Rp " + Number(n).toLocaleString("id-ID");
}

// ─── Booking Dialog ───────────────────────────────────────────────────────────
function BookingDialog({ room, open, onClose, onSuccess }) {
  const session = getSession();
  const today   = new Date().toISOString().split("T")[0];

  const [form, setForm]           = useState({ checkIn: "", checkOut: "", catatan: "" });
  const [voucher, setVoucher]     = useState({ code: "", state: null, checking: false });
  const [loading, setLoading]     = useState(false);
  const [toast, setToast]         = useState(null); // { type, msg }

  function resetForm() {
    setForm({ checkIn: "", checkOut: "", catatan: "" });
    setVoucher({ code: "", state: null, checking: false });
    setToast(null);
  }

  function handleClose() { resetForm(); onClose(); }

  async function applyVoucher() {
    if (!voucher.code.trim()) return;
    setVoucher(v => ({ ...v, checking: true, state: null }));
    const result = await validateVoucher(voucher.code);
    setVoucher(v => ({ ...v, checking: false, state: result }));
  }

  const nights      = calcNights(form.checkIn, form.checkOut);
  const subtotal    = room?.priceNum * nights || 0;
  const tax         = Math.round(subtotal * 0.1);
  const discountAmt = voucher.state?.valid ? Math.round(subtotal * 0.2) : 0;
  const totalHarga  = subtotal + tax - discountAmt;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nights) return;
    setLoading(true);

    // Redeem voucher jika valid
    if (voucher.state?.valid) await redeemVoucher();

    const { error } = await supabase.from("bookings").insert([{
      user_id:      session.id,
      nama_kamar:   room.name,
      start_date:   form.checkIn,
      end_date:     form.checkOut,
      kode_voucher: voucher.state?.valid ? voucher.code : null,
      catatan:      form.catatan || null,
      total_harga:  totalHarga,
      status:       "Pending",
    }]);

    setLoading(false);

    if (error) {
      setToast({ type: "error", msg: "Gagal menyimpan booking: " + error.message });
      return;
    }

    setToast({ type: "success", msg: `Reservasi ${room.name} berhasil! Total: ${fmtRp(totalHarga)}` });
    onSuccess?.();
    setTimeout(() => { resetForm(); onClose(); }, 2000);
  }

  if (!room) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1a3c2e]">Pesan — {room.name}</DialogTitle>
          <DialogDescription className="text-xs text-gray-400">
            {room.price} / malam · Maks. {room.maxGuest} tamu
          </DialogDescription>
        </DialogHeader>

        {/* Toast inline */}
        {toast && (
          <div className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm border ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-red-50 border-red-200 text-red-600"
          }`}>
            {toast.type === "success" ? <CheckCircle2 size={15} className="mt-0.5 shrink-0" /> : <AlertCircle size={15} className="mt-0.5 shrink-0" />}
            <span>{toast.msg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tanggal */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Check-in</label>
              <Input type="date" value={form.checkIn} min={today} required
                onChange={e => setForm(f => ({ ...f, checkIn: e.target.value }))}
                className="focus-visible:border-[#00B074] focus-visible:ring-[#00B074]/20" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Check-out</label>
              <Input type="date" value={form.checkOut} min={form.checkIn || today} required
                onChange={e => setForm(f => ({ ...f, checkOut: e.target.value }))}
                className="focus-visible:border-[#00B074] focus-visible:ring-[#00B074]/20" />
            </div>
          </div>

          {/* Voucher */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
              <Tag size={11} /> Kode Voucher (Opsional)
            </label>
            <div className="flex gap-2">
              <Input value={voucher.code} disabled={voucher.state?.valid}
                onChange={e => setVoucher(v => ({ ...v, code: e.target.value.toUpperCase(), state: null }))}
                placeholder="Contoh: SZ-ABC123"
                className="font-mono text-sm focus-visible:border-[#00B074] focus-visible:ring-[#00B074]/20" />
              {voucher.state?.valid
                ? <Button type="button" variant="outline" size="sm"
                    className="shrink-0 border-red-200 text-red-500 hover:bg-red-50"
                    onClick={() => setVoucher({ code: "", state: null, checking: false })}>Hapus</Button>
                : <Button type="button" size="sm" disabled={!voucher.code.trim() || voucher.checking}
                    className="shrink-0 bg-[#1a3c2e] hover:bg-[#0f2d20] text-white"
                    onClick={applyVoucher}>
                    {voucher.checking ? <Loader2 size={13} className="animate-spin" /> : "Pakai"}
                  </Button>
              }
            </div>
            {voucher.state?.valid && (
              <p className="text-xs text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={12} /> Diskon 20% diterapkan!
              </p>
            )}
            {voucher.state && !voucher.state.valid && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} /> {voucher.state.error}
              </p>
            )}
          </div>

          {/* Catatan */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Catatan (Opsional)</label>
            <textarea value={form.catatan} rows={2}
              onChange={e => setForm(f => ({ ...f, catatan: e.target.value }))}
              placeholder="Permintaan khusus, preferensi kamar, dll."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#00B074] focus:ring-2 focus:ring-[#00B074]/20 resize-none" />
          </div>

          {/* Ringkasan Harga */}
          {nights > 0 && (
            <div className="rounded-xl bg-green-50 border border-green-100 px-4 py-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>{room.price} × {nights} malam</span>
                <span className="font-semibold">{fmtRp(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Pajak & layanan (10%)</span><span>{fmtRp(tax)}</span>
              </div>
              {discountAmt > 0 && (
                <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                  <span className="flex items-center gap-1"><Tag size={10} />Diskon Voucher 20%</span>
                  <span>− {fmtRp(discountAmt)}</span>
                </div>
              )}
              <div className="border-t border-green-200 pt-1.5 flex justify-between font-bold text-[#00B074]">
                <span>Total Bayar</span><span>{fmtRp(totalHarga)}</span>
              </div>
            </div>
          )}

          <Button type="submit" disabled={loading || nights === 0}
            className="w-full bg-[#00B074] hover:bg-[#00B074]/90 text-white disabled:opacity-60">
            {loading
              ? <><Loader2 size={14} className="animate-spin mr-2" />Menyimpan...</>
              : <><CalendarDays size={14} className="mr-2" />Konfirmasi Reservasi</>
            }
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Room Card ────────────────────────────────────────────────────────────────
function RoomCard({ room, onBook }) {
  const soldOut = room.stok === 0;
  return (
    <div className="group rounded-2xl border border-green-100 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-44 overflow-hidden">
        <img src={room.image} alt={room.name}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${soldOut ? "grayscale opacity-60" : ""}`}
          loading="lazy" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
          <p className="text-white font-bold text-sm">{room.price}<span className="font-normal text-white/70 text-xs"> / malam</span></p>
        </div>
        {soldOut && <div className="absolute top-2 right-2"><Badge className="bg-red-500 text-white border-0 text-xs">Kamar Penuh</Badge></div>}
        {!soldOut && room.stok <= 2 && <div className="absolute top-2 right-2"><Badge className="bg-amber-500 text-white border-0 text-xs">Sisa {room.stok}</Badge></div>}
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-[#1a3c2e] text-sm">{room.name}</h3>
          <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
            <span className="flex items-center gap-1"><BedDouble size={11} />{room.bedType}</span>
            <span className="flex items-center gap-1"><Users size={11} />Maks. {room.maxGuest}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {room.badges.map(b => <Badge key={b.label} variant={b.variant ?? "secondary"} className="text-[10px]">{b.label}</Badge>)}
        </div>
        <Button size="sm" disabled={soldOut} onClick={() => !soldOut && onBook(room)}
          className={soldOut ? "w-full border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
            : "w-full bg-[#00B074] hover:bg-[#00B074]/90 text-white"}>
          {soldOut ? "Tidak Tersedia" : "Pesan Sekarang"}
        </Button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MemberRoomCatalog() {
  const [search, setSearch]         = useState("");
  const [category, setCategory]     = useState("Semua");
  const [selected, setSelected]     = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successCount, setSuccessCount] = useState(0);

  const filtered = useMemo(() => ROOMS.filter(r => {
    const q = search.toLowerCase();
    return (category === "Semua" || r.category === category) &&
      (r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q));
  }), [search, category]);

  function openBook(room) { setSelected(room); setDialogOpen(true); }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#00B074] mb-1">Katalog Kamar</p>
        <h1 className="text-2xl font-bold text-[#1a3c2e]">Pilih & Pesan Kamar</h1>
        <p className="text-sm text-gray-400 mt-0.5">Temukan kamar yang sempurna dan buat reservasi langsung.</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative w-full sm:max-w-xs">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <Input placeholder="Cari nama kamar..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 border-green-200 focus-visible:border-[#00B074] focus-visible:ring-[#00B074]/20" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                category === cat ? "bg-[#00B074] text-white" : "bg-white border border-green-200 text-gray-500 hover:border-[#00B074] hover:text-[#00B074]"
              }`}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(room => <RoomCard key={room.id} room={room} onBook={openBook} />)}
        </div>
      ) : (
        <div className="py-20 text-center text-gray-400">
          <Search size={36} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Kamar tidak ditemukan.</p>
          <button onClick={() => { setSearch(""); setCategory("Semua"); }}
            className="mt-2 text-xs text-[#00B074] underline">Reset filter</button>
        </div>
      )}

      <BookingDialog room={selected} open={dialogOpen}
        onClose={() => { setDialogOpen(false); setSelected(null); }}
        onSuccess={() => setSuccessCount(c => c + 1)} />
    </main>
  );
}
