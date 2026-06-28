import GuestNavbar from "@/components/guest/GuestNavbar";
import GuestHero from "@/components/guest/GuestHero";
import GuestInfoSection from "@/components/guest/GuestInfoSection";
import GuestRoomCatalog from "@/components/guest/GuestRoomCatalog";
import GuestMemberForm from "@/components/guest/GuestMemberForm";
import GuestFooter from "@/components/guest/GuestFooter";
import GuestWhatsAppButton from "@/components/guest/GuestWhatsAppButton";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <GuestNavbar />
      <main>
        <GuestHero />
        <GuestInfoSection />
        <GuestRoomCatalog />
        <GuestMemberForm />
      </main>
      <GuestFooter />

      {/* Floating WhatsApp CRM Button */}
      <GuestWhatsAppButton />
    </div>
  );
}
