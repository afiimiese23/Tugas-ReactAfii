import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import guestData from "../../data/guestListData.json"; 

export default function Guests() {
  const [activeTab, setActiveTab] = useState("All Guest");
  const tabs = ["All Guest", "Pending", "Booked", "Canceled", "Refund"];

  return (
    <div className="bg-[#EEEEEE] min-h-screen font-['Poppins']">
      
      <div className="px-8 pt-8 mb-4">
        <h1 className="text-L font-bold text-black">Bookings</h1>
        <p className="text-xs text-black ">you have today {guestData.length} Bookings</p>
      </div>

      <div className="px-8 flex justify-between items-center border-b border-gray-200 mb-6">
        <div className="flex space-x-10 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-4 text-xs font-bold transition-all relative whitespace-nowrap ${
                activeTab === tab ? "text-[#113D32]" : "text-[#6E6E6E]" }`} >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-3px bg-[#3AB449] rounded-t-full"></div> )}
            </button>
          ))}
        </div>

        {/* BUTTONS Kalender & Newest) */}
        <div className="flex space-x-3 pb-3">
          <button className="bg-[#113D32] text-white px-10 py-2.5 rounded-xl flex items-center space-x-3 text-xs shadow-md">
            <span>10 June 2024 - 9 July 2024</span>
            <FaChevronDown className="text-[10px]" />
          </button>
          <button className="bg-white border border-gray-200 text-[#113D32] px-5 py-2.5 rounded-xl flex items-center space-x-3 text-xs font-semibold shadow-sm">
            <span>Newest</span>
            <FaChevronDown className="text-[10px] text-[#3AB449]" />
          </button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="px-0 pb-1">
        <div className="bg-white shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-black font-bold border-b border-gray-50">
                  <th className="p-5 w-12 text-center">
                     <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#3AB449]" />
                  </th>
                  <th className="p-5">Guest</th>
                  <th className="p-5">Order Date</th>
                  <th className="p-5">Check In</th>
                  <th className="p-5">Check Out</th>
                  <th className="p-5 text-center">Special Request</th>
                  <th className="p-5">Room Type</th>
                  <th className="p-5">Status</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {guestData.map((guest) => (
                  <tr
                    key={guest.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-5 text-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 accent-[#3AB449]"
                      />
                    </td>

                    <td className="p-5">
                      <Link to={`/guests/${guest.id}`} className="flex items-center space-x-3 group">
                        <img
                          src={`https://i.pravatar.cc/150?u=${guest.id}`}
                          className="w-10 h-10 rounded-xl object-cover shadow-sm border-2 border-white"
                          alt={guest.name}
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-[#113D32] group-hover:text-[#3AB449] transition-all">
                            {guest.name}
                          </span>
                          <p className="text-[9px] text-[#E23428] font-black mt-1 tracking-tighter uppercase">
                            {guest.id}
                          </p>
                        </div>
                      </Link>
                    </td>

                    <td className="p-5 text-[#6E6E6E] font-medium">{guest.orderDate}</td>
                    <td className="p-5 text-gray-800 font-bold">{guest.checkIn}</td>
                    <td className="p-5 text-gray-800 font-bold">{guest.checkOut}</td>
                    <td className="p-5 text-center">
                      <button className="bg-[#EEEEEE] text-[#6E6E6E] px-4 py-2 rounded-sm text-[10px] font-bold hover:bg-[#113D32] hover:text-white transition-all shadow-sm">
                        View Notes
                      </button>
                    </td>
                    <td className="p-5 text-[#6E6E6E] font-bold text-[10px]">{guest.roomType}</td>
                    <td className="p-5">
                      <span
                        className={`px-4 py-2 rounded-sm text-[10px] font-black  tracking-wider inline-block min-w-85px text-center ${
                          guest.status === "Refund"
                            ? "bg-[#FFEEEE] text-[#E23428]"
                            : "bg-[#E6F3EF] text-[#68E365]"
                        }`}
                      >
                        {guest.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}