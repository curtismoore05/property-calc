'use client'

import Script from 'next/script'

export default function CalendlyEmbed() {
  return (
    <>
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/curtis-surgerealestate/30min"
        style={{ minWidth: '320px', height: '700px' }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  )
}
