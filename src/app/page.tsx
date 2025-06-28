
'use client';

import { useState } from 'react';
import { BookingForm } from "@/components/booking-form";
import { BarberProfiles } from "@/components/barber-profiles";
import { WorkShowcase } from "@/components/work-showcase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

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
                 <svg width="120" height="120" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                    <circle cx="70" cy="70" r="70" fill="hsl(var(--card))"/>
                    <path d="M53.6281 48.7523C52.011 47.1352 50.1132 46 47.9347 46C43.5777 46 40 49.5777 40 53.9347C40 55.7925 40.671 57.5101 41.8123 58.8306L61.5878 78.6061C62.9083 77.4649 64.6259 76.7938 66.4836 76.7938C70.8407 76.7938 74.4184 80.3715 74.4184 84.7285C74.4184 86.8997 73.6199 88.892 72.261 90.3804L90.3804 72.261C88.892 73.6199 86.8997 74.4184 84.7285 74.4184C80.3715 74.4184 76.7938 70.8407 76.7938 66.4836C76.7938 64.6259 77.4649 62.9083 78.6061 61.5878L53.6281 48.7523Z" stroke="hsl(var(--primary))" strokeWidth="3"/>
                    <path d="M96.3719 91.2477C97.989 92.8648 99.8868 94 102.065 94C106.422 94 110 90.4223 110 86.0653C110 84.2075 109.329 82.4899 108.188 81.1694L88.4122 61.3939C87.0917 62.5351 85.3741 63.2062 83.5164 63.2062C79.1593 63.2062 75.5816 59.6285 75.5816 55.2715C75.5816 53.1003 76.3801 51.108 77.739 49.6196L59.6196 67.739C61.108 66.3801 63.1003 65.5816 65.2715 65.5816C69.6285 65.5816 73.2062 69.1593 73.2062 73.5164C73.2062 75.3741 72.5351 77.0917 71.3939 78.4122L96.3719 91.2477Z" stroke="hsl(var(--primary))" strokeWidth="3"/>
                    <text x="50%" y="85%" dominantBaseline="middle" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="20" fontWeight="bold" fill="hsl(var(--foreground))">Miki Barber</text>
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
