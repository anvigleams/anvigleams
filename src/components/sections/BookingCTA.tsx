'use client';

import Link from 'next/link';
import { Sparkles, Phone } from 'lucide-react';
import { CLINIC_INFO } from '@/lib/data';
import { useTranslation } from '@/lib/i18n';

export default function BookingCTA() {
  const { t } = useTranslation();
  return (
    <section style={{
      background: 'var(--bg-subtle)',
      borderTop: '1px solid var(--border-light)',
      padding: '80px 24px',
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <span className="label">{t('cta.label')}</span>

        <h2 className="display" style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--text-primary)',
          marginTop: 8,
          marginBottom: 16,
        }}>
          {t('cta.title')}
        </h2>

        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          maxWidth: 480,
          margin: '0 auto 36px',
          lineHeight: 1.75,
        }}>
          {t('cta.desc')}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <Link href="/book" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '0.92rem' }}>
            <Sparkles size={17} />
            {t('hero.book_now')}
          </Link>
          <a href={`tel:${CLINIC_INFO.phone}`} className="btn btn-ghost" style={{ padding: '14px 28px', fontSize: '0.92rem' }}>
            <Phone size={17} />
            {t('cta.call_now')}
          </a>
        </div>
      </div>
    </section>
  );
}
