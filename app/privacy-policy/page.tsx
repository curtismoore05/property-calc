import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Privacy Policy',
  description: 'How Property Calc collects, uses, and protects your information.',
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 prose-invert">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Privacy Policy
      </h1>
      <div className="mt-6 space-y-4 text-muted-foreground">
        <p>
          Property Calc provides free property calculators. All calculations run in your browser —
          the figures you enter are not sent to or stored on our servers.
        </p>
        <p>
          If you subscribe to our newsletter or submit the contact form, we use the details you
          provide solely to respond to you and, where you opt in, to send property investment tips.
          We do not sell your information.
        </p>
        <p>
          This page is a placeholder and should be reviewed by a qualified professional before
          launch.
        </p>
      </div>
    </div>
  )
}
