import { useState } from "react";
import { FaChevronDown, FaEllipsisH } from "react-icons/fa";
import roomData from "../../data/roomListData.json";

export default function Rooms() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All Rooms");
  const tabs = ["All Rooms", "Active Room", "Booked Room"];

  return (
    <div className="p-8 bg-[#EEEEEE] min-h-screen font-['Poppins'] text-[#113D32]">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold transition-all relative ${
                activeTab === tab ? "text-[#113D32]" : "text-gray-400"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#3AB449] rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#113D32] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-green-900/20 active:scale-95 transition-transform"
          >
            + New Rooms
          </button>
          <button className="bg-white border border-gray-200 text-[#113D32] px-6 py-2.5 rounded-xl flex items-center gap-2 font-bold text-sm shadow-sm">
            Newest <FaChevronDown className="text-[#3AB449] text-[10px]" />
          </button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-[24px] shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-gray-400 font-bold border-b border-gray-50 bg-white">
              <th className="p-5 w-12 text-center">
                 <input type="checkbox" className="w-4 h-4 rounded accent-[#3AB449] cursor-pointer" />
              </th>
              <th className="p-5">Room Name</th>
              <th className="p-5">Bed Type</th>
              <th className="p-5">Room Floor</th>
              <th className="p-5">Facilities</th>
              <th className="p-5">Rate</th>
              <th className="p-5">Status</th>
              <th className="p-5"></th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {roomData.map((room, index) => (
              <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                <td className="p-5 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#3AB449] cursor-pointer" />
                </td>
                
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <img 
                      src={room.image} 
                      className="w-20 h-14 rounded-xl object-cover shadow-sm border border-gray-100 group-hover:scale-105 transition-transform" 
                      alt="room" 
                    />
                    <div>
                      <p className="text-[10px] text-[#3AB449] font-black mb-1">{room.id}</p>
                      <p className="font-bold text-[#113D32]">{room.name}</p>
                    </div>
                  </div>
                </td>

                <td className="p-5 text-[#6E6E6E] font-medium">{room.bedType}</td>
                <td className="p-5 text-[#6E6E6E] font-medium">{room.floor}</td>
                
                <td className="p-5 text-[#6E6E6E] font-medium max-w-[200px] leading-relaxed">
                  {room.facilities}
                </td>

                <td className="p-5">
                  <p className="text-[10px] text-gray-400 font-medium">Price</p>
                  <p className="font-bold text-[#113D32]">₹{room.rate} <span className="text-gray-400 font-normal">/night</span></p>
                </td>

                {/* STATUS BADGE */}
                <td className="p-5">
                  <span className={`px-4 py-2 rounded-xl text-[10px] font-black text-center inline-block min-w-[85px] tracking-wider ${
                    room.status === "ACTIVE" 
                    ? "bg-[#E6F3EF] text-[#3AB449]" 
                    : "bg-[#FFEEEE] text-[#FF5B5B]"
                  }`}>
                    {room.status}
                  </span>
                </td>

                <td className="p-5 text-center text-gray-300 cursor-pointer hover:text-[#113D32]">
                  <FaEllipsisH />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER / PAGINATION MOCKUP */}
      <div className="flex justify-between items-center mt-6 text-[11px] text-[#6E6E6E] font-semibold px-2">
        <p>Showing 1 to {roomData.length} of {roomData.length} entries</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">Prev</button>
          <button className="px-4 py-2 bg-[#113D32] text-white rounded-lg shadow-md shadow-green-900/10">1</button>
          <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}