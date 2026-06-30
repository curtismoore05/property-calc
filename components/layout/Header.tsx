'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutGrid, Menu, X, ChevronDown } from 'lucide-react'

const calculators = [
  { name: 'Stamp Duty Calculator', href: '/stamp-duty-calculator' },
  { name: 'Borrowing Calculator', href: '/borrowing-calculator' },
  { name: 'Rental Yield Calculator', href: '/rental-yield-calculator' },
  { name: 'Cash Flow Calculator', href: '/cashflow-calculator' },
  { name: 'LMI Estimator', href: '/lmi-estimator' },
  { name: 'Offset Account Calculator', href: '/offset-account-calculator' },
  { name: 'CGT Calculator', href: '/cgt-calculator' },
  { name: 'Depreciation Calculator', href: '/depreciation-calculator' },
  { name: 'Land Tax Calculator', href: '/land-tax-calculator' },
  { name: 'Deal Scorer', href: '/deal-scorer' },
]

const navLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileCalcOpen, setMobileCalcOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <LayoutGrid className="w-5 h-5 text-accent" />
          <span className="font-bold text-foreground">Property Calc</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {/* Calculators dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors">
              Calculators
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-60 bg-card border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              {calculators.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {l.name}
            </Link>
          ))}

          <Link
            href="/book-a-call"
            className="border border-accent text-accent px-4 py-1.5 rounded-md text-sm font-medium hover:bg-accent/10 transition-colors duration-200"
          >
            Book a Call
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-3 flex flex-col gap-1">
            {/* Calculators accordion */}
            <button
              className="flex items-center justify-between w-full py-2 text-sm text-foreground/80"
              onClick={() => setMobileCalcOpen(!mobileCalcOpen)}
            >
              Calculators
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobileCalcOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {mobileCalcOpen && (
              <div className="pl-3 flex flex-col gap-1 border-l border-border mb-1">
                {calculators.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="py-1.5 text-sm text-foreground/70 hover:text-foreground transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}

            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {l.name}
              </Link>
            ))}

            <Link
              href="/book-a-call"
              className="mt-2 border border-accent text-accent px-4 py-2 rounded text-sm text-center hover:bg-accent/10 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
