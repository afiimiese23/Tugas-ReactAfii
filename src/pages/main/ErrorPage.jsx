import { Link } from "react-router-dom";
import { FaHotel } from "react-icons/fa";

export default function ErrorPage({ code, title, description, image }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-5">

            {/* Illustration */}
            <img 
                src={image || "https://illustrations.popsy.co/gray/status-code-404.svg"} 
                alt="Error Illustration" 
                className="w-72 mb-6"
            />

            {/* Code */}
            <h1 className="text-6xl font-bold text-gray-900">
                {code}
            </h1>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-700 mt-2">
                {title}
            </h2>

            {/* Description */}
            <p className="text-gray-500 mt-4 max-w-md">
                {description}
            </p>

            {/* Button */}
            <Link 
                to="/" 
                className="mt-8 flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-all shadow-md"
            >
                <FaHotel />
                Back to Hotel Dashboard
            </Link>
        </div>
    );
}