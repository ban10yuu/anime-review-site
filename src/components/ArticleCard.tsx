import Link from 'next/link';
import { Article, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/types';
import { getAnimeBySlug } from '@/data/anime';
import { tagToSlug } from '@/lib/articles';

export default function ArticleCard({ article, showAnime = true }: { article: Article; showAnime?: boolean }) {
  const anime = getAnimeBySlug(article.animeSlug);

  return (
    <article className="glass-card glass-hover group">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[article.category] || ''}`}>
            {CATEGORY_LABELS[article.category]}
          </span>
          {showAnime && anime && (
            <Link
              href={`/anime/${anime.slug}`}
              className="text-xs text-ink-muted hover:text-violet transition-colors"
            >
              {anime.title}
            </Link>
          )}
          <time className="text-[10px] text-ink-muted ml-auto" dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </time>
        </div>

        <Link href={`/article/${article.slug}`}>
          <h3 className="text-base font-bold text-ink group-hover:text-violet transition-colors leading-snug mb-2 line-clamp-2">
            {article.title}
          </h3>
        </Link>

        <p className="text-sm text-ink-soft leading-relaxed line-clamp-2 mb-3">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {article.tags.slice(0, 3).map(tag => (
            <Link
              key={tag}
              href={`/tag/${tagToSlug(tag)}`}
              className="text-[10px] text-ink-muted hover:text-violet transition-colors before:content-['#']"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
