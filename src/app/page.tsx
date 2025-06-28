
import { BookingForm } from "@/components/booking-form";
import { BarberProfiles } from "@/components/barber-profiles";
import { WorkShowcase } from "@/components/work-showcase";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
          <div className="mb-4">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <circle cx="50" cy="50" r="48" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="3" />
              <path d="M42,35a5,5 0 1 0-10,0a5,5 0 0 0 10,0" fill="hsl(var(--primary))" />
              <path d="M68,35a5,5 0 1 0-10,0a5,5 0 0 0 10,0" fill="hsl(var(--primary))" />
              <path d="M68,42 L42,68" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
              <path d="M42,42 L68,68" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
            </svg>
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
