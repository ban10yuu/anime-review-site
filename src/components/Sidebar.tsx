import Link from 'next/link';
import { animeList } from '@/data/anime';
import { getPopularArticles } from '@/lib/articles';
import { generalAffiliates, MOSHIMO_IMPRESSION_URL } from '@/data/affiliates';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';

export default function Sidebar() {
  const popularArticles = getPopularArticles(8);

  return (
    <aside className="space-y-6">
      {/* Trending Articles */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-black text-ink mb-4 flex items-center gap-2">
          <span aria-hidden className="w-1.5 h-4 rounded-full sunset-gradient" />
          Trending Articles
        </h3>
        <ol className="space-y-3">
          {popularArticles.map((article, i) => (
            <li key={article.slug}>
              <Link href={`/article/${article.slug}`} className="flex gap-3 group">
                <span className={`rank-badge ${i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-other'}`}>
                  {i + 1}
                </span>
                <span className="text-sm text-ink-soft group-hover:text-violet transition-colors leading-snug line-clamp-2">
                  {article.title}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* Categories */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-black text-ink mb-4 flex items-center gap-2">
          <span aria-hidden className="w-1.5 h-4 rounded-full sunset-gradient" />
          Categories
        </h3>
        <div className="space-y-1">
          {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(([key, label]) => (
            <Link
              key={key}
              href={`/category/${key}`}
              className="block py-1.5 px-3 rounded-full text-sm text-ink-soft hover:bg-violet/10 hover:text-violet transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/tags"
            className="block py-1.5 px-3 rounded-full text-sm text-ink-soft hover:bg-violet/10 hover:text-violet transition-colors mt-2 border-t border-line pt-3"
          >
            Browse All Tags
          </Link>
        </div>
      </div>

      {/* Where to Watch */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-black text-ink mb-4 flex items-center gap-2">
          <span aria-hidden className="w-1.5 h-4 rounded-full sunset-gradient" />
          Where to Watch & Read
        </h3>
        <div className="space-y-2">
          {generalAffiliates.slice(0, 3).map(af => (
            <a
              key={af.title}
              href={af.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-between py-2 group"
            >
              <div>
                <span className="text-sm font-bold text-ink group-hover:text-violet transition-colors">
                  {af.title}
                </span>
                {af.badge && (
                  <span className="ml-2 text-[10px] font-bold text-coral bg-coral/10 border border-coral/25 px-2 py-0.5 rounded-full">
                    {af.badge}
                  </span>
                )}
              </div>
              <svg className="w-4 h-4 text-ink-muted group-hover:text-violet group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Anime List -- compact */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-black text-ink mb-4 flex items-center gap-2">
          <span aria-hidden className="w-1.5 h-4 rounded-full sunset-gradient" />
          All Anime
        </h3>
        <div className="space-y-0.5">
          {animeList.map(a => (
            <Link
              key={a.slug}
              href={`/anime/${a.slug}`}
              className="flex items-center gap-2 py-1.5 px-3 rounded-full text-sm text-ink-soft hover:bg-violet/10 hover:text-violet transition-colors"
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: a.accentColor }} />
              {a.title}
              <span className="ml-auto text-[10px] text-ink-muted">
                {a.status === 'ongoing' ? 'Ongoing' : 'Completed'}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Impression tracking */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MOSHIMO_IMPRESSION_URL} width={1} height={1} style={{ border: 'none' }} alt="" loading="lazy" />
    </aside>
  );
}
