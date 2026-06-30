import { InputHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  prefix?: ReactNode
  suffix?: ReactNode
}

export default function Input({ label, prefix, suffix, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-muted-foreground text-sm select-none">{prefix}</span>
        )}
        <input
          className={clsx(
            'w-full bg-input text-foreground rounded border border-border px-3 py-2 text-sm outline-none focus:border-ring placeholder:text-muted-foreground',
            prefix && 'pl-7',
            suffix && 'pr-10',
            className,
          )}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 text-muted-foreground text-sm select-none">{suffix}</span>
        )}
      </div>
    </div>
  )
}
