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
  const phone = normalizePhone(form.phone);
  const bookingId = generateBookingId();

  // Upsert customer
  const custQuery = query(collection(db, 'customers'), where('phone', '==', phone));
  const custSnap = await getDocs(custQuery);

  let customerId: string;
  if (custSnap.empty) {
    const custRef = await addDoc(collection(db, 'customers'), {
      name: form.name,
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
    name: form.name,
    phone,
    treatment: form.treatment,
    date: form.date,
    time: form.time,
    status: 'pending',
    notes: form.notes || '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    completedAt: null,
    acceptedAt: null,
    rejectedReason: null,
    offlineEntry: false,
  });

  return bookingId;
}

export async function getAppointmentsByPhone(rawPhone: string): Promise<TrackingResult[]> {
  const phone = normalizePhone(rawPhone);
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

    // Fetch payment if completed
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
}

export async function getTrackingResultsById(appointmentId: string): Promise<TrackingResult[]> {
  const q = query(
    collection(db, 'appointments'),
    where('appointmentId', '==', appointmentId)
  );
  const snap = await getDocs(q);
  if (snap.empty) return [];

  const d = snap.docs[0];
  const appt = docToAppointment(d.id, d.data() as Record<string, unknown>);

  // Fetch payment if completed
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
}

export async function cancelAppointment(appointmentId: string): Promise<void> {
  // Find by appointmentId field (not doc ID)
  const q = query(
    collection(db, 'appointments'),
    where('appointmentId', '==', appointmentId)
  );
  const snap = await getDocs(q);
  if (snap.empty) throw new Error('Appointment not found');

  const docRef = snap.docs[0].ref;
  const data = snap.docs[0].data() as Record<string, unknown>;

  if (data.status !== 'pending') {
    throw new Error('Only pending appointments can be cancelled. Please contact the studio.');
  }

  await updateDoc(docRef, {
    status: 'cancelled',
    updatedAt: serverTimestamp(),
  });
}

export async function getAppointmentById(appointmentId: string): Promise<Appointment | null> {
  const q = query(
    collection(db, 'appointments'),
    where('appointmentId', '==', appointmentId)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return docToAppointment(snap.docs[0].id, snap.docs[0].data() as Record<string, unknown>);
}

export async function getBookedTimeSlots(date: string): Promise<string[]> {
  const q = query(
    collection(db, 'appointments'),
    where('date', '==', date)
  );
  const snap = await getDocs(q);
  
  const bookedSlots: string[] = [];
  snap.forEach((doc) => {
    const data = doc.data();
    // Exclude cancelled or rejected appointments
    if (data.status !== 'cancelled' && data.status !== 'rejected') {
      bookedSlots.push(data.time as string);
    }
  });
  
  return bookedSlots;
}
