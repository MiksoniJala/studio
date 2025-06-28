
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import { bs } from "date-fns/locale";
import { X } from 'lucide-react';
import { addNonWorkingDay, removeNonWorkingDay } from '@/lib/actions';

export function SettingsClient({ nonWorkingDays: initialNonWorkingDays }: { nonWorkingDays: string[] }) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    
    const nonWorkingDays = initialNonWorkingDays.map(d => parseISO(d));

    const isDateAlreadyAdded = date ? nonWorkingDays.some(d => d.getTime() === date.getTime()) : false;

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Neradni Dani i Praznici</CardTitle>
                    <CardDescription>
                        Odaberite dane kada salon neće raditi. Ovi dani neće biti dostupni za rezervaciju.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                     <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        locale={bs}
                      />
                      <form action={addNonWorkingDay}>
                        {date && <input type="hidden" name="date" value={date.toISOString()} />}
                        <Button type="submit" disabled={!date || isDateAlreadyAdded}>
                            {isDateAlreadyAdded ? "Dan je već dodan" : "Dodaj kao Neradni Dan"}
                        </Button>
                      </form>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Lista Neradnih Dana</CardTitle>
                    <CardDescription>Svi dodani neradni dani i praznici.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {nonWorkingDays.length > 0 ? (
                            nonWorkingDays.map(day => (
                                <div key={day.toISOString()} className="flex items-center justify-between p-2 rounded-md bg-muted">
                                    <span className="font-medium">{format(day, "PPP", { locale: bs })}</span>
                                    <form action={removeNonWorkingDay}>
                                        <input type="hidden" name="date" value={day.toISOString()} />
                                        <Button variant="ghost" size="icon" className="h-6 w-6" type="submit">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground text-sm">Nema dodanih neradnih dana.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
