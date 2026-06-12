'use server';

import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Appointment, Customer, Payment, BookingFormData, TrackingResult } from '@/types';
import { checkRateLimit } from '@/lib/rateLimiter';
import {
  isValidPhone,
  isValidBookingId,
  isValidFutureDate,
  isValidTime,
  isValidName,
  isValidNotes,
} from '@/lib/validation';

// ─── Helpers ─────────────────────────────────────────────────

function generateBookingId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = 'AG-';
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits.startsWith('91') ? `+${digits}` : `+91${digits}`;
}

function tsToString(ts: Timestamp | string | null | undefined): string {
  if (!ts) return '';
  if (typeof ts === 'string') return ts;
  return (ts as Timestamp).toDate().toISOString();
}

function docToAppointment(id: string, data: Record<string, unknown>): Appointment {
  return {
    appointmentId: (data.appointmentId as string) || id,
    customerId: (data.customerId as string) || '',
    name: (data.name as string) || '',
    phone: (data.phone as string) || '',
    treatment: (data.treatment as string) || '',
    date: (data.date as string) || '',
    time: (data.time as string) || '',
    status: (data.status as Appointment['status']) || 'pending',
    notes: (data.notes as string) || '',
    createdAt: tsToString(data.createdAt as Timestamp | string),
    updatedAt: tsToString(data.updatedAt as Timestamp | string),
    completedAt: tsToString(data.completedAt as Timestamp | string | null),
    acceptedAt: tsToString(data.acceptedAt as Timestamp | string | null),
    rejectedReason: (data.rejectedReason as string) || null,
    offlineEntry: Boolean(data.offlineEntry),
  };
}

// ─── Appointment Service ──────────────────────────────────────

export async function createAppointment(form: BookingFormData): Promise<string> {
  // ── Input Validation ──────────────────────────────────────
  if (!isValidName(form.name)) {
    throw new Error('Invalid name provided.');
  }
  if (!isValidPhone(form.phone)) {
    throw new Error('Invalid phone number provided.');
  }
  if (!form.treatment || form.treatment.trim().length < 1 || form.treatment.length > 100) {
    throw new Error('Invalid treatment selected.');
  }
  if (!isValidFutureDate(form.date)) {
    throw new Error('Invalid or past date selected.');
  }
  if (!isValidTime(form.time)) {
    throw new Error('Invalid time selected.');
  }
  if (form.notes && !isValidNotes(form.notes)) {
    throw new Error('Notes exceed maximum length.');
  }

  // ── Rate Limiting — by normalized phone ──────────────────
  const phone = normalizePhone(form.phone);
  const { allowed } = checkRateLimit(`book:${phone}`, 3, 60 * 1000); // 3 bookings/min per phone
  if (!allowed) {
    throw new Error('Too many booking attempts. Please wait a moment and try again.');
  }

  try {
    const bookingId = generateBookingId();

    // Upsert customer
    const custQuery = query(collection(db, 'customers'), where('phone', '==', phone));
    const custSnap = await getDocs(custQuery);

    let customerId: string;
    if (custSnap.empty) {
      const custRef = await addDoc(collection(db, 'customers'), {
        name: form.name.trim(),
        phone,
        createdAt: serverTimestamp(),
        totalVisits: 0,
      });
      customerId = custRef.id;
    } else {
      customerId = custSnap.docs[0].id;
    }

    // Create appointment
    await addDoc(collection(db, 'appointments'), {
      appointmentId: bookingId,
      customerId,
      name: form.name.trim(),
      phone,
      treatment: form.treatment.trim(),
      date: form.date,
      time: form.time,
      status: 'pending',
      notes: (form.notes || '').trim().slice(0, 500),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      completedAt: null,
      acceptedAt: null,
      rejectedReason: null,
      offlineEntry: false,
    });

    return bookingId;
  } catch (error: unknown) {
    // Re-throw known validation/rate-limit errors as-is
    if (error instanceof Error && (
      error.message.startsWith('Invalid') ||
      error.message.startsWith('Too many')
    )) {
      throw error;
    }
    // Log internal errors server-side, return generic message to client
    console.error('[createAppointment] Firestore error:', error);
    throw new Error('Failed to book appointment. Please try again.');
  }
}

