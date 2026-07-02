'use client'

import { useForm, ValidationError } from '@formspree/react'
import Input from '@/components/ui/Input'

export default function ContactForm() {
  const [state, handleSubmit] = useForm('mkoabbrr')

  if (state.succeeded) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-lg font-semibold text-accent">Message sent!</p>
        <p className="mt-2 text-muted-foreground">Thanks for reaching out — we'll be in touch shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Full Name" name="name" required />
      <Input label="Email" type="email" name="email" required />
      <ValidationError field="email" prefix="Email" errors={state.errors} className="text-sm text-destructive" />
      <Input label="Phone" type="tel" name="phone" />
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-foreground">Message</label>
        <textarea
          name="message"
          rows={5}
          required
          className="flex w-full rounded-md border border-border bg-input px-3 py-2 text-base text-white shadow-sm placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        />
        <ValidationError field="message" prefix="Message" errors={state.errors} className="text-sm text-destructive" />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-accent px-6 text-sm font-medium text-accent-foreground shadow hover:bg-accent/90 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state.submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
