import { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'navy' | 'blue' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({
  variant = 'gold',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        // Base — matches spec exactly
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        'shadow transition-all duration-200 active:scale-[0.98]',
        {
          // Gold: dark navy text on gold bg — NEVER white
          'bg-accent text-accent-foreground hover:bg-accent/90': variant === 'gold',
          // Navy: turns gold on hover via .btn-gold-hover
          'bg-primary text-primary-foreground btn-gold-hover': variant === 'navy',
          // Blue: only for Rental Yield "Calculate" button
          'bg-indigo-600 text-white hover:bg-indigo-700': variant === 'blue',
          'text-foreground hover:bg-muted/50 shadow-none': variant === 'ghost',
        },
        {
          'h-7 px-3 text-xs': size === 'sm',
          'h-9 px-4 py-2': size === 'md',
          'h-11 px-6 text-base': size === 'lg',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
