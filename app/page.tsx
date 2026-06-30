import Link from 'next/link'
import {
  Building2,
  Calculator,
  TrendingUp,
  BarChart3,
  Shield,
  PiggyBank,
  Receipt,
  ArrowDownRight,
  Map,
  Star,
  CheckCircle,
  Zap,
  Users,
} from 'lucide-react'

const calculators = [
  {
    icon: Building2,
    name: 'Stamp Duty Calculator',
    href: '/stamp-duty-calculator',
    description: 'Calculate stamp duty and upfront costs by state',
  },
  {
    icon: Calculator,
    name: 'Borrowing Calculator',
    href: '/borrowing-calculator',
    description: 'Estimate your borrowing capacity for investment property',
  },
  {
    icon: TrendingUp,
    name: 'Rental Yield Calculator',
    href: '/rental-yield-calculator',
    description: 'Calculate gross and net rental yield on your investment',
  },
  {
    icon: BarChart3,
    name: 'Cash Flow Calculator',
    href: '/cashflow-calculator',
    description: 'Analyze rental income, expenses, and net cash flow',
  },
  {
    icon: Shield,
    name: 'LMI Estimator',
    href: '/lmi-estimator',
    description: 'Estimate your Lender\'s Mortgage Insurance premium',
  },
  {
    icon: PiggyBank,
    name: 'Offset Account Calculator',
    href: '/offset-account-calculator',
    description: 'See how much interest and time you can save with an offset account',
  },
  {
    icon: Receipt,
    name: 'CGT Calculator',
    href: '/cgt-calculator',
    description: 'Calculate capital gains tax on your investment property sale',
  },
  {
    icon: ArrowDownRight,
    name: 'Depreciation Calculator',
    href: '/depreciation-calculator',
    description: 'Estimate tax deductions from property depreciation',
  },
  {
    icon: Map,
    name: 'Land Tax Calculator',
    href: '/land-tax-calculator',
    description: 'Calculate your annual state land tax liability',
  },
  {
    icon: Star,
    name: 'Deal Scorer',
    href: '/deal-scorer',
    description: 'Score and compare investment property deals',
  },
]

const features = [
  {
    icon: CheckCircle,
    title: 'Australian tax rules built in',
    description:
      'All calculators use current ATO guidelines and state-specific regulations for accurate results.',
  },
  {
    icon: Zap,
    title: 'Real-time calculations',
    description:
      'See results instantly as you type. No waiting, no submit buttons, just immediate insights.',
  },
  {
    icon: Users,
    title: "Built by a buyer's agent",
    description:
      "Created by a property investment specialist who uses these tools daily to evaluate deals.",
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, hsl(225 50% 8% / 0.97), hsl(225 50% 8% / 0.99)),
            repeating-linear-gradient(90deg, hsl(225 30% 20% / 0.25) 0px, transparent 1px, transparent 48px),
            repeating-linear-gradient(0deg, hsl(225 30% 20% / 0.25) 0px, transparent 1px, transparent 48px)
          `,
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Australian Property Calculators &amp; Mortgage Tools for Investors &amp; Buyers
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Free Australian property investment calculators. Make smarter decisions with instant
            tax, cash flow, and deal analysis.
          </p>
        </div>
      </section>

      {/* Calculator Grid */}
      <section className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex flex-col gap-3">
          {calculators.map((calc) => {
            const Icon = calc.icon
            return (
              <Link
                key={calc.href}
                href={calc.href}
                className="flex items-start gap-4 bg-card border border-border rounded p-4 hover:border-accent/50 transition-colors group"
              >
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{calc.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{calc.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Why Use Property Calc */}
      <section className="max-w-2xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">Why use Property Calc</h2>
        <div className="flex flex-col gap-6">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="flex items-start gap-4">
                <Icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">{f.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{f.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
