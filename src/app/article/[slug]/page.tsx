import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSlugs, getArticleBySlug, getRelatedArticles, getArticlesByAnime, tagToSlug } from '@/lib/articles';
import { getAnimeBySlug, animeList } from '@/data/anime';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/types';
import AffiliateWidget from '@/components/AffiliateWidget';
import AdBanner from '@/components/AdBanner';
import GoogleAd from '@/components/GoogleAd';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from '@/components/JsonLd';
import AuthorBox from '@/components/AuthorBox';
import ShareButtons from '@/components/ShareButtons';

const SITE_URL = 'https://anime-review-site.vercel.app';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const anime = getAnimeBySlug(article.animeSlug);
  const animeName = anime?.title || article.animeSlug;
  const categoryLabel = CATEGORY_LABELS[article.category];
  const canonicalUrl = `${SITE_URL}/article/${slug}`;
  const description = `${article.excerpt} | ${animeName} ${categoryLabel} on AnimeInsight.`;
  const keywords = [
    ...article.tags,
    `${animeName} review`,
    `${animeName} analysis`,
    `${animeName} theory`,
    `${animeName} explained`,
    `anime ${categoryLabel.toLowerCase()}`,
    'anime review',
    'manga analysis',
  ];
  return {
    title: article.title,
    description: description.slice(0, 160),
    keywords,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      tags: article.tags,
      url: canonicalUrl,
      siteName: 'AnimeInsight',
    },
    twitter: {
      card: 'summary',
      title: article.title,
      description: article.excerpt,
    },
    alternates: { canonical: canonicalUrl },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const anime = getAnimeBySlug(article.animeSlug);
  const relatedArticles = getRelatedArticles(article, 4);
  const moreFromAnime = getArticlesByAnime(article.animeSlug)
    .filter(a => a.slug !== article.slug)
    .slice(0, 4);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1 min-w-0">
            <div className="glass-card p-6 md:p-8">
              <p className="text-[10px] text-ink-muted mb-4">This site participates in affiliate programs.</p>

              <nav className="text-xs text-ink-muted mb-4 flex items-center gap-1 flex-wrap">
                <Link href="/" className="hover:text-violet transition-colors">Home</Link>
                <span className="text-ink-muted">/</span>
                {anime && (
                  <>
                    <Link href={`/anime/${anime.slug}`} className="hover:text-violet transition-colors">{anime.title}</Link>
                    <span className="text-ink-muted">/</span>
                  </>
                )}
                <span className="text-ink-soft line-clamp-1">{article.title}</span>
              </nav>

              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Link
                  href={`/category/${article.category}`}
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full hover:brightness-105 transition-all ${CATEGORY_COLORS[article.category] || ''}`}
                >
                  {CATEGORY_LABELS[article.category]}
                </Link>
                {anime && (
                  <Link
                    href={`/anime/${anime.slug}`}
                    className="tag-chip text-xs font-bold px-3 py-0.5"
                  >
                    {anime.title}
                  </Link>
                )}
                <time className="text-[10px] text-ink-muted ml-auto" dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-ink leading-tight mb-6">
                {article.title}
              </h1>

              <GoogleAd format="horizontal" className="my-6" />

              <AdBanner />

              {article.sections.length > 2 && (
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 mb-8 border border-violet/15">
                  <h2 className="text-sm font-black sunset-text mb-3">Table of Contents</h2>
                  <ol className="space-y-1.5">
                    {article.sections.map((section, i) => (
                      <li key={i}>
                        <a
                          href={`#section-${i}`}
                          className="text-sm text-ink-soft hover:text-violet transition-colors flex items-center gap-2"
                        >
                          <span className="text-[10px] font-black text-ink-muted w-5 text-right">{String(i + 1).padStart(2, '0')}</span>
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="article-content">
                {article.sections.map((section, i) => (
                  <div key={i}>
                    <div id={`section-${i}`}>
                      <h2>{section.heading}</h2>
                      {section.content.split('\n\n').map((paragraph, j) => (
                        <p key={j} dangerouslySetInnerHTML={{ __html: paragraph }} />
                      ))}
                    </div>
                    {i === 2 && <GoogleAd format="rectangle" className="my-6" />}
                    {i < article.sections.length - 1 && i % 2 === 0 && <AdBanner />}
                  </div>
                ))}
              </div>

              {anime && <AffiliateWidget anime={anime} />}

              <AuthorBox />

              <ShareButtons title={article.title} />

              {/* Clickable Tags */}
              <div className="flex items-center gap-2 flex-wrap mt-8 pt-6 border-t border-line">
                <span className="text-xs text-ink-muted font-bold">Tags:</span>
                {article.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/tag/${tagToSlug(tag)}`}
                    className="tag-chip text-[10px] px-3 py-1"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* More from this anime */}
            {moreFromAnime.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-black text-ink mb-4 flex items-center gap-2">
                  <span aria-hidden className="w-1.5 h-5 rounded-full sunset-gradient" />
                  More {anime?.title} Analysis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {moreFromAnime.map(a => (
                    <ArticleCard key={a.slug} article={a} showAnime={false} />
                  ))}
                </div>
              </div>
            )}

            {/* Related Articles (cross-anime) */}
            {relatedArticles.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-black text-ink mb-4 flex items-center gap-2">
                  <span aria-hidden className="w-1.5 h-5 rounded-full sunset-gradient" />
                  Recommended Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {relatedArticles.map(a => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              </div>
            )}

            {/* Category Navigation */}
            <div className="mt-8 glass-card p-5">
              <h2 className="text-sm font-black sunset-text mb-3">Browse by Category</h2>
              <div className="flex flex-wrap gap-2">
                {(['review', 'analysis', 'theory', 'guide', 'comparison'] as const).map(cat => (
                  <Link
                    key={cat}
                    href={`/category/${cat}`}
                    className={`text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                      cat === article.category
                        ? 'border-rose/60 text-rose bg-rose/10'
                        : 'border-line bg-white/50 text-ink-soft hover:border-violet/50 hover:text-violet'
                    }`}
                  >
                    {CATEGORY_LABELS[cat]}
                  </Link>
                ))}
              </div>
            </div>
          </article>

          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-16">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <ArticleJsonLd article={article} animeName={anime?.title} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          ...(anime ? [{ name: anime.title, url: `${SITE_URL}/anime/${anime.slug}` }] : []),
          { name: article.title, url: `${SITE_URL}/article/${article.slug}` },
        ]}
      />
      <FaqJsonLd sections={article.sections} />
    </>
  );
}
