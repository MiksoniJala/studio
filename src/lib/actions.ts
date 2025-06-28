
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
  // We simulate that times ending in ":30" are booked.
  if (!preferredTime.endsWith(':30')) {
    return null;
  }
  
  try {
    const suggestions = await suggestAlternativeTimes({
      preferredDate,
      preferredTime,
      barberName: barberName || 'any',
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
