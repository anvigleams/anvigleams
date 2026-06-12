'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { TREATMENTS } from '@/lib/data';
import { useTranslation } from '@/lib/i18n';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface Props { preview?: boolean; }

export default function TreatmentsSection({ preview = false }: Props) {
  const { t } = useTranslation();
  const items = preview ? TREATMENTS.slice(0, 4) : TREATMENTS;

  return (
    <section className="section" id="treatments" style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        <ScrollReveal>
          <div style={{ marginBottom: 48 }}>
            <h2 className="display" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--text-primary)', marginTop: 8, marginBottom: 4 }}>
              {t('treatments.title')}
            </h2>
            <span className="accent-line" />
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.97rem', color: 'var(--text-secondary)', maxWidth: 480 }}>
              {t('treatments.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {items.map((treatment, i) => (
            <ScrollReveal key={treatment.treatmentId} delay={Math.min(i * 0.08, 0.32)} direction="scale">
              <motion.div whileHover={{ y: -6, boxShadow: 'var(--shadow-md)' }} transition={{ duration: 0.2 }}>
                <Link href={`/treatments/${treatment.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: 0, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: 4, background: 'linear-gradient(90deg, var(--crimson), var(--rose))' }} />
                    <div style={{ padding: '22px 24px 26px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 className="display" style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: 10 }}>
                        {t(`treatment.${treatment.slug.replace(/-/g, '_')}`) || treatment.name}
                      </h3>
                      <p style={{ fontFamily: 'var(--sans)', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {t(`treatment.${treatment.slug.replace(/-/g, '_')}_desc`) || treatment.description}
                      </p>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--sans)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--crimson)', marginTop: 'auto' }}>
                        {t('treatments.learn_more')} <ArrowRight size={13} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {preview && (
          <ScrollReveal delay={0.3}>
            <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
              <Link href="/treatments" className="btn btn-outline">
                {t('treatments.view_all')} <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
