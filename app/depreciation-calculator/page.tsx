import { generateMetadata } from '@/lib/seo'
import DepreciationCalculator from '@/components/calculators/DepreciationCalculator'

export const metadata = generateMetadata({
  title: 'Depreciation Calculator',
  description:
    'Estimate the Division 40 and Division 43 tax deductions available from depreciation on your investment property.',
  path: '/depreciation-calculator',
})

export default function DepreciationPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Depreciation Calculator</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Depreciation lets you claim the declining value of a building and its fittings as a tax
        deduction. Estimate your potential first-year and five-year deductions.
      </p>
      <div className="mt-6">
        <DepreciationCalculator />
      </div>
    </div>
  )
}
