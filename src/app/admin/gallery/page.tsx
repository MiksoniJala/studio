
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const works = [
  { src: "https://placehold.co/600x400.png", alt: "Moderna frizura sa čistim fadeom", hint: "stylish haircut" },
  { src: "https://placehold.co/600x400.png", alt: "Precizno šišanje i oblikovanje brade", hint: "beard trim" },
  { src: "https://placehold.co/600x400.png", alt: "Klasična muška frizura", hint: "classic haircut" },
  { src: "https://placehold.co/600x400.png", alt: "Moderna teksturirana frizura", hint: "modern hairstyle" },
  { src: "https://placehold.co/600x400.png", alt: "Oštra linija na svježoj frizuri", hint: "sharp lineup" },
  { src: "https://placehold.co/600x400.png", alt: "Usluga brijanja vrućim peškirom", hint: "hot towel" },
];

export default function GalleryAdminPage() {
    return (
        <div className="grid gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Dodaj Novu Sliku</CardTitle>
                    <CardDescription>Ovdje možete dodati novu sliku u vašu galeriju radova.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Slika</Label>
                        <Input id="picture" type="file" />
                    </div>
                     <Button>Dodaj Sliku</Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Postojeća Galerija</CardTitle>
                    <CardDescription>Pregledajte i uklonite slike iz galerije.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {works.map((work, index) => (
                          <div key={index} className="relative group">
                            <Image
                                src={work.src}
                                alt={work.alt}
                                width={400}
                                height={400}
                                className="object-cover w-full h-full rounded-md"
                                data-ai-hint={work.hint}
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="destructive" size="sm">Obriši</Button>
                            </div>
                          </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
