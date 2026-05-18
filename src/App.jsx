import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forgot from './pages/auth/Forgot';


// Lazy Load Pages
const Dashboard = React.lazy(() => import("./pages/main/Dashboard"));
const Booking = React.lazy(() => import("./pages/main/Booking"));
const Guests = React.lazy(() => import("./pages/main/Guests"));
const Rooms = React.lazy(() => import("./pages/main/Rooms"));
const Employers = React.lazy(() => import("./pages/main/Employers")); // Tambahan
const Settings = React.lazy(() => import("./pages/main/Settings")); // Tambahan
const ErrorPage = React.lazy(() => import("./pages/main/ErrorPage"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const Loading = React.lazy(() => import("./components/Loading"));
const RoomDetail = React.lazy(() => import("./pages/main/RoomDetail"));
const GuestDetail = React.lazy(() => import("./pages/main/GuestDetail"));
const Components = React.lazy(() => import("./pages//main/Components"))

export default function App() {
  return (
    <Suspense fallback={<Loading />}> 
        <Routes>
            {/* Main Layout Routes */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/guests/:id" element={<GuestDetail />} />
                <Route path="/guests" element={<Guests />} />
                <Route path="/employers" element={<Employers />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/rooms/:id" element={<RoomDetail />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/components" element={<Components />} />
            </Route>

            {/* Auth Layout Routes */}
            <Route element={<AuthLayout/>}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/forgot" element={<Forgot/>} />
            </Route>  

            {/* Error Routes */}
            <Route path="/error-400" element={<ErrorPage code="400" title="Bad Request" description="Permintaan tidak dapat diproses oleh server." image="https://illustrations.popsy.co/gray/falling.svg" />} />
            <Route path="/error-401" element={<ErrorPage code="401" title="Unauthorized" description="Anda harus login terlebih dahulu." image="https://illustrations.popsy.co/gray/shaking-hands.svg" />} />
            <Route path="/error-403" element={<ErrorPage code="403" title="Forbidden" description="Anda tidak memiliki akses ke halaman ini." image="https://illustrations.popsy.co/gray/stop.svg" />} />
            
            {/* Catch All - 404 */}
            <Route path="*" element={<ErrorPage code="404" title="Page Not Found" description="Halaman yang anda cari raib entah kemana." />} />
        </Routes>
    </Suspense>
  );
}