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
    <div className="marquee-container">
      <div className="fade-left" />
      <div className="fade-right" />

      <div className="marquee-track">
        {track.map((item, i) => (
          <div className="marquee-item" key={i}>
            {item}
            <span className="dot" />
          </div>
        ))}
      </div>

      <style jsx>{`
        .marquee-container {
          position: relative;
          overflow: hidden;
          background: var(--crimson);
          padding: 14px 0;
        }

        .marquee-track {
          display: flex;
          align-items: center;
          width: fit-content;
          will-change: transform;
          transform: translate3d(0,0,0);
          animation: marquee 20s linear infinite;
        }

        .marquee-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 0 24px;
          color: rgba(255,255,255,0.92);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
        }

        .fade-left,
        .fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 40px;
          z-index: 2;
          pointer-events: none;
        }

        .fade-left {
          left: 0;
          background: linear-gradient(to right, var(--crimson), transparent);
        }

        .fade-right {
          right: 0;
          background: linear-gradient(to left, var(--crimson), transparent);
        }

        @keyframes marquee {
          from {
            transform: translate3d(0,0,0);
          }
          to {
            transform: translate3d(-50%,0,0);
          }
        }
      `}</style>
    </div>
  );
}