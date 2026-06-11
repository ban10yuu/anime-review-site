import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { animeList, getAnimeBySlug } from '@/data/anime';
import { getArticlesByAnime } from '@/lib/articles';
import { getAffiliateLinks } from '@/data/affiliates';
import { CATEGORY_LABELS } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { AnimePageJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

const SITE_URL = 'https://anime-review-site.vercel.app';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return animeList.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const anime = getAnimeBySlug(slug);
  if (!anime) return {};
  const articles = getArticlesByAnime(slug);
  const canonicalUrl = `${SITE_URL}/anime/${slug}`;
  return {
    title: `${anime.title} - Analysis, Reviews & Theories`,
    description: `${articles.length} in-depth articles about ${anime.title} (${anime.titleJp}). Expert analysis, reviews, theories, and guides covering characters, plot, power systems, and more. ${anime.studio} | ${anime.year}.`,
    keywords: [
      `${anime.title} review`,
      `${anime.title} analysis`,
      `${anime.title} theory`,
      `${anime.title} explained`,
      `${anime.title} ending explained`,
      `${anime.title} characters`,
      `${anime.title} anime`,
      anime.titleJp,
      ...anime.genre,
    ],
    openGraph: {
      title: `${anime.title} | AnimeInsight`,
      description: `${articles.length} expert articles about ${anime.title} — analysis, reviews, and theories.`,
      url: canonicalUrl,
      siteName: 'AnimeInsight',
    },
    alternates: { canonical: canonicalUrl },
  };
}

export default async function AnimePage({ params }: PageProps) {
  const { slug } = await params;
  const anime = getAnimeBySlug(slug);
  if (!anime) notFound();

  const articles = getArticlesByAnime(slug);
  const affiliateLinks = getAffiliateLinks(anime);

  // Group articles by category
  const categories = ['review', 'analysis', 'theory', 'guide', 'comparison'] as const;
  const articlesByCategory = categories
    .map(cat => ({
      category: cat,
      label: CATEGORY_LABELS[cat],
      articles: articles.filter(a => a.category === cat),
    }))
    .filter(g => g.articles.length > 0);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {/* Anime Header */}
            <div className="glass-card p-6 md:p-8 mb-6" style={{ borderColor: anime.accentColor + '4d' }}>
              <nav className="text-xs text-ink-muted mb-4">
                <Link href="/" className="hover:text-violet transition-colors">Home</Link>
                <span className="mx-1">/</span>
                <span className="text-ink-soft">{anime.title}</span>
              </nav>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white flex-shrink-0 shadow-[0_8px_20px_-8px_rgba(58,49,80,0.45)]" style={{ backgroundColor: anime.accentColor }}>
                  {anime.title.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl font-black text-ink mb-1">{anime.title}</h1>
                  <p className="text-xs text-ink-muted mb-3">{anime.titleJp} | {anime.studio} | {anime.year}</p>
                  <p className="text-sm text-ink-soft leading-relaxed mb-4">{anime.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {anime.genre.map(g => (
                      <span key={g} className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-line bg-white/55 text-ink-soft">
                        {g}
                      </span>
                    ))}
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${anime.status === 'ongoing' ? 'bg-emerald-500/12 text-emerald-700 border border-emerald-500/30' : 'bg-ink/10 text-ink-soft border border-ink/15'}`}>
                      {anime.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                    </span>
                    {anime.episodes && (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-violet/10 text-violet border border-violet/30">
                        {anime.episodes} Episodes
                      </span>
                    )}
                    {anime.rating && (
                      <span className="star-rating text-[10px] px-2.5 py-0.5">
                        {anime.rating}
                      </span>
                    )}
                  </div>

                  {/* Affiliate Links */}
                  <div className="flex flex-wrap gap-2">
                    {affiliateLinks.slice(0, 3).map(link => (
                      <a
                        key={link.service}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-xs font-bold px-4 py-1.5 rounded-full transition-all hover:brightness-110 hover:-translate-y-px shadow-[0_6px_14px_-8px_rgba(58,49,80,0.5)]"
                        style={{ backgroundColor: link.color, color: '#fff' }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Articles */}
            <h2 className="text-lg font-black text-ink mb-4 flex items-center gap-2">
              <span aria-hidden className="w-1.5 h-5 rounded-full sunset-gradient" />
              All {anime.title} Articles ({articles.length})
            </h2>
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {articles.map(article => (
                  <ArticleCard key={article.slug} article={article} showAnime={false} />
                ))}
              </div>
            ) : (
              <p className="text-ink-muted text-sm">No articles yet for this series.</p>
            )}

            {/* Articles by Category */}
            {articlesByCategory.length > 1 && (
              <div className="mt-8">
                <h2 className="text-lg font-black text-ink mb-4 flex items-center gap-2">
                  <span aria-hidden className="w-1.5 h-5 rounded-full sunset-gradient" />
                  Browse by Category
                </h2>
                <div className="flex flex-wrap gap-3 mb-6">
                  {articlesByCategory.map(({ category, label, articles: catArticles }) => (
                    <Link
                      key={category}
                      href={`/category/${category}`}
                      className="tag-chip text-xs font-bold px-3.5 py-1.5"
                    >
                      {label} ({catArticles.length})
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Other Anime Links */}
            <div className="mt-8 glass-card p-5">
              <h2 className="text-sm font-black sunset-text mb-3">More Anime Series</h2>
              <div className="flex flex-wrap gap-2">
                {animeList
                  .filter(a => a.slug !== slug)
                  .slice(0, 10)
                  .map(a => (
                    <Link
                      key={a.slug}
                      href={`/anime/${a.slug}`}
                      className="tag-chip text-xs font-bold px-3.5 py-1.5"
                    >
                      {a.title}
                    </Link>
                  ))}
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

      {/* JSON-LD Structured Data */}
      <AnimePageJsonLd anime={anime} articleCount={articles.length} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: anime.title, url: `${SITE_URL}/anime/${slug}` },
        ]}
      />
    </>
  );
}
