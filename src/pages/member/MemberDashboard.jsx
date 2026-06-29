import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getSession, clearSession, validateVoucher, redeemVoucher } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import MemberTierCard from "@/components/member/MemberTierCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Search, BedDouble, Users, CheckCircle2,
  CalendarDays, LogIn, Gift, X, Loader2, Tag, AlertCircle,
} from "lucide-react";

// ─── Katalog Kamar (data lokal member dashboard) ──────────────────────────────
const ROOM_CATALOG = [
  {
    id: 1, name: "Standard Room", category: "Standard",
    bedType: "Twin Bed", maxGuest: 2, price: "Rp 450.000", priceNum: 450000,
    stok: 5,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format&fit=crop&q=80",
    description: "Kamar standar yang nyaman dengan twin bed, cocok untuk pasangan atau perjalanan bisnis singkat.",
    facilities: ["AC", "TV LED 32\"", "Free Wi-Fi", "Kamar Mandi Shower", "Minibar", "Safe Box"],
    badges: [{ label: "Free Wi-Fi", variant: "secondary" }, { label: "Non-Smoking", variant: "outline" }],
  },
  {
    id: 2, name: "Deluxe Room", category: "Deluxe",
    bedType: "Queen Bed", maxGuest: 2, price: "Rp 750.000", priceNum: 750000,
    stok: 3,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&auto=format&fit=crop&q=80",
    description: "Kamar deluxe dengan pemandangan kota memukau dan queen bed premium berlinen mewah.",
    facilities: ["AC", "TV LED 43\"", "Free Wi-Fi", "Bathtub & Shower", "Minibar", "City View", "Sarapan Pagi"],
    badges: [{ label: "Breakfast Included", variant: "default" }, { label: "City View", variant: "outline" }],
  },
  {
    id: 3, name: "Executive Suite", category: "Suite",
    bedType: "King Bed", maxGuest: 3, price: "Rp 1.200.000", priceNum: 1200000,
    stok: 2,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80",
    description: "Suite eksekutif dengan ruang tamu terpisah dan bathtub jacuzzi mewah.",
    facilities: ["AC", "TV LED 55\"", "Free Wi-Fi", "Bathtub Jacuzzi", "Ruang Tamu", "Butler Service", "Sarapan Pagi"],
    badges: [{ label: "Breakfast Included", variant: "default" }, { label: "Butler Service", variant: "outline" }],
  },
  {
    id: 4, name: "Family Room", category: "Standard",
    bedType: "2 Queen Beds", maxGuest: 4, price: "Rp 1.100.000", priceNum: 1100000,
    stok: 4,
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&auto=format&fit=crop&q=80",
    description: "Kamar luas dengan 2 queen bed untuk keluarga, lengkap area bermain anak.",
    facilities: ["AC", "TV LED 43\"", "Free Wi-Fi", "2 Kamar Mandi", "Kids Corner", "Sarapan Pagi"],
    badges: [{ label: "Breakfast Included", variant: "default" }, { label: "Kids Friendly", variant: "outline" }],
  },
  {
    id: 5, name: "Presidential Suite", category: "Suite",
    bedType: "King Bed + Living Room", maxGuest: 4, price: "Rp 3.500.000", priceNum: 3500000,
    stok: 1,
    image: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=600&auto=format&fit=crop&q=80",
    description: "Pengalaman menginap paling mewah di StayZone — jacuzzi pribadi & butler eksklusif 24 jam.",
    facilities: ["AC", "TV LED 65\"", "Free Wi-Fi", "Jacuzzi Pribadi", "Living Room", "Butler 24 Jam", "Sarapan Pagi", "Airport Transfer"],
    badges: [{ label: "Breakfast Included", variant: "default" }, { label: "Butler Service", variant: "default" }, { label: "Jacuzzi", variant: "outline" }],
  },
  {
    id: 6, name: "Junior Suite", category: "Suite",
    bedType: "King Bed", maxGuest: 2, price: "Rp 950.000", priceNum: 950000,
    stok: 3,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&auto=format&fit=crop&q=80",
    description: "Junior Suite elegan dengan dekorasi modern dan akses lounge eksklusif.",
    facilities: ["AC", "TV LED 49\"", "Free Wi-Fi", "Shower Premium", "Lounge Access", "Non-Smoking"],
    badges: [{ label: "Free Wi-Fi", variant: "secondary" }, { label: "Lounge Access", variant: "outline" }],
  },
];

