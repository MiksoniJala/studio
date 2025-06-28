
'use server';

import { redirect } from 'next/navigation';
import { suggestAlternativeTimes } from '@/ai/flows/suggest-alternative-times';
import type { SuggestAlternativeTimesOutput } from '@/ai/flows/suggest-alternative-times';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const bookingSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  barber: z.string().min(1, 'Please select a barber'),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone number is required'),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

// Simple in-memory "database" for demonstration purposes.
// This will be cleared on server restart.
const bookings: (BookingFormData & { id: number })[] = [];
let lastBookingId = 0;


export async function getSuggestions(
  preferredDate: string,
  preferredTime: string,
  barberName: string,
): Promise<SuggestAlternativeTimesOutput | null> {
  // This is a simplified check. In a real app, this would query a database.
  // We simulate that Miki is busy on the half-hour, and Huske is busy on the hour.
  const isMikiBusy = barberName === 'Miki' && preferredTime.endsWith(':30');
  const isHuskeBusy = barberName === 'Huske' && preferredTime.endsWith(':00');

  if (!isMikiBusy && !isHuskeBusy) {
    return null;
  }

  const allTimeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? "00" : "30";
    return `${String(hour).padStart(2, '0')}:${minute}`;
  });

  let availableSlots: string[];
  if (barberName === 'Miki') {
    availableSlots = allTimeSlots.filter(time => time.endsWith(':00'));
  } else if (barberName === 'Huske') {
    availableSlots = allTimeSlots.filter(time => time.endsWith(':30'));
  } else {
    availableSlots = allTimeSlots;
  }
  
  try {
    const suggestions = await suggestAlternativeTimes({
      preferredDate,
      preferredTime,
      barberName: barberName || 'any',
      availableSlots,
    });
    return suggestions;
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    return {
      alternativeTimes: [],
      reason: 'Imali smo problema s provjerom alternativnih termina. Molimo pokušajte drugo vrijeme ili dan.',
    };
  }
}

export async function createBooking(data: BookingFormData) {
  const result = bookingSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: 'Dostavljeni podaci su nevažeći.' };
  }
  
  lastBookingId++;
  const newBooking = { ...result.data, id: lastBookingId };
  bookings.push(newBooking);
  
  console.log('Nova Rezervacija Kreirana:', newBooking);

  // Revalidate the admin page to show the new booking
  revalidatePath('/admin');
  
  return { success: true };
}

export async function getBookings() {
  // In a real app, you would fetch from a database.
  // We return a sorted list of bookings, newest first.
  return [...bookings].sort((a, b) => b.id - a.id);
}

export type LoginState = {
  message: string | null;
};

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get('email');
  const password = formData.get('password');

  if (email === 'admin@primjer.com' && password === 'ryze2025') {
    redirect('/admin');
  }

  return { message: 'Nevažeći email ili lozinka.' };
}
