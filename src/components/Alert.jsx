import React from 'react';
import { MdCheckCircle, MdError, MdInfo } from "react-icons/md"; 

export default function Alert({ type = "success", message }) {
    const config = {
        success: { bg: "bg-green-50", text: "text-green-800", border: "border-green-200", 
            icon: <MdCheckCircle className="text-xl text-[#3AB449]" /> },
        error: { bg: "bg-red-50", text: "text-red-800", border: "border-red-200", 
            icon: <MdError className="text-xl text-red-500" /> },
        info: { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-200", 
            icon: <MdInfo className="text-xl text-blue-500" /> }
    };
    return (
        <div className={`flex items-center p-4 rounded-xl border ${config[type].bg} ${config[type].border} ${config[type].text} space-x-3 shadow-sm`}>
            {config[type].icon}
            <span className="text-sm font-medium">{message}</span>
        </div>
    );
}