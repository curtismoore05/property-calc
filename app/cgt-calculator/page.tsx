import { generateMetadata } from '@/lib/seo'
import CGTCalculator from '@/components/calculators/CGTCalculator'

export const metadata = generateMetadata({
  title: 'Capital Gains Tax Calculator',
  description:
    'Estimate the capital gains tax on the sale of your Australian investment property, including the indexed cost base and discount.',
  path: '/cgt-calculator',
})

export default function CGTPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Capital Gains Tax Calculator</h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
        Estimate the capital gains tax payable when you sell an investment property. This is a guide
        only — confirm your position with a registered tax agent.
      </p>
      <div className="mt-6">
        <CGTCalculator />
      </div>
    </div>
  )
}
