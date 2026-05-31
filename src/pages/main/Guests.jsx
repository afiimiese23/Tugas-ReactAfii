import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

// --- IMPORT SHADCN COMPONENTS ---
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// --- IMPORT STAYZONE COMPONENTS (Tombol lamamu tetap di sini) ---
import Container from "../../components/Container";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button"; // <--- Tombol kustom kamu
import Card from "../../components/Card";

// Import Data Mock
import guestData from "../../data/guestListData.json"; 

export default function Guests() {
  const [activeTab, setActiveTab] = useState("All Guest");
  const tabs = ["All Guest", "Pending", "Booked", "Canceled", "Refund"];

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
          {/* Menggunakan Button Kustom Kamu */}
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

      {/* SHADCN TABS (Komponen 1) */}
      <Tabs defaultValue="All Guest" onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto p-0 gap-10 overflow-x-auto w-full justify-start">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="rounded-none border-b-2 border-transparent px-0 pb-4 text-xs font-bold data-[state=active]:border-[#3AB449] data-[state=active]:text-[#113D32] data-[state=active]:bg-transparent text-[#6E6E6E] transition-all shadow-none whitespace-nowrap"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* TABLE SECTION */}
      <Card className="p-0 overflow-hidden border-none shadow-sm">
        <Table headers={tableHeaders}>
          {guestData.map((guest) => (
            <tr key={guest.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="p-5 text-center">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#3AB449]" />
              </td>

              <td className="p-5">
                <Link to={`/guests/${guest.id}`} className="flex items-center space-x-3 group">
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

              <td className="p-5 text-[#6E6E6E] font-medium">{guest.orderDate}</td>
              <td className="p-5 text-gray-800 font-bold">{guest.checkIn}</td>
              <td className="p-5 text-gray-800 font-bold">{guest.checkOut}</td>

              {/* SHADCN SHEET (Komponen 3) - Menggunakan Button Kustom Kamu */}
              <td className="p-5 text-center">
                <Sheet>
                    <SheetTrigger asChild>
                      {/* Ganti Button (kapital) jadi button (kecil) buat ngetes */}
                      <button className="bg-blue-500 text-white p-2"> 
                        View Notes 
                      </button>
                    </SheetTrigger>
                  <SheetContent className="bg-white">
                    <SheetHeader>
                      <SheetTitle className="text-[#113D32] font-bold">Guest Special Request</SheetTitle>
                      <SheetDescription className="pt-4 text-gray-600 leading-relaxed">
                        <div className="bg-gray-50 p-4 rounded-xl mb-4 italic">
                          "{guest.specialRequest || "No special requests."}"
                        </div>
                        <p><strong>Guest ID:</strong> {guest.id}</p>
                        <p><strong>Room:</strong> {guest.roomType}</p>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </td>

              <td className="p-5 text-[#6E6E6E] font-bold italic">{guest.roomType}</td>

              <td className="p-5">
                <Badge type={guest.status === "Refund" || guest.status === "Canceled" ? "danger" : "success"}>
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