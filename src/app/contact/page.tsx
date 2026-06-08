'use client';

import Link from 'next/link';
import { Phone, MapPin, Clock, ExternalLink, Mail, Navigation } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/InstagramIcon';
import { CLINIC_INFO } from '@/lib/data';
import type { Metadata } from 'next';
import { useTranslation } from '@/lib/i18n';


export default function ContactPage() {
  const { t } = useTranslation();
  const mapSrc = `https://maps.google.com/maps?q=${CLINIC_INFO.mapQuery}&output=embed`;

  return (
    <>
      <div style={{ height: 40 }} /> {/* Spacer for navbar */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>
            {/* Info */}
            <div>
              <span className="label">{t('contact.get_in_touch')}</span>
              <h2 className="display" style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: 8, marginBottom: 4 }}>
                {t('contact.love_to_hear')}
              </h2>
              <span className="accent-line" />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 36 }}>
                <InfoItem icon={MapPin} label={t('contact.address')} text={CLINIC_INFO.address} />
                <InfoItem icon={Phone} label={t('contact.phone')} text={CLINIC_INFO.phone} href={`tel:${CLINIC_INFO.phone}`} />
                <InfoItem icon={Mail} label={t('contact.email')} text={CLINIC_INFO.email} href={`mailto:${CLINIC_INFO.email}`} />
                <InfoItem icon={InstagramIcon} label={t('contact.instagram')} text={`@${CLINIC_INFO.instagramHandle}`} href={`https://instagram.com/${CLINIC_INFO.instagramHandle}`} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${CLINIC_INFO.mapQuery}`}
                  target="_blank" rel="noreferrer"
                  className="btn btn-primary"
                  style={{ justifyContent: 'center' }}
                >
                  <Navigation size={16} /> {t('contact.directions')}
                </a>
                <a href={`tel:${CLINIC_INFO.phone}`} className="btn btn-outline" style={{ justifyContent: 'center' }}>
                  <Phone size={16} /> {t('contact.call')}
                </a>
                <Link href="/book" className="btn btn-ghost" style={{ justifyContent: 'center' }}>
                  {t('footer.book_appointment')}
                </Link>
              </div>
            </div>

            {/* Map */}
            <div style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
              <iframe
                src={mapSrc}
                width="100%"
                height="460"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AnviGleams Location"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoItem({ icon: Icon, label, text, href }: {
  icon: React.ElementType; label: string; text: string; href?: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
      <div style={{ width: 38, height: 38, borderRadius: 'var(--r-md)', background: 'var(--crimson-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={17} color="var(--crimson)" />
      </div>
      <div>
        <p className="label" style={{ marginBottom: 3 }}>{label}</p>
        {href ? (
          <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
            style={{ fontFamily: 'var(--sans)', fontSize: '0.9rem', color: 'var(--text-primary)', textDecoration: 'none', lineHeight: 1.5 }}>{text}</a>
        ) : (
          <span style={{ fontFamily: 'var(--sans)', fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>{text}</span>
        )}
      </div>
    </div>
  );
}
