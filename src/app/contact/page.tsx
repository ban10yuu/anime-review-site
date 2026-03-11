import { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://anime-review-site.vercel.app';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact AnimeInsight for questions, feedback, or inquiries about our anime and manga reviews, analysis, and content.',
  alternates: { canonical: `${SITE_URL}/contact/` },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 relative z-10">
      <nav className="text-xs text-gray-600 mb-4">
        <Link href="/" className="hover:text-[#ff3a4f] transition-colors">Home</Link>
        <span className="mx-1">/</span>
        <span className="text-gray-500">Contact</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-black text-white mb-8">
        Contact Us
      </h1>

      <div className="anime-panel p-6 md:p-8 space-y-6 text-[0.9375rem] leading-relaxed text-gray-400">
        <p>
          Thank you for visiting AnimeInsight. If you have any questions, feedback,
          corrections, or business inquiries, please feel free to reach out to us using
          the information below.
        </p>

        <div className="bg-[#1a1a2a] border border-[#252538] rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-4 border-l-4 border-[#00d4ff] pl-3">
            Email
          </h2>
          <p className="mb-2">
            <a
              href="mailto:contact@example.com"
              className="text-[#00d4ff] hover:underline font-mono text-base"
            >
              contact@example.com
            </a>
          </p>
          <p className="text-sm text-gray-500">
            We aim to respond to all inquiries within 3-5 business days.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-3 border-l-4 border-[#ff3a4f] pl-3">
            Before You Contact Us
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>For content corrections or factual errors, please include the article URL and specific details.</li>
            <li>For copyright concerns, please provide proof of ownership and the content in question.</li>
            <li>For business inquiries or advertising, please include your company name and proposal details.</li>
            <li>We do not accept guest posts or link exchange requests.</li>
          </ul>
        </div>

        <p className="text-sm text-gray-600 pt-4 border-t border-[#252538]">
          We respect your privacy. Any personal information provided through email
          will be handled in accordance with our{' '}
          <Link href="/privacy/" className="text-[#00d4ff] hover:underline">
            Privacy Policy
          </Link>.
        </p>
      </div>
    </div>
  );
}
