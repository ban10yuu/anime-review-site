import { AnimeInfo } from '@/lib/types';
import { getAffiliateLinks, MOSHIMO_IMPRESSION_URL } from '@/data/affiliates';

export default function AffiliateWidget({ anime }: { anime: AnimeInfo }) {
  const links = getAffiliateLinks(anime);

  return (
    <div className="my-8 p-6 bg-[#1a1a2a] rounded-lg border-2 border-[#ffd23f]/30">
      <h3 className="text-lg font-black text-[#ffd23f] mb-1">
        Watch & Read {anime.title}
      </h3>
      <p className="text-xs text-gray-500 mb-4">Support the creators by using official sources</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map(link => (
          <a
            key={link.service}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="flex items-center justify-between p-3 rounded-lg border transition-all hover:scale-[1.02]"
            style={{
              borderColor: link.color + '40',
              background: `linear-gradient(135deg, ${link.color}08, transparent)`,
            }}
          >
            <div>
              <span className="text-sm font-bold text-white block">{link.label}</span>
              {link.badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white mt-1 inline-block" style={{ backgroundColor: link.color }}>
                  {link.badge}
                </span>
              )}
            </div>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ))}
      </div>

      <p className="text-[10px] text-gray-600 mt-4 text-center">
        * This site participates in affiliate programs
      </p>

      {/* もしもアフィリエイト impression tracker */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MOSHIMO_IMPRESSION_URL} width={1} height={1} style={{ border: 'none' }} alt="" loading="lazy" />
    </div>
  );
}
