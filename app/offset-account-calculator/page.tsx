import { generateMetadata } from '@/lib/seo'
import OffsetAccountCalculator from '@/components/calculators/OffsetAccountCalculator'

export const metadata = generateMetadata({
  title: 'Offset Account Calculator',
  description:
    'See how much interest and time you can save by keeping savings in an offset account against your home loan.',
  path: '/offset-account-calculator',
})

export default function OffsetPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Offset Account Savings</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        An offset account reduces the balance your interest is calculated on. Because your repayment
        stays the same, more goes toward the principal — shortening your loan and cutting interest.
      </p>
      <div className="mt-6">
        <OffsetAccountCalculator />
      </div>
    </div>
  )
}
