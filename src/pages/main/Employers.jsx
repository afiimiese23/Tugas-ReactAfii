import React, { useState } from "react";
import { FaChevronDown, FaEllipsisH, FaPhoneAlt } from "react-icons/fa";

// Import StayZone Components
import Container from "../../components/Container";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Card from "../../components/Card";

// Import Data Mock
import employees from "../../data/employeeData.json";

export default function EmployersList() {
  const [activeTab, setActiveTab] = useState("All Employee");
  const tabs = ["All Employee", "Active Employee", "Inactive Employee"];

  // Definisi Header Tabel
  const tableHeaders = [
    <input type="checkbox" className="w-4 h-4 rounded accent-[#3AB449] cursor-pointer" />,
    "Name",
    "Job Desk",
    "Schedule",
    "Contact",
    "Status",
    "" // Untuk Action Menu
  ];

  return (
    <Container className="bg-[#EEEEEE] min-h-screen py-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 px-2">
        {/* TABS NAVIGATION */}
        <div className="flex space-x-8 border-b border-gray-200 w-full md:w-auto">
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
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <Button className="px-6 py-2.5 shadow-lg shadow-green-900/20">
            + New Employee
          </Button>
          <Button type="secondary" className="bg-white border-gray-200 px-6 py-2.5 flex items-center gap-2">
            <span className="text-[#113D32]">Newest</span>
            <FaChevronDown className="text-[#3AB449] text-[10px]" />
          </Button>
        </div>
      </div>

      {/* TABLE SECTION*/}
      <Card className="p-0 overflow-hidden border-none shadow-sm">
        <Table headers={tableHeaders}>
          {employees.map((emp, index) => (
            <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
              <td className="p-5 text-center">
                <input type="checkbox" className="w-4 h-4 rounded accent-[#3AB449] cursor-pointer" />
              </td>
              
              <td className="p-5">
                <div className="flex items-center gap-4">
                  {/* FOTO PROFILE - Tetap muncul dengan fallback Avatar */}
                  <div className="relative">
                    <img 
                      src={emp.image} 
                      className="w-12 h-12 rounded-xl object-cover shadow-sm border border-gray-100" 
                      alt={emp.name} 
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#113D32] text-sm">{emp.name}</p>
                    <p className="text-[10px] text-[#3AB449] font-bold">{emp.id}</p>
                    <p className="text-[9px] text-gray-400 italic font-medium">Joined on Aug 2th 2017</p>
                  </div>
                </div>
              </td>

              <td className="p-5 text-[#6E6E6E] font-medium max-w-[250px] leading-relaxed">
                {emp.jobDesk}
              </td>

              <td className="p-5">
                <p className="font-bold text-[#113D32]">{emp.schedule}</p>
                <button className="text-gray-400 font-medium hover:text-[#3AB449] transition-colors">
                  Check schedule
                </button>
              </td>

              <td className="p-5">
                <div className="flex items-center gap-2 font-bold text-[#113D32]">
                  <FaPhoneAlt className="text-gray-400 text-[10px]" />
                  {emp.contact}
                </div>
              </td>

              <td className="p-5">
                {/* Menggunakan Badge StayZone */}
                <Badge type={emp.status === "ACTIVE" ? "success" : "danger"}>
                  {emp.status}
                </Badge>
              </td>

              <td className="p-5 text-center text-gray-300 cursor-pointer hover:text-[#113D32]">
                <FaEllipsisH />
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      {/* PAGINATION - Menggunakan Button StayZone */}
      <div className="flex justify-between items-center mt-6 text-[11px] text-[#6E6E6E] font-semibold px-2">
        <p>Showing 1 to 6 of 30 entries</p>
        <div className="flex gap-2">
          <Button type="secondary" className="bg-white border-gray-200 px-4 py-2 hover:bg-gray-50">
            Prev
          </Button>
          <Button className="px-4 py-2">1</Button>
          <Button type="secondary" className="bg-white border-gray-200 px-4 py-2">
            Next
          </Button>
        </div>
      </div>
    </Container>
  );
}