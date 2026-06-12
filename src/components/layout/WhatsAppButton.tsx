'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919022256128"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors"
      style={{ boxShadow: '0 8px 30px rgba(37, 211, 102, 0.4)' }}
    >
      <span className="hidden md:inline font-sans text-sm font-medium">Need Skin Advice? 💬</span>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <MessageCircle size={24} color="white" fill="white" />
      </motion.div>
    </motion.a>
  );
}
