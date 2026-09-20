'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, SITE } from '@/lib/site-data'
import { DownloadCVButton } from '@/components/cv/download-cv-button'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = document.querySelectorAll<HTMLElement>('section[id]')
      let current = 'hero'
      sections.forEach((s) => {
        const top = s.offsetTop - 120
        if (window.scrollY >= top) current = s.id
      })
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Drawer: Escape to close, focus moved in, trapped while open, returned on close
  useEffect(() => {
    if (!menuOpen) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (e.key !== 'Tab' || !drawerRef.current) return
      const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus()
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-base/95 border-white/10 shadow-elev-1'
            : 'bg-transparent border-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 md:px-8 h-16 flex justify-between items-center" aria-label="Primary">
          <a
            href="#hero"
            className="font-display text-2xl tracking-[0.2em] text-gradient hover:opacity-90 transition-opacity"
            aria-label="Back to top"
          >
            {SITE.brand}
          </a>

          {/* Desktop nav — lg+ so the row never crowds at 768px */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group relative font-mono text-xs uppercase tracking-widest transition-colors ${
                  active === link.href.slice(1) ? 'text-accent-soft' : 'text-muted hover:text-ice'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    active === link.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            ))}
            <DownloadCVButton size="sm" label="CV ↓" variant="primary" className="!px-4 !py-2.5" />
          </div>

          {/* Mobile hamburger — 44px tap target */}
          <button
            ref={hamburgerRef}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
            className="lg:hidden flex flex-col gap-1.5 p-2.5 -mr-2.5"
          >
            <span className="w-6 h-0.5 bg-accent rounded" />
            <span className="w-4 h-0.5 bg-accent-soft rounded" />
            <span className="w-6 h-0.5 bg-accent rounded" />
          </button>
        </nav>
      </header>

      {/* Mobile drawer — solid overlay (no blur), focus-trapped */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={drawerRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-base/[0.98] flex flex-col pt-safe pb-safe"
          >
            <button
              ref={closeRef}
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute top-[calc(env(safe-area-inset-top,0px)+12px)] right-4 w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-muted hover:text-ice hover:border-accent-soft/50 transition-colors"
            >
              <span aria-hidden="true">✕</span>
            </button>
            <nav className="w-full max-w-xs mx-auto pt-24 space-y-1.5 pb-8" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-lg hover:bg-white/5 group min-h-[44px]"
                >
                  <span className="text-xs font-mono text-subtle w-8 text-right" aria-hidden="true">
                    {link.index}
                  </span>
                  <span className="text-xl font-display tracking-wide text-ice/80 group-hover:text-accent-soft transition-colors">
                    {link.label}
                  </span>
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="pt-6 px-4"
              >
                <DownloadCVButton variant="primary" className="w-full" />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
