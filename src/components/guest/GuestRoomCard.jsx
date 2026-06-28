import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Users, BedDouble } from "lucide-react";

/**
 * @param {{
 *   room: {
 *     id: number, name: string, category: string,
 *     bedType: string, maxGuest: number, price: string,
 *     stok: number, jumlah_klik: number,
 *     image: string,
 *     badges: Array<{label: string, variant?: string}>
 *   },
 *   onViewDetail: (room: object) => void
 * }} props
 */
export default function GuestRoomCard({ room, onViewDetail }) {
  const isSoldOut = room.stok === 0;

  return (
    <Card className="group overflow-hidden border border-green-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 p-0 bg-white">
      {/* Room Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={room.image}
          alt={`Foto ${room.name}`}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${isSoldOut ? "grayscale opacity-70" : ""}`}
          loading="lazy"
        />
        {/* Price overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
          <p className="text-white font-bold text-sm">
            {room.price}
            <span className="font-normal text-white/80 text-xs"> / malam</span>
          </p>
        </div>
        {/* Sold-out ribbon */}
        {isSoldOut && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-red-500 text-white border-0 text-xs">
              Kamar Penuh
            </Badge>
          </div>
        )}
        {/* Stok indicator */}
        {!isSoldOut && room.stok <= 2 && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-amber-500 text-white border-0 text-xs">
              Sisa {room.stok} Kamar
            </Badge>
          </div>
        )}
      </div>

      {/* Card Header */}
      <CardHeader className="pt-4 pb-0">
        <CardTitle className="text-base text-[#1a3c2e]">{room.name}</CardTitle>
        <CardDescription className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <BedDouble size={12} /> {room.bedType}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} /> Maks. {room.maxGuest} tamu
          </span>
        </CardDescription>
      </CardHeader>

      {/* Badges */}
      <CardContent className="flex flex-wrap gap-1.5 pt-3 pb-0">
        {room.badges.map((badge) => (
          <Badge key={badge.label} variant={badge.variant ?? "secondary"}>
            {badge.label}
          </Badge>
        ))}
      </CardContent>

      {/* Footer */}
      <CardFooter className="pt-3 bg-transparent border-t-0 pb-4 px-4">
        <Button
          variant="outline"
          size="sm"
          disabled={isSoldOut}
          onClick={() => !isSoldOut && onViewDetail(room)}
          className={
            isSoldOut
              ? "w-full border-gray-200 text-gray-400 cursor-not-allowed"
              : "w-full border-[#00B074] text-[#00B074] hover:bg-[#00B074] hover:text-white transition-colors"
          }
        >
          {isSoldOut ? "Tidak Tersedia" : "Lihat Detail"}
        </Button>
      </CardFooter>
    </Card>
  );
}
