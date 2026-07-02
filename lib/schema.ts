import { siteUrl, siteName } from './seo'
import type { Post } from './blog'

/** Site-wide Organization + WebSite JSON-LD (rendered once in the root layout). */
export function siteSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/icon.png`,
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        publisher: { '@id': `${siteUrl}/#organization` },
      },
    ],
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

/** JSON-LD BlogPosting structured data for a blog article (SEO/rich results). */
export function blogPostingSchema(post: Post) {
  const url = `${siteUrl}/blog/${post.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: siteName },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
  }
}
