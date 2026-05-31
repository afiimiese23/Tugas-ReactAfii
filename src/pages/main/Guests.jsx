import React, { useState } from "react";
import { Link } from "react-router-dom"; // Link dikembalikan
import { FaChevronDown } from "react-icons/fa";

// Import StayZone Components
import Container from "../../components/Container";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Card from "../../components/Card";

// Import Data Mock
import guestData from "../../data/guestListData.json"; 

export default function Guests() {
  const [activeTab, setActiveTab] = useState("All Guest");
  const tabs = ["All Guest", "Pending", "Booked", "Canceled", "Refund"];

  // Header kolom untuk komponen Table
  const tableHeaders = [
    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#3AB449]" />,
    "Guest",
    "Order Date",
    "Check In",
    "Check Out",
    "Special Request",
    "Room Type",
    "Status"
  ];

  return (
    <Container className="bg-[#EEEEEE] min-h-screen py-8">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end mb-8 px-2">
        <div>
          <h1 className="text-2xl font-bold text-[#113D32]">Bookings</h1>
          <p className="text-xs text-[#6E6E6E] mt-1 font-medium">
            You have today <span className="text-[#3AB449] font-bold">{guestData.length}</span> Bookings
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button className="flex items-center space-x-3 text-[11px] px-4">
            <span>10 June 2024 - 9 July 2024</span>
            <FaChevronDown className="text-[10px]" />
          </Button>
          
          <Button type="secondary" className="flex items-center space-x-3 text-[11px] px-4 bg-white border-gray-200">
            <span className="text-[#113D32]">Newest</span>
            <FaChevronDown className="text-[10px] text-[#3AB449]" />
          </Button>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex space-x-10 border-b border-gray-200 mb-6 overflow-x-auto px-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-xs font-bold transition-all relative whitespace-nowrap ${
              activeTab === tab ? "text-[#113D32]" : "text-[#6E6E6E]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#3AB449] rounded-t-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* TABLE SECTION */}
      <Card className="p-0 overflow-hidden border-none shadow-sm">
        <Table headers={tableHeaders}>
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

              {/* GUEST INFO - DENGAN LINK AKTIF KE DETAIL */}
              <td className="p-5">
                <Link
                  to={`/guests/${guest.id}`}
                  className="flex items-center space-x-3 group"
                >
                  <Avatar name={guest.name} />
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

              <td className="p-5 text-[#6E6E6E] font-medium">
                {guest.orderDate}
              </td>

              <td className="p-5 text-gray-800 font-bold">
                {guest.checkIn}
              </td>

              <td className="p-5 text-gray-800 font-bold">
                {guest.checkOut}
              </td>

              <td className="p-5 text-center">
                <Button 
                  type="secondary" 
                  className="bg-[#E6F3EF] text-[#113D32] hover:bg-[#113D32] hover:text-white border-none text-[10px] font-bold px-4 py-2"
                >
                  View Notes
                </Button>
              </td>

              <td className="p-5 text-[#6E6E6E] font-bold italic">
                {guest.roomType}
              </td>

              <td className="p-5">
                <Badge 
                  type={guest.status === "Refund" || guest.status === "Canceled" ? "danger" : "success"}
                >
                  {guest.status}
                </Badge>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </Container>
  );
}