import { Clock, MapPin, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const infoCards = [
  {
    icon: Clock,
    title: "Jam Operasional",
    description: "Check-In & Check-Out",
    detail: "Check-In: 14.00 WIB",
    detail2: "Check-Out: 12.00 WIB",
    note: "Early check-in tersedia (sesuai ketersediaan)",
    iconBg: "bg-[#00B074]/10",
    iconColor: "text-[#00B074]",
  },
  {
    icon: MapPin,
    title: "Lokasi Kami",
    description: "Temukan kami di pusat kota",
    detail: "Jl. Sudirman No. 88, Lantai 1–5",
    detail2: "Kel. Karet Semanggi, Kec. Setiabudi",
    note: "Jakarta Selatan, DKI Jakarta 12930",
    iconBg: "bg-[#00B074]/10",
    iconColor: "text-[#00B074]",
  },
  {
    icon: Phone,
    title: "Hubungi Kami",
    description: "Layanan tamu 24 jam",
    detail: "Reservasi: (021) 5500-8800",
    detail2: "Darurat: 0800-1234-5678 (Toll Free)",
    note: "WhatsApp: +62 811-0088-9900",
    iconBg: "bg-[#00B074]/10",
    iconColor: "text-[#00B074]",
  },
];

export default function GuestInfoSection() {
  return (
    <section id="tentang" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00B074] mb-2">
            Informasi Hotel
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a3c2e]">
            Semua Yang Perlu Anda Ketahui
          </h2>
          <p className="mt-2 text-gray-500 text-sm max-w-md mx-auto">
            Kami siap membantu perjalanan menginap Anda menjadi senyaman mungkin.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.title}
                className="border border-green-100 transition-shadow hover:shadow-md bg-green-50/40"
              >
                <CardHeader>
                  <div
                    className={`mb-1 flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg}`}
                  >
                    <Icon size={20} className={card.iconColor} />
                  </div>
                  <CardTitle className="text-base font-semibold text-[#1a3c2e]">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">{card.detail}</p>
                  <p className="text-sm font-medium text-gray-700">{card.detail2}</p>
                  <p className="text-xs text-gray-400 pt-1">{card.note}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
