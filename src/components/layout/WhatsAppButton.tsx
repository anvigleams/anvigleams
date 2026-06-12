'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919022256128"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white text-black px-4 py-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
      style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)' }}
    >
      <span className="hidden md:inline font-sans text-sm font-medium">Need Skin Advice? 💬</span>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: 32, height: 32, position: 'relative' }}
      >
        <Image src="/whatsapp.webp" alt="WhatsApp" fill style={{ objectFit: 'contain' }} />
      </motion.div>
    </motion.a>
  );
}
