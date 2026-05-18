import React from 'react';

export default function HeroSection({ title, subtitle, bgImage, children }) {
    return (
        <div 
            className="relative rounded-32px overflow-hidden bg-[#113D32] text-white p-8 md:p-12 shadow-lg mb-8"
            style={{
                backgroundImage: bgImage ? `linear-gradient(rgba(17, 61, 50, 0.85), rgba(17, 61, 50, 0.95)), url(${bgImage})` : 'none',
                backgroundSize: 'cover', backgroundPosition: 'center'
            }}>
            <div className="max-w-2xl relative z-10">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight"> {title} </h1>
                <p className="text-gray-300 text-sm md:text-base mt-3 max-w-lg font-light"> {subtitle} </p>
                {children && <div className="mt-6">{children}</div>}
            </div>
        </div>
    );
}