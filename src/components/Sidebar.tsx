import Link from 'next/link';
import { animeList } from '@/data/anime';
import { getPopularArticles } from '@/lib/articles';
import { generalAffiliates } from '@/data/affiliates';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';

export default function Sidebar() {
  const popularArticles = getPopularArticles(10);

  return (
    <aside className="space-y-6">
      {/* Affiliate Banner */}
      <div className="anime-panel !border-[#ffd23f] p-5">
        <h3 className="text-sm font-black text-[#ffd23f] mb-4 flex items-center gap-2">
          Where to Watch & Read
        </h3>
        <div className="space-y-3">
          {generalAffiliates.slice(0, 3).map((af, i) => (
            <a
              key={af.title}
              href={af.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block relative overflow-hidden rounded-lg group transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-black/30"
            >
              <div
                className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${af.color} 0%, transparent 60%)` }}
              />
              <div
                className="absolute left-0 top-0 bottom-0 w-1 group-hover:w-1.5 transition-all"
                style={{ backgroundColor: af.color }}
              />
              <div className="relative bg-[#161624] border border-[#252538] group-hover:border-[#353550] rounded-lg p-4 pl-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-black text-base text-white">{af.title}</span>
                  {af.badge && (
                    <span
                      className="text-xs font-black px-2.5 py-1 rounded-full text-white shadow-lg"
                      style={{ backgroundColor: af.color, boxShadow: `0 0 12px ${af.color}60` }}
                    >
                      {af.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mb-3 leading-relaxed">{af.description}</p>
                <div
                  className="flex items-center justify-center gap-1 text-sm font-bold py-2 rounded-md transition-all group-hover:brightness-110"
                  style={{ backgroundColor: af.color, color: '#fff', boxShadow: `0 2px 8px ${af.color}40` }}
                >
                  Check It Out
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                {i === 0 && (
                  <div className="absolute -top-0 -right-0">
                    <div className="bg-[#ffd23f] text-[#0a0a14] text-[10px] font-black px-3 py-0.5 rounded-bl-lg rounded-tr-lg">
                      Recommended
                    </div>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Category Links */}
      <div className="anime-panel p-5">
        <h3 className="text-sm font-black text-[#00d4ff] mb-4 flex items-center gap-2">
          Categories
        </h3>
        <div className="space-y-1">
          {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(([key, label]) => (
            <Link
              key={key}
              href={`/category/${key}`}
              className="flex items-center gap-2 py-1.5 px-2 rounded text-sm text-gray-500 hover:bg-[#1a1a2a] hover:text-[#00d4ff] transition-colors"
            >
              <span className="text-[10px]">
                {key === 'review' ? '///' : key === 'analysis' ? '>>>' : key === 'theory' ? '???' : key === 'guide' ? '###' : '<=>'}
              </span>
              {label}
            </Link>
          ))}
          <Link
            href="/tags"
            className="flex items-center gap-2 py-1.5 px-2 rounded text-sm text-gray-500 hover:bg-[#1a1a2a] hover:text-[#ff3a4f] transition-colors mt-2 border-t border-[#252538] pt-3"
          >
            <span className="text-[10px]">###</span>
            Browse All Tags
          </Link>
        </div>
      </div>

      {/* Popular Articles (expanded to 10) */}
      <div className="anime-panel p-5">
        <h3 className="text-sm font-black text-[#ff3a4f] mb-4 flex items-center gap-2">
          Trending Articles
        </h3>
        <ol className="space-y-3">
          {popularArticles.map((article, i) => (
            <li key={article.slug}>
              <Link href={`/article/${article.slug}`} className="flex gap-3 group">
                <span className={`rank-badge ${i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-other'}`}>
                  {i + 1}
                </span>
                <span className="text-sm text-gray-400 group-hover:text-[#ff3a4f] transition-colors leading-snug line-clamp-2">
                  {article.title}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* More Services */}
      <div className="anime-panel !border-[#00d4ff] p-5">
        <h3 className="text-sm font-black text-[#00d4ff] mb-4 flex items-center gap-2">
          More Services
        </h3>
        <div className="space-y-3">
          {generalAffiliates.slice(3).map(af => (
            <a
              key={af.title}
              href={af.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block relative overflow-hidden rounded-lg group transition-all hover:scale-[1.02]"
            >
              <div className="relative bg-[#161624] border border-[#252538] group-hover:border-[#353550] rounded-lg p-4 pl-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-white">{af.title}</span>
                  {af.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: af.color }}>
                      {af.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{af.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Anime List */}
      <div className="anime-panel p-5">
        <h3 className="text-sm font-black text-[#00d4ff] mb-4 flex items-center gap-2">
          All Anime
        </h3>
        <div className="space-y-0.5">
          {animeList.map(a => (
            <Link
              key={a.slug}
              href={`/anime/${a.slug}`}
              className="flex items-center gap-2 py-1.5 px-2 rounded text-sm text-gray-500 hover:bg-[#1a1a2a] hover:text-white transition-colors"
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: a.accentColor }} />
              {a.title}
              <span className="ml-auto text-[10px] text-gray-600">
                {a.status === 'ongoing' ? 'Ongoing' : 'Completed'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
