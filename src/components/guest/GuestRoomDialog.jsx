import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, BedDouble, CheckCircle2, Eye, Layers } from "lucide-react";

/**
 * @param {{
 *   room: object | null,
 *   open: boolean,
 *   onClose: () => void
 * }} props
 */
export default function GuestRoomDialog({ room, open, onClose }) {
  if (!room) return null;

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) onClose(); }}>
      <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto p-0">
        {/* Header Image */}
        <div className="relative h-52 w-full overflow-hidden rounded-t-xl">
          <img
            src={room.image}
            alt={`Foto ${room.name}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c2e]/70 to-transparent" />
          {/* Price on image */}
          <div className="absolute bottom-4 left-4">
            <p className="text-white text-xl font-bold">
              {room.price}
              <span className="text-sm font-normal text-white/80"> / malam</span>
            </p>
          </div>
          {/* View count badge */}
          <div className="absolute top-3 right-10 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
            <Eye size={11} />
            {room.jumlah_klik} kali dilihat
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          <DialogHeader>
            <DialogTitle className="text-xl">{room.name}</DialogTitle>
            <DialogDescription className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1">
              <span className="flex items-center gap-1">
                <BedDouble size={13} /> {room.bedType}
              </span>
              <span className="flex items-center gap-1">
                <Users size={13} /> Maks. {room.maxGuest} tamu
              </span>
              <span className="flex items-center gap-1">
                <Layers size={13} />
                <span
                  className={
                    room.stok === 0
                      ? "text-red-500 font-semibold"
                      : room.stok <= 2
                      ? "text-amber-600 font-semibold"
                      : "text-[#00B074] font-semibold"
                  }
                >
                  {room.stok === 0
                    ? "Kamar Penuh"
                    : `${room.stok} kamar tersedia`}
                </span>
              </span>
            </DialogDescription>
          </DialogHeader>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5">
            {room.badges.map((badge) => (
              <Badge key={badge.label} variant={badge.variant ?? "secondary"}>
                {badge.label}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold text-[#1a3c2e] mb-1.5">Deskripsi Kamar</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{room.description}</p>
          </div>

          {/* Facilities */}
          <div>
            <h4 className="text-sm font-semibold text-[#1a3c2e] mb-2.5">Fasilitas Lengkap</h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-3">
              {room.facilities.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 size={14} className="shrink-0 text-[#00B074]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Action */}
          <div className="flex flex-col gap-2 pt-1">
            <Button
              className="w-full bg-[#00B074] hover:bg-[#00B074]/90 text-white"
              disabled={room.stok === 0}
            >
              {room.stok === 0 ? "Kamar Tidak Tersedia" : "Pesan Sekarang (Segera Hadir)"}
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-200 text-gray-500 hover:bg-gray-50"
              onClick={onClose}
            >
              Tutup
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
