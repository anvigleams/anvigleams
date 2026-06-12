'use client';

import { motion } from 'framer-motion';

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1, background: '#FFFDFB' }} aria-hidden>
      
      {/* Mesh Blob 1 — Blush Pink / Rose Gold (Top Right) */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.15, 0.9, 1],
          rotate: [0, 90, 180, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '55vw',
          height: '55vw',
          minWidth: '400px',
          background: 'radial-gradient(circle, rgba(247,237,229,0.9) 0%, rgba(212,149,106,0.3) 50%, transparent 75%)',
          filter: 'blur(80px)',
          opacity: 0.85,
        }}
      />

      {/* Mesh Blob 2 — Burgundy / Crimson (Middle Left) */}
      <motion.div
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 40, -40, 0],
          scale: [1, 0.9, 1.1, 1],
          rotate: [0, -120, 120, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '-15%',
          width: '50vw',
          height: '50vw',
          minWidth: '380px',
          background: 'radial-gradient(circle, rgba(155,21,39,0.08) 0%, rgba(107,29,47,0.03) 60%, transparent 80%)',
          filter: 'blur(90px)',
          opacity: 0.9,
        }}
      />

      {/* Mesh Blob 3 — Rose Gold / Gold (Bottom Right) */}
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, 50, -20, 0],
          scale: [1, 1.1, 0.85, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '45vw',
          height: '45vw',
          minWidth: '350px',
          background: 'radial-gradient(circle, rgba(212,149,106,0.18) 0%, rgba(212,175,55,0.05) 50%, transparent 75%)',
          filter: 'blur(80px)',
          opacity: 0.8,
        }}
      />

      {/* Ambient Glow 1 — Blush Pink (Center Screen) */}
      <motion.div
        animate={{
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '40%',
          left: '30%',
          width: '30vw',
          height: '30vw',
          background: 'radial-gradient(circle, rgba(247,237,229,0.7) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Ambient Glow 2 — Delicate Gold (Top Left) */}
      <motion.div
        animate={{
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        style={{
          position: 'absolute',
          top: '5%',
          left: '10%',
          width: '25vw',
          height: '25vw',
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 75%)',
          filter: 'blur(50px)',
        }}
      />

    </div>
  );
}
