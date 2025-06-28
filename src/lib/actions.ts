
'use server';

import { redirect } from 'next/navigation';
import { suggestAlternativeTimes } from '@/ai/flows/suggest-alternative-times';
import type { SuggestAlternativeTimesOutput } from '@/ai/flows/suggest-alternative-times';
import { z } from 'zod';

export async function getSuggestions(
  preferredDate: string,
  preferredTime: string
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
      barberName: 'any', // Barber is selected in the next step
    });
    return suggestions;
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    return {
      alternativeTimes: [],
      reason: 'We had trouble checking for alternative times. Please try another time or day.',
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
    return { success: false, error: 'Invalid data provided.' };
  }
  
  // In a real app, you would save this to a database.
  console.log('New Booking Created:', result.data);
  
  // We'll simulate success.
  return { success: true };
}


export async function loginAction() {
    redirect('/admin');
}
