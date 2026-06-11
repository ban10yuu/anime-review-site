'use client';

import Link from 'next/link';
import { useState } from 'react';
import { animeList } from '@/data/anime';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/65 backdrop-blur-xl border-b border-white/80 shadow-[0_4px_24px_-12px_rgba(124,92,214,0.25)]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight" style={{ fontFamily: 'var(--font-zen-maru), var(--font-noto-sans), sans-serif' }}>
            <span aria-hidden className="w-8 h-8 rounded-full sunset-gradient shadow-[0_4px_12px_-4px_rgba(224,88,143,0.6)] flex items-center justify-center text-white text-sm font-black">
              A
            </span>
            <span className="text-ink">
              Anime<span className="sunset-text">Insight</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link href="/" className="px-3 py-1.5 rounded-full text-ink-soft hover:text-violet hover:bg-violet/10 transition-colors">Home</Link>
            <div className="group relative">
              <button className="px-3 py-1.5 rounded-full text-ink-soft hover:text-violet hover:bg-violet/10 transition-colors flex items-center gap-1">
                Anime
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 top-full mt-2 w-60 bg-white/80 backdrop-blur-xl border border-white/90 rounded-2xl shadow-[0_16px_40px_-16px_rgba(124,92,214,0.35)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 max-h-80 overflow-y-auto p-1.5">
                {animeList.map(anime => (
                  <Link
                    key={anime.slug}
                    href={`/anime/${anime.slug}`}
                    className="block px-3.5 py-2 text-sm text-ink-soft hover:text-violet hover:bg-violet/10 rounded-xl transition-colors"
                  >
                    {anime.title}
                  </Link>
                ))}
              </div>
            </div>
            {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).slice(0, 3).map(([key, label]) => (
              <Link key={key} href={`/category/${key}`} className="px-3 py-1.5 rounded-full text-ink-soft hover:text-violet hover:bg-violet/10 transition-colors">
                {label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-full text-ink-soft hover:bg-violet/10 hover:text-violet transition-colors"
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
          <div className="md:hidden pb-4 border-t border-line mt-2 pt-4">
            <Link href="/" className="block py-2 px-2 rounded-xl text-ink-soft hover:text-violet hover:bg-violet/10 transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
            {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(([key, label]) => (
              <Link key={key} href={`/category/${key}`} className="block py-2 px-2 rounded-xl text-ink-soft hover:text-violet hover:bg-violet/10 transition-colors" onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <div className="mt-3 border-t border-line pt-3">
              <p className="text-xs text-ink-muted mb-2 font-bold uppercase tracking-wide">Anime</p>
              <div className="grid grid-cols-2 gap-1">
                {animeList.slice(0, 10).map(anime => (
                  <Link key={anime.slug} href={`/anime/${anime.slug}`} className="text-sm py-1.5 px-2 rounded-xl text-ink-soft hover:text-violet hover:bg-violet/10 transition-colors" onClick={() => setMenuOpen(false)}>
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
