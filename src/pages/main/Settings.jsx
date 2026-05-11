import React from 'react';
import { FaHeart, FaEnvelope, FaBell, FaCommentDots, FaCalendarAlt } from 'react-icons/fa';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-[#EEEEEE] font-['Poppins'] text-[#113D32] p-8">
      {/* TOP NAVIGATION BAR */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">Settings</h1>
        
        <div className="flex items-center space-x-6">
          {/* SEARCH BAR */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-white px-5 py-2.5 rounded-xl w-64 shadow-sm focus:outline-none text-sm border border-gray-100"
            />
            <svg className="w-4 h-4 absolute right-4 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          
          {/* TOP ICONS */}
          <div className="flex space-x-5 text-[#113D32] text-xl">
            <FaHeart className="cursor-pointer hover:text-[#3AB449]" />
            <FaEnvelope className="cursor-pointer hover:text-[#3AB449]" />
            <FaBell className="cursor-pointer hover:text-[#3AB449]" />
            <FaCommentDots className="cursor-pointer hover:text-[#3AB449]" />
          </div>
          
          {/* PROFILE IMAGE */}
          <img src="https://i.pravatar.cc/150?u=nandhini" alt="Profile" 
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"/>
        </div>
      </div>  

      <div className="flex gap-8">
        {/* LEFT SIDEBAR CARD */}
        <div className="w-1/4 bg-white rounded-[32px] p-8 shadow-sm flex flex-col items-center border border-gray-50 h-fit">
          <img 
            src="https://i.pravatar.cc/150?u=nandhini" 
            alt="Avatar" 
            className="w-24 h-24 rounded-[24px] mb-4 border-4 border-[#EEEEEE]"
          />
          <h2 className="text-lg font-bold">Nandhini</h2>
          <p className="text-xs text-gray-400 font-medium mb-8">Owner</p>
          
          <div className="w-full space-y-2">
            <button className="w-full text-left px-6 py-3 bg-[#113D32] text-white rounded-xl text-xs font-bold shadow-md shadow-green-900/20">
              Personal Settings
            </button>
            <button className="w-full text-left px-6 py-3 text-[#113D32] hover:bg-gray-50 rounded-xl text-xs font-bold transition-all">
              Payment Method
            </button>
            <button className="w-full text-left px-6 py-3 text-[#113D32] hover:bg-gray-50 rounded-xl text-xs font-bold transition-all">
              Notification Settings
            </button>
            <button className="w-full text-left px-6 py-3 text-[#113D32] hover:bg-gray-50 rounded-xl text-xs font-bold transition-all">
              Change Password
            </button>
            <button className="w-full text-left px-6 py-3 text-[#113D32] hover:bg-gray-50 rounded-xl text-xs font-bold transition-all">
              Terms & Condition
            </button>
          </div>
        </div>

        {/* RIGHT FORM CARD */}
        <div className="flex-1 bg-white rounded-[32px] p-10 shadow-sm border border-gray-50">
          <h2 className="text-lg font-bold mb-8">Personal Settings</h2>
          
          <form className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#113D32]">First Name</label>
              <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#3AB449] outline-none text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#113D32]">Last Name</label>
              <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#3AB449] outline-none text-sm" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#113D32]">Email</label>
              <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#3AB449] outline-none text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#113D32]">Mobile No</label>
              <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#3AB449] outline-none text-sm" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#113D32]">Designation</label>
              <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#3AB449] outline-none text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#113D32]">Date of Birth</label>
              <div className="relative">
                <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#3AB449] outline-none text-sm" />
                <FaCalendarAlt className="absolute right-4 top-3.5 text-[#113D32]" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#113D32]">Address</label>
              <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#3AB449] outline-none text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#113D32]">City</label>
              <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#3AB449] outline-none text-sm" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#113D32]">State</label>
              <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#3AB449] outline-none text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#113D32]">Country</label>
              <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#3AB449] outline-none text-sm" />
            </div>

            <div className="col-span-2 flex justify-end mt-4">
              <button className="bg-[#113D32] text-white px-10 py-3 rounded-xl text-sm font-bold shadow-lg shadow-green-900/20 active:scale-95 transition-transform">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;