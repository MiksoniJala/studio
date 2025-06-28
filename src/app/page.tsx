
import { BookingForm } from "@/components/booking-form";
import { BarberProfiles } from "@/components/barber-profiles";
import { WorkShowcase } from "@/components/work-showcase";
import { Scissors } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-primary text-primary-foreground p-4 rounded-full mb-4">
            <Scissors className="h-10 w-10" />
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
            Miki Barber
          </h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Vaše klasično barbershop iskustvo, redizajnirano. Rezervišite svoj sljedeći termin kod nas u samo nekoliko klikova.
          </p>
        </header>

        <BookingForm />

        <div className="mt-20 md:mt-24">
            <BarberProfiles />
        </div>
        <div className="mt-20 md:mt-24">
            <WorkShowcase />
        </div>

      </main>
      <footer className="bg-card border-t mt-12">
          <div className="container mx-auto py-6 px-4 text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Miki Barber. Sva prava zadržana.</p>
          </div>
      </footer>
    </div>
  );
}
