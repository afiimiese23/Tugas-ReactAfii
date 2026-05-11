export default function Loading() {
    return (
        <div className="min-h-screen bg-[#EEEEEE] flex flex-col justify-center items-center font-['Poppins']">

            {/* Loader */}
            <div className="relative flex items-center justify-center">

                <div className="w-20 h-20 border-[6px] border-[#D9EDE7] rounded-full"></div>

                <div className="absolute w-20 h-20 border-[6px] border-[#113D32] border-t-transparent rounded-full animate-spin"></div>

            </div>

            {/* Text */}
            <h2 className="mt-8 text-2xl font-black text-[#113D32] tracking-wide">
                Loading...
            </h2>

            <p className="text-sm text-[#6E6E6E] mt-2">
                Please wait while the dashboard is loading
            </p>

        </div>
    );
}