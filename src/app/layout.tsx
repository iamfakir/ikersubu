import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import Script from 'next/script';

const Navbar = dynamic(() => import('./components/Navbar'), { ssr: false });

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700']
});

// Separate viewport export for Next.js 14+
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'IKER SUBU - Mixing, Mastering & Audio Plugins',
  description: 'Professional mixing and mastering services. High-quality audio plugins for music producers. Elevate your sound with IKER SUBU.',
  keywords: 'mixing, mastering, audio engineer, music production, audio plugins, music software, pro audio, sound design, IKER SUBU',
  // Viewport is now handled by the separate viewport export
}

// This function generates static pages at build time
// It helps with SEO and faster page loads
export const generateStaticParams = async () => {
  // Define the static routes you want to pre-render
  // This is a simple example - you would typically fetch this data from an API or CMS
  const routes = [
    { slug: '' },              // Home page
    { slug: 'about' },         // About page
    { slug: 'portfolio' },      // Portfolio page
    { slug: 'contact' },        // Contact page
  ];
  
  return routes;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`} suppressHydrationWarning>
      <head>
  {/* Preload critical images */}

        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      </head>
      <body className="text-gray-900 antialiased">
        <div id="root" className="flex flex-col">
          <Navbar />
          {children}
        </div>
        {/* Service Worker Registration - for offline capabilities and caching */}
        <Script src="/js/sw-register.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
