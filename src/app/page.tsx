import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { getAllArticles } from '@/lib/articles';
import { animeList } from '@/data/anime';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';

export default function Home() {
  const articles = getAllArticles();
  const featuredArticles = articles.slice(0, 3);
  const recentArticles = articles.slice(3, 15);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0a0a14] py-16 border-b-2 border-[#252538]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <p className="text-[#ff3a4f] text-xs font-black tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}>
              Anime & Manga Analysis
            </p>
            <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight text-white">
              In-Depth Anime Reviews, Manga Analysis
              <span className="text-[#ff3a4f]"> & Theories</span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
              Expert analysis, reviews, theories, and guides for 20+ anime and manga series.
              Deep dives into One Piece, Jujutsu Kaisen, Attack on Titan, Chainsaw Man, Frieren, and more.
              Character breakdowns, ending explanations, power system analysis, and anime rankings for 2026.
            </p>
          </div>

          {/* Featured */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {featuredArticles.map(article => {
              const anime = animeList.find(a => a.slug === article.animeSlug);
              return (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="group anime-panel !bg-[#12121e] p-5 hover:!border-[#ff3a4f]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: anime?.accentColor }} />
                    <span className="text-xs text-gray-500 font-medium">{anime?.title}</span>
                  </div>
                  <h2 className="text-sm font-bold text-gray-200 mb-2 group-hover:text-[#ff3a4f] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-xs text-gray-600 line-clamp-2">{article.excerpt}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* All 20 Anime Tags */}
      <section className="bg-[#0a0a14] border-b border-[#252538] py-3 overflow-x-auto">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex gap-2 flex-nowrap">
            {animeList.map(anime => (
              <Link
                key={anime.slug}
                href={`/anime/${anime.slug}`}
                className="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded border border-[#252538] text-gray-500 hover:border-[#ff3a4f] hover:text-[#ff3a4f] hover:bg-[#ff3a4f]/5 transition-all"
              >
                {anime.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="bg-[#0a0a14] border-b border-[#252538] py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-black text-gray-600 tracking-widest uppercase">Browse:</span>
            {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(([key, label]) => (
              <Link
                key={key}
                href={`/category/${key}`}
                className={`text-xs font-bold px-3 py-1.5 rounded transition-all ${CATEGORY_COLORS[key]} hover:brightness-125`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/tags"
              className="text-xs font-bold px-3 py-1.5 rounded border border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all"
            >
              All Tags
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <span className="text-[#ff3a4f]">//</span>
                Latest Articles
              </h2>
              <div className="flex gap-3">
                {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).slice(0, 3).map(
                  ([key, label]) => (
                    <Link
                      key={key}
                      href={`/category/${key}`}
                      className="text-xs text-gray-600 hover:text-[#00d4ff] transition-colors font-medium"
                    >
                      {label}
                    </Link>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recentArticles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {articles.length > 15 && (
              <div className="text-center mt-8">
                <Link
                  href="/category/review"
                  className="inline-block bg-[#ff3a4f] text-white px-8 py-3 rounded text-sm font-black hover:bg-[#e52e42] transition-colors"
                >
                  View All Articles ({articles.length})
                </Link>
              </div>
            )}

            {/* All Anime Series Section */}
            <div className="mt-12">
              <h2 className="text-lg font-black text-white mb-6 flex items-center gap-2">
                <span className="text-[#00d4ff]">//</span>
                All Anime & Manga Series
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {animeList.map(anime => (
                  <Link
                    key={anime.slug}
                    href={`/anime/${anime.slug}`}
                    className="anime-panel group p-4 hover:!border-[#ff3a4f] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded flex items-center justify-center text-lg font-black text-white flex-shrink-0"
                        style={{ backgroundColor: anime.accentColor }}
                      >
                        {anime.title.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-gray-300 group-hover:text-[#ff3a4f] transition-colors truncate">
                          {anime.title}
                        </h3>
                        <p className="text-[10px] text-gray-600">
                          {anime.studio} | {anime.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-80 flex-shrink-0">
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
