import { generateMetadata } from '@/lib/seo'
import { faqSchema } from '@/lib/schema'
import CGTCalculator from '@/components/calculators/CGTCalculator'

export const metadata = generateMetadata({
  title: 'Capital Gains Tax Calculator',
  description:
    'Estimate the capital gains tax on the sale of your Australian investment property, including the indexed cost base and discount.',
  path: '/cgt-calculator',
})

const faqs = [
  {
    question: 'What is capital gains tax on property in Australia?',
    answer:
      'Capital gains tax (CGT) is the tax you pay on the profit made when you sell an investment property. The gain is added to your assessable income for that financial year and taxed at your marginal rate.',
  },
  {
    question: 'Do I get the 50% CGT discount?',
    answer:
      'If you have owned the property for more than 12 months, individuals are entitled to a 50% discount on the capital gain. This means only half the profit is included in your taxable income.',
  },
  {
    question: 'Is my main residence exempt from CGT?',
    answer:
      'Your primary place of residence is generally exempt from CGT. However, if you rented out part of the property, used it for business, or it was not your home for the entire ownership period, a partial exemption may apply.',
  },
  {
    question: 'What costs can be included in my cost base?',
    answer:
      'Your cost base includes the purchase price, stamp duty, legal fees, agent commissions on purchase and sale, and the cost of capital improvements made during ownership. These all reduce your taxable gain.',
  },
]

export default function CGTPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
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
