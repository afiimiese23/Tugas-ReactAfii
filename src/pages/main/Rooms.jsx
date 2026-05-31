import React, { useState } from "react";
import { FaChevronDown, FaEllipsisH } from "react-icons/fa";


// Import StayZone Components
import Container from "../../components/Container";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";

// Import Data Mock
import roomData from "../../data/roomListData.json";

export default function Rooms() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All Rooms");
  const tabs = ["All Rooms", "Active Room", "Booked Room"];

  // Definisi Header Tabel
  const tableHeaders = [
    <input type="checkbox" className="w-4 h-4 rounded accent-[#3AB449] cursor-pointer" />,
    "Room Name",
    "Bed Type",
    "Room Floor",
    "Facilities",
    "Rate",
    "Status",
    ""
  ];

  return (
    <Container className="bg-[#EEEEEE] min-h-screen py-8">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-8 px-2">
        {/* TABS NAVIGATION */}
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

        {/* TOP ACTIONS */}
        <div className="flex gap-3">
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 shadow-lg shadow-green-900/20"
          >
            + New Rooms
          </Button>
          <Button 
            type="secondary" 
            className="bg-white border-gray-200 px-6 py-2.5 flex items-center gap-2"
          >
            <span className="text-[#113D32]">Newest</span>
            <FaChevronDown className="text-[#3AB449] text-[10px]" />
          </Button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <Card className="p-0 overflow-hidden border-none shadow-sm">
        <Table headers={tableHeaders}>
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
                    alt={room.name} 
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
                <p className="font-bold text-[#113D32]">
                  ₹{room.rate} <span className="text-gray-400 font-normal">/night</span>
                </p>
              </td>

              <td className="p-5">
                <Badge type={room.status === "ACTIVE" ? "success" : "danger"}>
                  {room.status}
                </Badge>
              </td>

              <td className="p-5 text-center text-gray-300 cursor-pointer hover:text-[#113D32]">
                <FaEllipsisH />
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      {/* FOOTER / PAGINATION */}
      <div className="flex justify-between items-center mt-6 text-[11px] text-[#6E6E6E] font-semibold px-2">
        <p>Showing 1 to {roomData.length} of {roomData.length} entries</p>
        <div className="flex gap-2">
          <Button type="secondary" className="bg-white border-gray-200 px-4 py-2">
            Prev
          </Button>
          <Button className="px-4 py-2 shadow-md shadow-green-900/10">
            1
          </Button>
          <Button type="secondary" className="bg-white border-gray-200 px-4 py-2">
            Next
          </Button>
        </div>
      </div>

      {/* MODAL UNTUK TAMBAH KAMAR BARU */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Room - StayZone"
      >
        <div className="space-y-4">
          <InputField label="Room Name" placeholder="e.g. Deluxe Ocean View" />
          <div className="grid grid-cols-2 gap-4">
            <SelectField 
              label="Bed Type" 
              options={[
                { value: "single", label: "Single Bed" },
                { value: "double", label: "Double Bed" },
                { value: "suite", label: "Suite" }
              ]} 
            />
            <InputField label="Floor" placeholder="e.g. Floor 3" />
          </div>
          <InputField label="Rate per Night (₹)" type="number" placeholder="1500" />
          <div className="pt-4 flex justify-end space-x-2 border-t border-gray-100">
            <Button type="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              alert("Room data saved!");
              setIsModalOpen(false);
            }}>Save Room</Button>
          </div>
        </div>
      </Modal>

    </Container>
  );
}