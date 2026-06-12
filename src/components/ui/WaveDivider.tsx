// WaveDivider — organic curved SVG dividers between page sections
// Usage: <WaveDivider flip /> to invert the wave direction

interface WaveDividerProps {
  flip?: boolean;
  topColor?: string;
  bottomColor?: string;
  height?: number;
}

export default function WaveDivider({
  flip = false,
  topColor = 'var(--bg)',
  bottomColor = 'var(--bg-soft)',
  height = 64,
}: WaveDividerProps) {
  return (
    <div
      style={{
        position: 'relative',
        height: height,
        overflow: 'hidden',
        background: topColor,
        lineHeight: 0,
        marginBottom: -1,
      }}
    >
      <svg
        viewBox="0 0 1440 64"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '100%',
          transform: flip ? 'scaleX(-1)' : 'none',
        }}
      >
        <path
          d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}
