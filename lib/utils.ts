import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge conditional class names, with later Tailwind utilities winning conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a number as whole-dollar AUD currency, e.g. 34225 -> "$34,225". */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}

/** Format a number as a percentage to one decimal place, e.g. 4.25 -> "4.3%". */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}
