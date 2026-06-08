'use client';

import Link from 'next/link';
import { ArrowRight, Image as ImageIcon, Video } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface Props { preview?: boolean; }

const GALLERY_ITEMS = [
  { id: 1, type: 'image', src: '/images/image1.png' },
  { id: 2, type: 'image', src: '/images/image2.png' },
  { id: 3, type: 'image', src: '/images/image3.png' },
  { id: 4, type: 'image', src: '/images/image4.png' },
];

export default function GallerySection({ preview = false }: Props) {
  const { t } = useTranslation();
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
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
          alignItems: 'start',
        }}>
          {items.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg)',
                border: '1px dashed var(--border)',
                padding: 0,
              }}
            >
              {/* Image */}
              <img 
                src={item.src} 
                alt="Client Result"
                style={{
                  width: '100%', height: 'auto',
                  display: 'block',
                  zIndex: 1,
                  position: 'relative',
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'; // Hide if missing
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
    </section>
  );
}
