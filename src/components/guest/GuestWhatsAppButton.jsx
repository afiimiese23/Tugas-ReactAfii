import { MessageCircle } from "lucide-react";

const WA_NUMBER = "6285157230509";
const WA_MESSAGE = encodeURIComponent(
  "Halo StayZone Hotel, saya pengunjung website dan ingin bertanya ketersediaan kamar untuk liburan mendatang..."
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export default function GuestWhatsAppButton() {
  return (
    <a href={WA_URL} target="_blank" rel="noopener noreferrer"
      aria-label="Konsultasi via WhatsApp"
      className=" fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white
        shadow-lg shadow-green-500/40 hover:bg-[#1ebe5d] hover:scale-110 active:scale-95 transition-all duration-200 " >
      <MessageCircle size={26} fill="white" strokeWidth={1.5} />

      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />

      {/* Tooltip label */}
      <span className="absolute right-16 whitespace-nowrap rounded-lg bg-[#1a3c2e]
        px-3 py-1.5 text-xs font-medium text-white shadow-md opacity-0 translate-x-2 pointer-events-none
        transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
        Chat Konsultasi
      </span>
    </a>
  );
}