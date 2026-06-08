'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Globe } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { CLINIC_INFO } from '@/lib/data';
import type { Language } from '@/lib/translations';

const NAV_LINKS = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/about', labelKey: 'nav.about' },
  { href: '/treatments', labelKey: 'nav.treatments' },
  { href: '/expert', labelKey: 'nav.expert' },
  { href: '/gallery', labelKey: 'nav.gallery' },
  { href: '/contact', labelKey: 'nav.contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useTranslation();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Main bar */}
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: 68,
        background: '#fff',
        borderBottom: scrolled ? '1px solid #EDE0D9' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
      }}>
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 0, textDecoration: 'none', marginRight: 'auto', minWidth: 0 }}>
            <img src="/iocn.png" alt="AnviGleams Icon" style={{ width: 45, height: 45, objectFit: 'contain', flexShrink: 0 }} />
            <img src="/text.png" alt="AnviGleams" className="nav-logo-text" style={{ width: 220, objectFit: 'contain', marginLeft: -25, marginTop: 10, flexShrink: 1 }} />
          </Link>

          {/* Desktop nav */}
          <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {NAV_LINKS.map(({ href, labelKey }) => (
              <Link key={href} href={href} style={{
                padding: '7px 14px',
                fontFamily: 'var(--sans)',
                fontSize: '0.84rem',
                fontWeight: pathname === href ? 600 : 500,
                color: pathname === href ? 'var(--crimson)' : 'var(--text-secondary)',
                background: pathname === href ? 'var(--crimson-light)' : 'transparent',
                borderRadius: 'var(--r-full)',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}>
                {t(labelKey)}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ position: 'relative' }} className="hide-mobile">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="btn btn-outline"
                style={{ padding: '8px 14px', fontSize: '0.82rem', gap: 6, border: '1px solid var(--border)', background: 'var(--bg-soft)', color: 'var(--text-primary)' }}
              >
                <Globe size={15} />
                {t('global.language')}
              </button>
              {langDropdownOpen && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: 8,
                  background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
                  boxShadow: 'var(--shadow-md)', minWidth: 120, zIndex: 101, overflow: 'hidden'
                }}>
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'hi', label: 'हिंदी' },
                    { code: 'mr', label: 'मराठी' },
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code as Language);
                        setLangDropdownOpen(false);
                      }}
                      style={{
                        display: 'block', width: '100%', padding: '10px 16px', textAlign: 'left',
                        background: lang === l.code ? 'var(--bg-soft)' : 'transparent',
                        border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: '0.85rem',
                        color: lang === l.code ? 'var(--crimson)' : 'var(--text-primary)',
                        fontWeight: lang === l.code ? 600 : 400,
                      }}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link href="/track" className="btn btn-ghost" style={{ fontSize: '0.8rem', padding: '8px 12px' }}>
              {t('nav.track').split(' ')[0]}
            </Link>
            <Link href="/book" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
              <Sparkles size={13} />
              {t('nav.book')}
            </Link>
            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="hide-desktop"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: 'var(--text-secondary)', display: 'flex' }}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: 'fixed',
          top: 68, left: 0, right: 0,
          zIndex: 99,
          background: '#fff',
          borderBottom: '1px solid var(--border)',
          padding: '16px 24px 24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}>
          {NAV_LINKS.map(({ href, labelKey }) => (
            <Link key={href} href={href} style={{
              display: 'block',
              padding: '13px 0',
              fontFamily: 'var(--sans)',
              fontSize: '0.95rem',
              fontWeight: 500,
              color: pathname === href ? 'var(--crimson)' : 'var(--text-primary)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--border-light)',
            }}>
              {t(labelKey)}
            </Link>
          ))}
          <Link href="/track" style={{
            display: 'block',
            padding: '13px 0',
            fontFamily: 'var(--sans)',
            fontSize: '0.95rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            textDecoration: 'none',
            borderBottom: '1px solid var(--border-light)',
          }}>
            {t('nav.track')}
          </Link>

          <div style={{
            display: 'flex', gap: 8, padding: '16px 0', borderBottom: '1px solid var(--border-light)', flexWrap: 'wrap'
          }}>
            {[
              { code: 'en', label: 'English' },
              { code: 'hi', label: 'हिंदी' },
              { code: 'mr', label: 'मराठी' },
            ].map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code as Language);
                  setOpen(false);
                }}
                style={{
                  flex: 1, padding: '10px',
                  background: lang === l.code ? 'var(--bg-soft)' : 'transparent',
                  border: lang === l.code ? '1px solid var(--rose)' : '1px solid var(--border)', 
                  borderRadius: 'var(--r-md)', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: '0.85rem',
                  color: lang === l.code ? 'var(--crimson)' : 'var(--text-secondary)',
                  fontWeight: lang === l.code ? 600 : 500,
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
          <Link href="/book" className="btn btn-primary" style={{ marginTop: 24, width: '100%', justifyContent: 'center' }}>
            <Sparkles size={15} /> {t('nav.book')}
          </Link>
        </div>
      )}

      {/* Push content below fixed header */}
      <div style={{ height: 68 }} />
    </>
  );
}
