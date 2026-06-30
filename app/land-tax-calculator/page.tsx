import { generateMetadata } from '@/lib/seo'
import LandTaxCalculator from '@/components/calculators/LandTaxCalculator'

export const metadata = generateMetadata({
  title: 'Land Tax Calculator',
  description:
    'Calculate your estimated annual state or territory land tax liability based on your unimproved land value.',
  path: '/land-tax-calculator',
})

export default function LandTaxPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Land Tax Calculator</h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
        Land tax is an annual tax on the unimproved value of land you own, charged by each state and
        territory. Thresholds and rates vary — this is a guide only.
      </p>
      <div className="mt-6">
        <LandTaxCalculator />
      </div>
    </div>
  )
}
