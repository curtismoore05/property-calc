import { siteUrl, siteName } from './seo'
import type { Post } from './blog'

/** JSON-LD BlogPosting structured data for a blog article (SEO/rich results). */
export function blogPostingSchema(post: Post) {
  const url = `${siteUrl}/blog/${post.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: siteName },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
  }
}
