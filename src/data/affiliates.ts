import { AffiliateService, AnimeInfo } from '@/lib/types';

export function getAffiliateLinks(anime: AnimeInfo): AffiliateService[] {
  const links: AffiliateService[] = [];

  links.push({
    service: 'crunchyroll',
    label: 'Watch on Crunchyroll',
    url: `https://www.crunchyroll.com/search?q=${encodeURIComponent(anime.title)}`,
    badge: 'Stream Now',
    color: '#f47521',
  });

  links.push({
    service: 'amazon',
    label: 'Buy Manga on Amazon',
    url: `https://www.amazon.com/s?k=${encodeURIComponent(anime.title + ' manga')}`,
    badge: 'Best Seller',
    color: '#ff9900',
  });

  links.push({
    service: 'bookwalker',
    label: 'Read on BookWalker',
    url: `https://global.bookwalker.jp/search/?word=${encodeURIComponent(anime.title)}`,
    badge: 'Digital Manga',
    color: '#00a5e5',
  });

  links.push({
    service: 'rightstuf',
    label: 'Shop Crunchyroll Store',
    url: `https://store.crunchyroll.com/search?q=${encodeURIComponent(anime.title)}`,
    badge: 'Merch & More',
    color: '#0073cf',
  });

  links.push({
    service: 'viz',
    label: 'Read on VIZ Media',
    url: `https://www.viz.com/search?search=${encodeURIComponent(anime.title)}`,
    badge: 'Official',
    color: '#e50914',
  });

  return links;
}

export const generalAffiliates = [
  {
    title: 'Crunchyroll',
    description: 'The ultimate anime streaming platform with 1000+ titles. New episodes weekly.',
    url: 'https://www.crunchyroll.com/',
    badge: 'Free Trial',
    color: '#f47521',
  },
  {
    title: 'Amazon Manga',
    description: 'Huge selection of manga volumes with fast delivery. Kindle editions available.',
    url: 'https://www.amazon.com/manga-books/b?node=4367',
    badge: 'Best Seller',
    color: '#ff9900',
  },
  {
    title: 'BookWalker',
    description: 'Official digital manga store. First-time buyers get up to 50% coin back.',
    url: 'https://global.bookwalker.jp/',
    badge: '50% Back',
    color: '#00a5e5',
  },
  {
    title: 'Crunchyroll Store',
    description: 'Official merchandise, figures, apparel, and collector editions.',
    url: 'https://store.crunchyroll.com/',
    badge: 'Official',
    color: '#0073cf',
  },
  {
    title: 'VIZ Media',
    description: 'Read official manga chapters for free. Shonen Jump digital vault available.',
    url: 'https://www.viz.com/',
    badge: 'Free Chapters',
    color: '#e50914',
  },
];
