/**
 * Input validation helpers for the AnviGleams backend.
 * Called server-side before any Firestore query to prevent
 * malformed or malicious data from reaching the database.
 */

/** Valid Indian mobile number (10 digits, starts with 6-9) */
export function isValidPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.replace(/[\s+\-()]/g, ''));
}

/** Booking ID format: AG-XXXXXX (6 uppercase alphanumeric) */
export function isValidBookingId(id: string): boolean {
  return /^AG-[A-Z0-9]{6}$/.test(id);
}

/** Date in YYYY-MM-DD format, must be in the future */
export function isValidFutureDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
}

/** Time in HH:MM format */
export function isValidTime(time: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
}

/** Name: 1–100 printable characters, no script injection */
export function isValidName(name: string): boolean {
  const trimmed = name.trim();
  return trimmed.length >= 1 && trimmed.length <= 100 && !/[<>{}]/.test(trimmed);
}

/** Notes: optional, max 500 chars */
export function isValidNotes(notes: string): boolean {
  return notes.length <= 500;
}
