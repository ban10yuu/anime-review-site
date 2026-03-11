import Link from 'next/link';
import { Article, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/types';
import { getAnimeBySlug } from '@/data/anime';
import { tagToSlug } from '@/lib/articles';

export default function ArticleCard({ article, showAnime = true }: { article: Article; showAnime?: boolean }) {
  const anime = getAnimeBySlug(article.animeSlug);

  return (
    <article className="anime-panel group overflow-hidden">
      <div className="h-1" style={{ backgroundColor: anime?.accentColor || '#ff3a4f' }} />

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${CATEGORY_COLORS[article.category] || ''}`}>
            {CATEGORY_LABELS[article.category]}
          </span>
          {showAnime && anime && (
            <Link
              href={`/anime/${anime.slug}`}
              className="text-xs text-gray-500 hover:text-[#ff3a4f] transition-colors"
            >
              {anime.title}
            </Link>
          )}
          <time className="text-[10px] text-gray-600 ml-auto" dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </time>
        </div>

        <Link href={`/article/${article.slug}`}>
          <h3 className="text-base font-bold text-gray-200 group-hover:text-[#ff3a4f] transition-colors leading-snug mb-2 line-clamp-2">
            {article.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {article.tags.slice(0, 3).map(tag => (
            <Link
              key={tag}
              href={`/tag/${tagToSlug(tag)}`}
              className="text-[10px] text-gray-600 hover:text-[#ff3a4f] transition-colors before:content-['#']"
            >
              {tag}
            </Link>
          ))}
          <Link
            href={`/article/${article.slug}`}
            className="ml-auto text-xs font-bold text-[#ff3a4f] hover:text-[#00d4ff] transition-colors flex items-center gap-1"
          >
            Read More
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
