
'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

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

// This is a workaround for preserving in-memory state in a development environment
// with hot-reloading. In a production app, you would use a proper database.
const globalForDb = globalThis as unknown as {
  bookings: (BookingFormData & { id: number })[];
  lastBookingId: number;
  barbers: Barber[];
  works: Work[];
};

// Initialize the in-memory "database" if it doesn't exist
if (!globalForDb.bookings) globalForDb.bookings = [];
if (globalForDb.lastBookingId === undefined) globalForDb.lastBookingId = 0;

if (!globalForDb.barbers) {
  globalForDb.barbers = [
    {
      name: "Miki",
      description: "Specijalizovan za klasične fade frizure, precizno oblikovanje brade i frizure inspirisane tattoo art stilom. Sa svojih 18 godina, Miki donosi svježinu i kreativnost u svaki rez, kombinujući moderno s klasičnim tehnikama. Njegova preciznost, osjećaj za detalje i posvećenost klijentima čine ga savršenim izborom za one koji žele upečatljiv i besprijekoran izgled.",
      image: "https://placehold.co/400x400.png",
      hint: "classic barber portrait"
    },
    {
      name: "Huske",
      description: "Mladi i perspektivni frizer na praksi, poznat po velikoj želji za učenjem i istraživanjem novih trendova. Huske sa strašću prati moderne tehnike šišanja i stylinga, ne boji se eksperimentisati i uvijek je spreman ponuditi klijentima svježe, originalne ideje. Njegov entuzijazam, kreativnost i pristupačnost čine ga odličnim izborom za svakoga ko želi isprobati nešto novo i moderno.",
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
    src: z.string().url(),
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
    if (result.success) {
        globalForDb.works.unshift(result.data);
        revalidatePath('/admin/gallery');
    }
}

const removeImageSchema = z.object({
    index: z.coerce.number(),
});

export async function removeImage(formData: FormData) {
    const result = removeImageSchema.safeParse({ index: formData.get('index') });

    if (result.success) {
        globalForDb.works.splice(result.data.index, 1);
        revalidatePath('/admin/gallery');
    }
}
