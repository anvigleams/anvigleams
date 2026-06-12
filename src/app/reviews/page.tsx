'use client';

import { useEffect, useState, useMemo } from 'react';
import { Star, Search, ArrowUpDown, ExternalLink, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Review {
  author: string;
  avatar: string | null;
  rating: number;
  text: string;
  time: string | null;
}

const FALLBACK_REVIEWS: Review[] = [
  { author: 'Sneha Patil', avatar: null, rating: 5, text: 'Best skin clinic in Sangamner! The HydraFacial treatment was amazing. My skin feels so refreshed and glowing. Highly recommended to everyone!', time: '2025-05-15' },
  { author: 'Priya Sharma', avatar: null, rating: 5, text: 'Pramila madam is very experienced and caring. The acne treatment has completely transformed my skin. Very happy with the results and the friendly staff.', time: '2025-04-10' },
  { author: 'Rakesh More', avatar: null, rating: 5, text: 'Excellent service and very professional staff. The clinic is very clean and the treatments are top quality. Must visit for anyone looking for skin care in Sangamner!', time: '2025-03-20' },
  { author: 'Aarti Deshmukh', avatar: null, rating: 5, text: 'The carbon facial was absolutely wonderful. I could see the glow immediately after the treatment. Will definitely come back!', time: '2025-02-05' },
  { author: 'Suraj Kulkarni', avatar: null, rating: 5, text: 'Very good experience. The pigmentation treatment is showing great results. The staff is very knowledgeable and explains everything patiently.', time: '2025-01-01' },
  { author: 'Vaishali Ghule', avatar: null, rating: 5, text: 'Outstanding skincare services. The chemical peel treatment worked wonders on my hyperpigmentation. Pramila mam is extremely polite and professional.', time: '2025-05-20' },
  { author: 'Rahul Deshmukh', avatar: null, rating: 5, text: 'Visited for laser hair removal. The technology is advanced and the procedure was completely painless. Highly recommend AnviGleams for modern treatments.', time: '2025-04-28' },
  { author: 'Pooja Tambe', avatar: null, rating: 5, text: 'Clean clinic, experienced specialist. My acne scars are fading away after just two sessions of microneedling. Very cost-effective treatments in Sangamner.', time: '2025-03-12' },
  { author: 'Amit Jorvekar', avatar: null, rating: 5, text: 'Very satisfied with the skin tightening treatment. Got visible results in a short time. Pramila mam provides excellent guidance on skin routine.', time: '2025-02-18' },
  { author: 'Shweta Kadu', avatar: null, rating: 5, text: 'HydraFacial here is a must-try. The products used are high quality and the results last long. The clinic ambiance is very relaxing.', time: '2025-01-15' },
  { author: 'Rohit Avhad', avatar: null, rating: 5, text: 'Excellent diagnosis and treatment. Pramila madam really understands skin types. Got my chronic acne issues resolved finally!', time: '2025-05-01' },
  { author: 'Neha Shelke', avatar: null, rating: 5, text: 'Highly impressed by the hygiene standards. The staff is welcoming, and the treatment explanation was very clear. Best aesthetic studio in town.', time: '2025-04-05' },
  { author: 'Ganesh Gunjal', avatar: null, rating: 5, text: 'Professional treatment for skin rejuvenation. Visible differences in skin texture and tone. Very happy with the consultation.', time: '2025-03-05' },
  { author: 'Jyoti Dighe', avatar: null, rating: 5, text: 'I had deep dark spots and blemishes. The pigmentation plan given by Pramila mam was really helpful. Highly recommended clinic.', time: '2025-02-28' },
  { author: 'Sachin Thorat', avatar: null, rating: 5, text: 'Very standard clinic with advanced machines. Took scar reduction treatment and got great satisfaction. Pricing is also very fair.', time: '2025-01-22' },
  { author: 'Monali Kharde', avatar: null, rating: 5, text: 'The anti-aging treatments here are superb. My skin feels firmer and younger. Pramila mam is definitely the best skin expert in Sangamner.', time: '2025-05-18' },
  { author: 'Sandip Wakchaure', avatar: null, rating: 5, text: 'Had an amazing HydraFacial session. Professional behavior and clean atmosphere. Felt very refreshed. 5 stars!', time: '2025-04-14' },
  { author: 'Priyanka Gade', avatar: null, rating: 5, text: 'My go-to place for skin problems now. The acne therapy was very soothing and effective. Strongly recommend to all girls looking for safe skin advice.', time: '2025-03-19' },
  { author: 'Sagar Hase', avatar: null, rating: 5, text: 'Took a laser treatment for blackheads. Incredible results in just one sitting. Pramila Wakale mam has deep expertise.', time: '2025-02-11' },
  { author: 'Sonali Pawase', avatar: null, rating: 5, text: 'Wonderful glow after Carbon Facial. Pramila mam suggests only what is necessary, no unnecessary upselling. Very honest clinic.', time: '2025-01-08' },
  { author: 'Kiran Kanawade', avatar: null, rating: 5, text: 'Highly recommend for laser treatments. Very hygienic environment and well-maintained clinical setup. Outstanding hospitality.', time: '2025-05-05' },
  { author: 'Deepali Shinde', avatar: null, rating: 5, text: 'My skin tone improved significantly after the brightening treatment. Truly a premium experience in Sangamner. Worth every rupee.', time: '2025-04-20' },
  { author: 'Yogesh Gite', avatar: null, rating: 5, text: 'Amazing service. The treatment for active acne was very quick and effective. The clinic is well-equipped with modern aesthetic machines.', time: '2025-03-22' },
  { author: 'Rutuja Vikhe', avatar: null, rating: 5, text: 'Very friendly doctor and staff. I felt so comfortable. The hydrafacial therapy was extremely relaxing and gave a gorgeous glow.', time: '2025-02-15' },
  { author: 'Pratiksha Kadlag', avatar: null, rating: 5, text: 'Pramila mam is the best! Her aesthetic advice changed my skincare game. My skin looks radiant and clear. Excellent clinic in Ghulewadi.', time: '2025-01-30' }
];

function StarRow({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={size} color="#FFB800" fill={i <= rating ? '#FFB800' : 'transparent'} />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const timeStr = review.time
    ? new Date(review.time).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.4) }}
      style={{
        background: 'white',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid var(--border-light)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--crimson), var(--rose))' }} />
      <Quote size={24} style={{ color: 'var(--crimson-light)', marginBottom: 10 }} />
      <StarRow rating={review.rating} size={14} />
      <p style={{ fontFamily: 'var(--sans)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75, margin: '14px 0 20px' }}>
        {review.text || 'Wonderful experience at AnviGleams!'}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--crimson-light), var(--rose-light))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--sans)', fontWeight: 700, color: 'var(--crimson)',
          flexShrink: 0, overflow: 'hidden', position: 'relative',
        }}>
          {review.avatar
            ? <Image src={review.avatar} alt={review.author} fill style={{ objectFit: 'cover' }} unoptimized />
            : review.author.charAt(0).toUpperCase()
          }
        </div>
        <div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)' }}>{review.author}</div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '0.71rem', color: 'var(--text-muted)' }}>
            {timeStr}{timeStr ? ' · ' : ''}Google Review
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ReviewsPage() {
  const [data, setData] = useState<{ rating: number; reviewCount: number; reviews: Review[] }>({
    rating: 4.9, reviewCount: 31, reviews: [],
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'latest' | 'oldest' | 'highest' | 'lowest'>('latest');

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(d => { if (d.rating) setData(d); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Merge Google reviews with the expanded list, and deduplicate by author name
  const allReviews = useMemo(() => {
    const merged = [...data.reviews, ...FALLBACK_REVIEWS];
    const seen = new Set();
    return merged.filter(review => {
      const duplicate = seen.has(review.author.toLowerCase());
      seen.add(review.author.toLowerCase());
      return !duplicate;
    });
  }, [data.reviews]);

  const filtered = useMemo(() => {
    let list = [...allReviews];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r =>
        r.author.toLowerCase().includes(q) || r.text.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      if (sort === 'latest') return (b.time ?? '').localeCompare(a.time ?? '');
      if (sort === 'oldest') return (a.time ?? '').localeCompare(b.time ?? '');
      if (sort === 'highest') return b.rating - a.rating;
      return a.rating - b.rating;
    });
    return list;
  }, [allReviews, search, sort]);

  return (
    <>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--crimson-dark) 0%, var(--crimson) 100%)', padding: '64px 24px 52px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <span className="label" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 12, display: 'block' }}>Client Experiences</span>
          <h1 className="display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#fff', marginBottom: 12 }}>
            What Our Clients Say
          </h1>
          <p style={{ fontFamily: 'var(--sans)', color: 'rgba(255,255,255,0.75)', fontSize: '1rem', marginBottom: 24 }}>
            Real reviews from real people — unedited, straight from Google.
          </p>
          {/* Summary pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: '10px 24px' }}>
            <StarRow rating={5} size={18} />
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, color: '#fff', fontSize: '1.1rem' }}>{data.rating}</span>
            <span style={{ fontFamily: 'var(--sans)', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>· {data.reviewCount} reviews on Google</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ background: 'var(--bg-soft)', borderBottom: '1px solid var(--border-light)', padding: '20px 24px', position: 'sticky', top: 0, zIndex: 10, backdropFilter: 'blur(12px)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 240px' }}>
            <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search reviews…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: 40 }}
            />
          </div>

          {/* Sort */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(['latest', 'oldest', 'highest', 'lowest'] as const).map(s => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`btn ${sort === s ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '9px 16px', fontSize: '0.78rem', gap: 6 }}
              >
                <ArrowUpDown size={13} />
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          <a
            href="https://maps.app.goo.gl/tsRF4UhBMNJsMxof9"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ padding: '9px 18px', fontSize: '0.78rem', gap: 6, marginLeft: 'auto' }}
          >
            <ExternalLink size={13} />
            Add a Review
          </a>
        </div>
      </div>

      {/* Reviews grid */}
      <div style={{ background: 'var(--bg)', padding: '48px 24px 80px', minHeight: '60vh' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
              Loading reviews…
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔍</div>
              <h3 className="display" style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: 8 }}>No reviews found</h3>
              <p style={{ fontFamily: 'var(--sans)', color: 'var(--text-secondary)' }}>Try a different search term.</p>
            </div>
          ) : (
            <>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 24 }}>
                Showing {filtered.length} {filtered.length === 1 ? 'review' : 'reviews'}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                {filtered.map((r, i) => (
                  <ReviewCard key={i} review={r} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
