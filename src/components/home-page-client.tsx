
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookingForm } from "@/components/booking-form";
import { BarberProfiles } from "@/components/barber-profiles";
import { WorkShowcase } from "@/components/work-showcase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown } from 'lucide-react';
import Image from "next/image";
import type { Barber, Work } from '@/lib/actions';

interface HomePageClientProps {
  barbers: Barber[];
  works: Work[];
  nonWorkingDays: string[];
  appVersion: string;
}

export function HomePageClient({ barbers, works, nonWorkingDays, appVersion }: HomePageClientProps) {
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // On component mount, ensure the window is scrolled to the top.
    // This prevents the browser from restoring a previous scroll position on refresh,
    // which can lead to jumping, especially with animated/dynamic content.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const handleSelectBarber = (name: string) => {
    setSelectedBarber(name);
    setTimeout(() => {
        bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      
      <section className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <Image
                src="/logo.png"
                alt="Miki Barber Shop Logo"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-8"
                priority
            />
        </motion.div>
        <motion.h1 
            className="font-headline text-5xl md:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Dobrodošli u Miki Barber Shop
        </motion.h1>
        <motion.p 
          className="mt-4 text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Odaberite svog barbera i rezervišite termin online.
        </motion.p>
        <motion.div 
            className="mt-12 flex flex-col items-center gap-2 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
        >
          <span className="font-body tracking-wider text-sm">scroll down</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </motion.div>
      </section>

      <main className="flex-grow container mx-auto px-4 py-16 md:py-24 space-y-24 md:space-y-32">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <BarberProfiles barbers={barbers} onSelectBarber={handleSelectBarber} />
        </motion.div>

        <div ref={bookingRef}>
          {selectedBarber && (
              <motion.div 
                  initial={{height: 0, opacity: 0}}
                  animate={{height: 'auto', opacity: 1}}
                  transition={{duration: 0.7, ease: "easeOut"}}
              >
                  <BookingForm barber={selectedBarber} nonWorkingDays={nonWorkingDays} />
              </motion.div>
          )}
        </div>
        
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
        >
            <WorkShowcase works={works} />
        </motion.div>

      </main>
      <footer className="bg-card border-t mt-12">
          <div className="container mx-auto py-6 px-4 text-center text-muted-foreground space-y-2">
              <p>&copy; {new Date().getFullYear()} Miki Barber Shop. Sva prava zadržana.</p>
              <Button asChild variant="link">
                <Link href="/admin/login">Admin Panel</Link>
              </Button>
              <p className="text-xs text-muted-foreground/70">Verzija {appVersion}</p>
          </div>
      </footer>
    </div>
  );
}
