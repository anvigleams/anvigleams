import GallerySection from '@/components/sections/GallerySection';
import BookingCTA from '@/components/sections/BookingCTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore the AnviGleams before and after gallery — real transformations from real clients.',
};

export default function GalleryPage() {
  return (
    <>
      <div style={{ height: 40 }} /> {/* Spacer for navbar */}
      <GallerySection />
      <BookingCTA />
    </>
  );
}
