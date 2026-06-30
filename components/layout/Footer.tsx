import Link from 'next/link'
import { Calculator, Mail } from 'lucide-react'

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
    <footer className="bg-background border-t border-border">
      {/* Newsletter */}
      <div className="max-w-screen-xl mx-auto px-4 py-8 border-b border-border">
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
              className="flex-1 bg-input text-foreground rounded border border-border px-3 py-2 text-sm outline-none focus:border-ring placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="bg-accent text-accent-foreground px-4 py-2 rounded text-sm font-medium hover:bg-accent/90 transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-accent" />
              <span className="font-bold text-foreground">Property Calc</span>
            </Link>
            <p className="text-sm text-muted-foreground">Every number you need before you buy</p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Legal
            </p>
            <ul className="flex flex-col gap-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © 2026 Property Calc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
