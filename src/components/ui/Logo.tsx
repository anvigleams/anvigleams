interface LogoProps {
  width?: number;
  height?: number;
  light?: boolean;
}

export default function Logo({ width = 40, height = 40, light = false }: LogoProps) {
  const primary = light ? '#E8B4A0' : '#8B0000';
  const secondary = light ? '#FFFFFF' : '#C41E3A';
  const accent = light ? '#D4956A' : '#D4956A';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AnviGleams Logo"
    >
      <defs>
        <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primary} />
          <stop offset="100%" stopColor={secondary} />
        </linearGradient>
        <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor={secondary} />
        </linearGradient>
      </defs>

      {/* Outer circle */}
      <circle cx="40" cy="40" r="38" fill="url(#lg1)" opacity="0.12" />
      <circle cx="40" cy="40" r="38" stroke="url(#lg1)" strokeWidth="1.5" fill="none" />

      {/* A - Main letter */}
      <path
        d="M24 58 L40 22 L56 58"
        stroke="url(#lg1)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M29 46 L51 46"
        stroke="url(#lg2)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Sparkle top */}
      <g transform="translate(56, 20)">
        <path d="M0 -7 L1.5 -1.5 L7 0 L1.5 1.5 L0 7 L-1.5 1.5 L-7 0 L-1.5 -1.5 Z"
          fill={accent} opacity="0.9" />
      </g>

      {/* Small dots */}
      <circle cx="18" cy="35" r="2" fill={accent} opacity="0.6" />
      <circle cx="62" cy="45" r="1.5" fill={accent} opacity="0.5" />
    </svg>
  );
}
