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
                 <Image 
                    src="data:image/webp;base64,UklGRtIUAABXRUJQVlA4IMSFAABQJgCdASoYChgCPpFGnkulpCMho/M7s/A/iWlu/V7UA/579bvdX+W/2f23+R/wv+P9z/u5+539+/3b1W/vv+j/s/t2+wH+T/xn+B/4X/A/2T9x/8B/r/yL/tf5b/u/yT8kP5N/of7V/w/8R+zH8w/z3/n/4X/Bf2L9oP+P8A/7c/QD/ff6b/y/9l+an/8e6n7u/2X63f4b/Af8p/Zf+F/ev3F/tv+B/y/+d/0X/P/0H/E/3n/i/4L/Pf+R/kv+x/un///93/////7gf7L////7s/AD/v+qf8H/9v5L/////wJ/N//f+zH+//6H+//+r/I/93/8v/////y1+99Pj0l5W4VpC1Y3BSSb44i6lGjXmY2m4zL5wQkUuL3lTjR+79Qk72eEwKx7yScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJySckn" 
                    alt="Miki Barber Shop Logo"
                    width={120}
                    height={120}
                    className="mx-auto rounded-full object-cover"
                  />
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
