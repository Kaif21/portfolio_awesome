'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/projects/new', label: 'Add Project' },
  { href: '/', label: 'View Site', external: true },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface/70 border-r border-white/[0.08] p-6 hidden lg:block">
      <div className="mb-8">
        <h2 className="text-xl font-bold font-display tracking-[0.2em] text-gradient">KAIF21</h2>
        <p className="text-xs font-mono text-subtle mt-1 uppercase tracking-widest">Admin Panel</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'block px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              pathname === item.href
                ? 'bg-accent/10 text-accent-soft border border-accent/30'
                : 'text-muted hover:text-ice hover:bg-white/[0.05] border border-transparent'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
