import { 
    FaBed, FaSignInAlt, FaSignOutAlt, FaSearch, 
    FaBell, FaRegHeart, FaRegCommentDots, FaRegEnvelope 
} from "react-icons/fa";

export default function Dashboard() {
    return (
        <div className="flex-1 bg-[#F8F9FA] min-h-screen overflow-y-auto font-['Poppins']">
            

            <main className="p-8">
                {/* WELCOME SECTION */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[#113D32]">
                        Welcome Hotel, <span className="font-extrabold">StayZone!</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Don't Forget to Check your Activity</p>
                </div>

                {/* STATISTICS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Card Component Helper */}
                    {[
                        { label: "New Booking", val: "8,461", icon: <FaBed />, color: "#3AB449" },
                        { label: "Booked", val: "8,461", icon: <FaBed />, color: "#3AB449" },
                        { label: "Check In", val: "753", icon: <FaSignInAlt />, color: "#3AB449" },
                        { label: "Check Out", val: "516", icon: <FaSignOutAlt />, color: "#3AB449" },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm flex items-center space-x-4 border border-gray-50 hover:shadow-md transition-shadow">
                            <div className="p-4 rounded-xl" style={{ backgroundColor: `${item.color}15` }}>
                                <div style={{ color: item.color }} className="text-xl">
                                    {item.icon}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">{item.val}</h3>
                                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{item.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* RECENT BOOKING SCHEDULE (CALENDAR) */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-gray-50">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-bold text-[#113D32] text-lg">Recent Booking Schedule</h3>
                            <div className="flex items-center space-x-4 text-sm font-bold bg-gray-50 px-4 py-2 rounded-xl">
                                <button className="hover:text-[#3AB449] transition-colors">&lt;</button>
                                <span className="text-gray-700 font-bold">July 2024</span>
                                <button className="hover:text-[#3AB449] transition-colors">&gt;</button>
                            </div>
                        </div>

                        {/* Calendar Body */}
                        <div className="grid grid-cols-7 gap-2 text-center text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-6 px-2">
                            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-y-3 gap-x-2 text-center mb-10 px-2 font-medium">
                            {[...Array(31)].map((_, i) => {
                                const isSelected = i + 1 === 9;
                                return (
                                    <div key={i} className="relative group flex justify-center">
                                        <div className={`w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer transition-all
                                            ${isSelected ? 'bg-[#3AB449] text-white shadow-lg shadow-green-200 font-bold scale-110' : 'text-gray-600 hover:bg-gray-100'}`}>
                                            {i + 1}
                                            {isSelected && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#3AB449]"></span>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Booking List Detail */}
                        <div className="space-y-4 pt-6 border-t border-gray-100">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all cursor-pointer">
                                <div className="flex items-center space-x-4">
                                    <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=200" className="w-14 h-14 rounded-2xl object-cover" alt="room"/>
                                    <div>
                                        <p className="font-bold text-[#113D32]">Queen Bed A-12324</p>
                                        <p className="text-[11px] text-gray-400 mt-0.5">James Sukardi • 12min ago</p>
                                    </div>
                                </div>
                                <div className="bg-[#113D32] text-white w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm">3</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-50">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-bold text-[#113D32] text-lg">Reservation Stats</h3>
                        </div>
                        
                        <div className="flex space-x-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-10 border-b pb-4">
                            <span className="cursor-pointer hover:text-[#113D32]">Daily</span>
                            <span className="cursor-pointer hover:text-[#113D32]">Weekly</span>
                            <span className="text-[#113D32] border-b-2 border-[#113D32] pb-4 -mb-[18px]">Monthly</span>
                        </div>

                        {/* Chart Bars */}
                        <div className="h-64 flex items-end justify-between space-x-3 px-2">
                            {[
                                { h: 60, h2: 30 }, { h: 85, h2: 50 }, { h: 55, h2: 40 }, 
                                { h: 95, h2: 60 }, { h: 65, h2: 35 }, { h: 75, h2: 45 }, { h: 40, h2: 20 }
                            ].map((bar, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                                    <div className="w-full bg-[#113D32] rounded-t-md transition-all group-hover:opacity-80" style={{ height: `${bar.h}%` }}></div>
                                    <div className="w-full bg-[#3AB449] rounded-b-md transition-all group-hover:opacity-80" style={{ height: `${bar.h2}%` }}></div>
                                    <span className="text-[9px] text-gray-400 mt-4 font-bold uppercase">Day</span>
                                </div>
                            ))}
                        </div>

                        {/* Info Footer */}
                        <div className="mt-10 flex gap-4">
                             <div className="flex-1 bg-[#113D32] p-4 rounded-2xl text-white">
                                <p className="text-[10px] opacity-60 font-bold uppercase tracking-tighter">Available Room Today</p>
                                <p className="text-xl font-bold mt-1">683</p>
                             </div>
                             <div className="flex-1 bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Sold Out Today</p>
                                <p className="text-xl font-bold text-gray-800 mt-1">156</p>
                             </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}