import { generateMetadata } from '@/lib/seo'
import RentalYieldCalculator from '@/components/calculators/RentalYieldCalculator'

export const metadata = generateMetadata({
  title: 'Rental Yield Calculator',
  description:
    'Calculate the gross and net rental yield on an Australian investment property. Factor in vacancy and annual expenses to see your true return.',
  path: '/rental-yield-calculator',
})

export default function RentalYieldPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Rental Yield Calculator</h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
        Rental yield tells you how much income a property generates relative to its price. Gross
        yield uses rent alone; net yield factors in vacancy and ongoing expenses for a truer picture
        of your return.
      </p>
      <div className="mt-6">
        <RentalYieldCalculator />
      </div>
    </div>
  )
}
