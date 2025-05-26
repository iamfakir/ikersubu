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
  // Remove experimental configuration as it's not needed with current Next.js version
};

module.exports = nextConfig;
