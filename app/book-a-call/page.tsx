import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Book a Call',
  description:
    'Book your free initial property strategy session with a buyer’s agent. 30-minute call to talk through your goals, budget, and next steps.',
  path: '/book-a-call',
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

      {/* Calendly inline embed.
          Set NEXT_PUBLIC_CALENDLY_URL to enable the live widget. */}
      <div className="mt-8 rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
        Booking calendar coming soon. In the meantime, reach out via the{' '}
        <a href="/contact" className="text-accent hover:underline">
          contact page
        </a>
        .
      </div>
    </div>
  )
}
