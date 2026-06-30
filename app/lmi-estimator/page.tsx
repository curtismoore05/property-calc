import { generateMetadata } from '@/lib/seo'
import LMIEstimator from '@/components/calculators/LMIEstimator'

export const metadata = generateMetadata({
  title: 'LMI Estimator',
  description:
    'Estimate your Lender’s Mortgage Insurance premium based on your purchase price, deposit and LVR. LMI applies when your deposit is under 20%.',
  path: '/lmi-estimator',
})

export default function LMIPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">LMI Estimator</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Lender’s Mortgage Insurance protects the lender when you borrow more than 80% of a
        property’s value. Estimate the one-off premium you might pay based on your deposit.
      </p>
      <div className="mt-6">
        <LMIEstimator />
      </div>
    </div>
  )
}
