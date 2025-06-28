
"use client";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { bs } from "date-fns/locale";
import Image from "next/image";
import { Calendar as CalendarIcon, Clock, User, Phone, Scissors, Loader2, PartyPopper, ArrowRight, ArrowLeft } from "lucide-react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getDailyBookedSlots, createBooking } from "@/lib/actions";
import type { BookingFormData } from "@/lib/actions";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const bookingSchema = z.object({
  date: z.date({ required_error: "Molimo odaberite datum." }),
  time: z.string({ required_error: "Molimo odaberite vrijeme." }),
  barber: z.enum(["Miki", "Huske"], { required_error: "Molimo odaberite barbera." }),
  name: z.string().min(2, "Ime mora sadržavati najmanje 2 karaktera."),
  phone: z.string().min(5, "Molimo unesite važeći broj telefona."),
});

const timeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? "00" : "30";
    return `${String(hour).padStart(2, '0')}:${minute}`;
});

export function BookingForm({ barber }: { barber: string | null }) {
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);
  const { toast } = useToast();
  
  const barberDisplayName = barber === 'Miki' ? 'Mikija' : (barber === 'Huske' ? 'Husketa' : '');

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: new Date(),
      name: "",
      phone: "",
      barber: barber || undefined,
    },
  });

  const selectedDate = form.watch('date');

  useEffect(() => {
    if (barber && selectedDate) {
      const fetchBookedSlots = async () => {
        setIsLoadingSlots(true);
        const dateStr = format(selectedDate, "yyyy-MM-dd");
        const slots = await getDailyBookedSlots(dateStr, barber);
        setBookedSlots(slots);
        setIsLoadingSlots(false);
      };
      fetchBookedSlots();
    }
  }, [selectedDate, barber]);


  useEffect(() => {
    if (barber) {
        form.setValue('barber', barber as "Miki" | "Huske");
    }
  }, [barber, form]);

  const handleTimeSelect = (time: string) => {
    form.setValue("time", time);
    setStep(2);
  };

  const processForm = async (data: z.infer<typeof bookingSchema>) => {
    startTransition(async () => {
        const bookingData: BookingFormData = {
            ...data,
            date: format(data.date, 'yyyy-MM-dd')
        }
        const result = await createBooking(bookingData);
        if (result.success) {
            setStep(4);
        } else {
            toast({
                variant: "destructive",
                title: "Rezervacija neuspješna",
                description: result.error || "Nešto je pošlo po zlu. Molimo pokušajte ponovo.",
            });
        }
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">
          Rezervišite Svoj Termin kod {barberDisplayName}
        </CardTitle>
        <CardDescription>
            {step < 4 && `Korak ${step} od 3 - ${
                step === 1 ? "Odaberite Datum i Vrijeme" : 
                step === 2 ? "Vaše Informacije" :
                "Potvrdite Vašu Rezervaciju"
            }`}
            {step === 4 && "Rezervacija Potvrđena!"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)} className="space-y-8">
            {step === 1 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? format(field.value, "PPP", { locale: bs }) : <span>Izaberite datum</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="center">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                                field.onChange(date);
                                form.setValue("time", ""); // Reset time on date change
                            }}
                            disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                            initialFocus
                            locale={bs}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {isLoadingSlots
                    ? Array.from({ length: 16 }).map((_, i) => (
                        <Skeleton key={i} className="h-10" />
                      ))
                    : timeSlots.map((time) => {
                        const isBooked = bookedSlots.includes(time);
                        const isSelected = form.watch("time") === time;
                        
                        let variant: VariantProps<typeof buttonVariants>["variant"];

                        if (isBooked) {
                            variant = "destructive";
                        } else if (isSelected) {
                            variant = "default";
                        } else {
                            variant = "success";
                        }

                        return (
                          <Button
                            key={time}
                            type="button"
                            variant={variant}
                            onClick={() => handleTimeSelect(time)}
                            disabled={isBooked}
                            className="relative"
                          >
                            {time}
                          </Button>
                        );
                      })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 max-w-sm mx-auto">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Puno Ime</FormLabel>
                      <FormControl>
                        <Input placeholder="Neko Nekić" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Broj Telefona</FormLabel>
                      <FormControl>
                        <Input placeholder="061-123-456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {step === 3 && (
                <div className="space-y-6 text-center">
                    <h3 className="font-headline text-2xl">Potvrdite Vašu Rezervaciju</h3>
                    <Card className="text-left max-w-md mx-auto">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-4"><CalendarIcon className="w-5 h-5 text-muted-foreground" /><p><strong>Datum:</strong> {format(form.getValues("date"), "PPP", { locale: bs })}</p></div>
                            <div className="flex items-center gap-4"><Clock className="w-5 h-5 text-muted-foreground" /><p><strong>Vrijeme:</strong> {form.getValues("time")}</p></div>
                            <div className="flex items-center gap-4"><Scissors className="w-5 h-5 text-muted-foreground" /><p><strong>Barber:</strong> {form.getValues("barber")}</p></div>
                            <div className="flex items-center gap-4"><User className="w-5 h-5 text-muted-foreground" /><p><strong>Ime:</strong> {form.getValues("name")}</p></div>
                            <div className="flex items-center gap-4"><Phone className="w-5 h-5 text-muted-foreground" /><p><strong>Telefon:</strong> {form.getValues("phone")}</p></div>
                        </CardContent>
                    </Card>
                    <Button type="submit" size="lg" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Potvrdi Rezervaciju
                    </Button>
                </div>
            )}

            {step === 4 && (
                <div className="text-center py-10">
                    <PartyPopper className="w-16 h-16 mx-auto text-primary" />
                    <h3 className="font-headline text-2xl mt-4">Sve je spremno!</h3>
                    <p className="text-muted-foreground mt-2">Vaš termin je potvrđen. Radujemo se vašem dolasku.</p>
                    <div className="mt-6">
                        <Button variant="outline" onClick={() => { form.reset(); setStep(1); }}>Rezerviši Novi Termin</Button>
                    </div>
                </div>
            )}

            <div className="flex justify-between mt-8">
                {step > 1 && step < 4 && (
                    <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Vrati se Nazad
                    </Button>
                )}
                <div/>
                {step === 2 && (
                    <Button type="button" onClick={() => {
                        form.trigger(["name", "phone"]).then(isValid => {
                            if (isValid) setStep(step + 1);
                        });
                    }}>
                        Sljedeći Korak <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
