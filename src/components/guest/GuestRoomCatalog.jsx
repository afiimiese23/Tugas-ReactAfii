import GuestRoomCard from "./GuestRoomCard";

const roomCatalogData = [
  {
    id: 1,
    name: "Standard Room",
    bedType: "Twin Bed",
    maxGuest: 2,
    price: "Rp 450.000",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format&fit=crop&q=80",
    badges: [
      { label: "Free Wi-Fi", variant: "secondary" },
      { label: "Non-Smoking", variant: "outline" },
    ],
  },
  {
    id: 2,
    name: "Deluxe Room",
    bedType: "Queen Bed",
    maxGuest: 2,
    price: "Rp 750.000",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&auto=format&fit=crop&q=80",
    badges: [
      { label: "Breakfast Included", variant: "default" },
      { label: "Free Wi-Fi", variant: "secondary" },
      { label: "City View", variant: "outline" },
    ],
  },
  {
    id: 3,
    name: "Executive Suite",
    bedType: "King Bed",
    maxGuest: 3,
    price: "Rp 1.200.000",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80",
    badges: [
      { label: "Breakfast Included", variant: "default" },
      { label: "Free Wi-Fi", variant: "secondary" },
      { label: "Bathtub", variant: "outline" },
    ],
  },
  {
    id: 4,
    name: "Junior Suite",
    bedType: "King Bed",
    maxGuest: 2,
    price: "Rp 950.000",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&auto=format&fit=crop&q=80",
    badges: [
      { label: "Free Wi-Fi", variant: "secondary" },
      { label: "Non-Smoking", variant: "outline" },
      { label: "Lounge Access", variant: "outline" },
    ],
  },
  {
    id: 5,
    name: "Family Room",
    bedType: "2 Queen Beds",
    maxGuest: 4,
    price: "Rp 1.100.000",
    image:
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&auto=format&fit=crop&q=80",
    badges: [
      { label: "Breakfast Included", variant: "default" },
      { label: "Free Wi-Fi", variant: "secondary" },
      { label: "Kids Friendly", variant: "outline" },
    ],
  },
  {
    id: 6,
    name: "Presidential Suite",
    bedType: "King Bed + Living Room",
    maxGuest: 4,
    price: "Rp 3.500.000",
    image:
      "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=600&auto=format&fit=crop&q=80",
    badges: [
      { label: "Breakfast Included", variant: "default" },
      { label: "Butler Service", variant: "default" },
      { label: "Jacuzzi", variant: "outline" },
    ],
  },
];

export default function GuestRoomCatalog() {
  return (
    <section id="kamar" className="bg-green-50/50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
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

        {/* Room Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomCatalogData.map((room) => (
            <GuestRoomCard key={room.id} room={room} />
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-gray-400 mt-8">
          * Harga belum termasuk pajak dan biaya layanan. Hubungi kami untuk informasi lebih lanjut.
        </p>
      </div>
    </section>
  );
}
