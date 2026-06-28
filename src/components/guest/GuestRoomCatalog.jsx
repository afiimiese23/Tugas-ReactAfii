import { useState, useMemo } from "react";
import { Search, TrendingUp, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GuestRoomCard from "./GuestRoomCard";
import GuestRoomDialog from "./GuestRoomDialog";

// ─── Initial Data ──────────────────────────────────────────────────────────────
const initialRooms = [
  {
    id: 1,
    name: "Standard Room",
    category: "Standard",
    bedType: "Twin Bed",
    maxGuest: 2,
    price: "Rp 450.000",
    priceNum: 450000,
    stok: 5,
    jumlah_klik: 0,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format&fit=crop&q=80",
    description:
      "Kamar standar yang nyaman dengan twin bed, cocok untuk pasangan atau perjalanan bisnis singkat. Dilengkapi AC, TV LED 32 inci, dan kamar mandi shower.",
    facilities: ["AC", "TV LED 32\"", "Free Wi-Fi", "Kamar Mandi Shower", "Minibar", "Safe Box"],
    badges: [
      { label: "Free Wi-Fi", variant: "secondary" },
      { label: "Non-Smoking", variant: "outline" },
    ],
  },
  {
    id: 2,
    name: "Deluxe Room",
    category: "Deluxe",
    bedType: "Queen Bed",
    maxGuest: 2,
    price: "Rp 750.000",
    priceNum: 750000,
    stok: 3,
    jumlah_klik: 0,
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&auto=format&fit=crop&q=80",
    description:
      "Kamar deluxe dengan pemandangan kota yang memukau. Queen bed premium dengan linen berkualitas tinggi dan akses lounge eksklusif.",
    facilities: ["AC", "TV LED 43\"", "Free Wi-Fi", "Bathtub & Shower", "Minibar", "City View", "Sarapan Pagi"],
    badges: [
      { label: "Breakfast Included", variant: "default" },
      { label: "Free Wi-Fi", variant: "secondary" },
      { label: "City View", variant: "outline" },
    ],
  },
  {
    id: 3,
    name: "Executive Suite",
    category: "Suite",
    bedType: "King Bed",
    maxGuest: 3,
    price: "Rp 1.200.000",
    priceNum: 1200000,
    stok: 2,
    jumlah_klik: 0,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80",
    description:
      "Suite eksekutif dengan ruang tamu terpisah dan bathtub mewah. Ideal untuk tamu bisnis yang menginginkan privasi dan kenyamanan ekstra.",
    facilities: ["AC", "TV LED 55\"", "Free Wi-Fi", "Bathtub Jacuzzi", "Ruang Tamu", "Butler Service", "Sarapan Pagi"],
    badges: [
      { label: "Breakfast Included", variant: "default" },
      { label: "Free Wi-Fi", variant: "secondary" },
      { label: "Bathtub", variant: "outline" },
    ],
  },
  {
    id: 4,
    name: "Junior Suite",
    category: "Suite",
    bedType: "King Bed",
    maxGuest: 2,
    price: "Rp 950.000",
    priceNum: 950000,
    stok: 0,
    jumlah_klik: 0,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&auto=format&fit=crop&q=80",
    description:
      "Junior Suite yang elegan dengan dekorasi modern. Sayangnya saat ini kamar sedang penuh — silakan hubungi kami untuk waitlist.",
    facilities: ["AC", "TV LED 49\"", "Free Wi-Fi", "Shower Premium", "Lounge Access", "Non-Smoking"],
    badges: [
      { label: "Free Wi-Fi", variant: "secondary" },
      { label: "Non-Smoking", variant: "outline" },
      { label: "Lounge Access", variant: "outline" },
    ],
  },
  {
    id: 5,
    name: "Family Room",
    category: "Standard",
    bedType: "2 Queen Beds",
    maxGuest: 4,
    price: "Rp 1.100.000",
    priceNum: 1100000,
    stok: 4,
    jumlah_klik: 0,
    image:
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&auto=format&fit=crop&q=80",
    description:
      "Kamar luas dengan 2 queen bed untuk keluarga. Dilengkapi area bermain anak kecil dan fasilitas ramah keluarga.",
    facilities: ["AC", "TV LED 43\"", "Free Wi-Fi", "2 Kamar Mandi", "Kids Corner", "Sarapan Pagi"],
    badges: [
      { label: "Breakfast Included", variant: "default" },
      { label: "Free Wi-Fi", variant: "secondary" },
      { label: "Kids Friendly", variant: "outline" },
    ],
  },
  {
    id: 6,
    name: "Presidential Suite",
    category: "Suite",
    bedType: "King Bed + Living Room",
    maxGuest: 4,
    price: "Rp 3.500.000",
    priceNum: 3500000,
    stok: 1,
    jumlah_klik: 0,
    image:
      "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=600&auto=format&fit=crop&q=80",
    description:
      "Pengalaman menginap paling mewah di StayZone. Suite presidensial dengan living room, jacuzzi pribadi, dan layanan butler eksklusif 24 jam.",
    facilities: ["AC", "TV LED 65\"", "Free Wi-Fi", "Jacuzzi Pribadi", "Living Room", "Butler 24 Jam", "Sarapan Pagi", "Airport Transfer"],
    badges: [
      { label: "Breakfast Included", variant: "default" },
      { label: "Butler Service", variant: "default" },
      { label: "Jacuzzi", variant: "outline" },
    ],
  },
];

const CATEGORIES = ["Semua", "Standard", "Deluxe", "Suite"];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function GuestRoomCatalog() {
  const [rooms, setRooms] = useState(initialRooms);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Handle klik "Lihat Detail" — tambah jumlah_klik & buka dialog
  function handleViewDetail(room) {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === room.id ? { ...r, jumlah_klik: r.jumlah_klik + 1 } : r
      )
    );
    // Ambil data room yang sudah ter-update (+1 klik) untuk ditampilkan di dialog
    setSelectedRoom({ ...room, jumlah_klik: room.jumlah_klik + 1 });
  }

  // Filter: search + category (case-insensitive)
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchSearch =
        room.name.toLowerCase().includes(search.toLowerCase()) ||
        room.category.toLowerCase().includes(search.toLowerCase()) ||
        room.bedType.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "Semua" ||
        room.category.toLowerCase() === activeCategory.toLowerCase();
      return matchSearch && matchCategory;
    });
  }, [rooms, search, activeCategory]);

  // Top 3 kamar paling sering dilihat
  const topRooms = useMemo(() => {
    return [...rooms]
      .sort((a, b) => b.jumlah_klik - a.jumlah_klik)
      .slice(0, 3);
  }, [rooms]);

  const totalKlik = rooms.reduce((sum, r) => sum + r.jumlah_klik, 0);

  return (
    <section id="kamar" className="bg-green-50/50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Heading ── */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00B074] mb-2">
            Kamar & Fasilitas
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a3c2e]">
            Pilihan Kamar Terbaik Kami
          </h2>
          <p className="mt-2 text-gray-500 text-sm max-w-md mx-auto">
            Dari kamar standar yang nyaman hingga suite mewah, semua dirancang
            untuk memenuhi kebutuhan istirahat Anda.
          </p>
        </div>

        {/* ── Search & Filter Hub ── */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={15}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <Input
              type="text"
              placeholder="Cari nama atau tipe kamar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 border-green-200 focus-visible:border-[#00B074] focus-visible:ring-[#00B074]/20"
            />
          </div>

          {/* Category Tabs Filter */}
          <Tabs
            value={activeCategory}
            onValueChange={setActiveCategory}
          >
            <TabsList className="bg-green-100/80 h-8">
              {CATEGORIES.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="data-active:bg-[#00B074] data-active:text-white text-xs px-3"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* ── Room Grid ── */}
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <GuestRoomCard
                key={room.id}
                room={room}
                onViewDetail={handleViewDetail}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search size={40} className="mb-3 opacity-30" />
            <p className="text-sm">Tidak ada kamar yang sesuai dengan pencarian Anda.</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("Semua"); }}
              className="mt-3 text-xs text-[#00B074] underline underline-offset-2 hover:opacity-80"
            >
              Reset filter
            </button>
          </div>
        )}

        {/* Bottom note */}
        <p className="text-center text-xs text-gray-400 mt-8">
          * Harga belum termasuk pajak dan biaya layanan. Hubungi kami untuk informasi lebih lanjut.
        </p>

        {/* ── Tren Kamar Terpopuler ── */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={18} className="text-[#00B074]" />
                <h3 className="text-lg font-bold text-[#1a3c2e]">
                  3 Tipe Kamar Paling Sering Dilihat Minggu Ini
                </h3>
              </div>
              <p className="text-xs text-gray-400">
                Data diperbarui secara real-time berdasarkan klik pengunjung.
                {totalKlik > 0 && (
                  <span className="ml-1 text-[#00B074] font-medium">
                    Total {totalKlik} klik tercatat.
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {topRooms.map((room, index) => (
              <TrendCard
                key={room.id}
                room={room}
                rank={index + 1}
                onViewDetail={handleViewDetail}
              />
            ))}
          </div>

          {totalKlik === 0 && (
            <p className="text-center text-xs text-gray-400 mt-4 italic">
              Klik tombol "Lihat Detail" pada kamar di atas untuk mulai merekam data tren.
            </p>
          )}
        </div>
      </div>

      {/* ── Dialog Detail Kamar ── */}
      <GuestRoomDialog
        room={selectedRoom}
        open={!!selectedRoom}
        onClose={() => setSelectedRoom(null)}
      />
    </section>
  );
}

// ─── Trend Card Sub-component ──────────────────────────────────────────────────
function TrendCard({ room, rank, onViewDetail }) {
  const rankColors = {
    1: "bg-amber-400 text-white",
    2: "bg-gray-400 text-white",
    3: "bg-orange-400 text-white",
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-white p-3 shadow-sm hover:shadow-md transition-shadow">
      {/* Rank badge */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${rankColors[rank]}`}
      >
        #{rank}
      </div>

      {/* Thumbnail */}
      <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg">
        <img
          src={room.image}
          alt={room.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#1a3c2e]">
          {room.name}
        </p>
        <p className="text-xs text-gray-400">{room.price} / malam</p>
        <div className="mt-1 flex items-center gap-1 text-xs text-[#00B074] font-medium">
          <Eye size={11} />
          {room.jumlah_klik} kali dilihat
        </div>
      </div>
    </div>
  );
}
