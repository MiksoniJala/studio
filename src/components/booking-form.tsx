
"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import Image from "next/image";
import { Calendar as CalendarIcon, Clock, User, Phone, Scissors, Loader2, PartyPopper, AlertTriangle, ArrowRight, ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getSuggestions, createBooking } from "@/lib/actions";
import type { BookingFormData } from "@/lib/actions";
import type { SuggestAlternativeTimesOutput } from "@/ai/flows/suggest-alternative-times";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  date: z.date({ required_error: "Please select a date." }),
  time: z.string({ required_error: "Please select a time." }),
  barber: z.enum(["Mirsad", "Huske"], { required_error: "Please select a barber." }),
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(5, "Please enter a valid phone number."),
});

const timeSlots = Array.from({ length: 18 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9;
    const minute = i % 2 === 0 ? "00" : "30";
    return `${String(hour).padStart(2, '0')}:${minute}`;
});

const barbers = [
    { name: "Mirsad", id: "mirsad", image: "https://placehold.co/200x200.png", hint: "male portrait" },
    { name: "Huske", id: "huske", image: "https://placehold.co/200x200.png", hint: "male portrait" },
]

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<SuggestAlternativeTimesOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: new Date(),
      name: "",
      phone: "",
    },
  });

  const handleTimeSelect = (time: string) => {
    form.setValue("time", time);
    setSuggestions(null);
    startTransition(async () => {
      const date = form.getValues("date");
      const result = await getSuggestions(format(date, "yyyy-MM-dd"), time);
      if (result) {
        setSuggestions(result);
      } else {
        setStep(2);
      }
    });
  };

  const processForm = async (data: z.infer<typeof bookingSchema>) => {
    startTransition(async () => {
        const bookingData: BookingFormData = {
            ...data,
            date: format(data.date, 'yyyy-MM-dd')
        }
        const result = await createBooking(bookingData);
        if (result.success) {
            setStep(5);
        } else {
            toast({
                variant: "destructive",
                title: "Booking Failed",
                description: result.error || "Something went wrong. Please try again.",
            });
        }
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Book Your Slot</CardTitle>
        <CardDescription>
            {step < 5 && `Step ${step} of 4 - ${
                step === 1 ? "Choose Date & Time" : 
                step === 2 ? "Select Your Barber" :
                step === 3 ? "Your Information" :
                "Confirm Your Booking"
            }`}
            {step === 5 && "Booking Confirmed!"}
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
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="center">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {timeSlots.map((time) => {
                    const isSelected = form.watch("time") === time;
                    return (
                      <Button
                        key={time}
                        type="button"
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => handleTimeSelect(time)}
                        disabled={isPending}
                        className="relative"
                      >
                        {isPending && isSelected && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {time}
                      </Button>
                    );
                  })}
                </div>

                {isPending && <p className="text-center text-muted-foreground">Checking availability...</p>}
                
                {suggestions && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Time Slot Unavailable</AlertTitle>
                    <AlertDescription>
                      <p className="mb-2">{suggestions.reason}</p>
                      {suggestions.alternativeTimes.length > 0 && <p className="font-semibold mb-2">We suggest these alternative times:</p>}
                      <div className="flex gap-2">
                        {suggestions.alternativeTimes.map(altTime => (
                          <Button key={altTime} variant="secondary" size="sm" onClick={() => handleTimeSelect(altTime)}>
                            {altTime}
                          </Button>
                        ))}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {step === 2 && (
              <FormField
                control={form.control}
                name="barber"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                    <FormLabel className="text-xl font-headline">Choose your artisan</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
                      >
                        {barbers.map(barber => (
                            <FormItem key={barber.id}>
                                <FormControl>
                                <RadioGroupItem value={barber.name} className="sr-only" />
                                </FormControl>
                                <FormLabel className={cn(
                                    "flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all",
                                    field.value === barber.name && "border-primary"
                                )}>
                                    <Image src={barber.image} alt={barber.name} width={80} height={80} className="rounded-full mb-4" data-ai-hint={barber.hint} />
                                    <span className="font-bold text-lg font-headline">{barber.name}</span>
                                </FormLabel>
                            </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {step === 3 && (
              <div className="space-y-4 max-w-sm mx-auto">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="555-123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {step === 4 && (
                <div className="space-y-6 text-center">
                    <h3 className="font-headline text-2xl">Confirm Your Booking</h3>
                    <Card className="text-left max-w-md mx-auto">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-4"><CalendarIcon className="w-5 h-5 text-muted-foreground" /><p><strong>Date:</strong> {format(form.getValues("date"), "PPP")}</p></div>
                            <div className="flex items-center gap-4"><Clock className="w-5 h-5 text-muted-foreground" /><p><strong>Time:</strong> {form.getValues("time")}</p></div>
                            <div className="flex items-center gap-4"><Scissors className="w-5 h-5 text-muted-foreground" /><p><strong>Barber:</strong> {form.getValues("barber")}</p></div>
                            <div className="flex items-center gap-4"><User className="w-5 h-5 text-muted-foreground" /><p><strong>Name:</strong> {form.getValues("name")}</p></div>
                            <div className="flex items-center gap-4"><Phone className="w-5 h-5 text-muted-foreground" /><p><strong>Phone:</strong> {form.getValues("phone")}</p></div>
                        </CardContent>
                    </Card>
                    <Button type="submit" size="lg" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Confirm Booking
                    </Button>
                </div>
            )}

            {step === 5 && (
                <div className="text-center py-10">
                    <PartyPopper className="w-16 h-16 mx-auto text-primary" />
                    <h3 className="font-headline text-2xl mt-4">All Set!</h3>
                    <p className="text-muted-foreground mt-2">Your appointment is confirmed. We're looking forward to seeing you.</p>
                    <div className="mt-6">
                        <Button variant="outline" onClick={() => { form.reset(); setStep(1); }}>Book Another Appointment</Button>
                    </div>
                </div>
            )}

            <div className="flex justify-between mt-8">
                {step > 1 && step < 5 && (
                    <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                    </Button>
                )}
                <div/>
                {step > 1 && step < 4 && (
                    <Button type="button" onClick={() => {
                        const fieldsToValidate: ("barber" | "name" | "phone")[] = step === 2 ? ["barber"] : ["name", "phone"];
                        form.trigger(fieldsToValidate).then(isValid => {
                            if (isValid) setStep(step + 1);
                        });
                    }}>
                        Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
