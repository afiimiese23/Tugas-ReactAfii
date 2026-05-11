import { Link } from "react-router-dom";
import { FaBed, FaArrowLeft } from "react-icons/fa";

export default function ErrorPage({ code, title, description, image }) {
    return (
        <div className="min-h-screen bg-[#EEEEEE] flex items-center justify-center p-6 font-['Poppins']">
            
            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-10 max-w-xl w-full text-center">
                
                {/* Illustration */}
                <img 
                    src={image || "https://illustrations.popsy.co/gray/status-code-404.svg"} 
                    alt="Error Illustration" 
                    className="w-72 mx-auto mb-8"
                />

                {/* Error Code */}
                <h1 className="text-7xl font-black text-[#113D32] tracking-tight">
                    {code}
                </h1>

                {/* Title */}
                <h2 className="text-3xl font-bold text-[#113D32] mt-3">
                    {title}
                </h2>

                {/* Description */}
                <p className="text-[#6E6E6E] mt-4 leading-relaxed text-sm max-w-md mx-auto">
                    {description}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mt-10 flex-wrap">
                    
                    <Link 
                        to="/" 
                        className="flex items-center gap-3 bg-[#113D32] text-white px-7 py-3 rounded-2xl text-sm font-bold hover:bg-[#0B2C24] transition-all shadow-lg shadow-green-900/10 active:scale-95"
                    >
                        <FaBed />
                        Back to Dashboard
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-3 bg-[#E6F3EF] text-[#113D32] px-7 py-3 rounded-2xl text-sm font-bold hover:bg-[#d8eee6] transition-all active:scale-95"
                    >
                        <FaArrowLeft />
                        Go Back
                    </button>

                </div>

            </div>

        </div>
    );
}