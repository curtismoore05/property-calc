import { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  gold?: boolean
}

export function Card({ gold, className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-card rounded border p-4',
        gold ? 'border-accent' : 'border-border',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('flex items-center gap-2 mb-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardLabel({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={clsx('text-xs font-semibold uppercase tracking-wide text-muted-foreground', className)} {...props}>
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
    <div className={clsx('flex justify-between items-center py-2 border-b border-border last:border-0', bold && 'font-semibold')}>
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className={clsx('text-sm', gold ? 'text-accent' : 'text-foreground')}>{value}</span>
    </div>
  )
}
