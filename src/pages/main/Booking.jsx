import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "../../components/Container";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { supabase } from "../../lib/supabase";

const STATUSES = ["Pending", "Confirmed", "Check-in", "Check-out", "Cancelled"];
const fmt = (s) => s ? new Date(s).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "—";
const rp  = (n) => "Rp " + Number(n).toLocaleString("id-ID");

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [tab, setTab]           = useState("All");
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState(null); // for modal
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("bookings")
      .select("id_bookings, nama_kamar, start_date, end_date, kode_voucher, total_harga, status, created_at, id_user, user:id_user(username, email)")
      .order("created_at", { ascending: false });
    setBookings(data || []);
    setLoading(false);
  }

  async function updateStatus() {
    if (!newStatus || newStatus === selected.status) return;
    await supabase.from("bookings").update({ status: newStatus }).eq("id_bookings", selected.id_bookings);
    setBookings(prev => prev.map(b => b.id_bookings === selected.id_bookings ? { ...b, status: newStatus } : b));
    setSelected(null);
  }

  const statusColor = {
    Pending: "warning", Confirmed: "success",
    "Check-in": "primary", "Check-out": "secondary", Cancelled: "danger"
  };

  const filtered = bookings
    .filter(b => tab === "All" || b.status === tab)
    .filter(b => !search || [b.nama_kamar, b.user?.username].some(v => v?.toLowerCase().includes(search.toLowerCase())));

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#113D32]">Booking</h1>
          <p className="text-xs text-gray-500 mt-1">{bookings.length} total · {bookings.filter(b => b.status === "Pending").length} pending</p>
        </div>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Cari guest atau kamar..."
            className="pl-8 pr-4 py-2 text-xs rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#3AB449] w-52" />
        </div>
      </div>

      <Tabs defaultValue="All" onValueChange={setTab} className="mb-5">
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto p-0 gap-8 w-full justify-start">
          {["All", ...STATUSES].map(t => (
            <TabsTrigger key={t} value={t} className="rounded-none border-b-2 border-transparent px-0 pb-3 text-xs font-bold data-[state=active]:border-[#3AB449] data-[state=active]:text-[#113D32] data-[state=active]:bg-transparent text-gray-400 shadow-none">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Card className="p-0 overflow-hidden">
        {loading ? (
          <p className="text-center py-16 text-gray-400 text-sm">Memuat...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center py-16 text-gray-400 text-sm italic">Tidak ada booking.</p>
        ) : (
          <Table headers={["", "Guest", "Kamar", "Check-in", "Check-out", "Total", "Status", "Action"]}>
            {filtered.map(b => (
              <tr key={b.id_bookings} className="hover:bg-gray-50 transition-colors">
                <td className="p-4"></td>
                <td className="p-4">
                  <Link to={`/admin/guests/${b.id_user}`} className="flex items-center gap-2 group">
                    <Avatar name={b.user?.username || "?"} />
                    <div>
                      <p className="font-bold text-[#113D32] text-sm group-hover:text-[#3AB449]">{b.user?.username}</p>
                      <p className="text-[10px] text-gray-400">{b.user?.email}</p>
                    </div>
                  </Link>
                </td>
                <td className="p-4 font-semibold text-sm text-[#113D32]">{b.nama_kamar}</td>
                <td className="p-4 text-xs text-gray-600">{fmt(b.start_date)}</td>
                <td className="p-4 text-xs text-gray-600">{fmt(b.end_date)}</td>
                <td className="p-4 font-bold text-sm text-[#3AB449]">{rp(b.total_harga)}</td>
                <td className="p-4"><Badge type={statusColor[b.status] || "secondary"}>{b.status}</Badge></td>
                <td className="p-4">
                  <button onClick={() => { setSelected(b); setNewStatus(b.status); }}
                    className="text-xs text-[#3AB449] border border-[#3AB449]/30 px-3 py-1 rounded-lg hover:bg-[#3AB449]/10">
                    Ubah Status
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </Card>

      <p className="mt-3 text-xs text-gray-400">{filtered.length} dari {bookings.length} booking</p>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Ubah Status Booking">
        {selected && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600"><strong className="text-[#113D32]">{selected.nama_kamar}</strong> · {selected.user?.username}</p>
            <p className="text-xs text-gray-400">{fmt(selected.start_date)} → {fmt(selected.end_date)}</p>
            <select value={newStatus} onChange={e => setNewStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#3AB449]">
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="secondary" onClick={() => setSelected(null)}>Batal</Button>
              <Button onClick={updateStatus}>Simpan</Button>
            </div>
          </div>
        )}
      </Modal>
    </Container>
  );
}