import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors } from "lucide-react";

const barbers = [
  {
    name: "Mirsad",
    description: "With over 15 years of experience, Mirsad is a master of classic cuts and modern styles. His attention to detail is second to none, ensuring a perfect result every time.",
    image: "https://placehold.co/400x400.png",
    hint: "classic barber portrait"
  },
  {
    name: "Huske",
    description: "Huske brings a fresh, artistic approach to barbering. He specializes in creative fades, sharp line-ups, and is not afraid to experiment with new trends.",
    image: "https://placehold.co/400x400.png",
    hint: "modern barber portrait"
  }
];

export function BarberProfiles() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">Meet Our Barbers</h2>
        <p className="mt-2 text-lg text-muted-foreground">The artisans behind the shears.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {barbers.map((barber) => (
          <div key={barber.name} className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="flex-shrink-0">
                <Image 
                    src={barber.image}
                    alt={`Portrait of ${barber.name}`}
                    width={150}
                    height={150}
                    className="rounded-full object-cover border-4 border-card shadow-lg"
                    data-ai-hint={barber.hint}
                />
            </div>
            <div className="text-center sm:text-left">
                <h3 className="font-headline text-2xl font-semibold">{barber.name}</h3>
                <p className="mt-2 text-muted-foreground">{barber.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
