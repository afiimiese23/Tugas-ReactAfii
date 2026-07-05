import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBed, FaUsers, FaCalendarCheck, FaClock } from "react-icons/fa";
import Container from "../../components/Container";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import { supabase } from "../../lib/supabase";

const statusColor = { Pending: "warning", Confirmed: "success", "Check-in": "primary", Cancelled: "danger" };

export default function Dashboard() {
  const [stats, setStats]   = useState({ total: 0, pending: 0, checkin: 0, members: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  async function load() {
    const [bk, usr] = await Promise.all([
      supabase.from("bookings").select("id_bookings, nama_kamar, status, created_at, id_user, user:id_user(username)"),
      supabase.from("user").select("id_user", { count: "exact", head: true }).eq("role", "user"),
    ]);
    if (bk.data) {
      setStats({ total: bk.data.length, pending: bk.data.filter(b => b.status === "Pending").length, checkin: bk.data.filter(b => b.status === "Check-in").length, members: usr.count || 0 });
      setRecent([...bk.data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 6));
    }
    setLoading(false);
  }

  const ago = (s) => { const m = Math.floor((Date.now() - new Date(s)) / 60000); return m < 60 ? `${m}m lalu` : `${Math.floor(m/60)}j lalu`; };

  const cards = [
    { label: "Total Booking", val: stats.total,   icon: <FaBed />,          color: "#3AB449" },
    { label: "Pending",       val: stats.pending,  icon: <FaClock />,        color: "#F59E0B" },
    { label: "Check-in",      val: stats.checkin,  icon: <FaCalendarCheck />,color: "#3B82F6" },
    { label: "Total Member",  val: stats.members,  icon: <FaUsers />,        color: "#8B5CF6" },
  ];

  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#113D32]">Selamat datang, StayZone! 👋</h1>
        <p className="text-sm text-gray-400 mt-1">Ringkasan aktivitas hotel hari ini.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c, i) => (
          <Card key={i} className="flex items-center gap-4">
            <div className="p-3 rounded-2xl" style={{ background: c.color + "18" }}>
              <span style={{ color: c.color }} className="text-xl">{c.icon}</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#113D32]">{loading ? "..." : c.val}</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{c.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-[#113D32]">Booking Terbaru</h3>
            <Link to="/admin/booking" className="text-xs text-[#3AB449] font-bold hover:underline">Lihat semua</Link>
          </div>
          {loading ? <p className="text-center py-8 text-gray-400 text-sm">Memuat...</p> : (
            <div className="space-y-3">
              {recent.map(b => (
                <div key={b.id_bookings} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar name={b.user?.username || "?"} />
                    <div>
                      <p className="font-bold text-sm text-[#113D32]">{b.nama_kamar}</p>
                      <p className="text-[10px] text-gray-400">{b.user?.username} · {ago(b.created_at)}</p>
                    </div>
                  </div>
                  <Badge type={statusColor[b.status] || "secondary"}>{b.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h3 className="font-bold text-[#113D32] mb-5">Statistik</h3>
          <div className="h-36 flex items-end gap-1.5 mb-4">
            {[60,85,55,95,65,75,40].map((h, i) => (
              <div key={i} className="flex-1 bg-[#3AB449]/20 hover:bg-[#3AB449]/40 rounded-t-md transition-all" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="space-y-3 mt-4">
            <div className="bg-[#113D32] p-4 rounded-2xl text-white">
              <p className="text-[10px] opacity-60 uppercase font-bold">Kamar Tersedia</p>
              <p className="text-3xl font-bold mt-1">{loading ? "..." : Math.max(0, 20 - stats.checkin)}</p>
            </div>
            <div className="border border-gray-100 p-4 rounded-2xl">
              <p className="text-[10px] text-gray-400 uppercase font-bold">Pending</p>
              <p className="text-3xl font-bold text-[#113D32] mt-1">{loading ? "..." : stats.pending}</p>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}