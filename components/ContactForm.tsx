'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'

// No backend on a static export — submitting opens the visitor's email client.
const CONTACT_EMAIL = 'hello@realestatecalculators.com.au'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Website enquiry from ${name || 'a visitor'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-foreground">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          required
          className="flex w-full rounded-md border border-border bg-input px-3 py-2 text-base text-white shadow-sm placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-accent px-6 text-sm font-medium text-accent-foreground shadow hover:bg-accent/90 transition-all duration-200 active:scale-[0.98]"
      >
        Send Message
      </button>
    </form>
  )
}
