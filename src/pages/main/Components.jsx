import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button"; 
import Badge from "../../components/Badge"; 
import Avatar from "../../components/Avatar"; 
import Container from "../../components/Container"; 
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import RoomCard from "../../components/RoomCard";
import Table from "../../components/Table";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import TextArea from "../../components/TextArea";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import HeroSection from "../../components/HeroSection";
import FeatureSection from "../../components/FeatureSection";
import ProductSection from "../../components/ProductSection";

import { FaBed, FaWifi, FaCoffee, FaConciergeBell } from "react-icons/fa";

export default function Components() {
    // State  demo Modal & Form Input
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [guestName, setGuestName] = useState("");
    const [roomType, setRoomType] = useState("");
    const [notes, setNotes] = useState("");

    // Header Tabel  Manajemen Hotel StayZone
    const tableHeaders = [
        "No",
        "Nama Tamu",
        "Nomor Kamar",
        "Tipe Kamar",
        "Status Pembayaran",
        "Aksi"
    ];

    // Data Mock Terintegrasi StayZone
    const stayZoneRooms = [
        {
            id: 1,
            name: "Executive Suite Room",
            category: "Luxury",
            price: "Rp 1.850.000 / night",
            tag: "Best Seller",
            image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600",
            description: "Kamar super luas dengan pemandangan langsung ke kota, dilengkapi fasilitas bathtub premium dan mini bar eksklusif."
        },
        {
            id: 2,
            name: "Deluxe Twin Bed",
            category: "Standard",
            price: "Rp 850.000 / night",
            tag: "Popular",
            image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600",
            description: "Pilihan terbaik untuk perjalanan bisnis maupun liburan santai bersama teman dengan kenyamanan twin-bed terpisah."
        }
    ];

    const guestList = [
        { id: 1, name: "James Sukardi", room: "A-123", type: "Executive Suite", status: "Lunas" },
        { id: 2, name: "Siti Rahma", room: "B-045", type: "Deluxe Twin", status: "Pending" },
        { id: 3, name: "Budi Santoso", room: "C-211", type: "Standard Single", status: "Dibatalkan" }
    ];

    const featuresMock = [
        { icon: <FaWifi />, title: "High-Speed Wi-Fi", description: "Koneksi internet tanpa putus di seluruh area kamar dan lounge hotel." },
        { icon: <FaCoffee />, title: "Free Breakfast", description: "Nikmati hidangan sarapan buffet internasional dari chef bintang 5 kami." },
        { icon: <FaConciergeBell />, title: "24/7 Room Service", description: "Pelayanan siap sedia mengantarkan kebutuhan kamar Anda kapan saja." }
    ];

    return (
        <Container className="bg-gray-50 min-h-screen">
            {/* 1. HEADER HALAMAN */}
            <PageHeader title="StayZone Component Showcase" />

            {/* 2. SECTION COMPONENT DEMO (Hero & Features) */}
            <div className="mt-6">
                <HeroSection 
                    title="Sistem Dashboard Administrasi StayZone" 
                    subtitle="Selamat datang di pusat kendali operasional hotel. Gunakan modul komponen di bawah ini untuk membangun antarmuka yang cepat, seragam, dan responsif."
                    bgImage="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#3AB449] hover:bg-[#2f963b] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all">
                        Buka Form Registrasi Tamu (Modal)
                    </button>
                </HeroSection>

                <FeatureSection 
                    sectionTitle="Keunggulan Layanan StayZone" features={featuresMock} />
            </div>

            {/* 3. CORE UI COMPONENTS (Button, Badge, Avatar, Alert) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <Card>
                    <h3 className="text-base font-bold text-[#113D32] mb-4 border-b pb-2">Buttons & Badges (StayZone Theme)</h3>
                    
                    <p className="text-xs text-gray-400 font-bold uppercase mb-2">Tombol Aksi Utama</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                        <Button>Simpan Reservasi</Button>
                        <Button type="danger">Batalkan Check-in</Button>
                        <Button type="warning">Edit Kamar</Button>
                        <Button type="secondary">Cetak Invoice</Button>
                    </div>

                    <p className="text-xs text-gray-400 font-bold uppercase mb-2">Badge Status Kamar / Pembayaran</p>
                    <div className="mb-4 flex gap-2">
                        <Badge>Check In</Badge>
                        <Badge type="danger">Terisi</Badge>
                        <Badge type="warning">Kotor / Maintenance</Badge>
                    </div>

                    <p className="text-xs text-gray-400 font-bold uppercase mb-2">Resepsionis / Avatar Tamu</p>
                    <div className="flex gap-2">
                        <Avatar name="James Sukardi" />
                        <Avatar name="Siti Rahma" />
                        <Avatar name="Budi Santoso" />
                    </div>
                </Card>

                <Card>
                    <h3 className="text-base font-bold text-[#113D32] mb-4 border-b pb-2">Feedback & Notification Components</h3>
                    <div className="space-y-3">
                        <Alert type="success" message="Kamar Suite A-123 Berhasil Diposkan & Dipesan!" />
                        <Alert type="info" message="Sistem otomatis melakukan backup data reservasi setiap jam 12 malam." />
                        <Alert type="error" message="Gagal memproses transaksi. Kartu kredit ditolak oleh bank penyedia." />
                        
                        <div className="border border-gray-100 rounded-xl bg-gray-50/50 p-2">
                            <Loading message="Sinkronisasi Status Kamar..." />
                        </div>
                    </div>
                </Card>
            </div>

            {/* 4. FORM COMPONENT DEMO INLINE */}
            <Card className="mb-8">
                <h3 className="text-base font-bold text-[#113D32] mb-4 border-b pb-2">Form Components (Inline Preview)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <InputField label="Nomor Identitas (KTP / Paspor)" placeholder="Masukkan 16 digit No. KTP" />
                    <SelectField label="Pilih Metode Pembayaran"
                        options={[
                            { value: "transfer", label: "Bank Transfer / Virtual Account" },
                            { value: "card", label: "Kartu Kredit / Debit" },
                            { value: "cash", label: "Tunai saat Check-in" }
                        ]} />
                    <InputField type="date" label="Tanggal Check-In" />
                </div>
                <TextArea label="Permintaan Khusus Tamu" 
                    placeholder="Contoh: Kamar bebas asap rokok, sertakan buah segar, atau lantai atas..."/>
            </Card>

            {/* 5. DYNAMIC SECTION (Room Management Cards) */}
            <div className="mb-8">
                <ProductSection title="Katalog Tipe Kamar StayZone Terpopuler" items={stayZoneRooms} />
            </div>

            {/* 6. TABLE COMPONENT (Daftar Reservasi Tamu Aktif) */}
            <div className="mb-8">
                <div className="mb-3 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-[#113D32]">Monitor Tabel Reservasi Tamu</h2>
                    <span className="text-xs text-gray-500 font-semibold">Menampilkan 3 Data Tamu Terkini</span>
                </div>
                <Table headers={tableHeaders}>
                    {guestList.map((guest, index) => (
                        <tr key={guest.id} className="hover:bg-gray-50 transition-colors">
                            <td className="border-b border-gray-100 px-4 py-3.5 text-sm text-gray-600"> {index + 1} </td>
                            <td className="border-b border-gray-100 px-4 py-3.5 text-sm font-semibold text-gray-800 flex items-center gap-2"> 
                                <Avatar name={guest.name} /> {guest.name} 
                            </td>
                            <td className="border-b border-gray-100 px-4 py-3.5 text-sm text-gray-600 font-mono"> {guest.room} </td>
                            <td className="border-b border-gray-100 px-4 py-3.5 text-sm text-gray-600"> {guest.type} </td>
                            <td className="border-b border-gray-100 px-4 py-3.5 text-sm">
                                <Badge type={guest.status === "Lunas" ? "success" : guest.status === "Pending" ? "warning" : "danger"}>
                                    {guest.status}
                                </Badge>
                            </td>
                            <td className="border-b border-gray-100 px-4 py-3.5 text-sm">
                                <button className="bg-[#113D32] text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-[#3AB449] transition-colors">
                                    Kelola
                                </button>
                            </td>
                        </tr>
                    ))}
                </Table>
            </div>

            {/* 7. DYNAMIC POPUP MODAL CONTROL */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} 
                title="Registrasi Reservasi Baru - StayZone">
                <div className="space-y-4">
                    <InputField label="Nama Lengkap Utama" placeholder="Sesuai kartu identitas asli" value={guestName}
                        onChange={(e) => setGuestName(e.target.value)} />
                    <SelectField label="Pilih Kamar Tersedia" value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        options={[
                            { value: "A123", label: "Executive Suite (Kamar A-123)" },
                            { value: "B045", label: "Deluxe Twin Bed (Kamar B-045)" }
                        ]} />
                    <TextArea label="Catatan internal Front-Desk" placeholder="Tulis instruksi tambahan jika ada..."
                        value={notes} onChange={(e) => setNotes(e.target.value)} />
                    <div className="pt-4 flex justify-end space-x-2 border-t border-gray-100">
                        <Button type="secondary" onClick={() => setIsModalOpen(false)}>Kembali</Button>
                        <Button onClick={() => alert(`Data ${guestName} sukses disimpan!`)}>Simpan Data</Button>
                    </div>
                </div>
            </Modal>

            <Footer />
        </Container>
    );
}