import { generateMetadata } from '@/lib/seo'
import CashFlowCalculator from '@/components/calculators/CashFlowCalculator'

export const metadata = generateMetadata({
  title: 'Cash Flow Calculator',
  description:
    'Analyse the rental income, expenses, loan repayments and tax position of an investment property to see your weekly cash flow.',
  path: '/cashflow-calculator',
})

export default function CashFlowPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Cash Flow Calculator</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Work out whether an investment property is positively or negatively geared by weighing rent
        against loan repayments, holding costs and tax.
      </p>
      <div className="mt-6">
        <CashFlowCalculator />
      </div>
    </div>
  )
}
