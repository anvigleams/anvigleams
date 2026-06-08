'use client';

import { Shield, Sparkles, Heart, Award } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export default function AboutSection() {
  const { t } = useTranslation();

  const PILLARS = [
    {
      icon: Shield,
      title: t('about.pillar_1_title'),
      desc: t('about.pillar_1_desc'),
    },
    {
      icon: Sparkles,
      title: t('about.pillar_2_title'),
      desc: t('about.pillar_2_desc'),
    },
    {
      icon: Heart,
      title: t('about.pillar_3_title'),
      desc: t('about.pillar_3_desc'),
    },
    {
      icon: Award,
      title: t('about.pillar_4_title'),
      desc: t('about.pillar_4_desc'),
    },
  ];

  return (
    <section className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 60,
          alignItems: 'center',
        }}>
          {/* Text side */}
          <div style={{ maxWidth: 640, marginBottom: 56 }}>
            <h2 className="display" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--text-primary)', marginTop: 8 }}>
              {t('about.title_p1')}{' '}
              <span style={{ color: 'var(--crimson)' }}>{t('about.title_highlight')}</span>
            </h2>
            <span className="accent-line" />
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.97rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 18 }}>
              {t('about.desc_p1')}
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.97rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {t('about.desc_p2')}
            </p>
          </div>

          {/* Pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {PILLARS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card" style={{ padding: '24px 20px' }}>
                <div style={{
                  width: 44, height: 44,
                  borderRadius: 'var(--r-md)',
                  background: 'var(--crimson-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 14,
                }}>
                  <Icon size={20} color="var(--crimson)" />
                </div>
                <h3 style={{
                  fontFamily: 'var(--display)',
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: 6,
                }}>
                  {title}
                </h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
