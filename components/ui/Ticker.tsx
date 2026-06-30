'use client'

import { useEffect, useRef } from 'react'

/**
 * Split-flap / departure-board number display. When `value` changes, each digit
 * column rapidly flutters through numbers and then settles on its target, with a
 * left-to-right cascade. The animation is driven frame-by-frame and always heads
 * toward the latest value, so editing another field mid-flutter just re-targets
 * the reels from wherever they are — the flutter keeps going to the new total.
 *
 * Every character shares the same 1em clipped box (width from the inherited
 * monospace font) so digits and separators ($ , . % /) stay baseline-aligned.
 */
const SPIN_MS = 520 // base flutter duration for the first column
const STAGGER_MS = 95 // extra time per column → the cascade
const BASE_LOOPS = 2 // full 0-9 cycles before settling
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

const cellBox: React.CSSProperties = { height: '1em', lineHeight: 1, overflow: 'hidden' }
const cellItem: React.CSSProperties = { display: 'block', height: '1em', lineHeight: 1, textAlign: 'center' }

interface TickerProps {
  value: number
  format: (n: number) => string
  className?: string
}

export default function Ticker({ value, format, className }: TickerProps) {
  const text = format(value)

  const reelRefs = useRef<Array<HTMLSpanElement | null>>([])
  const posRef = useRef<number[]>([]) // persistent reel position per digit column
  const rafRef = useRef<number | null>(null)

  // Layout: tag each char as a digit column (with index) or a static separator.
  let dCount = 0
  const layout = text.split('').map((ch) =>
    /[0-9]/.test(ch)
      ? ({ type: 'digit' as const, digit: Number(ch), col: dCount++ })
      : ({ type: 'sep' as const, ch }),
  )

  useEffect(() => {
    const digits = layout.flatMap((l) => (l.type === 'digit' ? [l] : []))
    const pos = posRef.current
    digits.forEach(({ digit, col }) => {
      if (pos[col] === undefined) pos[col] = digit
    })
    pos.length = digits.length

    const apply = (col: number, p: number) => {
      const el = reelRefs.current[col]
      if (el) el.style.transform = `translateY(-${p % 10}em)`
    }

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      digits.forEach(({ digit, col }) => {
        pos[col] = digit
        apply(col, digit)
      })
      return
    }

    // For each column, spin BASE_LOOPS+col full cycles from its current position
    // and land exactly on the target digit, over a staggered duration.
    const anims = digits.map(({ digit, col }) => {
      const startP = pos[col]
      let landing = (Math.floor(startP / 10) + BASE_LOOPS + col) * 10 + digit
      if (landing <= startP) landing += 10
      return { col, startP, landing, dur: SPIN_MS + col * STAGGER_MS }
    })

    let startTime: number | null = null
    const tick = (now: number) => {
      if (startTime === null) startTime = now
      let running = false
      for (const a of anims) {
        const t = (now - startTime) / a.dur
        if (t >= 1) {
          pos[a.col] = a.landing
          apply(a.col, a.landing)
        } else {
          running = true
          const p = a.startP + (a.landing - a.startP) * easeOut(t)
          pos[a.col] = p
          apply(a.col, p)
        }
      }
      if (running) rafRef.current = requestAnimationFrame(tick)
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  return (
    <span className={`inline-flex items-end leading-none ${className ?? ''}`} aria-label={text}>
      {layout.map((l, i) =>
        l.type === 'sep' ? (
          <span key={i} className="inline-block" style={cellBox} aria-hidden="true">
            <span style={cellItem}>{l.ch === ' ' ? ' ' : l.ch}</span>
          </span>
        ) : (
          <span key={i} className="inline-block" style={cellBox} aria-hidden="true">
            <span
              ref={(el) => {
                reelRefs.current[l.col] = el
              }}
              className="ticker-reel"
              style={{ display: 'block', transform: `translateY(-${l.digit}em)` }}
            >
              {Array.from({ length: 11 }, (_, n) => (
                <span key={n} style={cellItem}>
                  {n % 10}
                </span>
              ))}
            </span>
          </span>
        ),
      )}
    </span>
  )
}
