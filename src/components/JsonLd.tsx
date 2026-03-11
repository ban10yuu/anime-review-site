import { Article, ArticleSection } from '@/lib/types';
import { AnimeInfo } from '@/lib/types';

const SITE_URL = 'https://anime-review-site.vercel.app';
const PUBLISHER = {
  '@type': 'Organization',
  name: 'AnimeInsight',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/favicon.svg`,
  },
};

/**
 * Build FAQ items from article sections (headings become questions)
 */
export function buildFaqFromSections(sections: ArticleSection[]): { question: string; answer: string }[] {
  return sections.map(section => ({
    question: section.heading,
    answer: section.content.replace(/<[^>]*>/g, '').slice(0, 300) + '...',
  }));
}

/**
 * Article JSON-LD structured data
 */
export function ArticleJsonLd({ article, animeName }: { article: Article; animeName?: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { '@type': 'Organization', name: 'AnimeInsight', url: SITE_URL },
    publisher: PUBLISHER,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/article/${article.slug}`,
    },
    keywords: article.tags.join(', '),
    articleSection: animeName || article.animeSlug,
    inLanguage: 'en-US',
    url: `${SITE_URL}/article/${article.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Breadcrumb JSON-LD structured data
 */
export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * FAQ JSON-LD structured data (converts section headings to Q&A)
 */
export function FaqJsonLd({ sections }: { sections: ArticleSection[] }) {
  const faqItems = buildFaqFromSections(sections);
  if (faqItems.length === 0) return null;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * CollectionPage JSON-LD for anime series pages
 */
export function AnimePageJsonLd({
  anime,
  articleCount,
}: {
  anime: AnimeInfo;
  articleCount: number;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${anime.title} - Analysis, Reviews & Theories | AnimeInsight`,
    description: anime.description,
    url: `${SITE_URL}/anime/${anime.slug}`,
    publisher: PUBLISHER,
    inLanguage: 'en-US',
    about: {
      '@type': 'CreativeWorkSeries',
      name: anime.title,
      alternateName: anime.titleJp,
      genre: anime.genre,
      productionCompany: {
        '@type': 'Organization',
        name: anime.studio,
      },
      datePublished: String(anime.year),
    },
    numberOfItems: articleCount,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Tag Collection Page JSON-LD
 */
export function TagPageJsonLd({
  tag,
  articleCount,
  url,
}: {
  tag: string;
  articleCount: number;
  url: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${tag} - Articles & Analysis | AnimeInsight`,
    description: `Browse ${articleCount} articles tagged with "${tag}" on AnimeInsight. In-depth anime and manga analysis, reviews, and theories.`,
    url,
    publisher: PUBLISHER,
    inLanguage: 'en-US',
    numberOfItems: articleCount,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
