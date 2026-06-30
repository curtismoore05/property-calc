import { generateMetadata } from '@/lib/seo'
import DealScorer from '@/components/calculators/DealScorer'

export const metadata = generateMetadata({
  title: 'Deal Scorer',
  description:
    'Score and compare investment property deals out of 100 across yield, cash flow, affordability, debt coverage and capital growth.',
  path: '/deal-scorer',
})

export default function DealScorerPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Deal Scorer</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Get an at-a-glance score out of 100 for an investment property, weighing yield, cash flow,
        your personal buffer, debt coverage and expected capital growth.
      </p>
      <div className="mt-6">
        <DealScorer />
      </div>
    </div>
  )
}
