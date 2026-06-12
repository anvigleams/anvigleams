'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

function CountUp({ end, suffix = '', duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          // If the end value has decimals, we ensure it shows exactly
          if (end % 1 !== 0) {
            setCount(end); 
          }
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {end % 1 !== 0 ? count.toFixed(1) : count}{suffix}
    </span>
  );
}

export default function ReviewsSection() {
  const [stats, setStats] = useState({ rating: 4.9, reviewCount: 31 });
  
  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        if (data.rating) setStats(data);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="section" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 className="display" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--text-primary)', marginBottom: 8 }}>
            Trusted by Happy Clients
          </h2>
          <span className="accent-line" style={{ margin: '0 auto' }} />
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.97rem', color: 'var(--text-secondary)', marginTop: 16 }}>
            Real reviews from our wonderful clients.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
          
          {/* Main Google Review Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ 
              background: 'white', 
              borderRadius: '24px', 
              padding: '40px 32px', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
              border: '1px solid var(--border-light)',
              maxWidth: '400px',
              flex: '1 1 300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={28} color="#FFB800" fill="#FFB800" />
              ))}
            </div>
            <div className="display" style={{ fontSize: '4rem', color: 'var(--text-primary)', lineHeight: 1 }}>
              <CountUp end={stats.rating} duration={1.5} />
            </div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '1.1rem', color: 'var(--text-secondary)', marginTop: 8, marginBottom: 32 }}>
              Google Rating based on <strong><CountUp end={stats.reviewCount} duration={2} /></strong> reviews
            </p>
            <a 
              href="https://maps.app.goo.gl/tsRF4UhBMNJsMxof9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', borderRadius: '100px' }}
            >
              View Reviews on Google
            </a>
          </motion.div>

          {/* Stats Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: '1 1 300px' }}>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ 
                background: 'white', 
                borderRadius: '24px', 
                padding: '32px', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                gap: 24
              }}
            >
              <div style={{ background: 'var(--bg-soft)', width: 80, height: 80, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                🌟
              </div>
              <div>
                <div className="display" style={{ fontSize: '2.5rem', color: 'var(--text-primary)', lineHeight: 1, marginBottom: 4 }}>
                  <CountUp end={stats.reviewCount * 12} suffix="+" duration={2.5} />
                </div>
                <div style={{ fontFamily: 'var(--sans)', color: 'var(--text-secondary)' }}>Happy Clients</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ 
                background: 'white', 
                borderRadius: '24px', 
                padding: '32px', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                gap: 24
              }}
            >
              <div style={{ background: 'var(--bg-soft)', width: 80, height: 80, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                ✨
              </div>
              <div>
                <div className="display" style={{ fontSize: '2.5rem', color: 'var(--text-primary)', lineHeight: 1, marginBottom: 4 }}>
                  <CountUp end={stats.reviewCount * 30} suffix="+" duration={2.5} />
                </div>
                <div style={{ fontFamily: 'var(--sans)', color: 'var(--text-secondary)' }}>Treatments Performed</div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
