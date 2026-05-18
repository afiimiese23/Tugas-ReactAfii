import React from 'react';

export default function InputField({ label, type = "text", placeholder, value, onChange, name }) {
    return (
        <div className="flex flex-col space-y-1.5 w-full">
            {label && (
                <label className="text-sm font-semibold text-[#113D32] tracking-wide">
                    {label}
                </label>
            )}
            <input type={type} name={name} value={value}  onChange={onChange} placeholder={placeholder}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-[#3AB449] focus:ring-2 focus:ring-[#3ab44920] transition-all"
            />
        </div>
    );
}