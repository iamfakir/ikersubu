/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'source.unsplash.com',
    ],
    unoptimized: true,
  },
  // Add this to disable image optimization API route
  experimental: {
    images: {
      unoptimized: true,
    },
  },
};

module.exports = nextConfig;
