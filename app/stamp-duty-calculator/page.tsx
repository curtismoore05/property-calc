import { generateMetadata } from '@/lib/seo'
import { faqSchema } from '@/lib/schema'
import StampDutyCalculator from '@/components/calculators/StampDutyCalculator'

export const metadata = generateMetadata({
  title: 'Australian Stamp Duty Calculator',
  description:
    'Calculate stamp duty and upfront costs for any Australian state or territory. Includes first home buyer concessions and foreign buyer surcharges.',
  path: '/stamp-duty-calculator',
})

const faqs = [
  {
    question: 'What is stamp duty?',
    answer:
      'Stamp duty (also called transfer duty) is a state government tax charged when you purchase property in Australia. The amount varies by state, property value, buyer type, and intended use.',
  },
  {
    question: 'Do first home buyers pay stamp duty?',
    answer:
      'Most Australian states offer stamp duty concessions or full exemptions for first home buyers purchasing below a set price threshold. Eligibility and thresholds vary by state — our calculator applies the correct concession for your selected state automatically.',
  },
  {
    question: 'Do foreign buyers pay extra stamp duty?',
    answer:
      'Yes. Foreign buyers pay an additional surcharge on top of standard stamp duty in most Australian states. Surcharges typically range from 7% to 8% of the purchase price depending on the state.',
  },
  {
    question: 'When is stamp duty paid?',
    answer:
      'Stamp duty is generally due at settlement, though some states allow a short deferral period. It must be paid before the title can be transferred into your name.',
  },
]

export default function StampDutyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
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
