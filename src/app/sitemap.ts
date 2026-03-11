import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { animeList } from '@/data/anime';
import { ArticleCategory } from '@/lib/types';

export const dynamic = 'force-static';

const BASE_URL = 'https://anime-review-site.vercel.app';

const categories: ArticleCategory[] = ['review', 'analysis', 'theory', 'guide', 'comparison'];

export default function sitemap(): MetadataRoute.Sitemap {
  const allArticles = getAllArticles();

  const homePage: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  const animePages: MetadataRoute.Sitemap = animeList.map((anime) => ({
    url: `${BASE_URL}/anime/${anime.slug}/`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const articlePages: MetadataRoute.Sitemap = allArticles.map((article) => ({
    url: `${BASE_URL}/article/${article.slug}/`,
    lastModified: article.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/category/${category}/`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...homePage, ...animePages, ...articlePages, ...categoryPages];
}
