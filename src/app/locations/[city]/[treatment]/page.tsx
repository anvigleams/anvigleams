import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, CheckCircle, ArrowLeft, Sparkles, ChevronDown } from 'lucide-react';
import { TREATMENTS } from '@/lib/data';
import type { Metadata } from 'next';
import SchemaOrg from '@/components/seo/SchemaOrg';

// Define the target local SEO cities
const TARGET_CITIES = ['sangamner', 'ahmednagar', 'nashik'];

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface Props { params: Promise<{ city: string; treatment: string }> }

export async function generateStaticParams() {
  const params: { city: string; treatment: string }[] = [];
  
  for (const city of TARGET_CITIES) {
    for (const t of TREATMENTS) {
      params.push({ city, treatment: t.slug });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, treatment } = await params;
  const t = TREATMENTS.find((x) => x.slug === treatment);
  if (!t || !TARGET_CITIES.includes(city.toLowerCase())) return {};
  
  const cityName = capitalize(city);
  
  return { 
    title: `Best ${t.name} in ${cityName} | AnviGleams Skin Clinic`, 
    description: `Looking for the best ${t.name} in ${cityName}? AnviGleams offers advanced clinical skin treatments. ${t.description.slice(0, 100)}... Book now!`,
    keywords: [`${t.name} in ${cityName}`, `Best ${t.name} near ${cityName}`, `Skin Care Clinic in ${cityName}`, `AnviGleams ${cityName}`],
    alternates: {
      canonical: `/locations/${city}/${t.slug}`,
    },
    openGraph: {
      title: `Best ${t.name} in ${cityName} | AnviGleams`,
      description: `Looking for the best ${t.name} in ${cityName}? AnviGleams offers advanced clinical skin treatments.`,
      url: `/locations/${city}/${t.slug}`,
      images: [
        {
          url: t.images[0],
          width: 800,
          height: 600,
          alt: `${t.name} in ${cityName}`,
        },
      ],
    }
  };
}

export default async function LocationTreatmentPage({ params }: Props) {
  const { city, treatment } = await params;
  const t = TREATMENTS.find((x) => x.slug === treatment);
  if (!t || !TARGET_CITIES.includes(city.toLowerCase())) notFound();

  const cityName = capitalize(city);
  const localizedTitle = `${t.name} in ${cityName}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": t.faqs.map(faq => ({
      "@type": "Question",
      "name": `How does AnviGleams do ${faq.q.toLowerCase()} in ${cityName}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://anvigleams.in/" },
      { "@type": "ListItem", "position": 2, "name": "Treatments", "item": "https://anvigleams.in/treatments" },
      { "@type": "ListItem", "position": 3, "name": localizedTitle, "item": `https://anvigleams.in/locations/${city}/${t.slug}` }
    ]
  };

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      {/* Hero */}
      <div style={{ background: 'var(--bg-soft)', borderBottom: '1px solid var(--border-light)', padding: '56px 24px 40px' }}>
        <div className="container">
          <Link href="/treatments" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--text-muted)', fontFamily: 'var(--sans)', fontSize: '0.83rem', textDecoration: 'none', marginBottom: 20 }}>
            <ArrowLeft size={15} /> All Treatments
          </Link>
          <h1 className="display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--text-primary)', marginBottom: 16, maxWidth: 640 }}>
            Best {t.name} in {cityName}
          </h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: 560, lineHeight: 1.75 }}>
            Are you searching for the most effective <strong>{t.name.toLowerCase()} in {cityName}</strong>? Look no further. 
            AnviGleams provides advanced clinical care. {t.description}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="container section-sm">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48 }}>
          {/* Benefits */}
          <div>
            <h2 className="display" style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: 20 }}>Why Choose Us in {cityName}?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {t.benefits.map((b) => (
                <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle size={17} color="var(--crimson)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '0.93rem', color: 'var(--text-primary)', lineHeight: 1.55 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="display" style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: 20 }}>{cityName} Patient FAQs</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {t.faqs.map((faq, i) => (
                <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
                  <div style={{ padding: '14px 18px', background: 'var(--bg-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</span>
                    <ChevronDown size={15} color="var(--rose)" style={{ flexShrink: 0 }} />
                  </div>
                  <div style={{ padding: '10px 18px 14px' }}>
                    <span style={{ fontFamily: 'var(--sans)', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{faq.a}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 56, paddingTop: 40, borderTop: '1px solid var(--border-light)' }}>
          <h3 className="display" style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: 20 }}>
            Ready to Experience {t.name} in {cityName}?
          </h3>
          <Link href={`/book?treatment=${encodeURIComponent(t.name)}`} className="btn btn-primary" style={{ padding: '14px 32px' }}>
            <Sparkles size={17} /> Book Your Consultation
          </Link>
        </div>
      </div>
    </>
  );
}
