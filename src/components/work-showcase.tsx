import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const works = [
  { src: "https://placehold.co/600x400.png", alt: "Stylish haircut with a clean fade", hint: "stylish haircut" },
  { src: "https://placehold.co/600x400.png", alt: "Precise beard trim and shaping", hint: "beard trim" },
  { src: "https://placehold.co/600x400.png", alt: "Classic gentlemen's haircut", hint: "classic haircut" },
  { src: "https://placehold.co/600x400.png", alt: "Modern textured hairstyle", hint: "modern hairstyle" },
  { src: "https://placehold.co/600x400.png", alt: "Sharp line-up on a fresh cut", hint: "sharp lineup" },
  { src: "https://placehold.co/600x400.png", alt: "Hot towel shave service", hint: "hot towel" },
];

export function WorkShowcase() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Gallery</h2>
        <p className="mt-2 text-lg text-muted-foreground">A glimpse into our craft and precision.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {works.map((work, index) => (
          <Card key={index} className="overflow-hidden group">
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
        ))}
      </div>
    </section>
  );
}
