import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTagSlugs, getArticlesByTag, slugToTag, tagToSlug } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { BreadcrumbJsonLd, TagPageJsonLd } from '@/components/JsonLd';

const SITE_URL = 'https://anime-review-site.vercel.app';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllTagSlugs().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slugToTag(slug);
  if (!tag) return {};
  const articles = getArticlesByTag(tag);
  const canonicalUrl = `${SITE_URL}/tag/${slug}`;
  return {
    title: `${tag} - Articles, Analysis & Reviews`,
    description: `Browse ${articles.length} in-depth articles about ${tag}. Expert anime and manga analysis, reviews, theories, and guides on AnimeInsight.`,
    keywords: [tag, `${tag} review`, `${tag} analysis`, `${tag} theory`, 'anime', 'manga'],
    openGraph: {
      title: `${tag} | AnimeInsight`,
      description: `${articles.length} articles about ${tag} — analysis, reviews, and theories.`,
      url: canonicalUrl,
      siteName: 'AnimeInsight',
    },
    alternates: { canonical: canonicalUrl },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = slugToTag(slug);
  if (!tag) notFound();

  const articles = getArticlesByTag(tag);
  const allTagSlugs = getAllTagSlugs();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-6">
              <nav className="text-xs text-ink-muted mb-4">
                <Link href="/" className="hover:text-violet transition-colors">Home</Link>
                <span className="mx-1">/</span>
                <Link href="/tags" className="hover:text-violet transition-colors">Tags</Link>
                <span className="mx-1">/</span>
                <span className="text-ink-soft">{tag}</span>
              </nav>
              <h1 className="text-2xl md:text-3xl font-black text-ink mb-2">
                <span className="sunset-text">#</span>{tag}
              </h1>
              <p className="text-sm text-ink-soft">
                {articles.length} article{articles.length !== 1 ? 's' : ''} tagged with &ldquo;{tag}&rdquo;
              </p>
            </div>

            {/* Articles */}
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {articles.map(article => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-ink-muted text-sm">No articles with this tag yet.</p>
            )}

            {/* Related Tags */}
            <div className="mt-10">
              <h2 className="text-lg font-black text-ink mb-4 flex items-center gap-2">
                <span aria-hidden className="w-1.5 h-5 rounded-full sunset-gradient" />
                Browse More Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {allTagSlugs
                  .filter(t => t.slug !== slug)
                  .slice(0, 30)
                  .map(({ slug: tSlug, tag: tTag }) => (
                    <Link
                      key={tSlug}
                      href={`/tag/${tSlug}`}
                      className="tag-chip text-xs font-bold px-3.5 py-1.5"
                    >
                      #{tTag}
                    </Link>
                  ))}
                <Link
                  href="/tags"
                  className="btn-sunset text-xs px-4 py-1.5"
                >
                  View All Tags
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-16">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Tags', url: `${SITE_URL}/tags` },
          { name: tag, url: `${SITE_URL}/tag/${slug}` },
        ]}
      />
      <TagPageJsonLd
        tag={tag}
        articleCount={articles.length}
        url={`${SITE_URL}/tag/${slug}`}
      />
    </>
  );
}
