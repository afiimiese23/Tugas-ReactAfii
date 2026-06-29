import { Outlet } from "react-router-dom";
import MemberNavbar from "@/components/member/MemberNavbar";

/**
 * Layout shared untuk semua halaman /member/*.
 * Menyediakan MemberNavbar + area konten.
 */
export default function MemberLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MemberNavbar />
      <Outlet />
    </div>
  );
}
