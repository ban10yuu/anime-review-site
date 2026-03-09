import { Article, ArticleCategory } from './types';

import { articles as onePieceArticles } from '@/data/articles/one-piece';
import { articles as jujutsuKaisenArticles } from '@/data/articles/jujutsu-kaisen';
import { articles as chainsawManArticles } from '@/data/articles/chainsaw-man';
import { articles as spyFamilyArticles } from '@/data/articles/spy-family';
import { articles as frierenArticles } from '@/data/articles/frieren';
import { articles as blueLockArticles } from '@/data/articles/blue-lock';
import { articles as oshiNoKoArticles } from '@/data/articles/oshi-no-ko';
import { articles as demonSlayerArticles } from '@/data/articles/demon-slayer';
import { articles as attackOnTitanArticles } from '@/data/articles/attack-on-titan';
import { articles as myHeroAcademiaArticles } from '@/data/articles/my-hero-academia';
import { articles as dragonBallSuperArticles } from '@/data/articles/dragon-ball-super';
import { articles as narutoBorutoArticles } from '@/data/articles/naruto-boruto';
import { articles as deathNoteArticles } from '@/data/articles/death-note';
import { articles as fullmetalAlchemistArticles } from '@/data/articles/fullmetal-alchemist';
import { articles as onePunchManArticles } from '@/data/articles/one-punch-man';
import { articles as dandadanArticles } from '@/data/articles/dandadan';
import { articles as sakamotoDaysArticles } from '@/data/articles/sakamoto-days';
import { articles as tokyoRevengersArticles } from '@/data/articles/tokyo-revengers';
import { articles as hunterXHunterArticles } from '@/data/articles/hunter-x-hunter';
import { articles as kingdomArticles } from '@/data/articles/kingdom';

const allArticles: Article[] = [
  ...onePieceArticles,
  ...jujutsuKaisenArticles,
  ...chainsawManArticles,
  ...spyFamilyArticles,
  ...frierenArticles,
  ...blueLockArticles,
  ...oshiNoKoArticles,
  ...demonSlayerArticles,
  ...attackOnTitanArticles,
  ...myHeroAcademiaArticles,
  ...dragonBallSuperArticles,
  ...narutoBorutoArticles,
  ...deathNoteArticles,
  ...fullmetalAlchemistArticles,
  ...onePunchManArticles,
  ...dandadanArticles,
  ...sakamotoDaysArticles,
  ...tokyoRevengersArticles,
  ...hunterXHunterArticles,
  ...kingdomArticles,
];

export function getAllArticles(): Article[] {
  return allArticles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find(a => a.slug === slug);
}

export function getArticlesByAnime(animeSlug: string): Article[] {
  return allArticles
    .filter(a => a.animeSlug === animeSlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return allArticles
    .filter(a => a.category === category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getRelatedArticles(article: Article, limit = 5): Article[] {
  const sameAnime = allArticles.filter(
    a => a.animeSlug === article.animeSlug && a.slug !== article.slug
  );
  const sameCategory = allArticles.filter(
    a =>
      a.category === article.category &&
      a.animeSlug !== article.animeSlug &&
      a.slug !== article.slug
  );
  const related = [...sameAnime, ...sameCategory];
  return related.slice(0, limit);
}

export function getPopularArticles(limit = 10): Article[] {
  return getAllArticles().slice(0, limit);
}

export function getAllSlugs(): string[] {
  return allArticles.map(a => a.slug);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return allArticles.filter(
    a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
  );
}
