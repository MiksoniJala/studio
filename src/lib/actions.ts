
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
  // Check if a booking already exists for this date, time, and barber.
  const isSlotTaken = bookings.some(
    booking =>
      booking.date === preferredDate &&
      booking.time === preferredTime &&
      booking.barber === barberName
  );

  // If the slot is not taken, it's available. Return null.
  if (!isSlotTaken) {
    return null;
  }

  // If the slot is taken, proceed to suggest alternatives.
  const allTimeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? "00" : "30";
    return `${String(hour).padStart(2, '0')}:${minute}`;
  });

  // Find all slots that are already booked for that barber on that day.
  const bookedSlotsForDay = bookings
    .filter(b => b.date === preferredDate && b.barber === barberName)
    .map(b => b.time);

  // Available slots are all slots minus the booked ones.
  const availableSlots = allTimeSlots.filter(
    slot => !bookedSlotsForDay.includes(slot)
  );
  
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
  
  // Before creating a new booking, double-check if the slot is still available.
  const isSlotTaken = bookings.some(
    booking =>
      booking.date === result.data.date &&
      booking.time === result.data.time &&
      booking.barber === result.data.barber
  );
  
  if (isSlotTaken) {
    return { success: false, error: 'Žao nam je, ovaj termin je upravo zauzet. Molimo izaberite drugi.' };
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
