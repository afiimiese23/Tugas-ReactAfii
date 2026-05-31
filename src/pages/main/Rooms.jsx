import React, { useState } from "react";
import { FaChevronDown, FaEllipsisH } from "react-icons/fa";

// --- IMPORT SHADCN COMPONENTS ---
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- IMPORT STAYZONE COMPONENTS ---
import Container from "../../components/Container";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";

// Import Data Mock
import roomData from "../../data/roomListData.json";

export default function Rooms() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All Rooms");
  const tabs = ["All Rooms", "Active Room", "Booked Room"];

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
        
        {/* KOMPONEN 1: SHADCN TABS */}
        <Tabs defaultValue="All Rooms" onValueChange={setActiveTab}>
          <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto p-0 gap-8">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-none border-b-2 border-transparent px-0 pb-4 text-sm font-bold data-[state=active]:border-[#3AB449] data-[state=active]:text-[#113D32] data-[state=active]:bg-transparent text-gray-400 transition-all shadow-none"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

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

      {/* MODAL UNTUK TAMBAH KAMAR BARU */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Room - StayZone"
      >
        <div className="space-y-4">
          <InputField label="Room Name" placeholder="e.g. Deluxe Ocean View" />
          
          <div className="grid grid-cols-2 gap-4">
            {/* KOMPONEN 2: SHADCN SELECT */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#113D32]">Bed Type</label>
              <Select>
                <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-xl h-11 focus:ring-[#3AB449]">
                  <SelectValue placeholder="Select Bed Type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-100 rounded-xl shadow-xl">
                  <SelectItem value="single">Single Bed</SelectItem>
                  <SelectItem value="double">Double Bed</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>

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