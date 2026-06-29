import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthLayout      from './layouts/AuthLayout';
import MemberLayout    from './layouts/MemberLayout';
import Login           from './pages/auth/Login';
import Register        from './pages/auth/Register';
import Forgot          from './pages/auth/Forgot';
import LandingPage     from './pages/guest/LandingPage';
import MemberDashboard from './pages/member/MemberDashboard';
import ProtectedRoute  from './components/ProtectedRoute';

// Lazy Load — Member Pages
const MemberRoomCatalog    = React.lazy(() => import("./pages/member/MemberRoomCatalog"));
const MemberBookingHistory = React.lazy(() => import("./pages/member/MemberBookingHistory"));

// Lazy Load — Admin Pages
const Dashboard    = React.lazy(() => import("./pages/main/Dashboard"));
const Booking      = React.lazy(() => import("./pages/main/Booking"));
const Guests       = React.lazy(() => import("./pages/main/Guests"));
const Rooms        = React.lazy(() => import("./pages/main/Rooms"));
const Employers    = React.lazy(() => import("./pages/main/Employers"));
const Settings     = React.lazy(() => import("./pages/main/Settings"));
const RoomDetail   = React.lazy(() => import("./pages/main/RoomDetail"));
const GuestDetail  = React.lazy(() => import("./pages/main/GuestDetail"));
const Components   = React.lazy(() => import("./pages/main/Components"));
const ComponentsP11= React.lazy(() => import("./pages/main/ComponentsP11"));
const User         = React.lazy(() => import("./pages/main/User"));
const ErrorPage    = React.lazy(() => import("./pages/main/ErrorPage"));
const MainLayout   = React.lazy(() => import("./layouts/MainLayout"));
const Loading      = React.lazy(() => import("./components/Loading"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* ═══════════════════════════════════════════
            PUBLIC — Guest (no auth required)
        ═══════════════════════════════════════════ */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth pages */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot"   element={<Forgot />} />
        </Route>

        {/* ═══════════════════════════════════════════
            MEMBER — role "user" only
        ═══════════════════════════════════════════ */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route element={<MemberLayout />}>
            <Route path="/member/dashboard" element={<MemberDashboard />} />
            <Route path="/member/rooms"     element={<MemberRoomCatalog />} />
            <Route path="/member/bookings"  element={<MemberBookingHistory />} />
          </Route>
        </Route>

        {/* ═══════════════════════════════════════════
            ADMIN — role "admin" only
        ═══════════════════════════════════════════ */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<MainLayout />} path="/admin">
            <Route path="dashboard"      element={<Dashboard />} />
            <Route path="booking"        element={<Booking />} />
            <Route path="guests"         element={<Guests />} />
            <Route path="guests/:id"     element={<GuestDetail />} />
            <Route path="employers"      element={<Employers />} />
            <Route path="rooms"          element={<Rooms />} />
            <Route path="rooms/:id"      element={<RoomDetail />} />
            <Route path="settings"       element={<Settings />} />
            <Route path="components"     element={<Components />} />
            <Route path="components-p11" element={<ComponentsP11 />} />
            <Route path="user"           element={<User />} />
          </Route>
        </Route>

        {/* ═══════════════════════════════════════════
            ERROR ROUTES
        ═══════════════════════════════════════════ */}
        <Route path="/error-400" element={<ErrorPage code="400" title="Bad Request"    description="Permintaan tidak dapat diproses oleh server."  image="https://illustrations.popsy.co/gray/falling.svg" />} />
        <Route path="/error-401" element={<ErrorPage code="401" title="Unauthorized"   description="Anda harus login terlebih dahulu."              image="https://illustrations.popsy.co/gray/shaking-hands.svg" />} />
        <Route path="/error-403" element={<ErrorPage code="403" title="Forbidden"      description="Anda tidak memiliki akses ke halaman ini."      image="https://illustrations.popsy.co/gray/stop.svg" />} />
        <Route path="*"          element={<ErrorPage code="404" title="Page Not Found" description="Halaman yang anda cari raib entah kemana." />} />

      </Routes>
    </Suspense>
  );
}
