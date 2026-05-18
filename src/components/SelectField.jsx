import React from 'react';

export default function SelectField({ label, options = [], value, onChange, name }) {
    return (
        <div className="flex flex-col space-y-1.5 w-full">
            {label && (
                <label className="text-sm font-semibold text-[#113D32] tracking-wide">
                    {label}
                </label>
            )}
            <div className="relative">
                <select name={name} value={value} onChange={onChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm bg-white focus:outline-none focus:border-[#3AB449] focus:ring-2 focus:ring-[#3ab44920] transition-all appearance-none cursor-pointer">
                    <option value="" disabled hidden>Pilih salah satu...</option>
                    {options.map((opt, idx) => (
                        <option key={idx} value={opt.value}> {opt.label} </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}