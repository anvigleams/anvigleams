'use client';

import Link from 'next/link';
import { Phone, MapPin, Clock, ExternalLink, Mail, Heart } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/InstagramIcon';
import Logo from '@/components/ui/Logo';
import { CLINIC_INFO } from '@/lib/data';
import { useTranslation } from '@/lib/i18n';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--bg-soft)',
      borderTop: '1px solid var(--border)',
      paddingTop: 64,
      paddingBottom: 32,
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 0, textDecoration: 'none', marginBottom: 16 }}>
              <img src="/iocn.png" alt="AnviGleams Icon" style={{ width: 90, height: 90, objectFit: 'contain' }} />
              <img src="/text.png" alt="AnviGleams" style={{ width: 280, objectFit: 'contain', marginLeft: -35, marginTop: 10 }} />
            </Link>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: 240, marginBottom: 18 }}>
              {t('footer.slogan')}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href={`mailto:${CLINIC_INFO.email}`}
                style={{ width: 34, height: 34, borderRadius: 'var(--r-sm)', background: 'var(--bg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="label" style={{ marginBottom: 14 }}>{t('footer.quick_links')}</p>
            {[
              { href: '/about', labelKey: 'footer.about_us' },
              { href: '/treatments', labelKey: 'footer.our_treatments' },
              { href: '/expert', labelKey: 'footer.meet_expert' },
              { href: '/gallery', labelKey: 'footer.gallery' },
              { href: '/book', labelKey: 'footer.book_appointment' },
              { href: '/track', labelKey: 'footer.track_appointment' },
            ].map(({ href, labelKey }) => (
              <Link key={href} href={href} style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: '0.86rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 9, transition: 'color 0.15s ease' }}>
                {t(labelKey)}
              </Link>
            ))}
          </div>

          {/* Treatments */}
          <div>
            <p className="label" style={{ marginBottom: 14 }}>{t('footer.treatments')}</p>
            {['Acne Treatment', 'Pigmentation', 'Miracle Treatment', 'Scar Reduction', 'Skin Tightening', 'HydraFacial'].map((t) => (
              <Link key={t} href="/treatments" style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: '0.86rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 9 }}>
                {t}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p className="label" style={{ marginBottom: 14 }}>{t('footer.contact')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { Icon: MapPin, text: CLINIC_INFO.address },
                { Icon: Phone, text: CLINIC_INFO.phone, href: `tel:${CLINIC_INFO.phone}` },
                { Icon: Mail, text: CLINIC_INFO.email, href: `mailto:${CLINIC_INFO.email}` },
                { Icon: InstagramIcon, text: `@${CLINIC_INFO.instagramHandle}`, href: `https://instagram.com/${CLINIC_INFO.instagramHandle}` },
              ].map(({ Icon, text, href }: { Icon: React.ElementType, text: string, href?: string }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                  <Icon size={14} style={{ color: 'var(--rose)', marginTop: 2, flexShrink: 0 }} />
                  {href ? (
                    <a href={href} target={href.includes('instagram.com') ? '_blank' : undefined} rel={href.includes('instagram.com') ? 'noreferrer' : undefined} style={{ fontFamily: 'var(--sans)', fontSize: '0.84rem', color: 'var(--text-secondary)', textDecoration: 'none', lineHeight: 1.5 }}>{text}</a>
                  ) : (
                    <span style={{ fontFamily: 'var(--sans)', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © {year} {t('global.anvigleams')}. {t('footer.rights')}
          </p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
            {t('footer.made_with')} <Heart size={12} fill="var(--crimson)" color="var(--crimson)" /> {t('footer.for_skin')}
          </p>
        </div>
      </div>
    </footer>
  );
}
