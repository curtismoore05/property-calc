import { generateMetadata } from ‘@/lib/seo’
import CalendlyEmbed from ‘@/components/CalendlyEmbed’

export const metadata = generateMetadata({
  title: ‘Book a Call’,
  description:
    ‘Book your free initial property strategy session with a buyer’s agent. 30-minute call to talk through your goals, budget, and next steps.’,
  path: ‘/book-a-call’,
})

export default function BookACallPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Book Your <span className="text-accent">Free Initial</span> Property Strategy Session
      </h1>
      <p className="mt-4 text-muted-foreground">
        A 30-minute call to talk through your goals, budget, and the numbers behind your next
        purchase — no obligation.
      </p>
      <div className="mt-8">
        <CalendlyEmbed />
      </div>
    </div>
  )
}
