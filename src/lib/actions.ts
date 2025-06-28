
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { isSameDay, parseISO } from 'date-fns';
import { db, storage } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';
import { headers } from 'next/headers';


// --- DATA TYPES ---

const bookingSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  barber: z.string().min(1, 'Please select a barber'),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  ipAddress: z.string().optional(),
  isFlagged: z.boolean().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export interface Booking extends BookingFormData {
    id: string;
}

export interface Barber {
    id: string;
    name: string;
    description: string;
    image: string;
    hint: string;
}

export interface Work {
    id: string;
    src: string;
    alt: string;
    hint: string;
    storagePath: string;
    createdAt?: Timestamp;
}


// --- BOOKING ACTIONS ---

export async function getDailyBookedSlots(
  date: string,
  barber: string
): Promise<string[]> {
  try {
    const q = query(
      collection(db, 'bookings'), 
      where('date', '==', date), 
      where('barber', '==', barber)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data().time);
  } catch (error) {
    console.error("Error fetching daily booked slots: ", error);
    return [];
  }
}

export async function createBooking(data: BookingFormData) {
  const result = bookingSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: 'Dostavljeni podaci su nevažeći.' };
  }
  
  const bookingDate = parseISO(result.data.date);

  // Server-side validation
  if (bookingDate.getDay() === 0) {
      return { success: false, error: 'Nedjelja je neradni dan. Molimo izaberite drugi dan.' };
  }
  
  const nonWorkingDays = await getNonWorkingDays();
  const isNonWorking = nonWorkingDays.some(d => isSameDay(d, bookingDate));
  if (isNonWorking) {
    return { success: false, error: 'Odabrani datum je neradni dan.' };
  }

  const bookedSlots = await getDailyBookedSlots(result.data.date, result.data.barber);
  if (bookedSlots.includes(result.data.time)) {
    return { success: false, error: 'Žao nam je, ovaj termin je upravo zauzet. Molimo izaberite drugi.' };
  }

  const ip = headers().get('x-forwarded-for') ?? 'Nije dostupna';
  
  let isFlagged = false;
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const q = query(
        collection(db, 'bookings'),
        where('phone', '==', result.data.phone)
    );
    const querySnapshot = await getDocs(q);
    const existingFutureBookings = querySnapshot.docs.filter(doc => {
        const d = parseISO(doc.data().date);
        return d >= today;
    });

    if (existingFutureBookings.length > 0) {
        isFlagged = true;
    }
  } catch (error) {
    console.error("Error checking for multiple bookings:", error);
  }
  
  try {
    await addDoc(collection(db, 'bookings'), {
      ...result.data,
      ipAddress: ip,
      isFlagged: isFlagged,
      createdAt: serverTimestamp(),
    });

    revalidatePath('/admin');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error("Error creating booking: ", error);
    return { success: false, error: 'Došlo je do greške prilikom kreiranja rezervacije.' };
  }
}

export async function getBookings(): Promise<Booking[]> {
   try {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Booking[];
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    return [];
  }
}

export async function deleteBooking(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) return;

    try {
        await deleteDoc(doc(db, 'bookings', id));
        revalidatePath('/admin');
    } catch (error) {
        console.error("Error deleting booking: ", error);
        // Optionally, return an error to be displayed in the UI
    }
}

// --- BARBER ACTIONS ---

export async function getBarbers(): Promise<Barber[]> {
   try {
    const querySnapshot = await getDocs(collection(db, 'barbers'));
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Barber[];
  } catch (error) {
    console.error("Error fetching barbers: ", error);
    return [];
  }
}

// --- GALLERY ACTIONS ---

export async function getWorks(): Promise<Work[]> {
    try {
        const q = query(collection(db, 'works'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        })) as Work[];
    } catch (error) {
        console.error("Error fetching works: ", error);
        return [];
    }
}

const addImageSchema = z.object({
    src: z.string().min(1, 'Image data is required'),
    alt: z.string().min(1),
    hint: z.string().min(1),
});

export async function addImage(formData: FormData) {
    const imageData = {
        src: formData.get('src') as string,
        alt: formData.get('alt') as string,
        hint: formData.get('hint') as string,
    }
    const result = addImageSchema.safeParse(imageData);
    if (!result.success) {
        return { error: result.error.errors.map(e => e.message).join(', ') };
    }

    try {
      const storagePath = `gallery/${Date.now()}_${result.data.alt.replace(/\s+/g, '-')}`;
      const storageRef = ref(storage, storagePath);
      
      const uploadResult = await uploadString(storageRef, result.data.src, 'data_url');
      const downloadURL = await getDownloadURL(uploadResult.ref);

      await addDoc(collection(db, 'works'), {
        src: downloadURL,
        alt: result.data.alt,
        hint: result.data.hint,
        storagePath: storagePath,
        createdAt: serverTimestamp(),
      });
      
      revalidatePath('/admin/gallery');
      revalidatePath('/');
      return { success: true };
    } catch(error) {
       console.error("Error adding image: ", error);
       return { error: "Nije uspjelo dodavanje slike." };
    }
}

const removeImageSchema = z.object({
    id: z.string(),
    storagePath: z.string(),
});

export async function removeImage(formData: FormData) {
    const result = removeImageSchema.safeParse({ 
      id: formData.get('id'),
      storagePath: formData.get('storagePath')
    });

    if (!result.success) {
      return { error: "Nevažeći podaci za brisanje." };
    }
    
    try {
      // Delete from storage
      const storageRef = ref(storage, result.data.storagePath);
      await deleteObject(storageRef);
      
      // Delete from firestore
      await deleteDoc(doc(db, 'works', result.data.id));

      revalidatePath('/admin/gallery');
      revalidatePath('/');
      return { success: true };
    } catch (error) {
      console.error("Error removing image: ", error);
      return { error: "Nije uspjelo brisanje slike." };
    }
}


// --- SETTINGS ACTIONS ---

export async function getNonWorkingDays(): Promise<Date[]> {
    try {
        const querySnapshot = await getDocs(collection(db, 'nonWorkingDays'));
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return (data.date as Timestamp).toDate();
        });
    } catch (error) {
        console.error("Error fetching non-working days: ", error);
        return [];
    }
}

export async function addNonWorkingDay(formData: FormData) {
    const dateStr = formData.get('date') as string;
    if (!dateStr) return;
    
    const date = parseISO(dateStr);
    const nonWorkingDays = await getNonWorkingDays();

    if (!nonWorkingDays.some(d => isSameDay(d, date))) {
        await addDoc(collection(db, 'nonWorkingDays'), { date });
        revalidatePath('/admin/settings');
        revalidatePath('/');
    }
}

export async function removeNonWorkingDay(formData: FormData) {
    const dateStr = formData.get('date') as string;
    if (!dateStr) return;

    try {
        const dateToRemove = parseISO(dateStr);
        const q = query(collection(db, 'nonWorkingDays'));
        const querySnapshot = await getDocs(q);

        let docIdToDelete: string | null = null;
        querySnapshot.forEach((document) => {
            const day = (document.data().date as Timestamp).toDate();
            if (isSameDay(day, dateToRemove)) {
                docIdToDelete = document.id;
            }
        });
        
        if (docIdToDelete) {
            await deleteDoc(doc(db, 'nonWorkingDays', docIdToDelete));
            revalidatePath('/admin/settings');
            revalidatePath('/');
        }
    } catch (error) {
        console.error("Error removing non-working day:", error);
    }
}
