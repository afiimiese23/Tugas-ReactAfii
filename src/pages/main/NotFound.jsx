import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#EEEEEE] font-['Poppins'] p-4 text-center">
      {/* Visual Element */}
      <div className="relative">
        <h1 className="text-[12rem] md:text-[15rem] font-black text-white leading-none select-none">
          404
        </h1>
        <p className="absolute inset-0 flex items-center justify-center text-2xl md:text-4xl font-bold text-[#113D32] mt-8">
          Oops! Lost in StayZone?
        </p>
      </div>

      {/* Message */}
      <div className="max-w-md mt-4">
        <p className="text-lg md:text-xl font-semibold text-[#113D32]">
          Halaman Tidak Ditemukan
        </p>
        <p className="text-[#6E6E6E] mt-2 text-sm md:text-base">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan. 
          Mari kembali ke kenyamanan dashboard Anda.
        </p>
      </div>

      {/* Action Button */}
      <Link
        to="/"
        className="mt-10 px-8 py-3 bg-[#113D32] text-white rounded-xl font-bold text-sm shadow-lg shadow-green-900/20 hover:bg-[#1a5a4a] transition-all active:scale-95"
      >
        Kembali ke Dashboard
      </Link>

      {/* Decoration (Optional) */}
      <div className="fixed bottom-10 opacity-10 select-none pointer-events-none">
        <h2 className="text-4xl font-black text-[#113D32]">StayZone</h2>
      </div>
    </div>
  );
}