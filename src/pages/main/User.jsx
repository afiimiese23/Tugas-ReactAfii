import { useEffect, useState } from "react";
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

export default function User() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]         = useState("All User");
  const [search, setSearch]   = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [delTarget, setDel]   = useState(null);
  const [form, setForm]       = useState({ username: "", email: "", password: "", role: "user" });

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("user").select("*").order("id_user");
    setUsers(data || []);
    setLoading(false);
  }

  async function handleAdd(e) {
    e.preventDefault();
    const { error } = await supabase.from("user").insert([form]);
    if (error) return alert(error.message);
    setAddOpen(false); setForm({ username: "", email: "", password: "", role: "user" }); load();
  }

  async function handleDelete() {
    await supabase.from("user").delete().eq("id_user", delTarget.id_user);
    setDel(null); load();
  }

  const filtered = users
    .filter(u => tab === "Admin" ? u.role === "admin" : tab === "User" ? u.role === "user" : true)
    .filter(u => !search || u.username?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#113D32]">User</h1>
          <p className="text-xs text-gray-500 mt-1">{users.length} user terdaftar</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari username atau email..."
              className="pl-8 pr-4 py-2 text-xs rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#3AB449] w-52" />
          </div>
          <Button onClick={() => setAddOpen(true)}>+ New User</Button>
        </div>
      </div>

      <Tabs defaultValue="All User" onValueChange={setTab} className="mb-5">
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto p-0 gap-8 w-full justify-start">
          {["All User", "Admin", "User"].map(t => (
            <TabsTrigger key={t} value={t} className="rounded-none border-b-2 border-transparent px-0 pb-3 text-xs font-bold data-[state=active]:border-[#3AB449] data-[state=active]:text-[#113D32] data-[state=active]:bg-transparent text-gray-400 shadow-none">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Card className="p-0 overflow-hidden">
        {loading ? <p className="text-center py-16 text-gray-400 text-sm">Memuat...</p> : (
          <Table headers={["", "Username", "Email", "Password", "Role", "Status", "Action"]}>
            {filtered.map(u => (
              <tr key={u.id_user} className="hover:bg-gray-50 transition-colors">
                <td className="p-4"><input type="checkbox" className="accent-[#3AB449]" /></td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={u.username} />
                    <div>
                      <p className="font-bold text-sm text-[#113D32]">{u.username}</p>
                      <p className="text-[10px] text-[#3AB449] font-bold">ID: {u.id_user}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-500">{u.email}</td>
                <td className="p-4 text-sm font-mono text-gray-500">{u.password}</td>
                <td className="p-4"><Badge type={u.role === "admin" ? "success" : "warning"}>{u.role}</Badge></td>
                <td className="p-4"><Badge type="success">Active</Badge></td>
                <td className="p-4">
                  <button onClick={() => setDel(u)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50">
                    <FaTrash size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </Card>

      <p className="mt-3 text-xs text-gray-400">{filtered.length} dari {users.length} user</p>

      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Tambah User Baru">
        <form onSubmit={handleAdd} className="space-y-4">
          <InputField label="Username" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} placeholder="username" />
          <InputField label="Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@domain.com" />
          <InputField label="Password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="password" />
          <div>
            <label className="text-sm font-semibold text-[#113D32]">Role</label>
            <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
              className="mt-1 w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#3AB449]">
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="secondary" onClick={() => setAddOpen(false)}>Batal</Button>
            <Button>Simpan</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!delTarget} onClose={() => setDel(null)} title="Hapus User">
        <p className="text-sm text-gray-500 mb-4">Hapus user <strong className="text-[#113D32]">{delTarget?.username}</strong>?</p>
        <div className="flex justify-end gap-2">
          <Button type="secondary" onClick={() => setDel(null)}>Batal</Button>
          <Button type="danger" onClick={handleDelete}>Hapus</Button>
        </div>
      </Modal>
    </Container>
  );
}