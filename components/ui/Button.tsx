import { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'gold-outline' | 'blue' | 'ghost'
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
        'inline-flex items-center justify-center font-medium rounded transition-colors disabled:opacity-50 disabled:pointer-events-none',
        {
          'bg-accent text-accent-foreground hover:bg-accent/90': variant === 'gold',
          'border border-accent text-accent hover:bg-accent/10': variant === 'gold-outline',
          'bg-indigo-600 text-white hover:bg-indigo-700': variant === 'blue',
          'text-foreground hover:bg-muted': variant === 'ghost',
        },
        {
          'text-xs px-3 py-1.5': size === 'sm',
          'text-sm px-4 py-2': size === 'md',
          'text-base px-5 py-2.5': size === 'lg',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
