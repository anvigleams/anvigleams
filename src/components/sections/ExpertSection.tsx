'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { CERTIFICATIONS } from '@/lib/data';
import { useTranslation } from '@/lib/i18n';

export default function ExpertSection() {
  const { t } = useTranslation();
  const [openCert, setOpenCert] = useState<string | null>(null);

  return (
    <section className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 56,
          alignItems: 'start',
        }}>
          {/* Photo card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              background: '#fff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--r-xl)',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden',
              textAlign: 'center',
              position: 'relative',
              maxWidth: 320,
              width: '100%',
            }}>
              {/* Expert Photo */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '649/809', background: 'var(--bg-soft)' }}>
                 <Image src="/expert-photo.webp" alt="Pramila Wakale" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 320px" />
              </div>

              <div style={{ padding: '24px 24px 32px' }}>
                <div className="display" style={{ fontSize: '1.45rem', color: 'var(--text-primary)', marginBottom: 4 }}>
                  Pramila Wakale
                </div>
                <span className="label" style={{ display: 'block' }}>{t('expert.badge')}</span>

                {/* Academy Badge */}
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-light)' }}>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8 }}>{t('expert.certified_by')}</p>
                  <a href="https://www.cosmeticaindia.com/academy" target="_blank" rel="noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: 'var(--sans)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--crimson)',
                    textDecoration: 'none'
                  }}>
                    Cosmetica India Academy
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="display" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--text-primary)', marginTop: 8 }}>
              {t('expert.title_p1')} <span style={{ color: 'var(--crimson)' }}>{t('expert.title_highlight')}</span>
            </h2>
            <span className="accent-line" />
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.97rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 28 }}>
              {t('expert.desc')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              <p className="label" style={{ marginBottom: 4 }}>{t('expert.certifications')}</p>
              {CERTIFICATIONS.map((cert) => {
                const isOpen = openCert === cert.id;
                return (
                  <div key={cert.id} style={{
                    background: '#fff',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-md)',
                    overflow: 'hidden',
                  }}>
                    <button
                      onClick={() => setOpenCert(isOpen ? null : cert.id)}
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        background: 'transparent',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ paddingRight: 16 }}>
                        <div style={{ fontFamily: 'var(--sans)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {t(`cert.${cert.id.replace(/-/g, '_')}_title`) || cert.title}
                        </div>
                        {!isOpen && (
                          <div style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                            {t(`cert.${cert.id.replace(/-/g, '_')}_short`) || cert.shortDesc}
                          </div>
                        )}
                      </div>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%', background: 'var(--bg-soft)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }}>
                        <ChevronDown size={16} color="var(--crimson)" />
                      </div>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 20px 20px', borderTop: '1px solid var(--border-light)', paddingTop: 16 }}>

                        <p style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                          {t(`cert.${cert.id.replace(/-/g, '_')}_full`) || cert.fullDesc}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
