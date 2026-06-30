import { SelectHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export default function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-semibold text-foreground">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          className={clsx(
            'flex h-12 w-full appearance-none rounded-md border border-border bg-input',
            'px-3 py-2 pr-9 text-sm text-foreground shadow-sm',
            'transition-colors focus:outline-none focus:ring-1 focus:ring-accent',
            className,
          )}
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  )
}
