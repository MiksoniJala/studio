
'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import type { Barber } from "@/lib/actions";

interface BarberProfilesProps {
    onSelectBarber: (name: string) => void;
    barbers: Barber[];
}

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const profileVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
};

export function BarberProfiles({ onSelectBarber, barbers }: BarberProfilesProps) {
  return (
    <section>
      <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Upoznajte Naše Barbere</h2>
          <p className="mt-2 text-lg text-muted-foreground">Odaberite svog majstora.</p>
      </div>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {barbers.map((barber) => (
          <motion.div 
            key={barber.name} 
            variants={profileVariants}
            className="flex flex-col items-center text-center gap-4 p-6 rounded-lg border-2 border-transparent hover:border-primary hover:shadow-2xl hover:scale-105 cursor-pointer transform transition-all duration-300"
            onClick={() => onSelectBarber(barber.name)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if(e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectBarber(barber.name);
                }
            }}
          >
            <Image 
                src={barber.image}
                alt={`Portret ${barber.name}`}
                width={150}
                height={150}
                className="rounded-full object-cover border-4 border-card shadow-lg"
                data-ai-hint={barber.hint}
            />
            <h3 className="font-headline text-2xl font-semibold mt-2">{barber.name}</h3>
            <p className="mt-1 text-muted-foreground max-w-md">{barber.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
