import Link from 'next/link';
import { animeList } from '@/data/anime';

export default function Footer() {
  const ongoingAnime = animeList.filter(a => a.status === 'ongoing').slice(0, 8);
  const completedAnime = animeList.filter(a => a.status === 'completed').slice(0, 8);

  return (
    <footer className="bg-[#080810] text-gray-400 border-t-2 border-[#ff3a4f]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2" style={{ fontFamily: 'Orbitron, Inter, sans-serif' }}>
              <span className="text-[#ff3a4f]">//</span>
              Anime<span className="text-[#00d4ff]">Insight</span>
            </h3>
            <p className="text-sm leading-relaxed text-gray-500">
              In-depth anime and manga analysis, reviews, and theories for the global otaku community.
              Exploring the stories that define a generation.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black text-[#ff3a4f] mb-4 tracking-widest uppercase">Ongoing Series</h4>
            <ul className="space-y-2">
              {ongoingAnime.map(anime => (
                <li key={anime.slug}>
                  <Link href={`/anime/${anime.slug}`} className="text-sm text-gray-500 hover:text-[#ff3a4f] transition-colors">
                    {anime.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-[#ffd23f] mb-4 tracking-widest uppercase">Completed Series</h4>
            <ul className="space-y-2">
              {completedAnime.map(anime => (
                <li key={anime.slug}>
                  <Link href={`/anime/${anime.slug}`} className="text-sm text-gray-500 hover:text-[#ffd23f] transition-colors">
                    {anime.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-[#00d4ff] mb-4 tracking-widest uppercase">Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/category/review" className="text-sm text-gray-500 hover:text-[#00d4ff] transition-colors">Reviews</Link></li>
              <li><Link href="/category/analysis" className="text-sm text-gray-500 hover:text-[#00d4ff] transition-colors">Analysis</Link></li>
              <li><Link href="/category/theory" className="text-sm text-gray-500 hover:text-[#00d4ff] transition-colors">Theories</Link></li>
              <li><Link href="/category/guide" className="text-sm text-gray-500 hover:text-[#00d4ff] transition-colors">Guides</Link></li>
              <li><Link href="/category/comparison" className="text-sm text-gray-500 hover:text-[#00d4ff] transition-colors">Comparisons</Link></li>
            </ul>

            <h4 className="text-xs font-black text-gray-500 mt-6 mb-4 tracking-widest uppercase">Where to Watch</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://www.crunchyroll.com/" target="_blank" rel="noopener noreferrer nofollow" className="text-gray-500 hover:text-[#f47521] transition-colors">Crunchyroll</a></li>
              <li><a href="https://www.viz.com/" target="_blank" rel="noopener noreferrer nofollow" className="text-gray-500 hover:text-[#e50914] transition-colors">VIZ Media</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#252538] text-center text-xs text-gray-600">
          <p>Disclaimer: All opinions expressed are those of the author and do not represent official positions.</p>
          <p className="mt-1">This site participates in affiliate programs. We may earn commissions from qualifying purchases.</p>
          <p className="mt-4 text-gray-500">&copy; {new Date().getFullYear()} AnimeInsight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
