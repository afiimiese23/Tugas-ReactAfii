import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getSession } from "@/lib/auth";

const fmt = (s) => s ? new Date(s).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "—";
const rp  = (n) => "Rp " + Number(n).toLocaleString("id-ID");
const nights = (a, b) => a && b ? Math.max(0, Math.floor((new Date(b) - new Date(a)) / 86400000)) : 0;

const statusCls = {
  Pending:    "bg-amber-100 text-amber-700",
  Confirmed:  "bg-green-100 text-green-700",
  "Check-in": "bg-blue-100 text-blue-700",
  "Check-out":"bg-gray-100 text-gray-600",
  Cancelled:  "bg-red-100 text-red-600",
};

export default function MemberBookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true); setError("");
    const session = getSession();
    if (!session?.id) { setError("Sesi tidak ditemukan."); setLoading(false); return; }
    const { data, error: err } = await supabase
      .from("bookings")
      .select("id_bookings, nama_kamar, start_date, end_date, kode_voucher, catatan, total_harga, status, created_at")
      .eq("id_user", Number(session.id))
      .order("created_at", { ascending: false });
    if (err) setError(err.message);
    else setBookings(data || []);
    setLoading(false);
  }

  const active   = bookings.filter(b => b.status !== "Cancelled");
  const totMalam = active.reduce((s, b) => s + nights(b.start_date, b.end_date), 0);
  const totSpend = active.reduce((s, b) => s + Number(b.total_harga || 0), 0);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">

      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#00B074] mb-1">Riwayat Pemesanan</p>
        <h1 className="text-2xl font-bold text-[#1a3c2e]">Booking Saya</h1>
        <p className="text-sm text-gray-400 mt-0.5">Seluruh riwayat reservasi kamar Anda.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Booking", val: bookings.length, sub: "reservasi" },
          { label: "Total Malam",   val: totMalam,        sub: "malam" },
          { label: "Total Spend",   val: rp(totSpend),    sub: "after tax" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl bg-white border border-green-100 px-4 py-3 shadow-sm">
            <p className="text-xs text-gray-400">{s.label}</p>
            <p className="text-xl font-bold text-[#1a3c2e]">{s.val}</p>
            <p className="text-[10px] text-gray-300">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Content */}
      {loading && <p className="text-center py-16 text-gray-400 text-sm">Memuat...</p>}
      {error   && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">{error}</div>}

      {!loading && !error && bookings.length === 0 && (
        <div className="rounded-2xl border border-dashed border-green-200 bg-white py-16 text-center text-gray-400 text-sm">
          Belum ada booking. Kunjungi Katalog Kamar untuk memesan.
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <>
          {/* Desktop table */}
          <div className="hidden md:block rounded-2xl border border-green-100 bg-white shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-green-50 border-b border-green-100">
                <tr>
                  {["Kamar","Check-in","Check-out","Voucher","Total","Status"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-green-50">
                {bookings.map(b => (
                  <tr key={b.id_bookings} className="hover:bg-green-50/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#1a3c2e]">{b.nama_kamar}</td>
                    <td className="px-4 py-3 text-gray-500">{fmt(b.start_date)}</td>
                    <td className="px-4 py-3 text-gray-500">{fmt(b.end_date)}</td>
                    <td className="px-4 py-3">
                      {b.kode_voucher
                        ? <span className="font-mono text-emerald-600 text-xs font-semibold">{b.kode_voucher}</span>
                        : <span className="text-gray-300 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3 font-bold text-[#00B074]">{rp(b.total_harga)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${statusCls[b.status] || "bg-gray-100 text-gray-500"}`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {bookings.map(b => (
              <div key={b.id_bookings} className="bg-white border border-green-100 rounded-2xl p-4 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-[#1a3c2e] text-sm">{b.nama_kamar}</p>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusCls[b.status] || "bg-gray-100 text-gray-500"}`}>{b.status}</span>
                </div>
                <p className="text-xs text-gray-400">{fmt(b.start_date)} → {fmt(b.end_date)}</p>
                {b.kode_voucher && <p className="text-xs text-emerald-600 font-mono font-semibold">{b.kode_voucher}</p>}
                <p className="font-bold text-[#00B074] text-sm">{rp(b.total_harga)}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}