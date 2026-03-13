import Link from 'next/link';
import { animeList } from '@/data/anime';
import { getAllTags, tagToSlug } from '@/lib/articles';

export default function Footer() {
  const ongoingAnime = animeList.filter(a => a.status === 'ongoing');
  const completedAnime = animeList.filter(a => a.status === 'completed');
  const popularTags = getAllTags().slice(0, 15);

  return (
    <footer className="bg-[#080810] text-gray-400 border-t border-[#252538]">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Site Description */}
          <div>
            <h3 className="text-lg font-black text-white mb-3" style={{ fontFamily: 'var(--font-orbitron), var(--font-inter), sans-serif' }}>
              Anime<span className="text-[#00d4ff]">Insight</span>
            </h3>
            <p className="text-sm leading-relaxed text-gray-500">
              In-depth anime and manga analysis, reviews, theories, and guides.
              Covering 20+ popular series with expert breakdowns.
            </p>
          </div>

          {/* Ongoing Series */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 mb-3 tracking-wide uppercase">Ongoing Series</h4>
            <ul className="space-y-1.5">
              {ongoingAnime.map(anime => (
                <li key={anime.slug}>
                  <Link href={`/anime/${anime.slug}`} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {anime.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Completed + Categories */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 mb-3 tracking-wide uppercase">Completed Series</h4>
            <ul className="space-y-1.5">
              {completedAnime.map(anime => (
                <li key={anime.slug}>
                  <Link href={`/anime/${anime.slug}`} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {anime.title}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-bold text-gray-400 mt-6 mb-3 tracking-wide uppercase">Categories</h4>
            <ul className="space-y-1.5">
              <li><Link href="/category/review" className="text-sm text-gray-500 hover:text-white transition-colors">Reviews</Link></li>
              <li><Link href="/category/analysis" className="text-sm text-gray-500 hover:text-white transition-colors">Analysis</Link></li>
              <li><Link href="/category/theory" className="text-sm text-gray-500 hover:text-white transition-colors">Theories</Link></li>
              <li><Link href="/category/guide" className="text-sm text-gray-500 hover:text-white transition-colors">Guides</Link></li>
              <li><Link href="/category/comparison" className="text-sm text-gray-500 hover:text-white transition-colors">Comparisons</Link></li>
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 mb-3 tracking-wide uppercase">
              <Link href="/tags" className="hover:text-white transition-colors">Popular Tags</Link>
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {popularTags.map(tag => (
                <Link
                  key={tag}
                  href={`/tag/${tagToSlug(tag)}`}
                  className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors bg-[#0e0e1a] px-2 py-0.5 rounded border border-[#1a1a2a]"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            <h4 className="text-xs font-bold text-gray-500 mb-3 tracking-wide uppercase">Where to Watch</h4>
            <ul className="space-y-1.5 text-sm">
              <li><a href="https://www.crunchyroll.com/" target="_blank" rel="noopener noreferrer nofollow" className="text-gray-500 hover:text-white transition-colors">Crunchyroll</a></li>
              <li><a href="https://www.viz.com/" target="_blank" rel="noopener noreferrer nofollow" className="text-gray-500 hover:text-white transition-colors">VIZ Media</a></li>
            </ul>
          </div>
        </div>

        {/* Sister Sites */}
        <div className="mt-8 pt-6 border-t border-[#252538]">
          <h4 className="text-xs font-bold text-gray-500 mb-3 tracking-wide uppercase">Sister Sites</h4>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <a href="https://manga-matome-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-gray-500 hover:text-white transition-colors">Manga Insight Lab</a>
            <a href="https://ai-tools-site-dusky.vercel.app" target="_blank" rel="noopener" className="text-xs text-gray-500 hover:text-white transition-colors">AI Tools Lab</a>
            <a href="https://vod-navi-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-gray-500 hover:text-white transition-colors">Streaming Guide</a>
            <a href="https://fukusen-lab.vercel.app" target="_blank" rel="noopener" className="text-xs text-gray-500 hover:text-white transition-colors">Foreshadowing Lab</a>
            <a href="https://joseikin-navi-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-gray-500 hover:text-white transition-colors">Grants Navigator</a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#252538] text-center text-xs text-gray-600">
          <p>Disclaimer: All opinions expressed are those of the author and do not represent official positions.</p>
          <p className="mt-1">This site participates in affiliate programs. We may earn commissions from qualifying purchases.</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link href="/privacy/" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-gray-700">|</span>
            <Link href="/contact/" className="text-gray-500 hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="mt-3 text-gray-500">&copy; {new Date().getFullYear()} AnimeInsight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