export async function getAppointmentsByPhone(rawPhone: string): Promise<TrackingResult[]> {
  // ── Input Validation ──────────────────────────────────────
  if (!isValidPhone(rawPhone)) {
    throw new Error('Invalid phone number provided.');
  }

  const phone = normalizePhone(rawPhone);

  // ── Rate Limiting — 10 lookups/min per phone ─────────────
  const { allowed } = checkRateLimit(`track:phone:${phone}`, 10, 60 * 1000);
  if (!allowed) {
    throw new Error('Too many requests. Please wait a moment and try again.');
  }

  try {
    const q = query(
      collection(db, 'appointments'),
      where('phone', '==', phone),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    if (snap.empty) return [];

    const results: TrackingResult[] = [];

    for (const d of snap.docs) {
      const appt = docToAppointment(d.id, d.data() as Record<string, unknown>);

      let payment: Payment | null = null;
      if (appt.status === 'completed') {
        const payQ = query(
          collection(db, 'payments'),
          where('appointmentId', '==', appt.appointmentId)
        );
        const paySnap = await getDocs(payQ);
        if (!paySnap.empty) {
          const pd = paySnap.docs[0].data() as Record<string, unknown>;
          payment = {
            paymentId: paySnap.docs[0].id,
            appointmentId: (pd.appointmentId as string) || '',
            customerId: (pd.customerId as string) || '',
            amount: Number(pd.amount) || 0,
            treatmentName: (pd.treatmentName as string) || '',
            treatmentNotes: (pd.treatmentNotes as string) || '',
            paid: Boolean(pd.paid),
            paidAt: tsToString(pd.paidAt as Timestamp | string | null),
            createdAt: tsToString(pd.createdAt as Timestamp | string),
          };
        }
      }

      results.push({ appointment: appt, payment });
    }

    return results;
  } catch (error: unknown) {
    if (error instanceof Error && error.message.startsWith('Too many')) throw error;
    console.error('[getAppointmentsByPhone] Firestore error:', error);
    throw new Error('Failed to retrieve appointments. Please try again.');
  }
}

export async function getTrackingResultsById(appointmentId: string): Promise<TrackingResult[]> {
  // ── Input Validation ──────────────────────────────────────
  if (!isValidBookingId(appointmentId)) {
    throw new Error('Invalid booking ID format.');
  }

  // ── Rate Limiting ─────────────────────────────────────────
  const { allowed } = checkRateLimit(`track:id:${appointmentId}`, 10, 60 * 1000);
  if (!allowed) {
    throw new Error('Too many requests. Please wait a moment and try again.');
  }

  try {
    const q = query(
      collection(db, 'appointments'),
      where('appointmentId', '==', appointmentId)
    );
    const snap = await getDocs(q);
    if (snap.empty) return [];

    const d = snap.docs[0];
    const appt = docToAppointment(d.id, d.data() as Record<string, unknown>);

    let payment: Payment | null = null;
    if (appt.status === 'completed') {
      const payQ = query(
        collection(db, 'payments'),
        where('appointmentId', '==', appt.appointmentId)
      );
      const paySnap = await getDocs(payQ);
      if (!paySnap.empty) {
        const pd = paySnap.docs[0].data() as Record<string, unknown>;
        payment = {
          paymentId: paySnap.docs[0].id,
          appointmentId: (pd.appointmentId as string) || '',
          customerId: (pd.customerId as string) || '',
          amount: Number(pd.amount) || 0,
          treatmentName: (pd.treatmentName as string) || '',
          treatmentNotes: (pd.treatmentNotes as string) || '',
          paid: Boolean(pd.paid),
          paidAt: tsToString(pd.paidAt as Timestamp | string | null),
          createdAt: tsToString(pd.createdAt as Timestamp | string),
        };
      }
    }

    return [{ appointment: appt, payment }];
  } catch (error: unknown) {
    if (error instanceof Error && error.message.startsWith('Too many')) throw error;
    console.error('[getTrackingResultsById] Firestore error:', error);
    throw new Error('Failed to retrieve appointment. Please try again.');
  }
}

export async function cancelAppointment(appointmentId: string): Promise<void> {
  // ── Input Validation ──────────────────────────────────────
  if (!isValidBookingId(appointmentId)) {
    throw new Error('Invalid booking ID format.');
  }

  // ── Rate Limiting — 3 cancel attempts/min per booking ID ─
  const { allowed } = checkRateLimit(`cancel:${appointmentId}`, 3, 60 * 1000);
  if (!allowed) {
    throw new Error('Too many requests. Please wait a moment and try again.');
  }

  try {
    const q = query(
      collection(db, 'appointments'),
      where('appointmentId', '==', appointmentId)
    );
    const snap = await getDocs(q);
    if (snap.empty) throw new Error('Appointment not found.');

    const docRef = snap.docs[0].ref;
    const data = snap.docs[0].data() as Record<string, unknown>;

    if (data.status !== 'pending') {
      throw new Error('Only pending appointments can be cancelled. Please contact the studio.');
    }

    await updateDoc(docRef, {
      status: 'cancelled',
      updatedAt: serverTimestamp(),
    });
  } catch (error: unknown) {
    // Re-throw user-facing errors unchanged
    if (error instanceof Error && (
      error.message.includes('not found') ||
      error.message.includes('pending') ||
      error.message.startsWith('Too many')
    )) {
      throw error;
    }
    console.error('[cancelAppointment] Firestore error:', error);
    throw new Error('Failed to cancel appointment. Please contact the studio.');
  }
}

export async function getAppointmentById(appointmentId: string): Promise<Appointment | null> {
  if (!isValidBookingId(appointmentId)) return null;
  try {
    const q = query(
      collection(db, 'appointments'),
      where('appointmentId', '==', appointmentId)
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return docToAppointment(snap.docs[0].id, snap.docs[0].data() as Record<string, unknown>);
  } catch (error) {
    console.error('[getAppointmentById] Firestore error:', error);
    return null;
  }
}

export async function getBookedTimeSlots(date: string): Promise<string[]> {
  // ── Input Validation ──────────────────────────────────────
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];

  try {
    const q = query(
      collection(db, 'appointments'),
      where('date', '==', date)
    );
    const snap = await getDocs(q);

    const bookedSlots: string[] = [];
    snap.forEach((doc) => {
      const data = doc.data();
      if (data.status !== 'cancelled' && data.status !== 'rejected') {
        bookedSlots.push(data.time as string);
      }
    });

    return bookedSlots;
  } catch (error) {
    console.error('[getBookedTimeSlots] Firestore error:', error);
    return []; // Fail open — slots appear available; Firestore rules will still protect writes
  }
}
