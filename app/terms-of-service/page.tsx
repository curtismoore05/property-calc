import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Terms of Service',
  description: 'The terms governing your use of the Property Calc website and calculators.',
  path: '/terms-of-service',
})

export default function TermsOfServicePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Terms of Service
      </h1>
      <div className="mt-6 space-y-4 text-muted-foreground">
        <p>
          The calculators on this site are provided for general information only and do not
          constitute financial, tax, or legal advice. Results are estimates and may not reflect your
          individual circumstances.
        </p>
        <p>
          Always confirm figures with a licensed professional before making a property or financial
          decision. We accept no liability for decisions made based on these tools.
        </p>
        <p>
          This page is a placeholder and should be reviewed by a qualified professional before
          launch.
        </p>
      </div>
    </div>
  )
}
