/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ikersubu.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.8,
  sitemapSize: 5000,
  exclude: [
    '/server-sitemap.xml',
    '/admin',
    '/admin/*',
    '/api/*',
    '/404',
    '/500'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: [
          '/admin',
          '/admin/*',
          '/api/*',
        ],
      },
    ],
    additionalSitemaps: [
      'https://ikersubu.com/server-sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority based on path
    let priority = config.priority;
    if (path === '/') {
      priority = 1.0;
    } else if (path.includes('portfolio') || path.includes('services') || path.includes('plugins')) {
      priority = 0.9;
    } else if (path.includes('about') || path.includes('contact')) {
      priority = 0.8;
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
