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
        {/* Initialize CSRF protection */}
        <Script id="csrf-init" strategy="afterInteractive">
          {`
            (function() {
              function setupCSRFForForms() {
                const getCookie = (name) => {
                  const value = \`; \${document.cookie}\`;
                  const parts = value.split(\`; \${name}=\`);
                  if (parts.length === 2) return parts.pop().split(';').shift();
                  return null;
                };
                
                const token = getCookie('csrf_token');
                if (!token) return;
                
                document.querySelectorAll('form').forEach(form => {
                  if (!form.querySelector('input[name="csrf_token"]')) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = 'csrf_token';
                    input.value = token;
                    form.appendChild(input);
                  }
                });
              }
              
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', setupCSRFForForms);
              } else {
                setupCSRFForForms();
              }
              
              // Setup for dynamically added forms
              const observer = new MutationObserver(mutations => {
                for (const mutation of mutations) {
                  if (mutation.type === 'childList' && mutation.addedNodes.length) {
                    setupCSRFForForms();
                    break;
                  }
                }
              });
              
              observer.observe(document.body, { childList: true, subtree: true });
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
