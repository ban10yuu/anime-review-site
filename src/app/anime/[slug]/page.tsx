import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { animeList, getAnimeBySlug } from '@/data/anime';
import { getArticlesByAnime } from '@/lib/articles';
import { getAffiliateLinks } from '@/data/affiliates';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';

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
  const canonicalUrl = `https://anime-review-site.vercel.app/anime/${slug}`;
  return {
    title: `${anime.title} - Analysis, Reviews & Theories`,
    description: anime.description,
    openGraph: {
      title: `${anime.title} | AnimeInsight`,
      description: anime.description,
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          {/* Anime Header */}
          <div className="bg-[#12121e] rounded-lg border-2 p-6 md:p-8 mb-6" style={{ borderColor: anime.accentColor + '40' }}>
            <nav className="text-xs text-gray-600 mb-4">
              <Link href="/" className="hover:text-[#ff3a4f] transition-colors">Home</Link>
              <span className="mx-1">/</span>
              <span className="text-gray-500">{anime.title}</span>
            </nav>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-black text-white flex-shrink-0" style={{ backgroundColor: anime.accentColor }}>
                {anime.title.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl font-black text-white mb-1">{anime.title}</h1>
                <p className="text-xs text-gray-500 mb-3">{anime.titleJp} | {anime.studio} | {anime.year}</p>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{anime.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {anime.genre.map(g => (
                    <span key={g} className="text-[10px] font-bold px-2 py-0.5 rounded border border-[#252538] text-gray-500">
                      {g}
                    </span>
                  ))}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${anime.status === 'ongoing' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'}`}>
                    {anime.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                  </span>
                  {anime.episodes && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {anime.episodes} Episodes
                    </span>
                  )}
                  {anime.rating && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Rating: {anime.rating}
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
                      className="text-xs font-bold px-3 py-1.5 rounded transition-all hover:brightness-110"
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
          <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
            <span className="text-[#ff3a4f]">//</span>
            Articles about {anime.title}
          </h2>
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {articles.map(article => (
                <ArticleCard key={article.slug} article={article} showAnime={false} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No articles yet for this series.</p>
          )}
        </div>

        <div className="lg:w-80 flex-shrink-0">
          <div className="sticky top-16">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
