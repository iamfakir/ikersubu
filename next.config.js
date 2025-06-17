/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'source.unsplash.com',
    ],
    unoptimized: false,
    formats: ['image/webp'],
  },
  // Remove experimental configuration as it's not needed with current Next.js version
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|css|js|woff|woff2|ttf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  swcMinify: true,
  experimental: {
    modern: true
  },
  transpilePackages: ['react-icons'], // Only transpile packages that need it
};

module.exports = withBundleAnalyzer(nextConfig);
