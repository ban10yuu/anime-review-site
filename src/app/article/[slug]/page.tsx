import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSlugs, getArticleBySlug, getRelatedArticles } from '@/lib/articles';
import { getAnimeBySlug } from '@/data/anime';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/types';
import AffiliateWidget from '@/components/AffiliateWidget';
import AdBanner from '@/components/AdBanner';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';

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
  const canonicalUrl = `https://anime-review-site.vercel.app/article/${slug}`;
  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
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

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1 min-w-0">
            <div className="bg-[#12121e] rounded border-2 border-[#252538] p-6 md:p-8">
              <p className="text-[10px] text-gray-600 mb-4">This site participates in affiliate programs.</p>

              <nav className="text-xs text-gray-600 mb-4 flex items-center gap-1 flex-wrap">
                <Link href="/" className="hover:text-[#ff3a4f] transition-colors">Home</Link>
                <span className="text-gray-700">/</span>
                {anime && (
                  <>
                    <Link href={`/anime/${anime.slug}`} className="hover:text-[#ff3a4f] transition-colors">{anime.title}</Link>
                    <span className="text-gray-700">/</span>
                  </>
                )}
                <span className="text-gray-500 line-clamp-1">{article.title}</span>
              </nav>

              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${CATEGORY_COLORS[article.category] || ''}`}>
                  {CATEGORY_LABELS[article.category]}
                </span>
                {anime && (
                  <Link
                    href={`/anime/${anime.slug}`}
                    className="text-xs font-bold px-2.5 py-0.5 rounded bg-[#1a1a2a] text-gray-400 hover:text-white hover:bg-[#252535] transition-colors border border-[#252538]"
                  >
                    {anime.title}
                  </Link>
                )}
                <time className="text-[10px] text-gray-600 ml-auto" dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-6">
                {article.title}
              </h1>

              <AdBanner />

              {article.sections.length > 2 && (
                <div className="bg-[#1a1a2a] rounded p-4 mb-8 border border-[#252538]">
                  <h2 className="text-sm font-black text-[#00d4ff] mb-3">Table of Contents</h2>
                  <ol className="space-y-1.5">
                    {article.sections.map((section, i) => (
                      <li key={i}>
                        <a
                          href={`#section-${i}`}
                          className="text-sm text-gray-500 hover:text-[#ff3a4f] transition-colors flex items-center gap-2"
                        >
                          <span className="text-[10px] font-black text-gray-600 w-5 text-right">{String(i + 1).padStart(2, '0')}</span>
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
                    {i < article.sections.length - 1 && i % 2 === 0 && <AdBanner />}
                  </div>
                ))}
              </div>

              {anime && <AffiliateWidget anime={anime} />}

              <div className="flex items-center gap-2 flex-wrap mt-8 pt-6 border-t border-[#252538]">
                <span className="text-xs text-gray-600 font-bold">Tags:</span>
                {article.tags.map(tag => (
                  <span key={tag} className="text-[10px] text-gray-500 bg-[#1a1a2a] border border-[#252538] px-2.5 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {relatedArticles.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                  <span className="text-[#ff3a4f]">//</span>
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {relatedArticles.map(a => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              </div>
            )}
          </article>

          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-16">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            datePublished: article.publishedAt,
            author: { '@type': 'Organization', name: 'AnimeInsight' },
            publisher: { '@type': 'Organization', name: 'AnimeInsight' },
            keywords: article.tags.join(', '),
          }),
        }}
      />
    </>
  );
}
