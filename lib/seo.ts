import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://realestatecalculators.com.au'
const siteName = 'Property Calc'
const defaultDescription =
  'Free Australian property calculators and mortgage tools for investors and home buyers.'

export function generateMetadata({
  title,
  description = defaultDescription,
  path = '',
}: {
  title: string
  description?: string
  path?: string
}): Metadata {
  const fullTitle = `${title} | ${siteName}`
  const url = `${siteUrl}${path}`

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      type: 'website',
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  }
}
