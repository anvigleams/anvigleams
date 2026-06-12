'use client';

import { motion } from 'framer-motion';

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }} aria-hidden>

      {/* Pink/Rose blob — top right */}
      <motion.div
        animate={{
          borderRadius: [
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '40% 60% 55% 45% / 35% 65% 35% 65%',
            '60% 40% 30% 70% / 60% 30% 70% 40%',
          ],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-8%', right: '-8%',
          width: 'clamp(350px, 45vw, 600px)', height: 'clamp(350px, 45vw, 600px)',
          background: 'radial-gradient(circle at 40% 40%, rgba(212,149,106,0.09) 0%, rgba(212,149,106,0.03) 50%, transparent 75%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Burgundy/Crimson blob — center left */}
      <motion.div
        animate={{
          borderRadius: [
            '30% 70% 70% 30% / 30% 30% 70% 70%',
            '55% 45% 40% 60% / 55% 60% 40% 45%',
            '30% 70% 70% 30% / 30% 30% 70% 70%',
          ],
          x: [0, -25, 0],
          y: [0, 35, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '25%', left: '-10%',
          width: 'clamp(300px, 40vw, 520px)', height: 'clamp(300px, 40vw, 520px)',
          background: 'radial-gradient(circle at 60% 60%, rgba(196,30,58,0.055) 0%, rgba(196,30,58,0.02) 50%, transparent 75%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Gold blob — bottom right */}
      <motion.div
        animate={{
          borderRadius: [
            '50% 50% 20% 80% / 25% 80% 20% 75%',
            '35% 65% 60% 40% / 60% 35% 65% 40%',
            '50% 50% 20% 80% / 25% 80% 20% 75%',
          ],
          x: [0, 20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '-12%', right: '5%',
          width: 'clamp(280px, 38vw, 480px)', height: 'clamp(280px, 38vw, 480px)',
          background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.07) 0%, rgba(212,175,55,0.02) 50%, transparent 75%)',
          filter: 'blur(55px)',
        }}
      />

      {/* Small gold accent — top left */}
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '8%', left: '5%',
          width: 180, height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

    </div>
  );
}
