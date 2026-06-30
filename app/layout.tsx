import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RouteTransition from '@/components/layout/RouteTransition'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://realestatecalculators.com.au'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Property Calc — Every number you need before you buy',
  description:
    'Free Australian property calculators and mortgage tools for investors and home buyers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="flex flex-col min-h-screen bg-background text-foreground font-sans antialiased">
        <Header />
        <main className="flex-grow pt-16">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}
