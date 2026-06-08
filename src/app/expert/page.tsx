import ExpertSection from '@/components/sections/ExpertSection';
import BookingCTA from '@/components/sections/BookingCTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Expert',
  description: 'Meet the certified aesthetic expert behind AnviGleams — qualifications, specializations, and years of excellence.',
};

export default function ExpertPage() {
  return (
    <>
      <div style={{ height: 40 }} /> {/* Spacer for navbar */}
      <ExpertSection />
      <BookingCTA />
    </>
  );
}
