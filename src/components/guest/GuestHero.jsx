import { Button } from "@/components/ui/button";
import { Star, Shield, MapPin } from "lucide-react";

const highlights = [
  { icon: Star, text: "Bintang 5 Terpercaya" },
  { icon: Shield, text: "Layanan 24 Jam" },
  { icon: MapPin, text: "Pusat Kota" },
];

export default function GuestHero() {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-gradient-to-br from-white via-green-50 to-emerald-50"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#00B074]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#00B074]/10 px-4 py-1.5 text-xs font-semibold text-[#00B074] uppercase tracking-wider">
              <Star size={12} className="fill-[#00B074]" />
              Hotel Premium · StayZone
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#1a3c2e]">
              Temukan Kenyamanan{" "}
              <span className="text-[#00B074]">Menginap Terbaik</span> Anda
              Bersama StayZone.
            </h1>

            <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Menyediakan kamar premium, pelayanan bintang lima, dan pengalaman
              menginap tak terlupakan langsung di pusat kota.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {highlights.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00B074]/10">
                    <Icon size={14} className="text-[#00B074]" />
                  </div>
                  {text}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <Button
                size="lg"
                className="bg-[#00B074] hover:bg-[#00B074]/90 text-white px-8 h-12 text-base shadow-lg shadow-green-900/20"
                onClick={() =>
                  document
                    .getElementById("kamar")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Jelajahi Kamar
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 text-base border-[#00B074] text-[#00B074] hover:bg-green-50"
                onClick={() =>
                  document
                    .getElementById("tentang")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Tentang Kami
              </Button>
            </div>
          </div>

          {/* Right — Image Grid */}
          <div className="relative hidden lg:grid grid-cols-2 gap-3 h-[460px]">
            <div className="col-span-2 row-span-1 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&auto=format&fit=crop&q=80"
                alt="Kamar Deluxe StayZone"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&auto=format&fit=crop&q=80"
                alt="Kamar Suite StayZone"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop&q=80"
                alt="Fasilitas Hotel StayZone"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Floating rating card */}
            <div className="absolute -bottom-4 -left-4 rounded-xl bg-white px-4 py-3 shadow-xl border border-green-100">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-[#00B074] text-[#00B074]"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#1a3c2e]">4.9</span>
                <span className="text-xs text-gray-400">/ 5.0</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">+1.200 ulasan tamu puas</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
