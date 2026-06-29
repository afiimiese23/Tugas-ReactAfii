/**
 * auth.js — StayZone Auth Helper
 *
 * Autentikasi menggunakan query langsung ke tabel `user` di Supabase
 * (BUKAN supabase.auth) karena data user disimpan di custom table.
 *
 * Struktur tabel `user`:
 *   id_user | username | email | password | role ("admin" | "user")
 *
 * Role redirect:
 *   "admin" → /admin/dashboard
 *   "user"  → /member/dashboard
 */

import { supabase } from "./supabase";

const SESSION_KEY = "stayzone_session";
const MEMBERS_KEY = "stayzone_members";

// ─── Session helpers (synchronous) ────────────────────────────────────────────

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
export function isMember()   { return getSession()?.role === "user"; }
export function isAdmin()    { return getSession()?.role === "admin"; }

// ─── signIn — query tabel `user` langsung ─────────────────────────────────────

/**
 * Login dengan mencocokkan email + password di tabel `user`.
 * Return { success, role, user, error }
 */
export async function signIn(email, password) {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("email", email.trim().toLowerCase())
    .eq("password", password)
    .maybeSingle();

  if (error) {
    return { success: false, error: "Terjadi kesalahan server. Coba lagi." };
  }

  if (!data) {
    return { success: false, error: "Email atau password salah." };
  }

  // Bangun session
  const session = {
    id:       data.id_user,           // PK di tabel user adalah id_user
    nama:     data.username,
    email:    data.email,
    role:     data.role,              // "admin" | "user"
    voucher:  data.voucher  ?? "",    // mungkin kosong, tidak apa
    whatsapp: data.whatsapp ?? "",
  };

  setSession(session);
  return { success: true, role: data.role, user: session };
}

// ─── signOut ──────────────────────────────────────────────────────────────────

export function signOut() {
  clearSession();
}

// ─── Voucher ──────────────────────────────────────────────────────────────────

/**
 * Validasi voucher: cek apakah kode cocok dengan voucher milik user yang login.
 * Voucher hanya berlaku sekali (NULL setelah dipakai).
 * Return { valid: boolean, discount: number (0–1), error?: string }
 */
export async function validateVoucher(code) {
  const session = getSession();
  if (!session) return { valid: false, error: "Belum login." };

  const { data, error } = await supabase
    .from("user")
    .select("voucher")
    .eq("email", session.email)
    .maybeSingle();

  if (error || !data) return { valid: false, error: "Gagal memeriksa voucher." };

  if (!data.voucher) return { valid: false, error: "Voucher sudah pernah digunakan atau tidak tersedia." };

  if (data.voucher.toUpperCase() !== code.trim().toUpperCase()) {
    return { valid: false, error: "Kode voucher tidak valid." };
  }

  return { valid: true, discount: 0.2 }; // 20% off
}

/**
 * Tandai voucher sudah dipakai — set kolom voucher = NULL di Supabase
 * dan update session lokal.
 */
export async function redeemVoucher() {
  const session = getSession();
  if (!session) return;

  await supabase
    .from("user")
    .update({ voucher: null })
    .eq("email", session.email);

  // Hapus voucher dari session lokal juga
  setSession({ ...session, voucher: "" });
}

// ─── Register Member (Landing Page form) ──────────────────────────────────────

export function getMembers() {
  try { return JSON.parse(localStorage.getItem(MEMBERS_KEY) || "[]"); } catch { return []; }
}

export function saveMembers(list) {
  try { localStorage.setItem(MEMBERS_KEY, JSON.stringify(list)); } catch { /**/ }
}

/**
 * Daftarkan member baru — insert ke tabel `user` + cache localStorage.
 * Password otomatis = 4 digit terakhir nomor WhatsApp.
 * Return { success, member, error }
 */
export async function registerMember({ nama, email, whatsapp }) {
  const emailLower = email.trim().toLowerCase();

  // Cek duplikat
  const { data: existing } = await supabase
    .from("user")
    .select("email")
    .eq("email", emailLower)
    .maybeSingle();

  if (existing) {
    return { success: false, error: "Email ini sudah terdaftar. Silakan login." };
  }

  const digits       = whatsapp.replace(/\D/g, "");
  const autoPassword = digits.slice(-4) || "1234";
  const voucher      = "SZ-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  // Insert ke tabel `user` — hanya kolom yang ada di schema
  const { error: insertError } = await supabase
    .from("user")
    .insert([{
      username: nama,
      email:    emailLower,
      password: autoPassword,
      role:     "user",
      voucher,
    }]);

  if (insertError) {
    return { success: false, error: "Gagal mendaftar: " + insertError.message };
  }

  // Cache di localStorage (voucher & whatsapp disimpan lokal saja)
  const newMember = {
    id:        "MBR-" + Date.now(),
    nama,
    email:     emailLower,
    whatsapp,
    password:  autoPassword,
    voucher,
    role:      "user",
    createdAt: new Date().toISOString(),
  };

  saveMembers([...getMembers(), newMember]);
  return { success: true, member: newMember };
}
