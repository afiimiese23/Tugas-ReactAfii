import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "../../components/Container";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import initialData from "../../data/roomListData.json";

const EMPTY = { name: "", bedType: "Double Bed", floor: "", facilities: "", rate: "", status: "ACTIVE", image: "" };

export default function Rooms() {
  const [rooms, setRooms]     = useState(initialData);
  const [tab, setTab]         = useState("All Rooms");
  const [search, setSearch]   = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEdit]   = useState(null);
  const [delItem, setDel]     = useState(null);
  const [form, setForm]       = useState(EMPTY);

  const setField = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const filtered = rooms
    .filter(r => tab === "Active Room" ? r.status === "ACTIVE" : tab === "Booked Room" ? r.status !== "ACTIVE" : true)
    .filter(r => !search || r.name?.toLowerCase().includes(search.toLowerCase()));

  function openAdd()   { setForm(EMPTY); setAddOpen(true); }
  function openEdit(r) {
    setForm({ name: r.name, bedType: r.bedType, floor: r.floor, facilities: r.facilities, rate: r.rate, status: r.status, image: r.image });
    setEdit(r);
  }

  function handleAdd(e) {
    e.preventDefault();
    setRooms(p => [...p, { ...form, id: "#RM-" + Date.now(), image: form.image || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400" }]);
    setAddOpen(false);
    setForm(EMPTY);
  }

  function handleEdit(e) {
    e.preventDefault();
    setRooms(p => p.map(r => r.id === editItem.id ? { ...r, ...form } : r));
    setEdit(null);
  }

  function handleDel() {
    setRooms(p => p.filter(r => r.id !== delItem.id));
    setDel(null);
  }

  // Field JSX inline — bukan sub-komponen agar fokus tidak hilang saat ketik
  const formFields = (
    <div className="space-y-3">
      <InputField label="Nama Kamar" value={form.name}
        onChange={e => setField("name", e.target.value)} placeholder="contoh: Deluxe A-101" />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-semibold text-[#113D32]">Tipe Kasur</label>
          <select value={form.bedType} onChange={e => setField("bedType", e.target.value)}
            className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#3AB449]">
            {["Single Bed", "Double Bed", "Queen Bed", "King Size"].map(b => <option key={b}>{b}</option>)}
          </select>
        </div>
        <InputField label="Lantai" value={form.floor}
          onChange={e => setField("floor", e.target.value)} placeholder="Floor A-1" />
      </div>
      <InputField label="Fasilitas" value={form.facilities}
        onChange={e => setField("facilities", e.target.value)} placeholder="AC, WiFi, TV..." />
      <div className="grid grid-cols-2 gap-3">
        <InputField label="Harga/malam" type="number" value={form.rate}
          onChange={e => setField("rate", e.target.value)} placeholder="999" />
        <div>
          <label className="text-sm font-semibold text-[#113D32]">Status</label>
          <select value={form.status} onChange={e => setField("status", e.target.value)}
            className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#3AB449]">
            <option>ACTIVE</option>
            <option>BOOKED</option>
          </select>
        </div>
      </div>
      <InputField label="URL Foto (opsional)" value={form.image}
        onChange={e => setField("image", e.target.value)} placeholder="https://..." />
    </div>
  );

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#113D32]">Room</h1>
          <p className="text-xs text-gray-500 mt-1">{rooms.length} kamar terdaftar</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama kamar..."
              className="pl-8 pr-4 py-2 text-xs rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#3AB449] w-48" />
          </div>
          <Button onClick={openAdd}>+ Tambah Kamar</Button>
        </div>
      </div>

      <Tabs defaultValue="All Rooms" onValueChange={setTab} className="mb-5">
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto p-0 gap-8 w-full justify-start">
          {["All Rooms", "Active Room", "Booked Room"].map(t => (
            <TabsTrigger key={t} value={t}
              className="rounded-none border-b-2 border-transparent px-0 pb-3 text-xs font-bold data-[state=active]:border-[#3AB449] data-[state=active]:text-[#113D32] data-[state=active]:bg-transparent text-gray-400 shadow-none">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Card className="p-0 overflow-hidden">
        <Table headers={["", "Kamar", "Kasur", "Lantai", "Fasilitas", "Harga", "Status", "Action"]}>
          {filtered.map(r => (
            <tr key={r.id} className="hover:bg-gray-50 transition-colors">
              <td className="p-4"></td>
              <td className="p-4">
                <Link to={`/admin/rooms/${r.id}`} className="flex items-center gap-3 group">
                  <img src={r.image} alt={r.name} className="w-16 h-11 rounded-xl object-cover border border-gray-100" />
                  <div>
                    <p className="text-[10px] text-[#3AB449] font-bold">{r.id}</p>
                    <p className="font-bold text-sm text-[#113D32] group-hover:text-[#3AB449]">{r.name}</p>
                  </div>
                </Link>
              </td>
              <td className="p-4 text-sm text-gray-500">{r.bedType}</td>
              <td className="p-4 text-sm text-gray-500">{r.floor}</td>
              <td className="p-4 text-xs text-gray-400 max-w-[140px] truncate">{r.facilities}</td>
              <td className="p-4 font-bold text-sm text-[#113D32]">${r.rate}</td>
              <td className="p-4"><Badge type={r.status === "ACTIVE" ? "success" : "danger"}>{r.status}</Badge></td>
              <td className="p-4">
                <div className="flex gap-1.5">
                  <button onClick={() => openEdit(r)} className="text-blue-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50"><FaEdit size={12} /></button>
                  <button onClick={() => setDel(r)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50"><FaTrash size={12} /></button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <p className="mt-3 text-xs text-gray-400">{filtered.length} dari {rooms.length} kamar</p>

      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Tambah Kamar">
        <form onSubmit={handleAdd} className="space-y-4">
          {formFields}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="secondary" onClick={() => setAddOpen(false)}>Batal</Button>
            <Button>Simpan</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!editItem} onClose={() => setEdit(null)} title="Edit Kamar">
        <form onSubmit={handleEdit} className="space-y-4">
          {formFields}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="secondary" onClick={() => setEdit(null)}>Batal</Button>
            <Button>Perbarui</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!delItem} onClose={() => setDel(null)} title="Hapus Kamar">
        <p className="text-sm text-gray-500 mb-4">Hapus kamar <strong className="text-[#113D32]">{delItem?.name}</strong>?</p>
        <div className="flex justify-end gap-2">
          <Button type="secondary" onClick={() => setDel(null)}>Batal</Button>
          <Button type="danger" onClick={handleDel}>Hapus</Button>
        </div>
      </Modal>
    </Container>
  );
}
