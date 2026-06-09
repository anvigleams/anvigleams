import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, CheckCircle, ArrowLeft, Sparkles, ChevronDown } from 'lucide-react';
import { TREATMENTS } from '@/lib/data';
import type { Metadata } from 'next';
import SchemaOrg from '@/components/seo/SchemaOrg';

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  return TREATMENTS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = TREATMENTS.find((x) => x.slug === slug);
  if (!t) return {};
  return { 
    title: `${t.name} Treatment in Sangamner`, 
    description: t.description.slice(0, 160),
    alternates: {
      canonical: `/treatments/${t.slug}`,
    },
    openGraph: {
      title: `${t.name} Treatment in Sangamner | AnviGleams`,
      description: t.description.slice(0, 160),
      url: `/treatments/${t.slug}`,
      images: [
        {
          url: t.images[0],
          width: 800,
          height: 600,
          alt: t.name,
        },
      ],
    }
  };
}

export default async function TreatmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const t = TREATMENTS.find((x) => x.slug === slug);
  if (!t) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": t.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
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
      { "@type": "ListItem", "position": 3, "name": t.name, "item": `https://anvigleams.in/treatments/${t.slug}` }
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
            {t.name}
          </h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: 560, lineHeight: 1.75 }}>
            {t.description}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="container section-sm">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48 }}>
          {/* Benefits */}
          <div>
            <h2 className="display" style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: 20 }}>Key Benefits</h2>
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
            <h2 className="display" style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: 20 }}>Common Questions</h2>
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
            Ready to Experience {t.name}?
          </h3>
          <Link href={`/book?treatment=${encodeURIComponent(t.name)}`} className="btn btn-primary" style={{ padding: '14px 32px' }}>
            <Sparkles size={17} /> Book This Treatment
          </Link>
        </div>
      </div>
    </>
  );
}
