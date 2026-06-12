'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="https://wa.me/919022256128"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5, type: 'spring', stiffness: 200 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
        color: '#1a1a1a',
        padding: hovered ? '12px 20px 12px 14px' : '12px 14px',
        borderRadius: '100px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.07)',
        textDecoration: 'none',
        transition: 'padding 0.3s ease, box-shadow 0.3s ease',
        overflow: 'hidden',
        maxWidth: hovered ? '260px' : '64px',
        cursor: 'pointer',
      }}
    >
      {/* Pulse ring */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '100px',
          background: 'rgba(37,211,102,0.15)',
          pointerEvents: 'none',
        }}
      />

      {/* WhatsApp logo */}
      <motion.div
        animate={{ rotate: hovered ? [0, -10, 10, 0] : 0 }}
        transition={{ duration: 0.4 }}
        style={{ width: 38, height: 38, position: 'relative', flexShrink: 0 }}
      >
        <Image src="/whatsapp.webp" alt="WhatsApp" fill style={{ objectFit: 'contain' }} />
      </motion.div>

      {/* Text — slides in on hover */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
        transition={{ duration: 0.25 }}
        style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
      >
        <div style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2 }}>
          Need Skin Advice?
        </div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: '0.7rem', color: '#6b6b6b', lineHeight: 1.3 }}>
          Chat with us 💬
        </div>
      </motion.div>
    </motion.a>
  );
}
