import React from 'react';

export default function ProductSection({ title, items = [] }) {
    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[#113D32] text-lg">{title}</h3>
                <span className="text-xs font-bold text-[#3AB449] bg-[#3AB449]/10 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-[#3AB449] hover:text-white transition-all">
                    View All
                </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                        <div className="h-48 overflow-hidden relative">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#113D32] font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-sm">
                                {item.tag}
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <h4 className="font-bold text-[#113D32] text-lg mb-1">{item.name}</h4>
                                <p className="text-gray-400 text-xs mb-4">{item.description}</p>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Mulai dari</p>
                                    <p className="text-base font-extrabold text-[#3AB449]">{item.price}</p>
                                </div>
                                <button className="bg-[#113D32] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#3AB449] transition-colors shadow-sm">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}