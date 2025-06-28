
'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const works = [
  { src: "https://placehold.co/600x400.png", alt: "Moderna frizura sa čistim fadeom", hint: "stylish haircut" },
  { src: "https://placehold.co/600x400.png", alt: "Precizno šišanje i oblikovanje brade", hint: "beard trim" },
  { src: "https://placehold.co/600x400.png", alt: "Klasična muška frizura", hint: "classic haircut" },
  { src: "https://placehold.co/600x400.png", alt: "Moderna teksturirana frizura", hint: "modern hairstyle" },
  { src: "https://placehold.co/600x400.png", alt: "Oštra linija na svježoj frizuri", hint: "sharp lineup" },
  { src: "https://placehold.co/600x400.png", alt: "Usluga brijanja vrućim peškirom", hint: "hot towel" },
];


const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
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

export function WorkShowcase() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">Naša Galerija</h2>
        <p className="mt-2 text-lg text-muted-foreground">Pogled u naš zanat i preciznost.</p>
      </div>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        variants={containerVariants}
      >
        {works.map((work, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="overflow-hidden group">
              <CardContent className="p-0">
                  <Image
                      src={work.src}
                      alt={work.alt}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                      data-ai-hint={work.hint}
                  />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
