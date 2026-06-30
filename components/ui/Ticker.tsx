'use client'

/**
 * Odometer-style number display. Each digit is a vertical reel; when `value`
 * changes the reels roll to the new digits via a CSS transform transition.
 * Because it animates toward whatever the latest `value` is, editing another
 * field mid-roll simply re-targets the reels — they keep going to the new total.
 *
 * Every character (digits and separators like $ , . %) shares the same 1em
 * clipped box so they stay perfectly aligned. Width is inherited from the
 * surrounding monospace font.
 */
interface TickerProps {
  value: number
  format: (n: number) => string
  className?: string
}

export default function Ticker({ value, format, className }: TickerProps) {
  const text = format(value)
  return (
    <span className={`inline-flex items-end leading-none ${className ?? ''}`} aria-label={text}>
      {text.split('').map((ch, i) =>
        /[0-9]/.test(ch) ? (
          <DigitReel key={i} digit={Number(ch)} />
        ) : (
          <Cell key={i}>{ch === ' ' ? ' ' : ch}</Cell>
        ),
      )}
    </span>
  )
}

const cellBox: React.CSSProperties = { height: '1em', lineHeight: 1, overflow: 'hidden' }
const cellItem: React.CSSProperties = { display: 'block', height: '1em', lineHeight: 1, textAlign: 'center' }

function Cell({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block" style={cellBox} aria-hidden="true">
      <span style={cellItem}>{children}</span>
    </span>
  )
}

function DigitReel({ digit }: { digit: number }) {
  return (
    <span className="inline-block" style={cellBox} aria-hidden="true">
      <span className="ticker-reel" style={{ display: 'block', transform: `translateY(-${digit}em)` }}>
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} style={cellItem}>
            {n}
          </span>
        ))}
      </span>
    </span>
  )
}
