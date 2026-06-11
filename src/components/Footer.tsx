import Link from 'next/link';
import { animeList } from '@/data/anime';
import { getAllTags, tagToSlug } from '@/lib/articles';

export default function Footer() {
  const ongoingAnime = animeList.filter(a => a.status === 'ongoing');
  const completedAnime = animeList.filter(a => a.status === 'completed');
  const popularTags = getAllTags().slice(0, 15);

  return (
    <footer className="relative mt-16 border-t border-white/80 bg-white/55 backdrop-blur-xl text-ink-soft">
      <div aria-hidden className="absolute inset-x-0 top-0 h-1 sunset-gradient" />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Site Description */}
          <div>
            <h3 className="text-lg font-black text-ink mb-3" style={{ fontFamily: 'var(--font-zen-maru), var(--font-noto-sans), sans-serif' }}>
              Anime<span className="sunset-text">Insight</span>
            </h3>
            <p className="text-sm leading-relaxed text-ink-soft">
              In-depth anime and manga analysis, reviews, theories, and guides.
              Covering 20+ popular series with expert breakdowns.
            </p>
          </div>

          {/* Ongoing Series */}
          <div>
            <h4 className="text-xs font-bold text-ink mb-3 tracking-wide uppercase">Ongoing Series</h4>
            <ul className="space-y-1.5">
              {ongoingAnime.map(anime => (
                <li key={anime.slug}>
                  <Link href={`/anime/${anime.slug}`} className="text-sm text-ink-soft hover:text-violet transition-colors">
                    {anime.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Completed + Categories */}
          <div>
            <h4 className="text-xs font-bold text-ink mb-3 tracking-wide uppercase">Completed Series</h4>
            <ul className="space-y-1.5">
              {completedAnime.map(anime => (
                <li key={anime.slug}>
                  <Link href={`/anime/${anime.slug}`} className="text-sm text-ink-soft hover:text-violet transition-colors">
                    {anime.title}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-bold text-ink mt-6 mb-3 tracking-wide uppercase">Categories</h4>
            <ul className="space-y-1.5">
              <li><Link href="/category/review" className="text-sm text-ink-soft hover:text-violet transition-colors">Reviews</Link></li>
              <li><Link href="/category/analysis" className="text-sm text-ink-soft hover:text-violet transition-colors">Analysis</Link></li>
              <li><Link href="/category/theory" className="text-sm text-ink-soft hover:text-violet transition-colors">Theories</Link></li>
              <li><Link href="/category/guide" className="text-sm text-ink-soft hover:text-violet transition-colors">Guides</Link></li>
              <li><Link href="/category/comparison" className="text-sm text-ink-soft hover:text-violet transition-colors">Comparisons</Link></li>
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h4 className="text-xs font-bold text-ink mb-3 tracking-wide uppercase">
              <Link href="/tags" className="hover:text-violet transition-colors">Popular Tags</Link>
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {popularTags.map(tag => (
                <Link
                  key={tag}
                  href={`/tag/${tagToSlug(tag)}`}
                  className="tag-chip text-[10px] px-2.5 py-0.5"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            <h4 className="text-xs font-bold text-ink mb-3 tracking-wide uppercase">Where to Watch</h4>
            <ul className="space-y-1.5 text-sm">
              <li><a href="https://www.crunchyroll.com/" target="_blank" rel="noopener noreferrer nofollow" className="text-ink-soft hover:text-violet transition-colors">Crunchyroll</a></li>
              <li><a href="https://www.viz.com/" target="_blank" rel="noopener noreferrer nofollow" className="text-ink-soft hover:text-violet transition-colors">VIZ Media</a></li>
            </ul>
          </div>
        </div>

        {/* Sister Sites */}
        <div className="mt-8 pt-6 border-t border-line">
          <h4 className="text-xs font-bold text-ink mb-3 tracking-wide uppercase">Sister Sites</h4>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <a href="https://manga-matome-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-ink-soft hover:text-violet transition-colors">Manga Insight Lab</a>
            <a href="https://ai-tools-site-dusky.vercel.app" target="_blank" rel="noopener" className="text-xs text-ink-soft hover:text-violet transition-colors">AI Tools Lab</a>
            <a href="https://vod-navi-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-ink-soft hover:text-violet transition-colors">Streaming Guide</a>
            <a href="https://fukusen-lab.vercel.app" target="_blank" rel="noopener" className="text-xs text-ink-soft hover:text-violet transition-colors">Foreshadowing Lab</a>
            <a href="https://joseikin-navi-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-ink-soft hover:text-violet transition-colors">Grants Navigator</a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-line text-center text-xs text-ink-muted">
          <p>Disclaimer: All opinions expressed are those of the author and do not represent official positions.</p>
          <p className="mt-1">This site participates in affiliate programs. We may earn commissions from qualifying purchases.</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link href="/privacy/" className="text-ink-soft hover:text-violet transition-colors">Privacy Policy</Link>
            <span className="text-ink-muted">|</span>
            <Link href="/contact/" className="text-ink-soft hover:text-violet transition-colors">Contact</Link>
          </div>
          <p className="mt-3 text-ink-soft">&copy; {new Date().getFullYear()} AnimeInsight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
