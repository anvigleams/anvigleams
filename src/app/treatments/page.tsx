import TreatmentsSection from '@/components/sections/TreatmentsSection';
import BookingCTA from '@/components/sections/BookingCTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Treatments',
  description: 'Explore AnviGleams full range of treatments: HydraFacial, Acne, Pigmentation, Scar Reduction, Skin Tightening, Miracle Treatment and more.',
};

export default function TreatmentsPage() {
  return (
    <>
      <div style={{ height: 40 }} /> {/* Spacer for navbar */}
      <TreatmentsSection />
      <BookingCTA />
    </>
  );
}
