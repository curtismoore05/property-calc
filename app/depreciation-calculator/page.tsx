import { generateMetadata } from '@/lib/seo'
import { faqSchema } from '@/lib/schema'
import DepreciationCalculator from '@/components/calculators/DepreciationCalculator'

export const metadata = generateMetadata({
  title: 'Depreciation Calculator',
  description:
    'Estimate the Division 40 and Division 43 tax deductions available from depreciation on your investment property.',
  path: '/depreciation-calculator',
})

const faqs = [
  {
    question: 'What is property depreciation?',
    answer:
      'Property depreciation is a non-cash tax deduction that allows investors to claim the wear and tear of a building and its fittings over time. It is split into Division 43 (capital works on the structure) and Division 40 (plant and equipment).',
  },
  {
    question: 'What is the difference between Division 40 and Division 43?',
    answer:
      'Division 43 covers the structural components of the building — walls, roof, flooring — and depreciates at 2.5% per year over 40 years. Division 40 covers removable assets like carpets, ovens, and air conditioners, which depreciate at varying rates based on their effective life.',
  },
  {
    question: 'Do I need a quantity surveyor to claim depreciation?',
    answer:
      'The ATO requires a tax depreciation schedule prepared by a qualified quantity surveyor to substantiate Division 43 claims on existing properties. Our calculator provides estimates; a formal schedule is required for your tax return.',
  },
  {
    question: 'Can I claim depreciation on a second-hand property?',
    answer:
      'Since May 2017, Division 40 (plant and equipment) deductions are only available on brand-new assets you install. For established properties, you can still claim Division 43 capital works if the building was constructed after 15 September 1987.',
  },
]

export default function DepreciationPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Depreciation Calculator</h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
        Depreciation lets you claim the declining value of a building and its fittings as a tax
        deduction. Estimate your potential first-year and five-year deductions.
      </p>
      <div className="mt-6">
        <DepreciationCalculator />
      </div>
    </div>
  )
}
