/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://realestatecalculators.com.au',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/stamp-duty-calculator': 0.9,
      '/borrowing-calculator': 0.9,
      '/rental-yield-calculator': 0.9,
      '/cashflow-calculator': 0.9,
      '/lmi-estimator': 0.9,
      '/offset-account-calculator': 0.9,
      '/cgt-calculator': 0.9,
      '/depreciation-calculator': 0.9,
      '/land-tax-calculator': 0.9,
      '/deal-scorer': 0.9,
      '/blog': 0.8,
      '/about': 0.6,
      '/contact': 0.6,
      '/book-a-call': 0.6,
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] ?? config.priority,
      lastmod: new Date().toISOString(),
    }
  },
}
