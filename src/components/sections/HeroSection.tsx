'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const PILLS = ['HydraFacial', 'Acne Treatment', 'Pigmentation', 'Skin Tightening', 'Scar Reduction'];

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section style={{
      background: 'var(--bg)',
      padding: '56px 0 72px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle bg blobs */}
      <div aria-hidden style={{ position: 'absolute', top: -80, right: -40, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,149,106,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: -60, left: -60, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,30,58,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 48,
          alignItems: 'center',
        }}>
          {/* Left — Text */}
          <div style={{ maxWidth: 580 }}>
            <div className="anim-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'var(--rose-light)', border: '1px solid rgba(212,149,106,0.25)', borderRadius: 'var(--r-full)', marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--rose)', display: 'inline-block' }} />
              <span className="label" style={{ color: 'var(--rose)', fontSize: '0.65rem' }}>{t('hero.badge')}</span>
            </div>

            <h1 className="anim-fade-up-2 display" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4rem)', color: 'var(--text-primary)', marginBottom: 20 }}>
              {t('hero.title_p1')}{' '}
              <span style={{ color: 'var(--crimson)' }}>{t('hero.title_highlight')}</span>{' '}
              {t('hero.title_p2')}
            </h1>

            <p className="anim-fade-up-3" style={{ fontFamily: 'var(--sans)', fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.78, marginBottom: 34, maxWidth: 500 }}>
              {t('hero.subtitle')}
            </p>

            <div className="anim-fade-up-3" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
              <Link href="/book" className="btn btn-primary" style={{ padding: '14px 30px', fontSize: '0.9rem' }}>
                <Sparkles size={16} /> {t('hero.book_now')}
              </Link>
              <Link href="/treatments" className="btn btn-outline" style={{ padding: '13px 28px', fontSize: '0.9rem' }}>
                {t('hero.explore')} <ArrowRight size={16} />
              </Link>
            </div>

            {/* Treatment pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {PILLS.map((p) => (
                <span key={p} style={{ padding: '5px 13px', background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)', fontFamily: 'var(--sans)', fontSize: '0.77rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                  {t(`treatment.${p.replace(/\s+/g, '_').toLowerCase()}`) || p}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Model photo */}
          <div className="hide-mobile anim-float" style={{ position: 'relative' }}>
            <div style={{
              width: 320, height: 380,
              borderRadius: 'var(--r-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '3px solid #fff',
              position: 'relative',
            }}>
              <Image
                src="/hero-model.jpg"
                alt="Radiant skin — AnviGleams"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
                sizes="320px"
              />
            </div>
            {/* Floating glow badge */}
            <div style={{
              position: 'absolute', bottom: -16, left: -20,
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
              padding: '12px 18px',
              boxShadow: 'var(--shadow-md)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--crimson-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={16} color="var(--crimson)" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-primary)' }}>{t('hero.no_login')}</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>{t('hero.book_in_2')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
