import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TreatmentsSection from '@/components/sections/TreatmentsSection';
import ExpertSection from '@/components/sections/ExpertSection';
import GallerySection from '@/components/sections/GallerySection';
import BookingCTA from '@/components/sections/BookingCTA';
import type { Metadata } from 'next';
import SchemaOrg from '@/components/seo/SchemaOrg';

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
      <AboutSection />
      <TreatmentsSection preview />
      <ExpertSection />
      <GallerySection preview />
      <BookingCTA />
    </>
  );
}
