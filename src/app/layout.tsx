import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://anime-review-site.vercel.app'),
  title: {
    default: 'AnimeInsight | In-Depth Anime & Manga Analysis, Reviews & Theories',
    template: '%s | AnimeInsight',
  },
  description:
    'Expert anime and manga analysis, reviews, theories, and guides. Deep dives into One Piece, Jujutsu Kaisen, Chainsaw Man, Frieren, Attack on Titan, Death Note, Hunter x Hunter, and 20+ popular series. Covering Gear 5, Sukuna, character analysis, ending explanations, power systems, and anime rankings for 2026.',
  keywords: [
    // Generic anime/manga keywords
    'anime review',
    'manga analysis',
    'anime theory',
    'anime explained',
    'anime guide',
    'manga review',
    'anime comparison',
    'best anime',
    'manga recommendations',
    'anime deep dive',
    'anime breakdown',
    'anime character analysis',
    'anime plot analysis',
    'anime ending explained',
    'anime foreshadowing',
    'anime ranking 2026',
    'best anime 2026',
    'anime power system',
    'anime villain analysis',
    'anime fight analysis',
    'shonen anime review',
    'seinen manga analysis',
    'anime discussion',
    'manga theory',
    'anime blog',
    'anime commentary',
    'anime opinion',
    // One Piece
    'One Piece analysis',
    'One Piece theory',
    'One Piece review',
    'One Piece explained',
    'One Piece ending explained',
    'Gear 5 explained',
    'Void Century theory',
    'Joy Boy One Piece',
    // Jujutsu Kaisen
    'Jujutsu Kaisen review',
    'Jujutsu Kaisen analysis',
    'Jujutsu Kaisen theory',
    'Jujutsu Kaisen explained',
    'Jujutsu Kaisen ending explained',
    'Sukuna analysis',
    'Gojo vs Sukuna',
    // Chainsaw Man
    'Chainsaw Man theory',
    'Chainsaw Man review',
    'Chainsaw Man analysis',
    'Chainsaw Man explained',
    'Denji character analysis',
    // Frieren
    'Frieren analysis',
    'Frieren review',
    'Frieren explained',
    'Frieren Beyond Journeys End review',
    // Attack on Titan
    'Attack on Titan analysis',
    'Attack on Titan ending explained',
    'Attack on Titan review',
    'Eren Yeager analysis',
    // Death Note
    'Death Note analysis',
    'Death Note review',
    'Light vs L analysis',
    // Hunter x Hunter
    'Hunter x Hunter analysis',
    'Hunter x Hunter theory',
    'Nen system explained',
    'Chimera Ant arc review',
    // My Hero Academia
    'My Hero Academia review',
    'My Hero Academia ending explained',
    // Demon Slayer
    'Demon Slayer review',
    'Demon Slayer analysis',
    'Breathing Styles guide',
    // SPY x FAMILY
    'SPY x FAMILY review',
    'SPY x FAMILY analysis',
    // Dragon Ball Super
    'Dragon Ball Super review',
    'Ultra Instinct explained',
    // Naruto / Boruto
    'Naruto analysis',
    'Boruto theory',
    'Naruto Boruto review',
    // Blue Lock
    'Blue Lock review',
    'Blue Lock analysis',
    // Oshi no Ko
    'Oshi no Ko review',
    'Oshi no Ko analysis',
    // Other series
    'Dandadan review',
    'Sakamoto Days review',
    'Tokyo Revengers analysis',
    'Fullmetal Alchemist Brotherhood review',
    'One Punch Man analysis',
    'Kingdom manga review',
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
  verification: {
    google: 'QNT_EwkmJ039_aVzqr1sKc_hySyn-ZpgLZDtAgxtsNo',
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
        <meta name="google-adsense-account" content="ca-pub-1611624572831066" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1611624572831066"
          crossOrigin="anonymous"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-V11MKY0X3F" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-V11MKY0X3F');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'AnimeInsight',
              url: 'https://anime-review-site.vercel.app',
              description: 'In-depth anime and manga analysis, reviews, theories, and guides for 20+ popular series.',
              publisher: {
                '@type': 'Organization',
                name: 'AnimeInsight',
                url: 'https://anime-review-site.vercel.app',
              },
              inLanguage: 'en-US',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://anime-review-site.vercel.app/category/review?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} ${orbitron.variable} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
