import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaTrash } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "../../components/Container";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import { supabase } from "../../lib/supabase";

const fmt = (s) => s ? new Date(s).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "—";

export default function Guests() {
  const [guests, setGuests]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [tab, setTab]           = useState("All");
  const [search, setSearch]     = useState("");
  const [addOpen, setAddOpen]   = useState(false);
  const [delTarget, setDel]     = useState(null);
  const [form, setForm]         = useState({ username: "", email: "", password: "" });

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("user")
      .select("id_user, username, email, voucher, bookings(id_bookings, nama_kamar, start_date, end_date, status, total_harga, created_at)")
      .eq("role", "user").order("id_user");
    setGuests(data || []);
    setLoading(false);
  }

  async function handleAdd(e) {
    e.preventDefault();
    const voucher = "SZ-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const { error } = await supabase.from("user").insert([{ ...form, role: "user", voucher }]);
    if (error) return alert(error.message);
    setAddOpen(false); setForm({ username: "", email: "", password: "" }); load();
  }

  async function handleDelete() {
    await supabase.from("user").delete().eq("id_user", delTarget.id_user);
    setDel(null); load();
  }

  const latest = (bks) => bks?.length ? [...bks].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0] : null;

  const filtered = guests
    .filter(g => tab === "Active" ? g.bookings?.length > 0 : tab === "No Booking" ? !g.bookings?.length : true)
    .filter(g => !search || g.username.toLowerCase().includes(search.toLowerCase()) || g.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#113D32]">Member</h1>
          <p className="text-xs text-gray-500 mt-1">{guests.length} member terdaftar</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama atau email..."
              className="pl-8 pr-4 py-2 text-xs rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#3AB449] w-48" />
          </div>
          <Button onClick={() => setAddOpen(true)}>+ Tambah</Button>
        </div>
      </div>

      <Tabs defaultValue="All" onValueChange={setTab} className="mb-5">
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto p-0 gap-8 w-full justify-start">
          {["All", "Active", "No Booking"].map(t => (
            <TabsTrigger key={t} value={t} className="rounded-none border-b-2 border-transparent px-0 pb-3 text-xs font-bold data-[state=active]:border-[#3AB449] data-[state=active]:text-[#113D32] data-[state=active]:bg-transparent text-gray-400 shadow-none">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Card className="p-0 overflow-hidden">
        {loading ? <p className="text-center py-16 text-gray-400 text-sm">Memuat...</p> : (
          <Table headers={["", "Member", "Booking", "Kamar Terakhir", "Check-in", "Check-out", "Status", "Action"]}>
            {filtered.map(g => {
              const lb = latest(g.bookings);
              return (
                <tr key={g.id_user} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4"></td>
                  <td className="p-4">
                    <Link to={`/admin/guests/${g.id_user}`} className="flex items-center gap-2 group">
                      <Avatar name={g.username} />
                      <div>
                        <p className="font-bold text-sm text-[#113D32] group-hover:text-[#3AB449]">{g.username}</p>
                        <p className="text-[10px] text-gray-400">{g.email}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="p-4 text-center">
                    <span className="font-bold text-[#113D32]">{g.bookings?.length || 0}</span>
                  </td>
                  <td className="p-4 text-xs text-gray-500">{lb ? lb.nama_kamar : "—"}</td>
                  <td className="p-4 text-xs text-gray-600">{lb ? fmt(lb.start_date) : "—"}</td>
                  <td className="p-4 text-xs text-gray-600">{lb ? fmt(lb.end_date) : "—"}</td>
                  <td className="p-4">
                    <Badge type={g.bookings?.length > 0 ? "success" : "warning"}>
                      {g.bookings?.length > 0 ? "Active" : "No Booking"}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <button onClick={() => setDel(g)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50">
                      <FaTrash size={12} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </Table>
        )}
      </Card>

      <p className="mt-3 text-xs text-gray-400">{filtered.length} dari {guests.length} member</p>

      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Tambah Member">
        <form onSubmit={handleAdd} className="space-y-4">
          <InputField label="Username" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} placeholder="username" />
          <InputField label="Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@domain.com" />
          <InputField label="Password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="password" />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="secondary" onClick={() => setAddOpen(false)}>Batal</Button>
            <Button>Simpan</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!delTarget} onClose={() => setDel(null)} title="Hapus Member">
        <p className="text-sm text-gray-500 mb-4">Hapus <strong className="text-[#113D32]">{delTarget?.username}</strong>? Semua booking juga terhapus.</p>
        <div className="flex justify-end gap-2">
          <Button type="secondary" onClick={() => setDel(null)}>Batal</Button>
          <Button type="danger" onClick={handleDelete}>Hapus</Button>
        </div>
      </Modal>
    </Container>
  );
}