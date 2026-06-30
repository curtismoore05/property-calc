import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { Card, CardBody } from '@/components/ui/Card'
import ContactForm from '@/components/ContactForm'

export const metadata = genMeta({
  title: 'Contact Us',
  description:
    'Get in touch with Property Calc. Have a question about our calculators or want to discuss property investment? We’d love to hear from you.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Get in touch</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-[50ch] mx-auto">
          Have a question about our calculators or want to discuss property investment? We’d love to
          hear from you.
        </p>
      </div>

      <div className="mt-10 space-y-6 animate-children">
        <div className="bg-secondary/30 rounded-xl p-6 border border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h2 className="font-semibold text-lg text-foreground flex items-center justify-center sm:justify-start gap-2">
              <MessageCircle className="w-5 h-5 text-accent" />
              Prefer to chat?
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Book a free initial property strategy session.
            </p>
          </div>
          <Link
            href="/book-a-call"
            className="shrink-0 inline-flex items-center justify-center rounded-md border border-accent text-accent px-5 py-2.5 text-sm font-medium hover:bg-accent/10 transition-colors"
          >
            Book a Call
          </Link>
        </div>

        <Card>
          <CardBody>
            <ContactForm />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
