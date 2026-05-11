import { FaBed } from "react-icons/fa";

export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div
            id="pageheader-container"
            className="flex items-center justify-between p-6 mb-6 bg-white rounded-[28px] shadow-sm border border-gray-100 font-['Poppins']"
        >

            {/* LEFT SECTION */}
            <div id="pageheader-left" className="flex flex-col">

                {/* TITLE */}
                <div className="flex items-center gap-3">

                    <div className="bg-[#E6F3EF] p-3 rounded-2xl">
                        <FaBed className="text-[#113D32] text-lg" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-black text-[#113D32] leading-none">
                            {title}
                        </h1>

                        <p className="text-xs text-[#6E6E6E] mt-2 font-medium tracking-wide">
                            Hotel Management Dashboard
                        </p>
                    </div>

                </div>

                {/* BREADCRUMB */}
                <nav className="flex items-center gap-2 mt-5 text-xs font-bold tracking-wide uppercase">

                    <span className="text-[#6E6E6E]">
                        Dashboard
                    </span>

                    <span className="text-gray-300">
                        /
                    </span>

                    <span className="text-[#3AB449]">
                        {Array.isArray(breadcrumb)
                            ? breadcrumb.join(" / ")
                            : breadcrumb}
                    </span>

                </nav>

            </div>

            {/* RIGHT SECTION */}
            <div id="action-button" className="flex items-center gap-3">
                {children}
            </div>

        </div>
    );
}