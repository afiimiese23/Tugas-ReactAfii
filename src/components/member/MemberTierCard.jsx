// Komponen kartu status member berdasarkan total malam menginap
export default function MemberTierCard({ totalNights = 0 }) {
  // Tentukan tier berdasarkan total malam
  const tier =
    totalNights >= 21 ? { name: "Platinum", icon: "💎", color: "bg-[#00B074]" } :
    totalNights >= 11 ? { name: "Gold",     icon: "🥇", color: "bg-yellow-500" } :
    totalNights >= 4  ? { name: "Silver",   icon: "🥈", color: "bg-gray-400"   } :
                        { name: "Bronze",   icon: "🥉", color: "bg-amber-600"  };

  return (
    <div className="rounded-2xl bg-[#1a3c2e] p-5 text-white h-full flex flex-col justify-between">
      <div>
        <p className="text-xs text-green-300/60 uppercase tracking-widest mb-2">Status Member</p>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-3xl">{tier.icon}</span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${tier.color}`}>
            {tier.name} Member
          </span>
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold">{totalNights}</p>
        <p className="text-xs text-green-300/60">total malam menginap</p>
      </div>
    </div>
  );
}
