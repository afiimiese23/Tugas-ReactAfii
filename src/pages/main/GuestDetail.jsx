import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  FaPhoneAlt, FaEnvelope, FaChevronLeft, 
  FaCalendarAlt, FaUser, FaInfoCircle 
} from "react-icons/fa";

// Import StayZone Components
import Container from "../../components/Container";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Alert from "../../components/Alert";

// Import Data Mock
import guestData from "../../data/guestListData.json"; 

export default function GuestDetail() {
  const { id } = useParams();

  // Mencari data tamu berdasarkan ID
  const guest = guestData.find((g) => g.id === id);

  if (!guest) {
    return (
      <Container className="flex flex-col h-screen items-center justify-center bg-[#EEEEEE]">
        <Alert type="error" message={`Guest with ID ${id} not found!`} />
        <Link to="/guests" className="mt-6">
          <Button>Back to Guest List</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="min-h-screen bg-[#EEEEEE] py-8">
      
      {/* HEADER / BREADCRUMB */}
      <div className="mb-8 flex items-center justify-between px-2">
        <div>
          <Link to="/guests" className="flex items-center gap-2 text-[#3AB449] font-bold text-xs mb-2 hover:underline">
            <FaChevronLeft size={10} /> Back to List
          </Link>
          <h1 className="text-2xl font-black text-[#113D32]">Guest Details</h1>
        </div>
        <div>
          <Badge type={guest.status === "Refund" || guest.status === "Canceled" ? "danger" : "success"}>
            {guest.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: PROFILE CARD DENGAN FOTO ASLI */}
        <div className="lg:col-span-1">
          <Card className="p-8 flex flex-col items-center border-none shadow-sm">
            {/* FOTO PROFILE DIKEMBALIKAN DISINI */}
            <div className="relative">
              <img 
                src={`https://i.pravatar.cc/150?u=${guest.id}`} 
                alt={guest.name} 
                className="w-32 h-32 rounded-[24px] object-cover border-4 border-white shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 bg-[#3AB449] text-white p-2 rounded-lg shadow-lg">
                <FaUser size={12} />
              </div>
            </div>
            
            <h2 className="text-xl font-bold mt-6 text-center text-[#113D32]">{guest.name}</h2>
            <p className="text-[10px] text-[#3AB449] font-black tracking-widest uppercase mt-1 italic">
              ID: {guest.id}
            </p>

            <div className="w-full mt-8 space-y-4">
              <div className="flex items-center gap-4 bg-[#F9F9F9] p-4 rounded-2xl border border-gray-50">
                <div className="bg-white p-2 rounded-lg text-[#3AB449] shadow-sm">
                  <FaPhoneAlt size={12} />
                </div>
                <span className="text-xs font-bold text-[#113D32]">+62 812-3456-7890</span>
              </div>

              <div className="flex items-center gap-4 bg-[#F9F9F9] p-4 rounded-2xl border border-gray-50">
                <div className="bg-white p-2 rounded-lg text-[#3AB449] shadow-sm">
                  <FaEnvelope size={12} />
                </div>
                <span className="text-xs font-bold text-[#113D32] truncate">
                  {guest.name.toLowerCase().replace(/\s/g, '')}@stayzone.com
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: BOOKING INFORMATION */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 border-none shadow-sm">
            <h3 className="text-lg font-bold mb-8 border-b border-gray-50 pb-4 flex items-center gap-2 text-[#113D32]">
              <FaInfoCircle size={16} className="text-[#3AB449]" /> Stay Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Room Type</p>
                <p className="text-sm font-bold text-[#113D32]">{guest.roomType}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Date</p>
                <p className="text-sm font-semibold text-[#113D32]">{guest.orderDate}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <FaCalendarAlt size={10} /> Check In
                </p>
                <p className="text-sm font-bold text-[#113D32]">{guest.checkIn}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <FaCalendarAlt size={10} /> Check Out
                </p>
                <p className="text-sm font-bold text-[#113D32]">{guest.checkOut}</p>
              </div>

              <div className="md:col-span-2 bg-[#E6F3EF]/50 p-6 rounded-[24px] border border-[#3AB449]/10 mt-4">
                <p className="text-[10px] font-bold text-[#3AB449] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FaInfoCircle /> Notes / Special Request
                </p>
                <p className="text-xs text-[#113D32] leading-relaxed italic font-medium">
                  "Guest requested a high floor and quiet room. No seafood in breakfast menu."
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-12 pt-8 border-t border-gray-50">
               <Button type="secondary" className="px-8 bg-white border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all">
                  Cancel Booking
               </Button>
               <Button className="px-10 shadow-lg shadow-green-900/10">
                  Edit Booking
               </Button>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}