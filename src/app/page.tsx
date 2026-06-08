import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TreatmentsSection from '@/components/sections/TreatmentsSection';
import ExpertSection from '@/components/sections/ExpertSection';
import GallerySection from '@/components/sections/GallerySection';
import BookingCTA from '@/components/sections/BookingCTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Skin Care Clinic in Sangamner | AnviGleams Skin Studio',
  description:
    'Experience world-class skin treatments at AnviGleams in Sangamner. We are the best skin care clinic offering Hydrafacial, acne treatment, pigmentation correction, scar reduction & more. Book your appointment today.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TreatmentsSection preview />
      <ExpertSection />
      <GallerySection preview />
      <BookingCTA />
    </>
  );
}
