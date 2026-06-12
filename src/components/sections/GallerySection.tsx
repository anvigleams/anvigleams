'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Image as ImageIcon, Video } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface Props { preview?: boolean; }

const GALLERY_ITEMS = [
  { id: 1, type: 'image', src: '/images/image1.webp' },
  { id: 2, type: 'image', src: '/images/image2.webp' },
  { id: 3, type: 'image', src: '/images/image3.webp' },
  { id: 4, type: 'image', src: '/images/image4.webp' },
  { id: 5, type: 'image', src: '/images/image5.webp' },
  { id: 6, type: 'image', src: '/images/image6.webp' },
  { id: 7, type: 'image', src: '/images/image7.webp' },
  { id: 8, type: 'image', src: '/images/image8.webp' },
];

export default function GallerySection({ preview = false }: Props) {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const items = preview ? GALLERY_ITEMS.slice(0, 4) : GALLERY_ITEMS;

  return (
    <section className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <h2 className="display" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--text-primary)', marginTop: 8, marginBottom: 4 }}>
            {t('gallery.title')}
          </h2>
          <span className="accent-line" />
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.97rem', color: 'var(--text-secondary)' }}>
            {t('gallery.subtitle')}
          </p>
        </div>

        <div style={{
          columnWidth: '260px',
          columnGap: '16px',
        }}>
          {items.map((item) => (
            <div
              key={item.id}
              className="card"
              onClick={() => setSelectedImage(item.src)}
              style={{
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg)',
                border: '1px dashed var(--border)',
                padding: 0,
                marginBottom: '16px',
                breakInside: 'avoid',
                cursor: 'pointer',
              }}
            >
              {/* Image */}
              <Image 
                src={item.src} 
                alt="Client Result"
                width={400}
                height={400}
                style={{
                  width: '100%', height: 'auto',
                  display: 'block',
                  zIndex: 1,
                  position: 'relative',
                }}
              />
              
              {/* Fallback Icon (Behind image, visible if image missing) */}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                opacity: 0.6, zIndex: 0, position: 'absolute'
              }}>
                <ImageIcon size={36} color="var(--rose)" />
                <div style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {t('gallery.photo_placeholder')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {preview && (
          <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
            <Link href="/gallery" className="btn btn-outline">
              {t('gallery.view_all')} <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div style={{ position: 'relative', maxWidth: '100%', maxHeight: '100%' }}>
            <img 
              src={selectedImage} 
              alt="Enlarged gallery item" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              }} 
            />
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              style={{
                position: 'absolute',
                top: -40, right: 0,
                background: 'none', border: 'none', color: 'white', fontSize: '32px', cursor: 'pointer',
                lineHeight: 1, padding: '4px',
              }}
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
