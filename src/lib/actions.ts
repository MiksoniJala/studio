
'use server';

import { redirect } from 'next/navigation';
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

// This is a workaround for preserving in-memory state in a development environment
// with hot-reloading. In a production app, you would use a proper database.
const globalForDb = globalThis as unknown as {
  bookings: (BookingFormData & { id: number })[];
  lastBookingId: number;
};

// Initialize the in-memory "database" if it doesn't exist on the global object
if (!globalForDb.bookings) {
  globalForDb.bookings = [];
}
if (globalForDb.lastBookingId === undefined) {
  globalForDb.lastBookingId = 0;
}

const bookings = globalForDb.bookings;


export async function getDailyBookedSlots(
  date: string,
  barber: string
): Promise<string[]> {
  return bookings
    .filter(b => b.date === date && b.barber === barber)
    .map(b => b.time);
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

  globalForDb.lastBookingId++;
  const newBooking = { ...result.data, id: globalForDb.lastBookingId };
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
