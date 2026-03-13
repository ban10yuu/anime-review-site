'use client';

import Link from 'next/link';
import { useState } from 'react';
import { animeList } from '@/data/anime';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#080810]/95 backdrop-blur text-white border-b border-[#252538]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight" style={{ fontFamily: 'var(--font-orbitron), var(--font-inter), sans-serif' }}>
            <span className="text-white">
              Anime<span className="text-[#00d4ff]">Insight</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <div className="group relative">
              <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                Anime
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 top-full mt-1 w-56 bg-[#12121e] border border-[#252538] rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 max-h-80 overflow-y-auto">
                {animeList.map(anime => (
                  <Link
                    key={anime.slug}
                    href={`/anime/${anime.slug}`}
                    className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#1a1a2a] transition-colors"
                  >
                    {anime.title}
                  </Link>
                ))}
              </div>
            </div>
            {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).slice(0, 3).map(([key, label]) => (
              <Link key={key} href={`/category/${key}`} className="text-gray-400 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-400"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-[#252538] mt-2 pt-4">
            <Link href="/" className="block py-2 text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Home</Link>
            {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(([key, label]) => (
              <Link key={key} href={`/category/${key}`} className="block py-2 text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <div className="mt-3 border-t border-[#252538] pt-3">
              <p className="text-xs text-gray-600 mb-2 font-bold uppercase">Anime</p>
              <div className="grid grid-cols-2 gap-1">
                {animeList.slice(0, 10).map(anime => (
                  <Link key={anime.slug} href={`/anime/${anime.slug}`} className="text-sm py-1.5 text-gray-500 hover:text-white" onClick={() => setMenuOpen(false)}>
                    {anime.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
