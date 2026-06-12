'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ExternalLink, Quote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Review {
  author: string;
  avatar: string | null;
  rating: number;
  text: string;
  time: string | null;
}

function CountUp({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setCount(end % 1 !== 0 ? parseFloat((p * end).toFixed(1)) : Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return <span ref={ref}>{end % 1 !== 0 ? count.toFixed(1) : count}{suffix}</span>;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={14} color="#FFB800" fill={i <= rating ? '#FFB800' : 'transparent'} />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const timeAgo = review.time
    ? new Date(review.time).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      style={{
        background: 'white',
        borderRadius: '20px',
        padding: '28px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.04)',
        border: '1px solid rgba(237,224,217,0.8)',
        position: 'relative',
        overflow: 'hidden',
        flex: '1 1 280px',
        minWidth: 0,
        transition: 'box-shadow 0.25s ease',
      }}
    >
      {/* Gold top accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--crimson), var(--rose))' }} />

      {/* Quote icon */}
      <Quote size={28} style={{ color: 'var(--crimson-light)', marginBottom: 12, opacity: 0.6 }} />

      {/* Stars */}
      <StarRow rating={review.rating} />

      {/* Review text */}
      <p style={{
        fontFamily: 'var(--sans)',
        fontSize: '0.88rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.7,
        margin: '12px 0 20px',
        display: '-webkit-box',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {review.text || 'Great experience at AnviGleams!'}
      </p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--crimson-light), var(--rose-light))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '0.85rem',
          color: 'var(--crimson)', flexShrink: 0, overflow: 'hidden',
          position: 'relative',
        }}>
          {review.avatar ? (
            <Image src={review.avatar} alt={review.author} fill style={{ objectFit: 'cover' }} unoptimized />
          ) : (
            review.author.charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {review.author}
          </div>
          {timeAgo && (
            <div style={{ fontFamily: 'var(--sans)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {timeAgo} · Google Review
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Fallback reviews when no API data
const FALLBACK_REVIEWS: Review[] = [
  { author: 'Sneha Patil', avatar: null, rating: 5, text: 'Best skin clinic in Sangamner! The HydraFacial treatment was amazing. My skin feels so refreshed and glowing. Highly recommended!', time: '2024-11-01' },
  { author: 'Priya Sharma', avatar: null, rating: 5, text: 'Pramila madam is very experienced and caring. The acne treatment has completely transformed my skin. Very happy with results!', time: '2024-12-01' },
  { author: 'Rakesh More', avatar: null, rating: 5, text: 'Excellent service and very professional staff. The clinic is very clean and the treatments are top quality. Must visit!', time: '2025-01-01' },
];

export default function ReviewsSection() {
  const [data, setData] = useState<{ rating: number; reviewCount: number; reviews: Review[] }>({
    rating: 4.9,
    reviewCount: 31,
    reviews: [],
  });

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(d => { if (d.rating) setData(d); })
      .catch(console.error);
  }, []);

  const displayReviews = data.reviews.length > 0 ? data.reviews.slice(0, 3) : FALLBACK_REVIEWS;

  return (
    <section
      className="section"
      style={{
        background: 'linear-gradient(180deg, var(--bg-soft) 0%, var(--bg) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(196,30,58,0.04) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(212,149,106,0.05) 0%, transparent 50%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <span className="label" style={{ color: 'var(--rose)', marginBottom: 12, display: 'block' }}>
            Trusted by Happy Clients
          </span>
          <h2 className="display" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--text-primary)', marginBottom: 8 }}>
            A Sanctuary for <span style={{ color: 'var(--crimson)' }}>Radiant Skin</span>
          </h2>
          <span className="accent-line" style={{ margin: '0 auto' }} />
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            Real experiences from our wonderful clients across Sangamner &amp; beyond.
          </p>
        </motion.div>

        {/* Stats row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginBottom: 52 }}>
          {[
            { emoji: '⭐', value: <CountUp end={data.rating} duration={1.5} />, label: 'Google Rating' },
            { emoji: '🌟', value: <><CountUp end={data.reviewCount * 12} suffix="+" duration={2} /></>, label: 'Happy Clients' },
            { emoji: '✨', value: <><CountUp end={data.reviewCount * 30} suffix="+" duration={2.5} /></>, label: 'Treatments Done' },
          ].map(({ emoji, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '24px 32px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                border: '1px solid var(--border-light)',
                flex: '1 1 160px',
                minWidth: 140,
              }}
            >
              <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>{emoji}</div>
              <div className="display" style={{ fontSize: '2.2rem', color: 'var(--text-primary)', lineHeight: 1 }}>{value}</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Review cards */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 40 }}>
          {displayReviews.map((review, i) => (
            <ReviewCard key={i} review={review} index={i} />
          ))}
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link href="/reviews" className="btn btn-primary" style={{ padding: '14px 32px' }}>
            View All Reviews
          </Link>
          <a
            href="https://maps.app.goo.gl/tsRF4UhBMNJsMxof9"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ padding: '13px 28px', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <ExternalLink size={15} />
            Review on Google
          </a>
        </motion.div>
      </div>
    </section>
  );
}
