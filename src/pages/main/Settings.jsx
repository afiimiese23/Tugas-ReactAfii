import React, { useState } from "react";
import { FaUser, FaLock, FaBell, FaCreditCard, FaFileContract } from "react-icons/fa";
import { getSession, setSession } from "../../lib/auth";
import { supabase } from "../../lib/supabase";
import Container from "../../components/Container";
import Card from "../../components/Card";
import Button from "../../components/Button";

const MENUS = [
  { key: "personal",  label: "Personal Settings",      icon: <FaUser /> },
  { key: "password",  label: "Ganti Password",          icon: <FaLock /> },
  { key: "notif",     label: "Notifikasi",              icon: <FaBell /> },
  { key: "payment",   label: "Metode Pembayaran",       icon: <FaCreditCard /> },
  { key: "terms",     label: "Syarat & Ketentuan",      icon: <FaFileContract /> },
];

export default function SettingsPage() {
  const session                   = getSession();
  const [activeMenu, setActiveMenu] = useState("personal");
  const [form, setForm]           = useState({ username: session?.nama || "", email: session?.email || "" });
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!session?.id) return;
    setSaving(true);
    const { error } = await supabase
      .from("user")
      .update({ username: form.username })
      .eq("id_user", Number(session.id));

    if (!error) {
      setSession({ ...session, nama: form.username });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  }

  return (
    <Container>

      {/* HEADER */}
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold text-[#113D32]">Pengaturan</h1>
        <p className="text-xs text-[#6E6E6E] mt-1 font-medium">Kelola informasi akun dan preferensi Anda.</p>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">

        {/* SIDEBAR */}
        <div className="w-full lg:w-64 shrink-0">
          <Card className="p-6 border-none shadow-sm">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-[20px] bg-gradient-to-br from-[#3AB449] to-[#113D32] flex items-center justify-center shadow-lg mb-3">
                <span className="text-white font-black text-3xl">
                  {(session?.nama || "A").charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="font-bold text-[#113D32] text-sm">{session?.nama || "Admin"}</h2>
              <p className="text-[10px] text-gray-400 font-medium">{session?.email || ""}</p>
              <span className="mt-2 text-[10px] bg-[#3AB449]/10 text-[#3AB449] font-bold px-3 py-1 rounded-full">
                {session?.role || "admin"}
              </span>
            </div>

            <nav className="space-y-1">
              {MENUS.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setActiveMenu(m.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                    activeMenu === m.key
                      ? "bg-[#113D32] text-white shadow-md shadow-green-900/20"
                      : "text-[#113D32] hover:bg-gray-50"
                  }`}
                >
                  <span className={activeMenu === m.key ? "text-[#3AB449]" : "text-gray-400"}>{m.icon}</span>
                  {m.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1">
          {activeMenu === "personal" && (
            <Card className="p-8 border-none shadow-sm">
              <h2 className="text-lg font-bold text-[#113D32] mb-6">Personal Settings</h2>

              {saved && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-4 py-3 rounded-xl">
                  ✓ Perubahan berhasil disimpan.
                </div>
              )}

              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#113D32]">Username</label>
                  <input name="username" value={form.username} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#3AB449] outline-none text-sm"/>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#113D32]">Email</label>
                  <input name="email" value={form.email} disabled
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none text-sm bg-gray-50 text-gray-400 cursor-not-allowed"/>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#113D32]">Role</label>
                  <input value={session?.role || "admin"} disabled
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none text-sm bg-gray-50 text-gray-400 cursor-not-allowed capitalize"/>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#113D32]">Member ID</label>
                  <input value={session?.id || "—"} disabled
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none text-sm bg-gray-50 text-gray-400 cursor-not-allowed"/>
                </div>

                <div className="md:col-span-2 flex justify-end mt-2">
                  <Button type="primary" className="px-10 py-3 shadow-lg shadow-green-900/20" disabled={saving}>
                    {saving ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {activeMenu !== "personal" && (
            <Card className="p-8 border-none shadow-sm flex flex-col items-center justify-center py-24">
              <div className="text-5xl mb-4 text-gray-200">
                {MENUS.find((m) => m.key === activeMenu)?.icon}
              </div>
              <p className="text-sm font-bold text-[#113D32]">
                {MENUS.find((m) => m.key === activeMenu)?.label}
              </p>
              <p className="text-xs text-gray-400 mt-1">Fitur ini akan segera hadir.</p>
            </Card>
          )}
        </div>
      </div>
    </Container>
  );
}