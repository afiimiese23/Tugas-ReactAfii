import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaEnvelope, FaChevronLeft, FaCalendarAlt, FaUser, FaInfoCircle, FaTag, FaHistory } from "react-icons/fa";
import Container from "../../components/Container";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Alert from "../../components/Alert";

import { supabase } from "../../lib/supabase";

// Helpers 
function fmtDate(str) {
  if (!str) return "—";
  return new Date(str).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

function fmtRp(n) {
  return "Rp " + Number(n).toLocaleString("id-ID");
}

function StatusPill({ status }) {
  const map = {
    Pending:    "bg-amber-100 text-amber-700",
    Confirmed:  "bg-green-100 text-green-700",
    "Check-in": "bg-blue-100 text-blue-700",
    "Check-out":"bg-gray-100 text-gray-600",
    Cancelled:  "bg-red-100 text-red-600",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${map[status] ?? map.Pending}`}>
      {status}
    </span>
  );
}

function getTier(n) {
  if (n >= 30) return { label: "Diamond", color: "text-cyan-600 bg-cyan-50 border-cyan-200" };
  if (n >= 15) return { label: "Gold",    color: "text-yellow-600 bg-yellow-50 border-yellow-200" };
  if (n >= 5)  return { label: "Silver",  color: "text-gray-500 bg-gray-50 border-gray-200" };
  return               { label: "Bronze", color: "text-orange-600 bg-orange-50 border-orange-200" };
}

// Main
export default function GuestDetail() {
  const { id } = useParams();
  const [guest, setGuest]       = useState(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => { fetchGuest(); }, [id]);

  async function fetchGuest() {
    setLoading(true);
    const { data, error } = await supabase
      .from("user")
      .select(`
        id_user, username, email, voucher,
        bookings ( id_bookings, nama_kamar, start_date, end_date, kode_voucher, catatan, total_harga, status, created_at)`)
      .eq("id_user", Number(id))
      .eq("role", "user")
      .maybeSingle();

    if (error) console.error("fetchGuest:", error);
    if (!data) { setNotFound(true); setLoading(false); return; }
    setGuest(data);
    setLoading(false);
  }

  // Loading
  if (loading) {
    return (
      <Container className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-[#6E6E6E]">
          <div className="w-8 h-8 border-2 border-[#3AB449] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Memuat data guest...</p>
        </div>
      </Container>
    );
  }

  // Not Found
  if (notFound || !guest) {
    return (
      <Container className="flex flex-col items-center justify-center gap-6">
        <Alert type="error" message={`Member dengan ID ${id} tidak ditemukan.`} />
        <Link to="/admin/guests"><Button>Kembali ke Guest List</Button></Link>
      </Container>
    );
  }

  // Statistik 
  const bookings   = guest.bookings || [];
  const active     = bookings.filter(b => b.status !== "Cancelled");
  const totalMalam = active.reduce((s, b) =>
    s + Math.max(0, Math.floor((new Date(b.end_date) - new Date(b.start_date)) / 86400000)), 0);
  const totalSpend = active.reduce((s, b) => s + Number(b.total_harga || 0), 0);
  const tier       = getTier(totalMalam);
  const sorted     = [...bookings].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <Container className="py-8">
      {/* BREADCRUMB */}
      <div className="mb-8 flex items-center justify-between px-2 flex-wrap gap-3">
        <div>
          <Link to="/admin/guests" className="flex items-center gap-1.5 text-[#3AB449] font-bold text-xs mb-2 hover:underline">
            <FaChevronLeft size={9} /> Kembali ke Guest List
          </Link>
          <h1 className="text-2xl font-black text-[#113D32]">Guest Detail</h1>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${tier.color}`}>
          {tier.label} Member
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Profile */}
        <div className="lg:col-span-1 space-y-4">

          {/* Profile Card */}
          <Card className="p-8 flex flex-col items-center border-none shadow-sm">
            <div className="relative">
              <div className="w-28 h-28 rounded-[24px] bg-gradient-to-br from-[#3AB449] to-[#113D32] flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-4xl">
                  {guest.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#3AB449] text-white p-2 rounded-xl shadow-lg">
                <FaUser size={12} />
              </div>
            </div>

            <h2 className="text-lg font-bold mt-6 text-center text-[#113D32]">{guest.username}</h2>
            <p className="text-[10px] text-[#3AB449] font-black tracking-widest uppercase mt-1">
              ID: {guest.id_user}
            </p>
            <div className={`mt-3 px-4 py-1.5 rounded-full text-xs font-bold border ${tier.color}`}>
              {tier.label} · {totalMalam} malam
            </div>

            {/* Kontak */}
            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center gap-3 bg-[#F9F9F9] p-3.5 rounded-2xl border border-gray-50">
                <div className="bg-white p-2 rounded-lg text-[#3AB449] shadow-sm">
                  <FaEnvelope size={12} />
                </div>
                <span className="text-xs font-bold text-[#113D32] truncate">{guest.email}</span>
              </div>

              {guest.voucher && (
                <div className="flex items-center gap-3 bg-[#F9F9F9] p-3.5 rounded-2xl border border-gray-50">
                  <div className="bg-white p-2 rounded-lg text-[#3AB449] shadow-sm">
                    <FaTag size={12} />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 uppercase tracking-wider font-bold">Voucher Aktif</p>
                    <p className="text-xs font-black text-[#3AB449] font-mono">{guest.voucher}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Stats Card */}
          <Card className="p-6 border-none shadow-sm">
            <h4 className="text-xs font-bold text-[#113D32] uppercase tracking-wider mb-4">Statistik Member</h4>
            <div className="space-y-3">
              {[
                { label: "Total Booking", value: bookings.length, unit: "reservasi" },
                { label: "Total Malam",   value: totalMalam,      unit: "malam" },
                { label: "Total Spend",   value: fmtRp(totalSpend), unit: "" },
              ].map((s) => (
                <div key={s.label} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-[#6E6E6E] font-medium">{s.label}</span>
                  <span className="text-sm font-black text-[#113D32]">
                    {s.value} <span className="text-[10px] font-normal text-[#6E6E6E]">{s.unit}</span>
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT: Info + Booking History */}
        <div className="lg:col-span-2 space-y-4">

          {/* Info Card */}
          <Card className="p-6 border-none shadow-sm">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-[#113D32]">
              <FaInfoCircle size={14} className="text-[#3AB449]" /> Informasi Member
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Username</p>
                <p className="text-sm font-bold text-[#113D32]">{guest.username}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</p>
                <p className="text-sm font-semibold text-[#113D32]">{guest.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Member ID</p>
                <p className="text-sm font-bold text-[#113D32]">#{guest.id_user}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tier</p>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border inline-block ${tier.color}`}>
                  {tier.label}
                </span>
              </div>
            </div>
          </Card>

          {/* Booking History */}
          <Card className="p-6 border-none shadow-sm">
            <h3 className="text-sm font-bold mb-5 flex items-center gap-2 text-[#113D32]">
              <FaHistory size={14} className="text-[#3AB449]" />
              Riwayat Booking
              <span className="ml-auto text-[10px] font-normal text-[#6E6E6E] bg-gray-100 px-2 py-0.5 rounded-full">
                {bookings.length} total
              </span>
            </h3>

            {sorted.length === 0 ? (
              <div className="py-12 text-center">
                <FaCalendarAlt size={28} className="mx-auto text-gray-200 mb-3" />
                <p className="text-xs text-gray-400 italic">Belum ada riwayat booking.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sorted.map((bk) => {
                  const nights = Math.max(0, Math.floor(
                    (new Date(bk.end_date) - new Date(bk.start_date)) / 86400000
                  ));
                  return (
                    <div key={bk.id_bookings}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-[#F9F9F9] rounded-2xl border border-gray-100">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-[#113D32] text-sm">{bk.nama_kamar}</p>
                          <StatusPill status={bk.status} />
                          {bk.kode_voucher && (
                            <span className="text-[10px] font-bold text-[#3AB449] bg-[#3AB449]/10 px-2 py-0.5 rounded-full font-mono">
                              {bk.kode_voucher}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#6E6E6E] mt-1 flex items-center gap-1">
                          <FaCalendarAlt size={9} />
                          {fmtDate(bk.start_date)} → {fmtDate(bk.end_date)}
                          <span className="text-gray-400 ml-1">({nights} malam)</span>
                        </p>
                        {bk.catatan && (
                          <p className="text-[10px] text-gray-400 italic mt-1 truncate">"{bk.catatan}"</p>
                        )}
                        <p className="text-[10px] text-gray-300 font-mono mt-0.5 truncate">{bk.id_bookings}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-black text-[#3AB449] text-sm">{fmtRp(bk.total_harga)}</p>
                        <p className="text-[10px] text-gray-400">{fmtDate(bk.created_at)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      </div>
    </Container>
  );
}