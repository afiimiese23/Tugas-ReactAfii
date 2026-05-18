import React from 'react';

export default function FeatureSection({ sectionTitle, features = [] }) {
    return (
        <div className="bg-white p-8 rounded-32px shadow-sm border border-gray-50 mb-8">
            <h3 className="font-bold text-[#113D32] text-lg mb-6 border-b pb-4 border-gray-100">
                {sectionTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feat, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-green-50 border border-transparent
                         hover:border-gray-100 hover:bg-white hover:shadow-sm transition-all">
                        <div className="w-10 h-10 rounded-xl bg-[#3AB449]/10 text-[#3AB449] 
                            flex items-center justify-center text-lg mb-4 font-bold">
                            {feat.icon}
                        </div>
                        <h4 className="font-bold text-[#113D32] text-base mb-1">{feat.title}</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">{feat.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}