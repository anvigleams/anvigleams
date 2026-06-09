import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog';
import type { Metadata } from 'next';
import SchemaOrg from '@/components/seo/SchemaOrg';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  
  return { 
    title: `${post.title} | AnviGleams Blog`, 
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | AnviGleams Blog`,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://anvigleams.in/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://anvigleams.in/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://anvigleams.in/blog/${post.slug}` }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.date,
    "publisher": {
      "@type": "Organization",
      "name": "AnviGleams Skin & Aesthetics",
      "logo": {
        "@type": "ImageObject",
        "url": "https://anvigleams.in/favicon.png"
      }
    }
  };

  return (
    <>
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={articleSchema} />
      
      <div style={{ background: 'var(--bg-soft)', borderBottom: '1px solid var(--border-light)', padding: '56px 24px 40px' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--text-muted)', fontFamily: 'var(--sans)', fontSize: '0.85rem', textDecoration: 'none', marginBottom: 24 }}>
            <ArrowLeft size={15} /> Back to Blog
          </Link>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 16, display: 'flex', gap: 12 }}>
            <span>{post.date}</span>
            <span>&bull;</span>
            <span>{post.readTime}</span>
            <span>&bull;</span>
            <span>By {post.author}</span>
          </div>
          <h1 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-primary)', marginBottom: 0, lineHeight: 1.2 }}>
            {post.title}
          </h1>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div 
            style={{ 
              fontFamily: 'var(--sans)', 
              fontSize: '1.05rem', 
              color: 'var(--text-secondary)', 
              lineHeight: 1.8 
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
    </>
  );
}