const CATEGORIES = ["Semua", "Standard", "Deluxe", "Suite"];

// ─── Helper format tanggal ─────────────────────────────────────────────────────
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit", month: "long", year: "numeric",
  });
}

// ─── BookingFormDialog ─────────────────────────────────────────────────────────
function BookingFormDialog({ room, open, onClose, onSubmit, memberVoucher }) {
  const [form, setForm]           = useState({ checkIn: "", checkOut: "", notes: "" });
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherState, setVoucherState] = useState(null); // null | { valid, discount, error }
  const [checkingVoucher, setCheckingVoucher] = useState(false);
  const [loading, setLoading]     = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleApplyVoucher() {
    if (!voucherCode.trim()) return;
    setCheckingVoucher(true);
    const result = await validateVoucher(voucherCode);
    setVoucherState(result);
    setCheckingVoucher(false);
  }

  function handleRemoveVoucher() {
    setVoucherCode("");
    setVoucherState(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.checkIn || !form.checkOut) return;
    setLoading(true);
    setTimeout(async () => {
      // Tandai voucher terpakai di Supabase jika digunakan
      if (voucherState?.valid) {
        await redeemVoucher();
      }
      onSubmit({ room, ...form, voucherApplied: voucherState?.valid ? voucherCode : null, discount: voucherState?.valid ? voucherState.discount : 0 });
      setForm({ checkIn: "", checkOut: "", notes: "" });
      setVoucherCode("");
      setVoucherState(null);
      setLoading(false);
    }, 600);
  }

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0;
    const diff = new Date(form.checkOut) - new Date(form.checkIn);
    return Math.max(0, Math.floor(diff / 86400000));
  }, [form.checkIn, form.checkOut]);

  const subtotal      = nights * (room?.priceNum || 0);
  const tax           = Math.round(subtotal * 0.1);
  const discountAmt   = voucherState?.valid ? Math.round(subtotal * voucherState.discount) : 0;
  const total         = subtotal + tax - discountAmt;

  if (!room) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-lg text-[#1a3c2e]">Pesan — {room.name}</DialogTitle>
          <DialogDescription className="text-xs text-gray-400">
            Isi tanggal check-in & check-out untuk melanjutkan reservasi.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Tanggal */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Check-in</label>
              <Input type="date" name="checkIn" value={form.checkIn}
                min={new Date().toISOString().split("T")[0]}
                onChange={handleChange} required
                className="focus-visible:border-[#00B074] focus-visible:ring-[#00B074]/20" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Check-out</label>
              <Input type="date" name="checkOut" value={form.checkOut}
                min={form.checkIn || new Date().toISOString().split("T")[0]}
                onChange={handleChange} required
                className="focus-visible:border-[#00B074] focus-visible:ring-[#00B074]/20" />
            </div>
          </div>

          {/* Voucher Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
              <Tag size={11} /> Kode Voucher
              {memberVoucher && (
                <span className="ml-1 text-[10px] text-[#00B074] font-normal normal-case">
                  (Anda punya: <span className="font-mono font-bold">{memberVoucher}</span>)
                </span>
              )}
            </label>
            <div className="flex gap-2">
              <Input
                value={voucherCode}
                onChange={(e) => { setVoucherCode(e.target.value.toUpperCase()); setVoucherState(null); }}
                placeholder="Contoh: SZ-ABC123"
                disabled={voucherState?.valid}
                className="font-mono text-sm focus-visible:border-[#00B074] focus-visible:ring-[#00B074]/20"
              />
              {voucherState?.valid ? (
                <Button type="button" variant="outline" size="sm"
                  className="shrink-0 border-red-200 text-red-500 hover:bg-red-50"
                  onClick={handleRemoveVoucher}>
                  Hapus
                </Button>
              ) : (
                <Button type="button" size="sm"
                  className="shrink-0 bg-[#1a3c2e] hover:bg-[#0f2d20] text-white"
                  disabled={!voucherCode.trim() || checkingVoucher}
                  onClick={handleApplyVoucher}>
                  {checkingVoucher ? <Loader2 size={13} className="animate-spin" /> : "Pakai"}
                </Button>
              )}
            </div>

            {/* Voucher feedback */}
            {voucherState?.valid && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                <CheckCircle2 size={13} />
                <span>Voucher valid! Diskon <strong>20%</strong> diterapkan.</span>
              </div>
            )}
            {voucherState && !voucherState.valid && (
              <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <AlertCircle size={13} />
                <span>{voucherState.error}</span>
              </div>
            )}
          </div>

          {/* Ringkasan Harga */}
          {nights > 0 && (
            <div className="rounded-xl bg-green-50 border border-green-100 px-4 py-3 space-y-1.5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{room.price} × {nights} malam</span>
                <span className="font-semibold text-[#1a3c2e]">Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Pajak & biaya layanan (10%)</span>
                <span>Rp {tax.toLocaleString("id-ID")}</span>
              </div>
              {discountAmt > 0 && (
                <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                  <span className="flex items-center gap-1"><Tag size={10} />Diskon Voucher (20%)</span>
                  <span>- Rp {discountAmt.toLocaleString("id-ID")}</span>
                </div>
              )}
              <div className="border-t border-green-200 pt-1.5 flex justify-between text-sm font-bold text-[#00B074]">
                <span>Total Bayar</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
              </div>
            </div>
          )}

          {/* Catatan */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Catatan (opsional)</label>
            <textarea name="notes" value={form.notes} onChange={handleChange}
              placeholder="Permintaan khusus, preferensi kamar, dll."
              rows={2}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#00B074] focus:ring-2 focus:ring-[#00B074]/20 resize-none"
            />
          </div>

          <Button type="submit" disabled={loading || nights === 0}
            className="w-full bg-[#00B074] hover:bg-[#00B074]/90 text-white disabled:opacity-60">
            {loading
              ? <><Loader2 size={14} className="animate-spin mr-2" />Memproses...</>
              : <><CalendarDays size={14} className="mr-2" />Konfirmasi Reservasi</>
            }
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Komponen kartu kamar di member dashboard ──────────────────────────────────
function MemberRoomCard({ room, onBook }) {
  const isSoldOut = room.stok === 0;
  return (
    <div className="group rounded-2xl border border-green-100 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-44 overflow-hidden">
        <img src={room.image} alt={room.name}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${isSoldOut ? "grayscale opacity-60" : ""}`}
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
          <p className="text-white font-bold text-sm">
            {room.price}<span className="font-normal text-white/70 text-xs"> / malam</span>
          </p>
        </div>
        {isSoldOut && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-red-500 text-white border-0 text-xs">Kamar Penuh</Badge>
          </div>
        )}
        {!isSoldOut && room.stok <= 2 && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-amber-500 text-white border-0 text-xs">Sisa {room.stok}</Badge>
          </div>
        )}
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
          {room.badges.slice(0, 2).map((b) => (
            <Badge key={b.label} variant={b.variant ?? "secondary"} className="text-[10px]">
              {b.label}
            </Badge>
          ))}
        </div>
        <Button
          size="sm" disabled={isSoldOut}
          onClick={() => !isSoldOut && onBook(room)}
          className={isSoldOut
            ? "w-full border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
            : "w-full bg-[#00B074] hover:bg-[#00B074]/90 text-white"
          }
        >
          {isSoldOut ? "Tidak Tersedia" : "Pesan Kamar Ini"}
        </Button>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function MemberDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const session = getSession();

  // Guard: jika bukan member, redirect ke login
  if (!session || session.role !== "user") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 gap-4">
        <div className="text-5xl">🔒</div>
        <p className="text-[#1a3c2e] font-semibold text-lg">Akses khusus Member</p>
        <p className="text-gray-400 text-sm text-center max-w-xs">
          Halaman ini hanya bisa diakses setelah login sebagai member StayZone.
        </p>
        <Button className="bg-[#00B074] hover:bg-[#00B074]/90 text-white" onClick={() => navigate("/login")}>
          <LogIn size={14} className="mr-2" /> Masuk Sekarang
        </Button>
      </div>
    );
  }

  // State katalog
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  // State booking
  const [selectedRoom, setSelectedRoom] = useState(
    location.state?.preselectedRoom || null
  );
  const [bookingDialogOpen, setBookingDialogOpen] = useState(
    !!location.state?.preselectedRoom
  );

  // State riwayat booking (localStorage)
  const [bookings, setBookings] = useState(() => {
    try {
      const all = JSON.parse(localStorage.getItem("stayzone_bookings") || "[]");
      return all.filter((b) => b.memberEmail === session.email);
    } catch { return []; }
  });

  // State sukses booking
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // ── Total malam & tier — tarik dari Supabase ──────────────────────────────
  const [totalNights, setTotalNights]   = useState(0);
  const [tierLoading, setTierLoading]   = useState(true);

  useEffect(() => {
    async function fetchTotalNights() {
      setTierLoading(true);
      try {
        // Hitung total malam dari booking member di Supabase (jika ada tabel booking)
        // Fallback: hitung dari localStorage jika belum ada tabel booking Supabase
        const localAll = JSON.parse(localStorage.getItem("stayzone_bookings") || "[]");
        const memberBookings = localAll.filter(
          (b) => b.memberEmail === session.email && b.status !== "Cancelled"
        );
        const total = memberBookings.reduce((sum, b) => sum + (b.nights || 0), 0);
        setTotalNights(total);
      } catch {
        setTotalNights(0);
      } finally {
        setTierLoading(false);
      }
    }
    fetchTotalNights();
  }, [session.email, bookings]); // re-hitung setiap ada booking baru

  // Filter kamar
  const filteredRooms = useMemo(() => {
    return ROOM_CATALOG.filter((r) => {
      const matchSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        activeCategory === "Semua" ||
        r.category.toLowerCase() === activeCategory.toLowerCase();
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  // Handler buka dialog booking
  function handleBook(room) {
    setSelectedRoom(room);
    setBookingDialogOpen(true);
  }

  // Handler submit booking
  function handleBookingSubmit({ room, checkIn, checkOut, notes, voucherApplied, discount }) {
    const nights = Math.max(0, Math.floor((new Date(checkOut) - new Date(checkIn)) / 86400000));
    const subtotal    = room.priceNum * nights;
    const tax         = Math.round(subtotal * 0.1);
    const discountAmt = voucherApplied ? Math.round(subtotal * discount) : 0;
    const total       = subtotal + tax - discountAmt;

    const newBooking = {
      id: "BK-" + Date.now(),
      memberEmail: session.email,
      memberNama: session.nama,
      roomId: room.id,
      roomName: room.name,
      roomImage: room.image,
      checkIn,
      checkOut,
      nights,
      pricePerNight: room.priceNum,
      subtotal,
      discountAmt,
      voucherApplied: voucherApplied || null,
      total,
      notes,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const all = JSON.parse(localStorage.getItem("stayzone_bookings") || "[]");
      localStorage.setItem("stayzone_bookings", JSON.stringify([...all, newBooking]));
    } catch { /* ignore */ }

    setBookings((prev) => [...prev, newBooking]);
    setBookingDialogOpen(false);
    setSelectedRoom(null);
    setBookingSuccess(newBooking);
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Booking Success Toast ── */}
      {bookingSuccess && (
        <div className="fixed top-20 right-4 z-50 w-80 rounded-2xl bg-white border border-green-200 shadow-xl p-4 space-y-2 animate-in slide-in-from-right-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#00B074] shrink-0" />
              <p className="text-sm font-semibold text-[#1a3c2e]">Reservasi Berhasil!</p>
            </div>
            <button onClick={() => setBookingSuccess(null)} className="text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          </div>
          <p className="text-xs text-gray-500 pl-6">
            <span className="font-semibold text-[#1a3c2e]">{bookingSuccess.roomName}</span>
            {" "}— {bookingSuccess.nights} malam
          </p>
          <p className="text-xs text-gray-400 pl-6">
            {formatDate(bookingSuccess.checkIn)} → {formatDate(bookingSuccess.checkOut)}
          </p>
          {bookingSuccess.discountAmt > 0 && (
            <p className="text-xs text-emerald-600 pl-6 font-semibold">
              Hemat Rp {bookingSuccess.discountAmt.toLocaleString("id-ID")} dengan voucher!
            </p>
          )}
          <div className="pl-6 flex items-center gap-2 flex-wrap">
            <span className="inline-block rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold px-2 py-0.5">
              Status: {bookingSuccess.status}
            </span>
            <span className="font-bold text-[#00B074] text-xs">
              Total: Rp {bookingSuccess.total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* ── Welcome Banner + Tier Card ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Welcome Info — 2/3 lebar */}
          <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-[#1a3c2e] to-[#0f2d20] p-6 text-white flex flex-col justify-between gap-4">
            <div>
              <p className="text-green-300/70 text-xs uppercase tracking-widest mb-1">
                Member Dashboard
              </p>
              <h1 className="text-xl sm:text-2xl font-bold">
                Selamat datang, {session.nama}! 👋
              </h1>
              {session.voucher ? (
                <p className="text-green-200/60 text-sm mt-1">
                  Voucher aktif:{" "}
                  <span className="font-mono font-bold text-[#00B074]">{session.voucher}</span>
                  <span className="ml-2 text-xs text-green-300/50">(20% off)</span>
                </p>
              ) : (
                <p className="text-green-200/40 text-sm mt-1 italic">
                  Voucher sudah digunakan atau tidak tersedia.
                </p>
              )}
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 border border-white/20">
                <Gift size={18} className="text-[#00B074]" />
                <div>
                  <p className="text-xs text-green-200/60">Total Booking</p>
                  <p className="text-xl font-bold text-white">{bookings.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 border border-white/20">
                <CalendarDays size={18} className="text-[#00B074]" />
                <div>
                  <p className="text-xs text-green-200/60">Total Malam</p>
                  <p className="text-xl font-bold text-white">{totalNights}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tier Card — 1/3 lebar */}
          <div className="lg:col-span-1">
            <MemberTierCard totalNights={totalNights} loading={tierLoading} />
          </div>
        </div>

        {/* ── Katalog Kamar ── */}
        <section id="katalog">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#1a3c2e]">Katalog Kamar</h2>
            <p className="text-sm text-gray-400 mt-0.5">Pilih kamar dan buat reservasi langsung dari sini.</p>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative w-full sm:max-w-xs">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <Input
                placeholder="Cari nama atau tipe kamar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 border-green-200 focus-visible:border-[#00B074] focus-visible:ring-[#00B074]/20"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeCategory === cat
                      ? "bg-[#00B074] text-white"
                      : "bg-white border border-green-200 text-gray-500 hover:border-[#00B074] hover:text-[#00B074]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Kamar */}
          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRooms.map((room) => (
                <MemberRoomCard key={room.id} room={room} onBook={handleBook} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Search size={36} className="mb-3 opacity-30" />
              <p className="text-sm">Kamar tidak ditemukan.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("Semua"); }}
                className="mt-2 text-xs text-[#00B074] underline"
              >
                Reset filter
              </button>
            </div>
          )}
        </section>

        {/* ── Riwayat Booking ── */}
        <section id="booking-saya">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#1a3c2e]">Booking Saya</h2>
            <p className="text-sm text-gray-400 mt-0.5">Riwayat dan status reservasi Anda.</p>
          </div>

          {bookings.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-green-200 bg-white py-16 text-center space-y-3">
              <CalendarDays size={36} className="mx-auto text-gray-300" />
              <p className="text-sm font-medium text-gray-400">Belum ada booking.</p>
              <p className="text-xs text-gray-300">Pilih kamar di atas dan buat reservasi pertama Anda!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {[...bookings].reverse().map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl bg-white border border-green-100 p-4 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl">
                    <img src={b.roomImage} alt={b.roomName} className="h-full w-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-[#1a3c2e] text-sm">{b.roomName}</p>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        b.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : b.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {b.status}
                      </span>
                      {b.voucherApplied && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-0.5">
                          <Tag size={9} /> Voucher
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">
                      <CalendarDays size={11} className="inline mr-1" />
                      {formatDate(b.checkIn)} → {formatDate(b.checkOut)}
                      <span className="ml-2 text-gray-300">({b.nights} malam)</span>
                    </p>
                    {b.discountAmt > 0 && (
                      <p className="text-xs text-emerald-600 font-medium">
                        Hemat Rp {b.discountAmt.toLocaleString("id-ID")}
                      </p>
                    )}
                    {b.notes && (
                      <p className="text-xs text-gray-400 italic truncate">"{b.notes}"</p>
                    )}
                  </div>

                  {/* Total */}
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-400">Total</p>
                    <p className="font-bold text-[#00B074] text-sm">
                      Rp {b.total.toLocaleString("id-ID")}
                    </p>
                    <p className="text-[10px] text-gray-300">{b.id}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* ── Booking Form Dialog ── */}
      <BookingFormDialog
        room={selectedRoom}
        open={bookingDialogOpen}
        memberVoucher={session.voucher || ""}
        onClose={() => { setBookingDialogOpen(false); setSelectedRoom(null); }}
        onSubmit={handleBookingSubmit}
      />
    </div>
  );
}
