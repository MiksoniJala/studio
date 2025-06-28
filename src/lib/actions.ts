
'use server';

import { redirect } from 'next/navigation';
import { suggestAlternativeTimes } from '@/ai/flows/suggest-alternative-times';
import type { SuggestAlternativeTimesOutput } from '@/ai/flows/suggest-alternative-times';
import { z } from 'zod';

export async function getSuggestions(
  preferredDate: string,
  preferredTime: string,
  barberName: string,
): Promise<SuggestAlternativeTimesOutput | null> {
  // This is a simplified check. In a real app, this would query a database.
  // We simulate that Mirsad is busy on the half-hour, and Huske is busy on the hour.
  const isMirsadBusy = barberName === 'Mirsad' && preferredTime.endsWith(':30');
  const isHuskeBusy = barberName === 'Huske' && preferredTime.endsWith(':00');

  if (!isMirsadBusy && !isHuskeBusy) {
    return null;
  }

  const allTimeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? "00" : "30";
    return `${String(hour).padStart(2, '0')}:${minute}`;
  });

  let availableSlots: string[];
  if (barberName === 'Mirsad') {
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

const bookingSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  barber: z.string().min(1, 'Please select a barber'),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone number is required'),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export async function createBooking(data: BookingFormData) {
  const result = bookingSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: 'Dostavljeni podaci su nevažeći.' };
  }
  
  // In a real app, you would save this to a database.
  console.log('Nova Rezervacija Kreirana:', result.data);
  
  // We'll simulate success.
  return { success: true };
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
