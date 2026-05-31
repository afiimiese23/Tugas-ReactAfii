import React from "react";
// Import Core UI Components
import Container from "../../components/Container";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Avatar from "../../components/Avatar";

import { 
    FaBed, FaSignInAlt, FaSignOutAlt, 
    FaChevronLeft, FaChevronRight 
} from "react-icons/fa";

export default function Dashboard() {
    // Data Statistik untuk Card
    const stats = [
        { label: "New Booking", val: "8,461", icon: <FaBed />, color: "#3AB449" },
        { label: "Booked", val: "8,461", icon: <FaBed />, color: "#3AB449" },
        { label: "Check In", val: "753", icon: <FaSignInAlt />, color: "#3AB449" },
        { label: "Check Out", val: "516", icon: <FaSignOutAlt />, color: "#3AB449" },
    ];

    // Data Mock untuk List Jadwal
    const recentBookings = [
        { id: 1, room: "Queen Bed A-12324", guest: "James Sukardi", time: "12min ago", status: "New", count: 3 },
        { id: 2, room: "Deluxe Twin B-045", guest: "Siti Rahma", time: "45min ago", status: "Pending", count: 1 },
    ];

    return (
        <Container className="bg-[#F8F9FA] min-h-screen font-['Poppins'] py-8">
            {/* 1. WELCOME SECTION */}
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-[#113D32]">
                    Welcome Hotel, <span className="font-extrabold">StayZone!</span>
                </h1>
                <p className="text-gray-400 text-sm mt-1 font-medium">Don't Forget to Check your Activity</p>
            </header>

            {/* 2. STATISTICS CARDS - Menggunakan Komponen <Card /> */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((item, idx) => (
                    <Card key={idx} className="flex items-center space-x-4 border-none shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="p-4 rounded-2xl" style={{ backgroundColor: `${item.color}15` }}>
                            <div style={{ color: item.color }} className="text-2xl">
                                {item.icon}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-[#113D32]">{item.val}</h3>
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{item.label}</p>
                        </div>
                    </Card>
                ))}
            </section>

            <div className="grid lg:grid-cols-3 gap-8">
                
                {/* 3. RECENT BOOKING SCHEDULE */}
                <Card className="lg:col-span-2 p-8 rounded-[32px] border-none shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-bold text-[#113D32] text-lg">Recent Booking Schedule</h3>
                        <div className="flex items-center space-x-3 bg-gray-50 p-1.5 rounded-xl">
                            <button className="p-2 hover:text-[#3AB449] transition-colors"><FaChevronLeft size={12}/></button>
                            <span className="text-gray-700 font-bold text-sm px-2">July 2024</span>
                            <button className="p-2 hover:text-[#3AB449] transition-colors"><FaChevronRight size={12}/></button>
                        </div>
                    </div>

                    {/* Simple Calendar View */}
                    <div className="grid grid-cols-7 gap-2 text-center text-[10px] text-gray-400 font-black uppercase tracking-widest mb-6 px-2">
                        <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-y-3 gap-x-2 text-center mb-10 px-2">
                        {[...Array(31)].map((_, i) => {
                            const isSelected = i + 1 === 9;
                            return (
                                <div key={i} className="flex justify-center">
                                    <div className={`w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer text-sm transition-all
                                        ${isSelected ? 'bg-[#3AB449] text-white shadow-lg shadow-green-100 font-bold scale-110' : 'text-gray-600 hover:bg-gray-100'}`}>
                                        {i + 1}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Booking List Detail - Menggunakan <Avatar /> & <Badge /> */}
                    <div className="space-y-4 pt-6 border-t border-gray-100">
                        {recentBookings.map((book) => (
                            <div key={book.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-transparent hover:border-gray-200 transition-all cursor-pointer group">
                                <div className="flex items-center space-x-4">
                                    <Avatar name={book.guest} />
                                    <div>
                                        <p className="font-bold text-[#113D32] group-hover:text-[#3AB449] transition-colors">{book.room}</p>
                                        <p className="text-[11px] text-gray-400 mt-0.5 font-medium">{book.guest} • {book.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge type={book.status === "New" ? "success" : "warning"}>{book.status}</Badge>
                                    <div className="bg-[#113D32] text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs">{book.count}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* 4. RESERVATION STATS */}
                <Card className="p-8 rounded-[32px] border-none shadow-sm flex flex-col">
                    <h3 className="font-bold text-[#113D32] text-lg mb-6">Reservation Stats</h3>
                    
                    <div className="flex space-x-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-10 border-b pb-4">
                        <span className="cursor-pointer hover:text-[#113D32]">Daily</span>
                        <span className="cursor-pointer hover:text-[#113D32]">Weekly</span>
                        <span className="text-[#113D32] border-b-2 border-[#113D32] pb-4 -mb-[18px]">Monthly</span>
                    </div>

                    {/* Chart Bars (Dummy) */}
                    <div className="h-64 flex items-end justify-between space-x-3 px-2 mb-8">
                        {[
                            { h: 60, h2: 30 }, { h: 85, h2: 50 }, { h: 55, h2: 40 }, 
                            { h: 95, h2: 60 }, { h: 65, h2: 35 }, { h: 75, h2: 45 }, { h: 40, h2: 20 }
                        ].map((bar, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                                <div className="w-full bg-[#113D32] rounded-t-md opacity-90 group-hover:bg-[#3AB449] transition-all" style={{ height: `${bar.h}%` }}></div>
                                <div className="w-full bg-[#3AB449] rounded-b-md opacity-40 group-hover:opacity-100 transition-all" style={{ height: `${bar.h2}%` }}></div>
                            </div>
                        ))}
                    </div>

                    {/* Info Footer Stats */}
                    <div className="mt-auto space-y-3">
                         <div className="bg-[#113D32] p-5 rounded-[24px] text-white shadow-lg shadow-emerald-900/20">
                            <p className="text-[10px] opacity-70 font-bold uppercase tracking-widest">Available Room Today</p>
                            <div className="flex justify-between items-end mt-1">
                                <p className="text-3xl font-bold">683</p>
                                <Button className="bg-white/20 hover:bg-white/30 text-white border-none py-1.5 px-3 text-[10px]">Details</Button>
                            </div>
                         </div>
                         <div className="bg-white border border-gray-100 p-5 rounded-[24px]">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Sold Out Today</p>
                            <p className="text-3xl font-bold text-[#113D32] mt-1">156</p>
                         </div>
                    </div>
                </Card>

            </div>
        </Container>
    );
}