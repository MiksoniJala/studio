
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const barbers = [
  {
    name: "Mirsad",
    description: "Sa preko 15 godina iskustva, Mirsad je majstor klasičnih frizura i modernih stilova. Njegova pažnja posvećena detaljima je bez premca, osiguravajući savršen rezultat svaki put.",
    image: "https://placehold.co/400x400.png",
    hint: "classic barber portrait"
  },
  {
    name: "Huske",
    description: "Huske donosi svjež, umjetnički pristup berberskom zanatu. Specijalizirao se za kreativne fadeove, oštre linije i ne boji se eksperimentisati sa novim trendovima.",
    image: "https://placehold.co/400x400.png",
    hint: "modern barber portrait"
  }
];

export function BarberProfiles() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">Upoznajte Naše Barbere</h2>
        <p className="mt-2 text-lg text-muted-foreground">Majstori iza makaza.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {barbers.map((barber) => (
          <div key={barber.name} className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="flex-shrink-0">
                <Image 
                    src={barber.image}
                    alt={`Portret ${barber.name}`}
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
