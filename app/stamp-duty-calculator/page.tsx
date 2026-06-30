import { generateMetadata } from '@/lib/seo'
import StampDutyCalculator from '@/components/calculators/StampDutyCalculator'

export const metadata = generateMetadata({
  title: 'Australian Stamp Duty Calculator',
  description:
    'Calculate stamp duty and upfront costs for any Australian state or territory. Includes first home buyer concessions and foreign buyer surcharges.',
  path: '/stamp-duty-calculator',
})

export default function StampDutyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Australian Stamp Duty Calculator</h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
        Stamp duty is a significant cost when buying property in Australia. Our calculator helps
        you estimate your stamp duty liability across all states and territories, including first
        home buyer concessions and foreign buyer surcharges.
      </p>
      <div className="mt-6">
        <StampDutyCalculator />
      </div>
    </div>
  )
}
