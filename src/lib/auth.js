import { supabase } from "./supabase";

const SESSION_KEY = "stayzone_session";

export function setSession(user) {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(user)); } catch { /**/ }
}

export function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn() { return getSession() !== null; }

// Login — query tabel user di Supabase
export async function signIn(email, password) {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("email", email.trim().toLowerCase())
    .eq("password", password)
    .maybeSingle();

  if (error) return { success: false, error: "Terjadi kesalahan server." };
  if (!data)  return { success: false, error: "Email atau password salah." };

  const session = {
    id:      data.id_user,
    nama:    data.username,
    email:   data.email,
    role:    data.role,
    voucher: data.voucher ?? "",
  };
  setSession(session);
  return { success: true, role: data.role, user: session };
}

export function signOut() {
  clearSession();
}

// Validasi voucher milik user yang login
export async function validateVoucher(code) {
  const session = getSession();
  if (!session) return { valid: false, error: "Belum login." };

  const { data, error } = await supabase
    .from("user")
    .select("voucher")
    .eq("email", session.email)
    .maybeSingle();

  if (error || !data) return { valid: false, error: "Gagal memeriksa voucher." };
  if (!data.voucher)   return { valid: false, error: "Voucher sudah digunakan atau tidak tersedia." };
  if (data.voucher.toUpperCase() !== code.trim().toUpperCase())
    return { valid: false, error: "Kode voucher tidak valid." };

  return { valid: true, discount: 0.2 };
}

// Tandai voucher sudah dipakai
export async function redeemVoucher() {
  const session = getSession();
  if (!session) return;
  await supabase.from("user").update({ voucher: null }).eq("email", session.email);
  setSession({ ...session, voucher: "" });
}

// Daftarkan member baru ke Supabase
export async function registerMember({ nama, email, whatsapp }) {
  const emailLower = email.trim().toLowerCase();

  const { data: existing } = await supabase.from("user").select("email").eq("email", emailLower).maybeSingle();
  if (existing) return { success: false, error: "Email sudah terdaftar." };

  const digits      = whatsapp.replace(/\D/g, "");
  const password    = digits.slice(-4) || "1234";
  const voucher     = "SZ-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  const { error } = await supabase.from("user").insert([{ username: nama, email: emailLower, password, role: "user", voucher }]);
  if (error) return { success: false, error: "Gagal mendaftar: " + error.message };

  return { success: true, member: { nama, email: emailLower, password, voucher } };
}