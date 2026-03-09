import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://anime-review-site.vercel.app'),
  title: {
    default: 'AnimeInsight | In-Depth Anime & Manga Analysis, Reviews & Theories',
    template: '%s | AnimeInsight',
  },
  description:
    'Deep dives into One Piece, Jujutsu Kaisen, Chainsaw Man, Frieren, and 20+ anime/manga series. Expert analysis, reviews, theories, and guides for the global otaku community.',
  keywords: [
    'anime review',
    'manga analysis',
    'anime theory',
    'One Piece analysis',
    'Jujutsu Kaisen review',
    'Chainsaw Man theory',
    'Frieren analysis',
    'anime guide',
    'manga review',
    'anime comparison',
    'best anime',
    'manga recommendations',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'AnimeInsight',
    title: 'AnimeInsight | In-Depth Anime & Manga Analysis',
    description: 'Expert analysis, reviews, theories, and guides for 20+ popular anime and manga series.',
    url: 'https://anime-review-site.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AnimeInsight',
    description: 'In-depth anime and manga analysis for the global otaku community.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://anime-review-site.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1611624572831066"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Orbitron:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
