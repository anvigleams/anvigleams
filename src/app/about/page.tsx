import AboutSection from '@/components/sections/AboutSection';
import BookingCTA from '@/components/sections/BookingCTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about AnviGleams Skin & Aesthetics — our mission, values, and commitment to helping every client achieve their best skin.',
};

export default function AboutPage() {
  return (
    <>
      <div style={{ height: 40 }} /> {/* Spacer for navbar */}
      <AboutSection />
      <BookingCTA />
    </>
  );
}
