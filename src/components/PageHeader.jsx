import { FaHotel } from "react-icons/fa";

export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4 mb-6 bg-white rounded-xl shadow-sm">
            
            {/* Left */}
            <div id="pageheader-left" className="flex flex-col">
                
                {/* Title */}
                <div className="flex items-center gap-2">
                    <FaHotel className="text-yellow-600" />
                    <h1 className="text-3xl font-semibold text-gray-800">
                        {title}
                    </h1>
                </div>

                {/* Breadcrumb */}
                <nav className="flex items-center font-medium space-x-2 mt-2 text-sm">
                    <span className="text-gray-400">Hotel Dashboard</span>
                    <span className="text-gray-400">/</span>

                    <span className="text-yellow-600">
                        {Array.isArray(breadcrumb)
                            ? breadcrumb.join(" / ")
                            : breadcrumb}
                    </span>
                </nav>
            </div>

            {/* Right (Action Button) */}
            <div id="action-button">
                {children}
            </div>
        </div>
    );
}