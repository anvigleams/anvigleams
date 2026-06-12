'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const PILLS = ['HydraFacial', 'Acne Treatment', 'Pigmentation', 'Skin Tightening', 'Scar Reduction'];

export default function HeroSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
        padding: '72px 0 80px',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* ── Background blobs ── */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '5%', right: '30%',
            width: 480, height: 480, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,149,106,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: '5%', left: '5%',
            width: 360, height: 360, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,30,58,0.07) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '30%', right: '10%',
            width: 220, height: 220, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* ── Full-bleed hero image — complete background ── */}
      <motion.div
        aria-hidden
        className="hero-image-wrap"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Parallax layer */}
        <motion.div
          style={{
            position: 'absolute', inset: -20,
            transform: `translate(${mouse.x * 18}px, ${mouse.y * 12}px)`,
            transition: 'transform 0.6s ease',
          }}
        >
          <Image
            src="/hero-model.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-image"
            style={{ objectFit: 'cover', objectPosition: 'right top' }}
          />
        </motion.div>

        {/* Left gradient fade — blends image into white/bg */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, var(--bg) 0%, var(--bg) 15%, rgba(255,255,255,0.75) 45%, rgba(255,255,255,0.3) 100%)',
        }} />
        {/* Top fade */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.4) 100%)',
        }} />
        {/* Soft edge blur on right */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: '20%',
          background: 'linear-gradient(-90deg, var(--bg) 0%, transparent 100%)',
        }} />
      </motion.div>

      {/* ── Content ── */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 580 }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'var(--rose-light)', border: '1px solid rgba(212,149,106,0.25)', borderRadius: 'var(--r-full)', marginBottom: 24 }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--rose)', display: 'inline-block' }} />
            <span className="label" style={{ color: 'var(--rose)', fontSize: '0.65rem' }}>{t('hero.badge')}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="display"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4rem)', color: 'var(--text-primary)', marginBottom: 20 }}
          >
            {t('hero.title_p1')}{' '}
            <span style={{ color: 'var(--crimson)' }}>{t('hero.title_highlight')}</span>{' '}
            {t('hero.title_p2')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontFamily: 'var(--sans)', fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.78, marginBottom: 32, maxWidth: 480 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 30 }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/book"
                className="btn btn-primary shimmer-btn"
                style={{ padding: '15px 32px', fontSize: '0.92rem', position: 'relative', overflow: 'hidden' }}
              >
                <Sparkles size={16} /> {t('hero.book_now')}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/treatments" className="btn btn-outline" style={{ padding: '14px 28px', fontSize: '0.92rem' }}>
                {t('hero.explore')} <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, flexWrap: 'wrap' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--r-full)', padding: '8px 16px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[...Array(5)].map((_, i) => (<span key={i} style={{ color: '#FFB800', fontSize: '0.9rem' }}>★</span>))}
              </div>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>4.9</span>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Google Rating</span>
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Trusted by <strong style={{ color: 'var(--crimson)' }}>500+ happy clients</strong>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Shimmer keyframe */}
      <style>{`
        .shimmer-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          animation: shimmer-sweep 3s ease-in-out infinite;
        }
        @keyframes shimmer-sweep {
          0%   { left: -100%; }
          50%  { left: 140%; }
          100% { left: 140%; }
        }

        .hero-image {
          opacity: 0.68;
          transition: opacity 0.3s ease;
        }

        @media (max-width: 991px) {
          .hero-image {
            opacity: 0.45;
          }
        }
        @media (max-width: 767px) {
          .hero-image {
            opacity: 0.35;
          }
        }
      `}</style>
    </section>
  );
}
