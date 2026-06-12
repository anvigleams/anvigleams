import HeroSection from '@/components/sections/HeroSection';
import Marquee from '@/components/ui/Marquee';
import WaveDivider from '@/components/ui/WaveDivider';
import type { Metadata } from 'next';
import SchemaOrg from '@/components/seo/SchemaOrg';
import dynamic from 'next/dynamic';

const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), { ssr: true });
const TreatmentsSection = dynamic(() => import('@/components/sections/TreatmentsSection'), { ssr: true });
const ExpertSection = dynamic(() => import('@/components/sections/ExpertSection'), { ssr: true });
const ReviewsSection = dynamic(() => import('@/components/sections/ReviewsSection'), { ssr: true });
const GallerySection = dynamic(() => import('@/components/sections/GallerySection'), { ssr: true });
const BookingCTA = dynamic(() => import('@/components/sections/BookingCTA'), { ssr: true });

export const metadata: Metadata = {
  title: 'Best Skin Care Clinic in Sangamner | AnviGleams Skin Studio',
  description:
    'Experience world-class skin treatments at AnviGleams in Sangamner. We are the best skin care clinic offering Hydrafacial, acne treatment, pigmentation correction, scar reduction & more. Book your appointment today.',
};

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which is the best skin care clinic in Sangamner?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AnviGleams Skin Studio provides Hydrafacial, acne treatment, pigmentation correction and advanced aesthetic procedures in Sangamner."
        }
      },
      {
        "@type": "Question",
        "name": "What treatments are available at AnviGleams Skin Studio in Sangamner?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We specialize in advanced clinical treatments including Hydrafacial, Acne and Scar Reduction, Pigmentation Correction, Skin Tightening, Laser Hair Reduction, and Medi-Facials."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a certified skin specialist at AnviGleams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our clinic is led by Pramila Wakale, a certified skin and aesthetic expert from Cosmetica India Academy, providing safe and customized treatments for all skin types."
        }
      },
      {
        "@type": "Question",
        "name": "Where is AnviGleams Skin Studio located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We are located at House 4, Lane 4, Shankar Township Colony, Ghulewadi, Sangamner, Maharashtra 422605. We frequently serve clients from Sangamner, Ahmednagar, and Nashik."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer solutions for glowing skin and anti-aging?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We offer customized Hydrafacials, Carbon Facials, and Skin Tightening procedures that provide instant glow and long-term anti-aging benefits with minimal to no downtime."
        }
      }
    ]
  };

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <HeroSection />
      <Marquee />
      <WaveDivider topColor="var(--crimson-dark)" bottomColor="var(--bg)" height={48} />
      <AboutSection />
      <WaveDivider topColor="var(--bg)" bottomColor="var(--bg-soft)" />
      <TreatmentsSection preview />
      <WaveDivider topColor="var(--bg-soft)" bottomColor="var(--bg)" />
      <ExpertSection />
      <WaveDivider topColor="var(--bg)" bottomColor="var(--bg-soft)" />
      <ReviewsSection />
      <WaveDivider topColor="var(--bg-soft)" bottomColor="var(--bg)" flip />
      <GallerySection preview />
      <WaveDivider topColor="var(--bg)" bottomColor="var(--crimson)" />
      <BookingCTA />
    </>
  );
}
