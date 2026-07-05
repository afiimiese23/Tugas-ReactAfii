export default function Button({ children, type = "primary", className = "", onClick, disabled = false }) {
  const types = {
    primary:   "bg-[#113D32] hover:bg-[#0d2e25] text-white shadow-sm",
    secondary: "bg-white border border-gray-200 text-[#113D32] hover:bg-gray-50",
    danger:    "bg-red-500 hover:bg-red-600 text-white",
    warning:   "bg-amber-500 hover:bg-amber-600 text-white",
    success:   "bg-[#3AB449] hover:bg-[#2ea33e] text-white",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${types[type] ?? types.primary} px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
