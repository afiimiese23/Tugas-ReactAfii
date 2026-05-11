import { useState } from "react";
import { FaChevronDown, FaEllipsisH, FaPhoneAlt } from "react-icons/fa";
import employees from "../../data/employeeData.json";

export default function EmployersList() {
  const [activeTab, setActiveTab] = useState("All Employee");
  const tabs = ["All Employee", "Active Employee", "Inactive Employee"];

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
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#113D32] rounded-t-full" />
              )}
            </button>
          ))}
        </div>
        <div className="flex space-x-3 pb-3">
          <button className="bg-[#113D32] text-white px-10 py-2.5 rounded-xl flex items-center space-x-3 text-xs shadow-md">
            + New Employee
          </button>
          <button className="bg-white border border-gray-200 text-[#113D32] px-5 py-2.5 rounded-xl flex items-center space-x-3 text-xs font-semibold shadow-sm">
            Newest <FaChevronDown className="text-[#3AB449] text-[10px]" />
          </button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] tracking-widest text-black font-bold border-b border-gray-50">
              <th className="p-5 w-12 text-center">
                 <input type="checkbox" className="w-4 h-4 rounded accent-[#3AB449] cursor-pointer" />
              </th>
              <th className="p-5">Name</th>
              <th className="p-5">Job Desk</th>
              <th className="p-5">Schedule</th>
              <th className="p-5">Contact</th>
              <th className="p-5">Status</th>
              <th className="p-5"></th>
            </tr>
          </thead>
          <tbody className="text-[11px]">
            {employees.map((emp, index) => (
              <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                <td className="p-5 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#3AB449] cursor-pointer" />
                </td>
                
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <img 
                      src={emp.image} 
                      className="w-12 h-12 rounded-xl object-cover shadow-sm border border-gray-100" 
                      alt="avatar" 
                    />
                    <div>
                      <p className="font-bold text-black text-sm">{emp.name}</p>
                      <p className="text-[10px] text-[#113D32]">{emp.id}</p>
                      <p className="text-[9px] text-gray-400 font-medium">Joined on Aug 2th 2017</p>
                    </div>
                  </div>
                </td>

                <td className="p-5 text-[#6E6E6E] font-medium max-w-[250px] leading-relaxed">
                  {emp.jobDesk}
                </td>

                <td className="p-5">
                  <p className="font-bold text-black">{emp.schedule}</p>
                  <p className="text-gray-400 font-medium">Check schedule</p>
                </td>

                <td className="p-5">
                  <div className="flex items-center gap-2 font-bold text-[#6E6E6E]">
                    <FaPhoneAlt className="text-gray-400 text-[10px]" />
                    {emp.contact}
                  </div>
                </td>

                <td className="p-5">
                  <span className={`font-black tracking-wider ${
                    emp.status === "ACTIVE" ? "text-[#68E365]" : "text-[#E23428]"
                  }`}>
                    {emp.status}
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

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6 text-[11px] text-[#6E6E6E] font-semibold px-2">
        <p>Showing 1 to 6 of 30 entries</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50">Prev</button>
          <button className="px-4 py-2 bg-[#113D32] text-white rounded-lg">1</button>
          <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg">Next</button>
        </div>
      </div>
    </div>
  );
}