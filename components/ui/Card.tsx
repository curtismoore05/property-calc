import { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  gold?: boolean  // 2px gold border — total result cards only
}

export function Card({ gold, className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl text-card-foreground shadow-lg bg-card overflow-hidden',
        gold ? 'border-2 border-accent relative' : 'border border-border',
        className,
      )}
      {...props}
    >
      {/* Gold left stripe on total result cards */}
      {gold && (
        <div className="absolute top-0 left-0 w-2 h-full bg-accent" aria-hidden />
      )}
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'flex items-center gap-2 bg-secondary/50 border-b border-border p-6 pb-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardBody({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('p-6 space-y-6', className)} {...props}>
      {children}
    </div>
  )
}

export function CardLabel({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={clsx('text-xs font-semibold uppercase tracking-wider text-muted-foreground', className)}
      {...props}
    >
      {children}
    </span>
  )
}

export function ResultRow({
  label,
  value,
  gold,
  bold,
}: {
  label: string
  value: string
  gold?: boolean
  bold?: boolean
}) {
  return (
    <div
      className={clsx(
        'flex justify-between items-center py-2 border-b border-border last:border-0',
        bold && 'font-bold',
      )}
    >
      <span className={clsx('text-sm', bold ? 'text-foreground font-semibold' : 'text-muted-foreground')}>
        {label}
      </span>
      {/* Currency values always use Courier New */}
      <span className={clsx('monospace-numbers', gold ? 'text-accent text-lg font-semibold' : 'text-foreground text-sm')}>
        {value}
      </span>
    </div>
  )
}
