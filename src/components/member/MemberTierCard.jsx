/**
 * MemberTierCard.jsx
 * Widget tier loyalitas member — dihitung dari total malam menginap.
 *
 * Tier:
 *   Bronze  : 1–3 malam
 *   Silver  : 4–10 malam
 *   Gold    : 11–20 malam
 *   Platinum: >20 malam
 */

// ─── Konfigurasi Tier ─────────────────────────────────────────────────────────
export const TIERS = [
  {
    name:     "Bronze",
    icon:     "🥉",
    min:      1,
    max:      3,
    next:     4,
    benefit:  "Free Welcome Drink",
    benefits: ["Welcome drink gratis", "Akses member StayZone"],
    bg:       "from-amber-800/80 to-amber-700/60",
    border:   "border-amber-600/40",
    badge:    "bg-amber-700/20 text-amber-200 border border-amber-600/30",
    bar:      "bg-amber-400",
    barBg:    "bg-amber-900/40",
    label:    "text-amber-300",
  },
  {
    name:     "Silver",
    icon:     "🥈",
    min:      4,
    max:      10,
    next:     11,
    benefit:  "Diskon 10% & Late Check-out",
    benefits: ["Diskon 10% untuk semua kamar", "Late check-out hingga 14.00", "Priority booking"],
    bg:       "from-slate-600/80 to-slate-500/60",
    border:   "border-slate-400/40",
    badge:    "bg-slate-500/30 text-slate-200 border border-slate-400/30",
    bar:      "bg-slate-300",
    barBg:    "bg-slate-700/40",
    label:    "text-slate-300",
  },
  {
    name:     "Gold",
    icon:     "🥇",
    min:      11,
    max:      20,
    next:     21,
    benefit:  "Free Breakfast & Room Upgrade",
    benefits: ["Sarapan gratis setiap hari", "Upgrade kamar gratis (subject to availability)", "Diskon 15%", "Early check-in 10.00"],
    bg:       "from-yellow-700/80 to-yellow-600/60",
    border:   "border-yellow-400/40",
    badge:    "bg-yellow-500/20 text-yellow-200 border border-yellow-400/30",
    bar:      "bg-yellow-400",
    barBg:    "bg-yellow-900/40",
    label:    "text-yellow-300",
  },
  {
    name:     "Platinum",
    icon:     "💎",
    min:      21,
    max:      Infinity,
    next:     null,
    benefit:  "Executive Lounge & Antar Jemput Bandara",
    benefits: ["Executive lounge akses 24 jam", "Antar jemput bandara gratis", "Diskon 20% + voucher tambahan", "Butler service eksklusif", "Guaranteed room upgrade"],
    bg:       "from-[#00B074]/80 to-[#1a3c2e]/80",
    border:   "border-[#00B074]/50",
    badge:    "bg-[#00B074]/20 text-green-200 border border-[#00B074]/40",
    bar:      "bg-[#00B074]",
    barBg:    "bg-green-900/40",
    label:    "text-green-300",
  },
];

/** Hitung tier berdasarkan total malam */
export function getTier(totalNights) {
  if (totalNights >= 21) return TIERS[3];
  if (totalNights >= 11) return TIERS[2];
  if (totalNights >= 4)  return TIERS[1];
  return TIERS[0];
}

import { CheckCircle2, TrendingUp } from "lucide-react";

/**
 * Props:
 *   totalNights : number   — total malam menginap user
 *   loading     : boolean  — sedang fetch data
 */
export default function MemberTierCard({ totalNights = 0, loading = false }) {
  const tier     = getTier(totalNights);
  const nextTier = TIERS[TIERS.indexOf(tier) + 1] ?? null;

  // Progress ke tier berikutnya
  const progressPct = nextTier
    ? Math.min(100, Math.round(((totalNights - tier.min + 1) / (nextTier.min - tier.min)) * 100))
    : 100;

  const nightsToNext = nextTier ? Math.max(0, nextTier.min - totalNights) : 0;

  return (
    <div className={`rounded-2xl border ${tier.border} bg-gradient-to-br ${tier.bg} p-5 text-white shadow-lg`}>

      {/* ── Header: ikon tier + badge ── */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl leading-none">{tier.icon}</span>
          <div>
            <p className="text-xs text-white/60 uppercase tracking-widest leading-none mb-1">
              Status Member
            </p>
            <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold tracking-wide ${tier.badge}`}>
              {tier.name} Member
            </span>
          </div>
        </div>

        {/* Total malam */}
        <div className="text-right">
          <p className="text-xs text-white/50">Total Menginap</p>
          {loading ? (
            <div className="h-6 w-12 rounded bg-white/10 animate-pulse mt-0.5" />
          ) : (
            <p className="text-2xl font-bold text-white leading-tight">{totalNights}</p>
          )}
          <p className="text-[10px] text-white/40">malam</p>
        </div>
      </div>

      {/* ── Progress bar ke tier berikutnya ── */}
      {nextTier && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <p className={`text-xs font-medium ${tier.label}`}>
              {loading ? "Menghitung..." : nightsToNext > 0
                ? `${nightsToNext} malam lagi menuju ${nextTier.name} ${nextTier.icon}`
                : `Hampir ke ${nextTier.name}!`
              }
            </p>
            <p className="text-xs text-white/40">{progressPct}%</p>
          </div>
          <div className={`h-2 w-full rounded-full ${tier.barBg} overflow-hidden`}>
            <div
              className={`h-full rounded-full ${tier.bar} transition-all duration-700`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-white/30 mt-1">
            <span>{tier.name} ({tier.min} mlm)</span>
            <span>{nextTier.name} ({nextTier.min} mlm)</span>
          </div>
        </div>
      )}

      {/* Platinum — sudah tier tertinggi */}
      {!nextTier && (
        <div className={`rounded-xl ${tier.barBg} border ${tier.border} px-3 py-2 mb-4 flex items-center gap-2`}>
          <span className="text-base">🏆</span>
          <p className="text-xs font-semibold text-white">
            Selamat! Anda telah mencapai tier tertinggi StayZone.
          </p>
        </div>
      )}

      {/* ── Benefit aktif ── */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <TrendingUp size={12} className="text-white/60" />
          <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">
            Benefit Aktif Anda
          </p>
        </div>
        <ul className="space-y-1.5">
          {tier.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-xs text-white/80">
              <CheckCircle2 size={12} className={`${tier.label} shrink-0 mt-0.5`} />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
