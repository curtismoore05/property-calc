import Link from 'next/link'
import {
  Building2, Calculator, TrendingUp, BarChart3, Shield,
  PiggyBank, Receipt, ArrowDownRight, Map, Star,
  CheckCircle, Zap, Users,
} from 'lucide-react'

const calculators = [
  { icon: Building2,      name: 'Stamp Duty Calculator',       href: '/stamp-duty-calculator',        description: 'Calculate stamp duty and upfront costs by state' },
  { icon: Calculator,     name: 'Borrowing Calculator',         href: '/borrowing-calculator',          description: 'Estimate your borrowing capacity for investment property' },
  { icon: TrendingUp,     name: 'Rental Yield Calculator',      href: '/rental-yield-calculator',       description: 'Calculate gross and net rental yield on your investment' },
  { icon: BarChart3,      name: 'Cash Flow Calculator',         href: '/cashflow-calculator',           description: 'Analyze rental income, expenses, and net cash flow' },
  { icon: Shield,         name: 'LMI Estimator',                href: '/lmi-estimator',                 description: "Estimate your Lender's Mortgage Insurance premium" },
  { icon: PiggyBank,      name: 'Offset Account Calculator',    href: '/offset-account-calculator',     description: 'See how much interest and time you can save with an offset account' },
  { icon: Receipt,        name: 'CGT Calculator',               href: '/cgt-calculator',                description: 'Calculate capital gains tax on your investment property sale' },
  { icon: ArrowDownRight, name: 'Depreciation Calculator',      href: '/depreciation-calculator',       description: 'Estimate tax deductions from property depreciation' },
  { icon: Map,            name: 'Land Tax Calculator',          href: '/land-tax-calculator',           description: 'Calculate your annual state land tax liability' },
  { icon: Star,           name: 'Deal Scorer',                  href: '/deal-scorer',                   description: 'Score and compare investment property deals' },
]

const features = [
  {
    icon: CheckCircle,
    title: 'Australian tax rules built in',
    description: 'All calculators use current ATO guidelines and state-specific regulations for accurate results.',
  },
  {
    icon: Zap,
    title: 'Real-time calculations',
    description: 'See results instantly as you type. No waiting, no submit buttons, just immediate insights.',
  },
  {
    icon: Users,
    title: "Built by a buyer's agent",
    description: "Created by a property investment specialist who uses these tools daily to evaluate deals.",
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-20 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, hsl(225 50% 8% / 0.97), hsl(225 50% 8% / 0.99)),
            repeating-linear-gradient(90deg, hsl(225 30% 20% / 0.25) 0px, transparent 1px, transparent 48px),
            repeating-linear-gradient(0deg, hsl(225 30% 20% / 0.25) 0px, transparent 1px, transparent 48px)
          `,
        }}
      >
        <div className="text-center">
          <h1 className="max-w-5xl mx-auto text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
            Australian Property Calculators &amp; Mortgage Tools for Investors &amp; Buyers
          </h1>
          <p className="max-w-3xl mx-auto mt-6 text-lg text-muted-foreground">
            Free Australian property investment calculators. Make smarter decisions with instant
            tax, cash flow, and deal analysis.
          </p>
        </div>
      </section>

      {/* Calculator Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => {
            const Icon = calc.icon
            return (
              <Link
                key={calc.href}
                href={calc.href}
                className="group rounded-xl border border-border bg-card shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-6">
                  {/* Navy icon on dark card = intentional ghost effect */}
                  <div className="p-2 bg-primary/10 rounded-lg w-fit mb-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-xl font-semibold text-foreground">{calc.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{calc.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Why Use Property Calc */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12">
          Why use Property Calc
        </h2>
        <div className="flex flex-col space-y-16">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Text side */}
                <div>
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-lg text-muted-foreground">{f.description}</p>
                </div>
                {/* Visual side — decorative placeholder */}
                <div className="bg-muted/50 rounded-2xl p-8 h-64 flex items-center justify-center">
                  <Icon className="h-32 w-32 text-primary/20" />
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
