export default function Badge({ children, type = "primary" }) {
  const types = {
    primary:   "bg-blue-100 text-blue-700",
    secondary: "bg-gray-100 text-gray-600",
    success:   "bg-[#3AB449]/15 text-[#2a8535]",
    danger:    "bg-red-100 text-red-600",
    warning:   "bg-amber-100 text-amber-700",
  };

  return (
    <span className={`${types[type] ?? types.primary} px-3 py-1 rounded-full text-[11px] font-bold inline-flex items-center`}>
      {children}
    </span>
  );
}
