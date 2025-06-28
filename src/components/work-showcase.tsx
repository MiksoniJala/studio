
'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { Work } from '@/lib/actions';

interface WorkShowcaseProps {
    works: Work[];
}

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

export function WorkShowcase({ works }: WorkShowcaseProps) {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">Naša Galerija</h2>
        <p className="mt-2 text-lg text-muted-foreground">Pogled u naš zanat i preciznost.</p>
      </div>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
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
