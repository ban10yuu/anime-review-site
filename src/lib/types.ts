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
  review: 'bg-red-500/20 text-red-300 border border-red-500/30',
  analysis: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
  theory: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  guide: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  comparison: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
};
