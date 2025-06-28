
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { bs } from "date-fns/locale";
import { X } from 'lucide-react';

export default function SettingsAdminPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [nonWorkingDays, setNonWorkingDays] = useState<Date[]>([
        new Date(2025, 0, 1), // New Year
        new Date(2025, 4, 1), // Labor Day
    ]);

    const addNonWorkingDay = () => {
        if (date && !nonWorkingDays.some(d => d.getTime() === date.getTime())) {
            setNonWorkingDays([...nonWorkingDays, date].sort((a,b) => a.getTime() - b.getTime()));
        }
    }

    const removeNonWorkingDay = (dayToRemove: Date) => {
        setNonWorkingDays(nonWorkingDays.filter(d => d.getTime() !== dayToRemove.getTime()));
    }

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
                      <Button onClick={addNonWorkingDay} disabled={!date}>Dodaj kao Neradni Dan</Button>
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
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeNonWorkingDay(day)}>
                                        <X className="h-4 w-4" />
                                    </Button>
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
