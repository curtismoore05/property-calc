// Shared two-column calculator layout: inputs on the left, results on the
// right (sticky on desktop). Stacks to a single column on mobile.

export function CalcGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid lg:grid-cols-2 gap-6 items-start">{children}</div>
}

export function CalcInputs({ children }: { children: React.ReactNode }) {
  return <div className="space-y-6 animate-children">{children}</div>
}

export function CalcResults({ children }: { children: React.ReactNode }) {
  return <div className="space-y-6 animate-children lg:sticky lg:top-24">{children}</div>
}
