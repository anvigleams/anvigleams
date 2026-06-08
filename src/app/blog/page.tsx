import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog';
import type { Metadata } from 'next';
import SchemaOrg from '@/components/seo/SchemaOrg';

export const metadata: Metadata = {
  title: 'Skin & Aesthetics Blog | Expert Advice in Sangamner',
  description: 'Read the latest insights on advanced skin treatments, Hydrafacial, acne solutions, and beauty tips from AnviGleams, the best skin clinic in Sangamner.',
};

export default function BlogArchivePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://anvigleams.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://anvigleams.com/blog" }
    ]
  };

  return (
    <>
      <SchemaOrg schema={breadcrumbSchema} />
      <div style={{ background: 'var(--bg-soft)', padding: '56px 24px 40px', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="display" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', color: 'var(--text-primary)', marginBottom: 16 }}>
            Skin Care <span style={{ color: 'var(--crimson)' }}>Insights</span>
          </h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', lineHeight: 1.75 }}>
            Expert advice, treatment guides, and beauty tips from Sangamner's premier aesthetic clinic.
          </p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            {BLOG_POSTS.map(post => (
              <article key={post.slug} style={{ background: 'var(--bg-soft)', padding: '32px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12, display: 'flex', gap: 12 }}>
                  <span>{post.date}</span>
                  <span>&bull;</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="display" style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.3 }}>
                  <Link href={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </h2>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.slug}`} className="btn btn-outline" style={{ alignSelf: 'flex-start', padding: '8px 20px', fontSize: '0.85rem' }}>
                  Read Article
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
