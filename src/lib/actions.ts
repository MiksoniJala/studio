
'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { isSameDay, parseISO } from 'date-fns';

// --- DATA TYPES ---

const bookingSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  barber: z.string().min(1, 'Please select a barber'),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone number is required'),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export interface Barber {
    name: string;
    description: string;
    image: string;
    hint: string;
}

export interface Work {
    src: string;
    alt: string;
    hint: string;
}

// --- IN-MEMORY DATABASE ---

const globalForDb = globalThis as unknown as {
  bookings: (BookingFormData & { id: number })[];
  lastBookingId: number;
  barbers: Barber[];
  works: Work[];
  nonWorkingDays: Date[];
};

// Initialize the in-memory "database" 
if (!globalForDb.bookings) globalForDb.bookings = [];
if (globalForDb.lastBookingId === undefined) globalForDb.lastBookingId = 0;

if (!globalForDb.barbers) {
  globalForDb.barbers = [
    {
      name: "Miki",
      description: "Specijalista za klasične fade frizure i precizno oblikovanje brade.",
      image: "https://placehold.co/400x400.png",
      hint: "classic barber portrait"
    },
    {
      name: "Huske",
      description: "Mladi frizer sa strašću za modernim tehnikama i trendovima.",
      image: "https://placehold.co/400x400.png",
      hint: "modern barber portrait"
    }
  ];
}
if (!globalForDb.works) {
  globalForDb.works = [
    { src: "https://placehold.co/600x400.png", alt: "Moderna frizura sa čistim fadeom", hint: "stylish haircut" },
    { src: "https://placehold.co/600x400.png", alt: "Precizno šišanje i oblikovanje brade", hint: "beard trim" },
    { src: "https://placehold.co/600x400.png", alt: "Klasična muška frizura", hint: "classic haircut" },
    { src: "https://placehold.co/600x400.png", alt: "Moderna teksturirana frizura", hint: "modern hairstyle" },
    { src: "https://placehold.co/600x400.png", alt: "Oštra linija na svježoj frizuri", hint: "sharp lineup" },
    { src: "https://placehold.co/600x400.png", alt: "Usluga brijanja vrućim peškirom", hint: "hot towel" },
  ];
}
if (!globalForDb.nonWorkingDays) {
    globalForDb.nonWorkingDays = [
        new Date(2025, 0, 1), // New Year
        new Date(2025, 4, 1), // Labor Day
    ]
}


// --- AUTH ACTIONS ---

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
    cookies().set('session', 'true', { httpOnly: true, path: '/' });
    redirect('/admin');
  }

  return { message: 'Nevažeći email ili lozinka.' };
}

export async function logoutAction() {
    cookies().delete('session');
    redirect('/admin/login');
}


// --- BOOKING ACTIONS ---

export async function getDailyBookedSlots(
  date: string,
  barber: string
): Promise<string[]> {
  return globalForDb.bookings
    .filter(b => b.date === date && b.barber === barber)
    .map(b => b.time);
}

export async function createBooking(data: BookingFormData) {
  const result = bookingSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: 'Dostavljeni podaci su nevažeći.' };
  }
  
  const bookingDate = parseISO(result.data.date);

  if (bookingDate.getDay() === 0) {
      return { success: false, error: 'Nedjelja je neradni dan. Molimo izaberite drugi dan.' };
  }
  
  const isNonWorking = globalForDb.nonWorkingDays.some(d => isSameDay(d, bookingDate));
  if (isNonWorking) {
    return { success: false, error: 'Odabrani datum je neradni dan.' };
  }

  const isSlotTaken = globalForDb.bookings.some(
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
  globalForDb.bookings.push(newBooking);
  
  revalidatePath('/admin');
  revalidatePath('/');
  
  return { success: true };
}

export async function getBookings() {
  return [...globalForDb.bookings].sort((a, b) => b.id - a.id);
}

// --- BARBER ACTIONS ---

export async function getBarbers(): Promise<Barber[]> {
    return globalForDb.barbers;
}

// --- GALLERY ACTIONS ---

export async function getWorks(): Promise<Work[]> {
    return globalForDb.works;
}

const addImageSchema = z.object({
    src: z.string().min(1, 'Image data is required'),
    alt: z.string().min(1),
    hint: z.string().min(1),
});

export async function addImage(formData: FormData) {
    const newWork = {
        src: formData.get('src') as string,
        alt: formData.get('alt') as string,
        hint: formData.get('hint') as string,
    }
    const result = addImageSchema.safeParse(newWork);
    if (!result.success) {
        return { error: result.error.errors.map(e => e.message).join(', ') };
    }

    globalForDb.works.unshift(result.data);
    revalidatePath('/admin/gallery');
    revalidatePath('/');
    return { success: true };
}

const removeImageSchema = z.object({
    index: z.coerce.number(),
});

export async function removeImage(formData: FormData) {
    const result = removeImageSchema.safeParse({ index: formData.get('index') });

    if (result.success) {
        globalForDb.works.splice(result.data.index, 1);
        revalidatePath('/admin/gallery');
        revalidatePath('/');
    }
}


// --- SETTINGS ACTIONS ---

export async function getNonWorkingDays(): Promise<Date[]> {
    return globalForDb.nonWorkingDays;
}

export async function addNonWorkingDay(formData: FormData) {
    const dateStr = formData.get('date') as string;
    if (!dateStr) return;
    
    const date = parseISO(dateStr);
    
    if (!globalForDb.nonWorkingDays.some(d => isSameDay(d, date))) {
        globalForDb.nonWorkingDays.push(date);
        globalForDb.nonWorkingDays.sort((a, b) => a.getTime() - b.getTime());
        revalidatePath('/admin/settings');
        revalidatePath('/');
    }
}

export async function removeNonWorkingDay(formData: FormData) {
    const dateStr = formData.get('date') as string;
     if (!dateStr) return;

    const dateToRemove = parseISO(dateStr);
    globalForDb.nonWorkingDays = globalForDb.nonWorkingDays.filter(
        d => !isSameDay(d, dateToRemove)
    );
    revalidatePath('/admin/settings');
    revalidatePath('/');
}
