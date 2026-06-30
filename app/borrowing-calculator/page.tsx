import { generateMetadata } from '@/lib/seo'
import BorrowingCalculator from '@/components/calculators/BorrowingCalculator'

export const metadata = generateMetadata({
  title: 'Borrowing Calculator',
  description:
    'Estimate your borrowing capacity for an investment or owner-occupier property based on your income and expenses.',
  path: '/borrowing-calculator',
})

export default function BorrowingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Borrowing Calculator</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Estimate how much you could borrow based on your household income and ongoing commitments.
        This is a guide only — lenders assess your situation in more detail.
      </p>
      <div className="mt-6">
        <BorrowingCalculator />
      </div>
    </div>
  )
}
