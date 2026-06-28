import GuestNavbar from "@/components/guest/GuestNavbar";
import GuestHero from "@/components/guest/GuestHero";
import GuestInfoSection from "@/components/guest/GuestInfoSection";
import GuestRoomCatalog from "@/components/guest/GuestRoomCatalog";
import GuestFooter from "@/components/guest/GuestFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <GuestNavbar />
      <main>
        <GuestHero />
        <GuestInfoSection />
        <GuestRoomCatalog />
      </main>
      <GuestFooter />
    </div>
  );
}
