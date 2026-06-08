// ============================================================
// AnviGleams — Global TypeScript Types
// ============================================================

export type AppointmentStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'completed'
  | 'missed'
  | 'cancelled';

export interface Appointment {
  appointmentId: string;
  customerId: string;
  name: string;
  phone: string;
  treatment: string;
  date: string;           // YYYY-MM-DD
  time: string;           // HH:mm 24hr
  status: AppointmentStatus;
  notes: string;
  createdAt: string;      // ISO string
  updatedAt?: string;
  completedAt?: string | null;
  acceptedAt?: string | null;
  rejectedReason?: string | null;
  offlineEntry: boolean;
}

export interface Customer {
  customerId: string;
  name: string;
  phone: string;
  createdAt: string;
  totalVisits: number;
  lastVisitAt?: string;
}

export interface TreatmentFAQ {
  q: string;
  a: string;
}

export interface Treatment {
  treatmentId: string;
  name: string;
  slug: string;
  description: string;
  benefits: string[];
  price: number;          // 0 = price on consultation
  images: string[];
  faqs: TreatmentFAQ[];
  isActive: boolean;
  order: number;
}

export interface Payment {
  paymentId: string;
  appointmentId: string;
  customerId: string;
  amount: number;
  treatmentName: string;
  treatmentNotes: string;
  paid: boolean;
  paidAt?: string | null;
  createdAt: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  treatment: string;
  date: string;
  time: string;
  notes: string;
}

export interface TrackingResult {
  appointment: Appointment;
  payment?: Payment | null;
}

// Status display helpers
export const STATUS_CONFIG: Record<
  AppointmentStatus,
  { label: string; color: string; bgColor: string }
> = {
  pending: {
    label: 'Pending',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 border-amber-200',
  },
  accepted: {
    label: 'Confirmed',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-200',
  },
  rejected: {
    label: 'Rejected',
    color: 'text-red-600',
    bgColor: 'bg-red-50 border-red-200',
  },
  completed: {
    label: 'Completed',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
  },
  missed: {
    label: 'Missed',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50 border-gray-200',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 border-rose-200',
  },
};
