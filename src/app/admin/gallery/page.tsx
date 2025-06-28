
'use client';

import { useState, useTransition, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { getWorks, addImage, removeImage, type Work } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function GalleryAdminPage() {
    const [works, setWorks] = useState<Work[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, startAddTransition] = useTransition();
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const refreshWorks = async () => {
        setIsLoading(true);
        const data = await getWorks();
        setWorks(data);
        setIsLoading(false);
    };

    useEffect(() => {
        refreshWorks();
    }, []);
    
    const isPending = isAdding || !!deletingId;

    const handleSubmit = (formData: FormData) => {
        const file = formData.get('imageFile') as File;
        const alt = formData.get('alt') as string;
        const hint = formData.get('hint') as string;

        if (!file || file.size === 0) {
            toast({ variant: 'destructive', title: 'Greška', description: 'Molimo odaberite sliku.' });
            return;
        }
        
        // Limit file size to 4MB
        if (file.size > 4 * 1024 * 1024) {
            toast({ variant: 'destructive', title: 'Greška', description: 'Slika je prevelika. Maksimalna veličina je 4MB.' });
            return;
        }

        startAddTransition(() => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const src = reader.result as string;
                
                const newImageData = new FormData();
                newImageData.append('src', src);
                newImageData.append('alt', alt);
                newImageData.append('hint', hint);

                const result = await addImage(newImageData);
                if (result?.error) {
                     toast({ variant: 'destructive', title: 'Greška', description: result.error });
                } else {
                    toast({ title: 'Uspjeh!', description: 'Slika je uspješno dodana.' });
                    formRef.current?.reset();
                    await refreshWorks();
                }
            };
            reader.onerror = () => {
                toast({ variant: 'destructive', title: 'Greška', description: 'Nije uspjelo čitanje fajla.' });
            };
        });
    }

    const handleRemoveImage = (work: Work) => {
         setDeletingId(work.id);
         const formData = new FormData();
         formData.append('id', work.id);
         formData.append('storagePath', work.storagePath);
         
         removeImage(formData).then(async (result) => {
            if (result?.error) {
                toast({ variant: 'destructive', title: 'Greška', description: result.error });
            } else {
                toast({ title: 'Uspjeh!', description: 'Slika je obrisana.'});
                await refreshWorks();
            }
         }).finally(() => {
            setDeletingId(null);
         });
    }

    return (
        <div className="grid gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Dodaj Novu Sliku</CardTitle>
                    <CardDescription>Ovdje možete uploadovati novu sliku u vašu galeriju.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form ref={formRef} action={handleSubmit} className="space-y-4 max-w-sm">
                        <div className="space-y-1.5">
                            <Label htmlFor="imageFile">Fajl Slike (Max 4MB)</Label>
                            <Input id="imageFile" name="imageFile" type="file" accept="image/png, image/jpeg, image/webp" required disabled={isPending} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="alt">Alternativni Tekst (Opis)</Label>
                            <Textarea id="alt" name="alt" placeholder="Moderna frizura sa čistim fadeom" required disabled={isPending}/>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="hint">AI Hint (do 2 riječi)</Label>
                            <Input id="hint" name="hint" type="text" placeholder="stylish haircut" required disabled={isPending}/>
                        </div>
                        <Button type="submit" disabled={isPending}>
                            {isAdding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Dodaj Sliku
                        </Button>
                    </form>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Postojeća Galerija</CardTitle>
                    <CardDescription>Pregledajte i uklonite slike iz galerije.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {Array.from({length: 10}).map((_, i) => <Skeleton key={i} className="w-full aspect-square" />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {works.map((work) => (
                              <div key={work.id} className="relative group">
                                <Image
                                    src={work.src}
                                    alt={work.alt}
                                    width={400}
                                    height={400}
                                    className="object-cover w-full h-full rounded-md"
                                    data-ai-hint={work.hint}
                                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <form action={() => handleRemoveImage(work)}>
                                        <Button variant="destructive" size="sm" type="submit" disabled={isPending}>
                                            {deletingId === work.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Obriši"}
                                        </Button>
                                    </form>
                                </div>
                              </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
