import { generateMetadata } from '@/lib/seo'
import { faqSchema } from '@/lib/schema'
import LMIEstimator from '@/components/calculators/LMIEstimator'

export const metadata = generateMetadata({
  title: 'LMI Estimator',
  description:
    "Estimate your Lender's Mortgage Insurance premium based on your purchase price, deposit and LVR. LMI applies when your deposit is under 20%.",
  path: '/lmi-estimator',
})

const faqs = [
  {
    question: "What is Lender's Mortgage Insurance (LMI)?",
    answer:
      "LMI is a one-off insurance premium that protects the lender — not you — if you default on your loan. It applies when you borrow more than 80% of a property's value (LVR above 80%).",
  },
  {
    question: 'Can LMI be added to my home loan?',
    answer:
      'Yes. Most lenders allow you to capitalise the LMI premium into your loan, meaning you pay it off over the life of the mortgage rather than upfront. This increases your total loan amount and the interest you pay.',
  },
  {
    question: 'How much does LMI cost?',
    answer:
      'LMI premiums vary by lender and LVR. As a rough guide: LVR 80-85% attracts around 1.2% of the loan; 85-90% around 1.8%; and 90-95% around 3.2%. Our estimator applies these benchmark rates.',
  },
  {
    question: 'Is LMI tax deductible for investment properties?',
    answer:
      'LMI on an investment property loan may be tax deductible, spread over the lesser of five years or the loan term. You should confirm this with a registered tax agent as individual circumstances vary.',
  },
]

export default function LMIPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <h1 className="text-2xl font-bold tracking-tight text-foreground">LMI Estimator</h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
        {"Lender's Mortgage Insurance protects the lender when you borrow more than 80% of a property's value. Estimate the one-off premium you might pay based on your deposit."}
      </p>
      <div className="mt-6">
        <LMIEstimator />
      </div>
    </div>
  )
}