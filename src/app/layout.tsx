import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar';

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
  title: 'IKER SUBU',
  description: 'Music production and audio engineering by IKER SUBU',
  // Viewport is now handled by the separate viewport export
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`} suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
      </head>
      <body className="text-gray-900 antialiased">
        <div id="root" className="flex flex-col">
          {/* <Navbar /> */}
          {children}
        </div>
      </body>
    </html>
  )
}
