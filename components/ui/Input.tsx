import { InputHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  prefix?: ReactNode
  suffix?: ReactNode
}

export default function Input({ label, prefix, suffix, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-semibold text-foreground">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-muted-foreground text-sm select-none pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          className={clsx(
            // Base — spec: bg-input, pure white text, 48px height, shadow-sm
            'flex h-12 w-full rounded-md border border-border bg-input',
            'px-3 py-1 text-base text-white shadow-sm',
            'placeholder:text-muted-foreground caret-white',
            'transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent',
            prefix && 'pl-7',
            suffix && 'pr-10',
            className,
          )}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 text-muted-foreground text-sm select-none pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}
