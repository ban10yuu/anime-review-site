import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTagSlugs, getArticlesByTag } from '@/lib/articles';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

const SITE_URL = 'https://anime-review-site.vercel.app';

export const metadata: Metadata = {
  title: 'All Tags - Anime & Manga Article Tags',
  description:
    'Browse all article tags on AnimeInsight. Find in-depth analysis, reviews, theories, and guides organized by topic across 20+ anime and manga series.',
  keywords: ['anime tags', 'manga tags', 'anime topics', 'anime categories', 'anime review tags'],
  openGraph: {
    title: 'All Tags | AnimeInsight',
    description: 'Browse all anime and manga article tags.',
    url: `${SITE_URL}/tags`,
    siteName: 'AnimeInsight',
  },
  alternates: { canonical: `${SITE_URL}/tags` },
};

export default function TagsPage() {
  const allTagSlugs = getAllTagSlugs();
  const tagsWithCounts = allTagSlugs.map(({ slug, tag }) => ({
    slug,
    tag,
    count: getArticlesByTag(tag).length,
  }));

  // Sort by count descending
  tagsWithCounts.sort((a, b) => b.count - a.count);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
        <nav className="text-xs text-gray-600 mb-4">
          <Link href="/" className="hover:text-[#ff3a4f] transition-colors">Home</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-500">Tags</span>
        </nav>

        <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
          All Tags
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {tagsWithCounts.length} tags across all anime and manga articles
        </p>

        <div className="flex flex-wrap gap-3">
          {tagsWithCounts.map(({ slug, tag, count }) => (
            <Link
              key={slug}
              href={`/tag/${slug}`}
              className="group anime-panel !p-0 overflow-hidden hover:!border-[#ff3a4f] transition-all"
            >
              <div className="px-4 py-2.5 flex items-center gap-2">
                <span className="text-sm font-bold text-gray-300 group-hover:text-[#ff3a4f] transition-colors">
                  #{tag}
                </span>
                <span className="text-[10px] font-black bg-[#1a1a2a] text-gray-500 px-2 py-0.5 rounded-full">
                  {count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Tags', url: `${SITE_URL}/tags` },
        ]}
      />
    </>
  );
}
