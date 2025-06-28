
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const initialWorks = [
  { src: "https://placehold.co/600x400.png", alt: "Moderna frizura sa čistim fadeom", hint: "stylish haircut" },
  { src: "https://placehold.co/600x400.png", alt: "Precizno šišanje i oblikovanje brade", hint: "beard trim" },
  { src: "https://placehold.co/600x400.png", alt: "Klasična muška frizura", hint: "classic haircut" },
  { src: "https://placehold.co/600x400.png", alt: "Moderna teksturirana frizura", hint: "modern hairstyle" },
  { src: "https://placehold.co/600x400.png", alt: "Oštra linija na svježoj frizuri", hint: "sharp lineup" },
  { src: "https://placehold.co/600x400.png", alt: "Usluga brijanja vrućim peškirom", hint: "hot towel" },
];

export default function GalleryAdminPage() {
    const [works, setWorks] = useState(initialWorks);
    const [newWork, setNewWork] = useState({ src: '', alt: '', hint: '' });

    const handleAddImage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newWork.src && newWork.alt && newWork.hint) {
            setWorks([newWork, ...works]);
            setNewWork({ src: '', alt: '', hint: '' });
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setWorks(works.filter((_, index) => index !== indexToRemove));
    };


    return (
        <div className="grid gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Dodaj Novu Sliku</CardTitle>
                    <CardDescription>Ovdje možete dodati novu sliku u vašu galeriju radova.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddImage} className="space-y-4 max-w-sm">
                        <div className="space-y-1.5">
                            <Label htmlFor="imageUrl">URL Slike</Label>
                            <Input id="imageUrl" type="text" placeholder="https://placehold.co/600x400.png" value={newWork.src} onChange={e => setNewWork({...newWork, src: e.target.value})} required />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="imageAlt">Alternativni Tekst (Opis)</Label>
                            <Textarea id="imageAlt" placeholder="Moderna frizura sa čistim fadeom" value={newWork.alt} onChange={e => setNewWork({...newWork, alt: e.target.value})} required />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="imageHint">AI Hint (do 2 riječi)</Label>
                            <Input id="imageHint" type="text" placeholder="stylish haircut" value={newWork.hint} onChange={e => setNewWork({...newWork, hint: e.target.value})} required />
                        </div>
                        <Button type="submit">Dodaj Sliku</Button>
                    </form>
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
                                <Button variant="destructive" size="sm" onClick={() => handleRemoveImage(index)}>Obriši</Button>
                            </div>
                          </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
