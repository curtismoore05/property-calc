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

    // Static last-modified dates keyed by path. Only update these when the
    // page content actually changes — don't use new Date() which would mark
    // every page as modified on every build and dilute crawl budget signals.
    const lastmod = {
      '/': '2026-07-02',
      '/stamp-duty-calculator': '2026-06-30',
      '/borrowing-calculator': '2026-06-30',
      '/rental-yield-calculator': '2026-06-30',
      '/cashflow-calculator': '2026-06-30',
      '/lmi-estimator': '2026-06-30',
      '/offset-account-calculator': '2026-06-30',
      '/cgt-calculator': '2026-07-02',
      '/depreciation-calculator': '2026-07-02',
      '/land-tax-calculator': '2026-06-30',
      '/deal-scorer': '2026-06-30',
      '/blog': '2026-07-02',
      '/about': '2026-06-30',
      '/contact': '2026-07-02',
      '/book-a-call': '2026-07-02',
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] ?? config.priority,
      lastmod: lastmod[path] ?? '2026-06-30',
    }
  },
}
