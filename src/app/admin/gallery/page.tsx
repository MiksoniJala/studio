
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { getWorks, addImage, removeImage } from "@/lib/actions";

export default async function GalleryAdminPage() {
    const works = await getWorks();

    return (
        <div className="grid gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Dodaj Novu Sliku</CardTitle>
                    <CardDescription>Ovdje možete dodati novu sliku u vašu galeriju radova.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={addImage} className="space-y-4 max-w-sm">
                        <div className="space-y-1.5">
                            <Label htmlFor="src">URL Slike</Label>
                            <Input id="src" name="src" type="text" placeholder="https://placehold.co/600x400.png" required />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="alt">Alternativni Tekst (Opis)</Label>
                            <Textarea id="alt" name="alt" placeholder="Moderna frizura sa čistim fadeom" required />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="hint">AI Hint (do 2 riječi)</Label>
                            <Input id="hint" name="hint" type="text" placeholder="stylish haircut" required />
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
                                <form action={removeImage}>
                                    <input type="hidden" name="index" value={index} />
                                    <Button variant="destructive" size="sm" type="submit">Obriši</Button>
                                </form>
                            </div>
                          </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
