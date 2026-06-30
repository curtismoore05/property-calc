import Link from 'next/link'
import { generateMetadata as genMeta } from '@/lib/seo'
import { Card, CardHeader, CardBody, CardLabel } from '@/components/ui/Card'

export const metadata = genMeta({
  title: 'About Property Calc',
  description:
    'Property Calc is a free suite of Australian property investment calculators, built by a buyer’s agent who uses them daily to evaluate deals.',
  path: '/about',
})

const services = [
  'Investment property strategy and goal setting',
  'Deal analysis and due diligence',
  'Buyer’s agent representation across Australia',
  'Portfolio review and finance structuring guidance',
]

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">About Property Calc</h1>

      <div className="mt-8 space-y-6 animate-children">
        <Card>
          <CardHeader>
            <CardLabel>Who I am</CardLabel>
          </CardHeader>
          <CardBody className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              I’m a property investment specialist based in Melbourne. Over the past 10 years I’ve
              helped hundreds of clients build wealth through property investment. Property Calc was
              born from a simple observation: most investors make decisions without running the
              numbers properly. They rely on gut feel, agent promises, or incomplete analysis.
            </p>
            <p>
              These calculators are the same tools I use daily to evaluate deals for my clients.
              I’ve made them free because I believe better-informed investors make better decisions.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardLabel>Services I offer</CardLabel>
          </CardHeader>
          <CardBody className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              If you’re serious about buying an investment property and want expert guidance through
              the process, let’s talk. I work with investors across Australia.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              {services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card gold>
          <CardBody className="text-center">
            <CardLabel>Ready to talk?</CardLabel>
            <p className="text-muted-foreground mt-2 mb-4">
              Book a free initial property strategy session.
            </p>
            <Link
              href="/book-a-call"
              className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              Book a Call
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
