export type ArticleCategory = 'review' | 'analysis' | 'theory' | 'guide' | 'comparison';

export interface ArticleSection {
  heading: string;
  content: string;
}

export interface Article {
  slug: string;
  title: string;
  animeSlug: string;
  category: ArticleCategory;
  excerpt: string;
  sections: ArticleSection[];
  tags: string[];
  publishedAt: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface AnimeInfo {
  slug: string;
  title: string;
  titleJp: string;
  studio: string;
  status: 'ongoing' | 'completed';
  genre: string[];
  description: string;
  accentColor: string;
  year: number;
  episodes?: string;
  rating?: string;
}

export interface AffiliateService {
  service: 'amazon' | 'crunchyroll' | 'bookwalker' | 'rightstuf' | 'viz' | 'ameba' | 'rakuten';
  label: string;
  url: string;
  badge?: string;
  color: string;
}

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  review: 'Review',
  analysis: 'Analysis',
  theory: 'Theory',
  guide: 'Guide',
  comparison: 'Comparison',
};

export const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  review: 'bg-[#f2685c]/15 text-[#d04a3e] border border-[#f2685c]/35',
  analysis: 'bg-[#7c5cd6]/12 text-[#6a4bc4] border border-[#7c5cd6]/30',
  theory: 'bg-[#e0588f]/12 text-[#c4437a] border border-[#e0588f]/32',
  guide: 'bg-emerald-500/12 text-emerald-700 border border-emerald-500/30',
  comparison: 'bg-amber-400/15 text-amber-700 border border-amber-500/35',
};
