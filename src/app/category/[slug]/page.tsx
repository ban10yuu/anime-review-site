import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticlesByCategory } from '@/lib/articles';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

const SITE_URL = 'https://anime-review-site.vercel.app';
const validCategories: ArticleCategory[] = ['review', 'analysis', 'theory', 'guide', 'comparison'];

const CATEGORY_DESCRIPTIONS: Record<ArticleCategory, string> = {
  review: 'In-depth anime and manga reviews covering storytelling, animation quality, character development, and overall impact. Expert reviews of One Piece, Jujutsu Kaisen, Chainsaw Man, Frieren, Attack on Titan, and more.',
  analysis: 'Deep analytical breakdowns of anime and manga series. Character analysis, plot structure, themes, symbolism, and narrative techniques explored across 20+ popular series.',
  theory: 'Speculative theories and predictions for ongoing anime and manga series. Fan theories about One Piece, Jujutsu Kaisen, Hunter x Hunter, Chainsaw Man, and more popular titles.',
  guide: 'Comprehensive guides for anime and manga fans. Beginner guides, power system explanations, arc rankings, watch orders, and reading recommendations.',
  comparison: 'Side-by-side comparisons of anime series, characters, power systems, and adaptations. Manga vs anime, character matchups, and cross-series analysis.',
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return validCategories.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!validCategories.includes(slug as ArticleCategory)) return {};
  const label = CATEGORY_LABELS[slug as ArticleCategory];
  const articles = getArticlesByCategory(slug as ArticleCategory);
  const canonicalUrl = `${SITE_URL}/category/${slug}`;
  return {
    title: `${label} Articles - Anime & Manga ${label}`,
    description: CATEGORY_DESCRIPTIONS[slug as ArticleCategory],
    keywords: [
      `anime ${label.toLowerCase()}`,
      `manga ${label.toLowerCase()}`,
      `anime ${label.toLowerCase()} 2026`,
      `best anime ${label.toLowerCase()}`,
      'anime review',
      'manga analysis',
    ],
    openGraph: {
      title: `${label} Articles | AnimeInsight`,
      description: `Browse ${articles.length} ${label.toLowerCase()} articles covering popular anime and manga series.`,
      url: canonicalUrl,
      siteName: 'AnimeInsight',
    },
    alternates: { canonical: canonicalUrl },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  if (!validCategories.includes(slug as ArticleCategory)) notFound();

  const category = slug as ArticleCategory;
  const articles = getArticlesByCategory(category);
  const label = CATEGORY_LABELS[category];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-6">
              <nav className="text-xs text-gray-600 mb-4">
                <Link href="/" className="hover:text-[#ff3a4f] transition-colors">Home</Link>
                <span className="mx-1">/</span>
                <span className="text-gray-500">{label}</span>
              </nav>
              <h1 className="text-2xl md:text-3xl font-black text-white mb-2">{label} Articles</h1>
              <p className="text-sm text-gray-500 mb-1">{articles.length} articles</p>
              <p className="text-xs text-gray-600 max-w-2xl">{CATEGORY_DESCRIPTIONS[category]}</p>

              {/* Category tabs */}
              <div className="flex gap-2 mt-4 flex-wrap">
                {validCategories.map(cat => (
                  <Link
                    key={cat}
                    href={`/category/${cat}`}
                    className={`text-xs font-bold px-3 py-1.5 rounded border transition-all ${
                      cat === category
                        ? 'border-[#ff3a4f] text-[#ff3a4f] bg-[#ff3a4f]/10'
                        : 'border-[#252538] text-gray-500 hover:border-[#ff3a4f] hover:text-[#ff3a4f]'
                    }`}
                  >
                    {CATEGORY_LABELS[cat]}
                  </Link>
                ))}
              </div>
            </div>

            {/* Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {articles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>

          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-16">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: label, url: `${SITE_URL}/category/${slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${label} Articles | AnimeInsight`,
            description: CATEGORY_DESCRIPTIONS[category],
            url: `${SITE_URL}/category/${slug}`,
            publisher: { '@type': 'Organization', name: 'AnimeInsight' },
            inLanguage: 'en-US',
            numberOfItems: articles.length,
          }),
        }}
      />
    </>
  );
}
