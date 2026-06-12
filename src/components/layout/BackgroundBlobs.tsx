'use client';

import { motion } from 'framer-motion';

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
      {/* Rose Blob */}
      <motion.div
        animate={{
          x: [0, 50, 0, -50, 0],
          y: [0, 30, -30, 20, 0],
          scale: [1, 1.1, 0.9, 1.05, 1],
          rotate: [0, 90, 180, 270, 360],
          borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '50% 50% 20% 80% / 25% 80% 20% 75%', '30% 70% 70% 30% / 30% 30% 70% 70%']
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '50vw',
          height: '50vw',
          minWidth: '400px',
          minHeight: '400px',
          background: 'radial-gradient(circle, rgba(165,42,42,0.06) 0%, rgba(165,42,42,0) 70%)',
          filter: 'blur(40px)',
        }}
      />
      
      {/* Gold Blob */}
      <motion.div
        animate={{
          x: [0, -40, 20, -20, 0],
          y: [0, -50, 30, -30, 0],
          scale: [1, 1.15, 0.85, 1.1, 1],
          rotate: [360, 270, 180, 90, 0],
          borderRadius: ['60% 40% 30% 70% / 60% 30% 70% 40%', '40% 60% 70% 30% / 40% 50% 50% 60%', '60% 40% 30% 70% / 60% 30% 70% 40%']
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: '60vw',
          height: '60vw',
          minWidth: '500px',
          minHeight: '500px',
          background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, rgba(212,175,55,0) 70%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}
