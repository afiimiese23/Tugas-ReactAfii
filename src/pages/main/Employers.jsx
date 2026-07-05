import { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaPhone } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "../../components/Container";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import initialData from "../../data/employeeData.json";

const EMPTY = { name: "", jobDesk: "", schedule: "", contact: "", status: "ACTIVE", image: "" };

export default function Employers() {
  const [employees, setEmployees] = useState(initialData);
  const [tab, setTab]             = useState("All");
  const [search, setSearch]       = useState("");
  const [addOpen, setAddOpen]     = useState(false);
  const [editItem, setEdit]       = useState(null);
  const [delItem, setDel]         = useState(null);
  const [form, setForm]           = useState(EMPTY);

  // update satu field di form tanpa re-create komponen
  const setField = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const filtered = employees
    .filter(e => tab === "Active" ? e.status === "ACTIVE" : tab === "Inactive" ? e.status !== "ACTIVE" : true)
    .filter(e => !search || e.name?.toLowerCase().includes(search.toLowerCase()));

  function openEdit(e) {
    setForm({ name: e.name, jobDesk: e.jobDesk, schedule: e.schedule, contact: e.contact, status: e.status, image: e.image });
    setEdit(e);
  }

  function handleAdd(ev) {
    ev.preventDefault();
    setEmployees(p => [...p, { ...form, id: "#EMP-" + Date.now(), image: form.image || `https://i.pravatar.cc/150?u=${Date.now()}` }]);
    setAddOpen(false);
    setForm(EMPTY);
  }

  function handleEdit(ev) {
    ev.preventDefault();
    setEmployees(p => p.map(e => e.id === editItem.id ? { ...e, ...form } : e));
    setEdit(null);
  }

  function handleDel() {
    setEmployees(p => p.filter(e => e.id !== delItem.id));
    setDel(null);
  }

  // Field JSX yang di-inline langsung — bukan sub-komponen
  const formFields = (
    <div className="space-y-3">
      <InputField label="Nama" value={form.name}
        onChange={e => setField("name", e.target.value)} placeholder="Nama lengkap" />
      <InputField label="Deskripsi Tugas" value={form.jobDesk}
        onChange={e => setField("jobDesk", e.target.value)} placeholder="Ringkasan tugas" />
      <div className="grid grid-cols-2 gap-3">
        <InputField label="Jadwal" value={form.schedule}
          onChange={e => setField("schedule", e.target.value)} placeholder="Senin - Jumat" />
        <InputField label="Kontak" value={form.contact}
          onChange={e => setField("contact", e.target.value)} placeholder="No. HP" />
      </div>
      <div>
        <label className="text-sm font-semibold text-[#113D32]">Status</label>
        <select value={form.status} onChange={e => setField("status", e.target.value)}
          className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#3AB449]">
          <option>ACTIVE</option>
          <option>INACTIVE</option>
        </select>
      </div>
      <InputField label="URL Foto (opsional)" value={form.image}
        onChange={e => setField("image", e.target.value)} placeholder="https://..." />
    </div>
  );

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#113D32]">Karyawan</h1>
          <p className="text-xs text-gray-500 mt-1">{employees.length} karyawan terdaftar</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama..."
              className="pl-8 pr-4 py-2 text-xs rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#3AB449] w-48" />
          </div>
          <Button onClick={() => { setForm(EMPTY); setAddOpen(true); }}>+ Tambah</Button>
        </div>
      </div>

      <Tabs defaultValue="All" onValueChange={setTab} className="mb-5">
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto p-0 gap-8 w-full justify-start">
          {["All", "Active", "Inactive"].map(t => (
            <TabsTrigger key={t} value={t}
              className="rounded-none border-b-2 border-transparent px-0 pb-3 text-xs font-bold data-[state=active]:border-[#3AB449] data-[state=active]:text-[#113D32] data-[state=active]:bg-transparent text-gray-400 shadow-none">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Card className="p-0 overflow-hidden">
        <Table headers={["", "Karyawan", "Tugas", "Jadwal", "Kontak", "Status", "Action"]}>
          {filtered.map(e => (
            <tr key={e.id} className="hover:bg-gray-50 transition-colors">
              <td className="p-4"></td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img src={e.image} alt={e.name} className="w-10 h-10 rounded-xl object-cover border border-gray-100" />
                  <div>
                    <p className="font-bold text-sm text-[#113D32]">{e.name}</p>
                    <p className="text-[10px] text-[#3AB449] font-bold">{e.id}</p>
                  </div>
                </div>
              </td>
              <td className="p-4 text-xs text-gray-400 max-w-[180px]">{e.jobDesk}</td>
              <td className="p-4 text-sm text-gray-600 font-medium">{e.schedule}</td>
              <td className="p-4">
                <div className="flex items-center gap-1.5 text-sm text-[#113D32] font-medium">
                  <FaPhone className="text-gray-400 text-[10px]" />{e.contact}
                </div>
              </td>
              <td className="p-4"><Badge type={e.status === "ACTIVE" ? "success" : "danger"}>{e.status}</Badge></td>
              <td className="p-4">
                <div className="flex gap-1.5">
                  <button onClick={() => openEdit(e)} className="text-blue-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50"><FaEdit size={12} /></button>
                  <button onClick={() => setDel(e)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50"><FaTrash size={12} /></button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <p className="mt-3 text-xs text-gray-400">{filtered.length} dari {employees.length} karyawan</p>

      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Tambah Karyawan">
        <form onSubmit={handleAdd} className="space-y-4">
          {formFields}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="secondary" onClick={() => setAddOpen(false)}>Batal</Button>
            <Button>Simpan</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!editItem} onClose={() => setEdit(null)} title="Edit Karyawan">
        <form onSubmit={handleEdit} className="space-y-4">
          {formFields}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="secondary" onClick={() => setEdit(null)}>Batal</Button>
            <Button>Perbarui</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!delItem} onClose={() => setDel(null)} title="Hapus Karyawan">
        <p className="text-sm text-gray-500 mb-4">Hapus <strong className="text-[#113D32]">{delItem?.name}</strong>?</p>
        <div className="flex justify-end gap-2">
          <Button type="secondary" onClick={() => setDel(null)}>Batal</Button>
          <Button type="danger" onClick={handleDel}>Hapus</Button>
        </div>
      </Modal>
    </Container>
  );
}
