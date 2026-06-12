'use client';

import { useRef } from 'react';

const ITEMS = [
  'Hydra Facial', 'Carbon Facial', 'Acne Treatment',
  'Pigmentation Treatment', 'Hair Removal', 'Skin Tightening',
  'Scar Reduction', 'Medi Facial', 'Anti-Aging',
];

export default function Marquee() {
  // Duplicate items for seamless loop
  const track = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(90deg, var(--crimson-dark) 0%, var(--crimson) 50%, var(--crimson-dark) 100%)',
        padding: '14px 0',
      }}
    >
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(90deg, var(--crimson-dark), transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(-90deg, var(--crimson-dark), transparent)', zIndex: 1, pointerEvents: 'none' }} />

      <div
        className="marquee-track"
        style={{ display: 'flex', gap: '0', whiteSpace: 'nowrap', willChange: 'transform' }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 24,
              padding: '0 28px',
              fontFamily: 'var(--sans)',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.92)',
            }}
          >
            {item}
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: 'rgba(255,255,255,0.35)',
              display: 'inline-block',
              flexShrink: 0,
            }} />
          </span>
        ))}
      </div>

      <style>{`
        .marquee-track {
          animation: marquee-scroll 12s linear infinite;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
