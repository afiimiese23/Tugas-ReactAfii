import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getSession } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Loader2, Tag, RefreshCw, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmtDate(str) {
  if (!str) return "—";
  return new Date(str).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtRp(n) {
  return "Rp " + Number(n).toLocaleString("id-ID");
}

function StatusBadge({ status }) {
  const map = {
    Pending:    "bg-amber-100 text-amber-700 border-amber-200",
    Confirmed:  "bg-green-100 text-green-700 border-green-200",
    "Check-in": "bg-blue-100 text-blue-700 border-blue-200",
    "Check-out":"bg-gray-100 text-gray-600 border-gray-200",
    Cancelled:  "bg-red-100 text-red-600 border-red-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${map[status] ?? map.Pending}`}>
      {status}
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MemberBookingHistory() {
  const session = getSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  async function fetchBookings() {
    setLoading(true);
    setError(null);

    // user_id di tabel bookings bertipe integer (id_user dari tabel user)
    const { data, error: err } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", session?.id)
      .order("created_at", { ascending: false });

    if (err) { setError(err.message); }
    else      { setBookings(data || []); }
    setLoading(false);
  }

  useEffect(() => { fetchBookings(); }, []);

  // ── Hitung statistik ringkas ───────────────────────────────────────────────
  const totalMalam = bookings
    .filter(b => b.status !== "Cancelled")
    .reduce((s, b) => {
      const n = Math.max(0, Math.floor((new Date(b.end_date) - new Date(b.start_date)) / 86400000));
      return s + n;
    }, 0);

  const totalSpend = bookings
    .filter(b => b.status !== "Cancelled")
    .reduce((s, b) => s + Number(b.total_harga || 0), 0);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00B074] mb-1">Riwayat Pemesanan</p>
          <h1 className="text-2xl font-bold text-[#1a3c2e]">Booking Saya</h1>
          <p className="text-sm text-gray-400 mt-0.5">Seluruh riwayat reservasi kamar Anda.</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchBookings}
          className="border-green-200 text-[#00B074] hover:bg-green-50 gap-1.5">
          <RefreshCw size={13} /> Refresh
        </Button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Booking", value: bookings.length, sub: "reservasi" },
          { label: "Total Malam",   value: totalMalam,      sub: "malam menginap" },
          { label: "Total Spend",   value: fmtRp(totalSpend), sub: "belum pajak" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl bg-white border border-green-100 px-4 py-3 shadow-sm">
            <p className="text-xs text-gray-400">{s.label}</p>
            <p className="text-xl font-bold text-[#1a3c2e]">{s.value}</p>
            <p className="text-[10px] text-gray-300">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-sm">Memuat riwayat booking...</span>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          Gagal memuat data: {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && bookings.length === 0 && (
        <div className="rounded-2xl border border-dashed border-green-200 bg-white py-20 text-center space-y-3">
          <Inbox size={40} className="mx-auto text-gray-300" />
          <p className="font-medium text-gray-400">Belum ada booking.</p>
          <p className="text-xs text-gray-300">Kunjungi Katalog Kamar untuk membuat reservasi pertama Anda.</p>
        </div>
      )}

      {/* Table */}
      {!loading && !error && bookings.length > 0 && (
        <div className="rounded-2xl border border-green-100 bg-white shadow-sm overflow-hidden">

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-50 border-b border-green-100">
                <tr>
                  {["Nama Kamar", "Check-in", "Check-out", "Voucher", "Total Harga", "Status"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-green-50">
                {bookings.map(b => (
                  <tr key={b.id} className="hover:bg-green-50/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#1a3c2e]">{b.nama_kamar}</td>
                    <td className="px-4 py-3 text-gray-500">
                      <span className="flex items-center gap-1"><CalendarDays size={12} />{fmtDate(b.start_date)}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      <span className="flex items-center gap-1"><CalendarDays size={12} />{fmtDate(b.end_date)}</span>
                    </td>
                    <td className="px-4 py-3">
                      {b.kode_voucher
                        ? <span className="flex items-center gap-1 text-emerald-600 font-mono text-xs font-semibold">
                            <Tag size={11} />{b.kode_voucher}
                          </span>
                        : <span className="text-gray-300 text-xs">—</span>
                      }
                    </td>
                    <td className="px-4 py-3 font-bold text-[#00B074]">{fmtRp(b.total_harga)}</td>
                    <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-green-50">
            {bookings.map(b => (
              <div key={b.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[#1a3c2e] text-sm">{b.nama_kamar}</p>
                  <StatusBadge status={b.status} />
                </div>
                <p className="text-xs text-gray-400">
                  <CalendarDays size={11} className="inline mr-1" />
                  {fmtDate(b.start_date)} → {fmtDate(b.end_date)}
                </p>
                {b.kode_voucher && (
                  <p className="text-xs text-emerald-600 font-mono font-semibold flex items-center gap-1">
                    <Tag size={10} />{b.kode_voucher}
                  </p>
                )}
                <p className="font-bold text-[#00B074] text-sm">{fmtRp(b.total_harga)}</p>
                {b.catatan && <p className="text-xs text-gray-400 italic">"{b.catatan}"</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
