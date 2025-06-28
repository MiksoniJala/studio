
'use client';

import { useState } from 'react';
import { BookingForm } from "@/components/booking-form";
import { BarberProfiles } from "@/components/barber-profiles";
import { WorkShowcase } from "@/components/work-showcase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';

export default function Home() {
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);

  const handleSelectBarber = (name: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        setSelectedBarber(name);
    }, 300);
  };
  
  const handleGoBack = () => {
    setSelectedBarber(null);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 overflow-x-hidden">
        
        <div className="relative min-h-[700px]">
          {/* Barber Selection View */}
          <div className={`transition-all duration-500 ease-in-out ${selectedBarber ? 'opacity-0 -translate-y-4 pointer-events-none absolute w-full' : 'opacity-100 translate-y-0'}`}>
            <header className="text-center mb-12">
              <div className="mb-4">
                 <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                    <circle cx="60" cy="60" r="58" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="3"/>
                    <g transform="translate(32 20) scale(0.9)">
                        <path d="M22 17C22 12.5817 25.5817 9 30 9C34.4183 9 38 12.5817 38 17" stroke="hsl(var(--primary))" strokeWidth="3.5" strokeLinecap="round"/>
                        <path d="M46 17C46 12.5817 49.5817 9 54 9C58.4183 9 62 12.5817 62 17" stroke="hsl(var(--primary))" strokeWidth="3.5" strokeLinecap="round"/>
                        <path d="M30,17 L54,41" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round"/>
                        <path d="M54,17 L30,41" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round"/>
                        <path d="M30 41L20 65" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round"/>
                        <path d="M54 41L64 65" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round"/>
                    </g>
                    <text x="60" y="95" fontFamily="Playfair Display, serif" fontSize="20" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="bold">
                        Miki Barber
                    </text>
                </svg>
              </div>
              <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
                Dobrodošli u Miki Barber
              </h1>
              <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                Započnite odabirom svog omiljenog barbera.
              </p>
            </header>
            <BarberProfiles onSelectBarber={handleSelectBarber} />
          </div>

          {/* Booking View */}
          <div className={`transition-all duration-500 ease-in-out ${selectedBarber ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
             {selectedBarber && (
              <>
                <Button variant="ghost" onClick={handleGoBack} className="mb-4 -ml-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Promijeni Barbera
                </Button>
                <BookingForm barber={selectedBarber} />
                <div className="mt-20 md:mt-24">
                  <WorkShowcase />
                </div>
              </>
            )}
          </div>
        </div>

      </main>
      <footer className="bg-card border-t mt-12">
          <div className="container mx-auto py-6 px-4 text-center text-muted-foreground space-y-4">
              <p>&copy; {new Date().getFullYear()} Miki Barber. Sva prava zadržana.</p>
              <Button asChild variant="link">
                <Link href="/admin/login">Admin Panel</Link>
              </Button>
          </div>
      </footer>
    </div>
  );
}
