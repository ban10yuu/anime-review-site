import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticlesByCategory } from '@/lib/articles';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';

const validCategories: ArticleCategory[] = ['review', 'analysis', 'theory', 'guide', 'comparison'];

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
  const canonicalUrl = `https://anime-review-site.vercel.app/category/${slug}`;
  return {
    title: `${label} Articles - Anime & Manga ${label}`,
    description: `Browse all ${label.toLowerCase()} articles covering popular anime and manga series including One Piece, Jujutsu Kaisen, Chainsaw Man, and more.`,
    openGraph: {
      title: `${label} | AnimeInsight`,
      description: `Browse all ${label.toLowerCase()} articles.`,
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
            <p className="text-sm text-gray-500">{articles.length} articles</p>

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
  );
}
