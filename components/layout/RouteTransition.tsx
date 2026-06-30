'use client'

import { usePathname } from 'next/navigation'

/**
 * Re-keys its subtree on every route change so the page-fade CSS animation
 * replays on navigation (not just first load).
 */
export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div key={pathname} className="page-fade">
      {children}
    </div>
  )
}
