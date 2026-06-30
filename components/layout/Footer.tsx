import Link from 'next/link'
import Image from 'next/image'
import { Mail } from 'lucide-react'

const quickLinks = [
  { name: 'CGT Calculator', href: '/cgt-calculator' },
  { name: 'Cash Flow Calculator', href: '/cashflow-calculator' },
  { name: 'Stamp Duty Calculator', href: '/stamp-duty-calculator' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
]

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
]

export default function Footer() {
  return (
    <footer className="bg-secondary mt-20">
      {/* Newsletter band — slightly darker than outer */}
      <div className="bg-card border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <Mail className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-foreground">
                Get property investment tips delivered to your inbox
              </span>
            </div>
            <form className="flex gap-2 w-full sm:max-w-sm">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-9 flex-1 rounded-md border border-border bg-input px-3 py-1 text-sm text-white placeholder:text-muted-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent transition-colors"
              />
              <button
                type="submit"
                className="inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-accent-foreground shadow hover:bg-accent/90 transition-all duration-200 active:scale-[0.98] shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center" aria-label="Property Calc home">
              <Image
                src="/logo.png"
                alt="Property Calc — smart numbers, better property decisions"
                width={1251}
                height={307}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-sm text-foreground/80">Every number you need before you buy</p>
          </div>

          {/* Quick Links */}
          <div>
            <span className="font-semibold text-foreground block mb-4">Quick Links</span>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-foreground/80 hover:opacity-100 transition-opacity">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <span className="font-semibold text-foreground block mb-4">Legal</span>
            <ul className="flex flex-col gap-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-foreground/80 hover:opacity-100 transition-opacity">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-sm text-foreground/80">© 2026 Property Calc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
