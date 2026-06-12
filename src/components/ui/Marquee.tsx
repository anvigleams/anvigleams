'use client';

const ITEMS = [
  'Hydra Facial',
  'Carbon Facial',
  'Acne Treatment',
  'Pigmentation Treatment',
  'Hair Removal',
  'Skin Tightening',
  'Scar Reduction',
  'Medi Facial',
  'Anti-Aging',
];

export default function Marquee() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        background:
          'linear-gradient(90deg, var(--crimson-dark) 0%, var(--crimson) 50%, var(--crimson-dark) 100%)',
        padding: '14px 0',
      }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background:
            'linear-gradient(90deg, var(--crimson-dark), transparent)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background:
            'linear-gradient(-90deg, var(--crimson-dark), transparent)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <div className="marquee-track">
        {track.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
            <span className="dot" />
          </span>
        ))}
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          width: max-content;
          white-space: nowrap;
          will-change: transform;
          animation: marquee 18s linear infinite;
        }

        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 24px;
          padding: 0 28px;
          font-family: var(--sans);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.92);
          flex-shrink: 0;
        }

        .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
          flex-shrink: 0;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}