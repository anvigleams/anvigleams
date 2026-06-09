import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/lib/i18n';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { CLINIC_INFO } from '@/lib/data';

// Load both fonts via next/font — zero render-blocking, auto-optimised
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Best Skin Care Clinic in Sangamner | AnviGleams',
    template: '%s | AnviGleams Skin Clinic Sangamner',
  },
  description:
    'AnviGleams is the best skin care clinic in Sangamner. We specialize in Hydrafacial, Acne Treatment, Pigmentation Removal, and Skin Tightening. Book your appointment today!',
  keywords: [
    'Best Skin Care Clinic in Sangamner', 'Best Skin Care Studio in Sangamner', 
    'Best Skin Treatment in Sangamner', 'Best Skin Specialist in Sangamner', 
    'Best Aesthetic Clinic in Sangamner', 'Hydrafacial in Sangamner', 
    'Acne Treatment in Sangamner', 'Pigmentation Treatment in Sangamner', 
    'Scar Reduction Treatment in Sangamner', 'Skin Tightening Treatment in Sangamner',
    'Beauty Clinic in Sangamner', 'Skin Care Clinic in Ahmednagar'
  ],
  openGraph: {
    siteName: 'AnviGleams Skin & Aesthetics',
    locale: 'en_IN',
    type: 'website',
  },
  metadataBase: new URL('https://anvigleams.in'),
  icons: {
    icon: '/favicon.png',
  },
};

const medicalClinicSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "LocalBusiness", "HealthAndBeautyBusiness"],
  "name": CLINIC_INFO.name,
  "description": "AnviGleams is the best skin care clinic in Sangamner. We specialize in Hydrafacial, Acne Treatment, Pigmentation Removal, and Skin Tightening.",
  "image": "https://anvigleams.in/images/gallery1.png",
  "url": "https://anvigleams.in",
  "telephone": CLINIC_INFO.phone,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "House 4, Lane 4, Shankar Township Colony, Ghulewadi",
    "addressLocality": "Sangamner",
    "addressRegion": "Maharashtra",
    "postalCode": "422605",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.5761, 
    "longitude": 74.2070
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "10:00",
      "closes": "20:00"
    }
  ],
  "priceRange": "$$",
  "medicalSpecialty": ["Dermatologic", "Cosmetic"]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        <SchemaOrg schema={medicalClinicSchema} />
      </head>
      <body>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
