
import Image from "next/image";

const barbers = [
  {
    name: "Miki",
    description: "Specijalizovan za klasične fade frizure, precizno oblikovanje brade i frizure inspirisane tattoo art stilom. Sa svojih 18 godina, Miki donosi svježinu i kreativnost u svaki rez, kombinujući moderno s klasičnim tehnikama. Njegova preciznost, osjećaj za detalje i posvećenost klijentima čine ga savršenim izborom za one koji žele upečatljiv i besprijekoran izgled.",
    image: "https://placehold.co/400x400.png",
    hint: "classic barber portrait"
  },
  {
    name: "Huske",
    description: "Mladi i perspektivni frizer na praksi, poznat po velikoj želji za učenjem i istraživanjem novih trendova. Huske sa strašću prati moderne tehnike šišanja i stylinga, ne boji se eksperimentisati i uvijek je spreman ponuditi klijentima svježe, originalne ideje. Njegov entuzijazam, kreativnost i pristupačnost čine ga odličnim izborom za svakoga ko želi isprobati nešto novo i moderno.",
    image: "https://placehold.co/400x400.png",
    hint: "modern barber portrait"
  }
];

interface BarberProfilesProps {
    onSelectBarber?: (name: string) => void;
}

export function BarberProfiles({ onSelectBarber }: BarberProfilesProps) {
  const isSelectable = !!onSelectBarber;

  return (
    <section>
      {!isSelectable && (
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Upoznajte Naše Barbere</h2>
            <p className="mt-2 text-lg text-muted-foreground">Majstori iza makaza.</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {barbers.map((barber) => (
          <div 
            key={barber.name} 
            className={`flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 rounded-lg border-2 ${isSelectable ? 'border-transparent hover:border-primary hover:shadow-2xl hover:scale-105 cursor-pointer transform transition-all duration-300' : 'border-none'}`}
            onClick={() => onSelectBarber?.(barber.name)}
            role={isSelectable ? 'button' : undefined}
            tabIndex={isSelectable ? 0 : -1}
            onKeyDown={(e) => {
                if(isSelectable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onSelectBarber(barber.name);
                }
            }}
          >
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
