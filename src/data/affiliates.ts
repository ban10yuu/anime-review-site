import { AffiliateService, AnimeInfo } from '@/lib/types';

// もしもアフィリエイト a_id (楽天提携済み)
const MOSHIMO_A_ID = '5417189';

// A8.net a8mat codes (承認済みプログラム)
const A8_AMEBA_MANGA = '4AZCG7+ATYY0I+4RKY+60H7L';

function a8Link(a8mat: string): string {
  return `https://px.a8.net/svt/ejp?a8mat=${a8mat}`;
}

function moshimoRakutenLink(url: string): string {
  return `https://af.moshimo.com/af/c/click?a_id=${MOSHIMO_A_ID}&p_id=54&pc_id=54&pl_id=616&url=${encodeURIComponent(url)}`;
}

export const MOSHIMO_IMPRESSION_URL = `https://i.moshimo.com/af/i/impression?a_id=${MOSHIMO_A_ID}&p_id=54&pc_id=54&pl_id=616`;

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

  // Amebaマンガ (A8.net提携済み)
  links.push({
    service: 'ameba',
    label: 'Amebaマンガで読む',
    url: a8Link(A8_AMEBA_MANGA),
    badge: '100冊40%OFF',
    color: '#2dbe60',
  });

  // 楽天ブックス (もしもアフィリエイト経由)
  links.push({
    service: 'rakuten',
    label: 'Read on Rakuten Books',
    url: moshimoRakutenLink(`https://books.rakuten.co.jp/search?sitem=${encodeURIComponent(anime.title)}&g=001`),
    badge: 'Points Back',
    color: '#bf0000',
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
    title: 'Amebaマンガ',
    description: 'Read manga with up to 40% OFF on your first 100 volumes. Huge Japanese manga library.',
    url: a8Link(A8_AMEBA_MANGA),
    badge: '40% OFF',
    color: '#2dbe60',
  },
  {
    title: 'Rakuten Books',
    description: 'Earn Rakuten Points on every manga purchase. Massive selection available.',
    url: moshimoRakutenLink('https://books.rakuten.co.jp/'),
    badge: 'Points Back',
    color: '#bf0000',
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
