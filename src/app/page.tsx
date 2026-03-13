import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { getAllArticles } from '@/lib/articles';
import { animeList } from '@/data/anime';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';

export default function Home() {
  const articles = getAllArticles();
  const heroArticle = articles[0];
  const heroAnime = animeList.find(a => a.slug === heroArticle?.animeSlug);
  const recentArticles = articles.slice(1, 13);

  // Group by genre for a varied section
  const reviewArticles = articles.filter(a => a.category === 'review').slice(0, 4);
  const analysisArticles = articles.filter(a => a.category === 'analysis').slice(0, 4);

  return (
    <>
      {/* Hero: Single Featured Review */}
      <section className="bg-[#0a0a14] border-b border-[#1e1e30]">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Hero left */}
            <div className="lg:col-span-3">
              <p className="text-xs font-bold text-[#ff3a4f] tracking-wide uppercase mb-3" style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}>
                Featured Review
              </p>
              {heroAnime && (
                <Link href={`/anime/${heroAnime.slug}`} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                  {heroAnime.title}
                </Link>
              )}
              <Link href={`/article/${heroArticle.slug}`}>
                <h1 className="text-2xl md:text-3xl font-black text-white mt-2 mb-3 leading-tight hover:text-gray-200 transition-colors">
                  {heroArticle.title}
                </h1>
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed mb-5 max-w-xl">
                {heroArticle.excerpt}
              </p>
              <Link
                href={`/article/${heroArticle.slug}`}
                className="inline-block bg-[#ff3a4f] text-white text-sm font-bold px-6 py-2.5 rounded hover:bg-[#e52e42] transition-colors"
              >
                Read Full Review
              </Link>
            </div>

            {/* Hero right: quick picks */}
            <div className="lg:col-span-2 space-y-3">
              {articles.slice(1, 4).map(article => {
                const anime = animeList.find(a => a.slug === article.animeSlug);
                return (
                  <Link
                    key={article.slug}
                    href={`/article/${article.slug}`}
                    className="block bg-[#12121e] border border-[#252538] rounded p-4 hover:border-[#353550] transition-colors group"
                  >
                    <span className="text-[10px] text-gray-600">{anime?.title}</span>
                    <h3 className="text-sm font-bold text-gray-200 group-hover:text-gray-100 leading-snug line-clamp-2 mt-0.5">
                      {article.title}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Browse: Anime tags + Categories combined */}
      <section className="bg-[#0a0a14] border-b border-[#1e1e30] py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold text-gray-600 tracking-wide uppercase">Browse:</span>
            {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(([key, label]) => (
              <Link
                key={key}
                href={`/category/${key}`}
                className={`text-xs font-bold px-3 py-1 rounded ${CATEGORY_COLORS[key]}`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/tags"
              className="text-xs font-medium px-3 py-1 rounded text-gray-500 hover:text-gray-300 transition-colors"
            >
              All Tags
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 min-w-0">
            {/* Latest Articles */}
            <h2 className="text-base font-black text-white mb-5">
              Latest Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {recentArticles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {/* Reviews Section -- 1 large + list */}
            {reviewArticles.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-black text-white">Reviews</h2>
                  <Link href="/category/review" className="text-xs text-[#ff3a4f] hover:underline">
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <ArticleCard article={reviewArticles[0]} />
                  </div>
                  <div className="space-y-3">
                    {reviewArticles.slice(1, 4).map(article => {
                      const anime = animeList.find(a => a.slug === article.animeSlug);
                      return (
                        <Link
                          key={article.slug}
                          href={`/article/${article.slug}`}
                          className="block bg-[#12121e] border border-[#252538] rounded p-3 hover:border-[#353550] transition-colors"
                        >
                          <span className="text-[10px] text-gray-600">{anime?.title}</span>
                          <h3 className="text-xs font-bold text-gray-300 line-clamp-2 leading-snug mt-0.5">
                            {article.title}
                          </h3>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* Analysis Section -- standard grid */}
            {analysisArticles.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-black text-white">Analysis & Deep Dives</h2>
                  <Link href="/category/analysis" className="text-xs text-[#00d4ff] hover:underline">
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisArticles.map(article => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </section>
            )}

            {articles.length > 15 && (
              <div className="text-center mt-8">
                <Link
                  href="/category/review"
                  className="inline-block bg-[#ff3a4f] text-white px-8 py-3 rounded text-sm font-bold hover:bg-[#e52e42] transition-colors"
                >
                  View All Articles ({articles.length})
                </Link>
              </div>
            )}

            {/* All Anime Series -- compact list */}
            <div className="mt-12">
              <h2 className="text-base font-black text-white mb-5">
                All Anime & Manga Series
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {animeList.map(anime => (
                  <Link
                    key={anime.slug}
                    href={`/anime/${anime.slug}`}
                    className="flex items-center gap-3 bg-[#12121e] border border-[#252538] rounded p-3 hover:border-[#353550] transition-colors group"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: anime.accentColor }}
                    />
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors truncate">
                        {anime.title}
                      </h3>
                      <p className="text-[10px] text-gray-600">
                        {anime.studio} | {anime.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-72 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'AnimeInsight',
            description: 'In-depth anime and manga analysis, reviews, theories, and guides for 20+ popular series',
            url: 'https://anime-review-site.vercel.app',
            publisher: {
              '@type': 'Organization',
              name: 'AnimeInsight',
              url: 'https://anime-review-site.vercel.app',
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://anime-review-site.vercel.app/category/review?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
            inLanguage: 'en-US',
          }),
        }}
      />
    </>
  );
}
