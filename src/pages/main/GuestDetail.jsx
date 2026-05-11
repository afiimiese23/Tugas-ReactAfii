import { useParams, Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaChevronLeft, FaCalendarAlt, FaUser } from "react-icons/fa";
// Pastikan path data JSON ini benar sesuai struktur folder kamu
import guestData from "../../data/guestListData.json"; 

export default function GuestDetail() {
  const { id } = useParams();

  // Mencari data tamu berdasarkan ID yang dikirim lewat URL
  const guest = guestData.find((g) => g.id === id);

  // Jika data tidak ditemukan, tampilkan pesan error yang rapi
  if (!guest) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-[#EEEEEE] font-['Poppins']">
        <h2 className="text-xl font-bold text-[#113D32] mb-4">Guest Not Found!</h2>
        <p className="text-gray-500 mb-6">Data dengan ID <span className="font-mono font-bold text-red-500">{id}</span> tidak ditemukan.</p>
        <Link to="/guests" className="bg-[#113D32] text-white px-6 py-2 rounded-xl text-sm">
          Back to Guest List
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEEEEE] font-['Poppins'] p-8 text-[#113D32]">
      
      {/* HEADER / BREADCRUMB */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link to="/guests" className="flex items-center gap-2 text-[#3AB449] font-bold text-xs mb-2 hover:underline">
            <FaChevronLeft size={10} /> Back to List
          </Link>
          <h1 className="text-2xl font-black">Guest Details</h1>
        </div>
        <div className="text-right">
            <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                guest.status === "Refund" ? "bg-[#FFEEEE] text-[#FF5B5B]" : "bg-[#E6F3EF] text-[#3AB449]"
            }`}>
                {guest.status}
            </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: PROFILE CARD */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="relative">
              <img 
                src={`https://i.pravatar.cc/150?u=${guest.id}`} 
                alt={guest.name} 
                className="w-32 h-32 rounded-[24px] object-cover border-4 border-[#EEEEEE] shadow-md"
              />
            </div>
            
            <h2 className="text-xl font-bold mt-6 text-center">{guest.name}</h2>
            <p className="text-[10px] text-[#3AB449] font-black tracking-widest uppercase mt-1 italic">
              ID: {guest.id}
            </p>

            <div className="w-full mt-8 space-y-4">
              <div className="flex items-center gap-4 bg-[#F9F9F9] p-4 rounded-2xl">
                <div className="bg-white p-2 rounded-lg text-[#3AB449] shadow-sm">
                  <FaPhoneAlt size={12} />
                </div>
                <span className="text-xs font-bold text-[#113D32]">+62 812-3456-7890</span>
              </div>

              <div className="flex items-center gap-4 bg-[#F9F9F9] p-4 rounded-2xl">
                <div className="bg-white p-2 rounded-lg text-[#3AB449] shadow-sm">
                  <FaEnvelope size={12} />
                </div>
                <span className="text-xs font-bold text-[#113D32] truncate">contact@{guest.name.toLowerCase().replace(/\s/g, '')}.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BOOKING INFORMATION */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-8 border-b border-gray-50 pb-4 flex items-center gap-2">
              <FaUser size={16} className="text-[#3AB449]" /> Stay Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Room Type</p>
                <p className="text-sm font-bold text-[#113D32]">{guest.roomType}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Date</p>
                <p className="text-sm font-semibold">{guest.orderDate}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <FaCalendarAlt size={10} /> Check In
                </p>
                <p className="text-sm font-bold">{guest.checkIn}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <FaCalendarAlt size={10} /> Check Out
                </p>
                <p className="text-sm font-bold">{guest.checkOut}</p>
              </div>

              <div className="md:col-span-2 bg-[#F9F9F9] p-6 rounded-[24px] border border-gray-50 mt-4">
                <p className="text-[10px] font-bold text-[#3AB449] uppercase tracking-widest mb-3">Notes / Special Request</p>
                <p className="text-xs text-[#6E6E6E] leading-relaxed italic">
                  "Guest requested a high floor and quiet room. No seafood in breakfast menu."
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-12 pt-8 border-t border-gray-50">
               <button className="bg-[#113D32] text-white px-10 py-3 rounded-xl text-xs font-bold shadow-lg shadow-green-900/20 active:scale-95 transition-all">
                  Edit Booking
               </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}