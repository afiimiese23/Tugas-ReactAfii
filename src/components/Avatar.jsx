export default function Avatar({ name = "?" }) {
  const colors = [
    "bg-[#3AB449]", "bg-[#113D32]", "bg-blue-500",
    "bg-purple-500", "bg-amber-500", "bg-rose-500",
  ];
  const color = colors[(name.charCodeAt(0) || 0) % colors.length];

  return (
    <div className={`${color} w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0`}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
