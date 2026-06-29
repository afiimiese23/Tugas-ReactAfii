import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "@/lib/auth";

/**
 * ProtectedRoute — RBAC guard untuk React Router v6
 *
 * Props:
 *   allowedRoles  : string[]  — role yang boleh masuk, e.g. ["admin"] atau ["user"]
 *   redirectTo    : string    — kemana redirect jika akses ditolak (default: "/login")
 *
 * Penggunaan di App.jsx:
 *   <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
 *     <Route path="dashboard" element={<Dashboard />} />
 *   </Route>
 */
export default function ProtectedRoute({ allowedRoles = [], redirectTo = "/login" }) {
  const session = getSession();

  // Belum login sama sekali → ke halaman login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Sudah login tapi role tidak sesuai → tampilkan halaman 403
  if (allowedRoles.length > 0 && !allowedRoles.includes(session.role)) {
    // Tentukan redirect yang tepat berdasarkan role aktual
    if (session.role === "user") {
      return <Navigate to="/member/dashboard" replace />;
    }
    if (session.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/error-403" replace />;
  }

  // Lolos semua pengecekan → render child routes
  return <Outlet />;
}
