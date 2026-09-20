import { SITE } from '@/lib/site-data'

export function Footer() {
  return (
    <footer
      data-parallax-section
      className="depth-section relative py-12 border-t border-white/[0.08] overflow-visible"
    >
      {/* Background layer — grid drifts back, fades at edges */}
      <div
        aria-hidden="true"
        data-depth="-50"
        data-parallax-fade="true"
        className="absolute inset-0 bg-grid-base [background-size:44px_44px] opacity-40 pointer-events-none"
      />

      {/* Midground — primary content */}
      <div data-depth="0" className="container mx-auto px-4 md:px-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <a
            href="#hero"
            className="font-display text-2xl tracking-[0.2em] text-gradient"
            aria-label="Back to top"
          >
            {SITE.brand}
          </a>
          <div className="text-xs text-subtle font-mono uppercase tracking-widest text-center">
            © {new Date().getFullYear()} {SITE.name.toUpperCase()} · {SITE.title.toUpperCase()} · DHAKA, BD
          </div>
          <div className="flex gap-6">
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-subtle hover:text-accent-soft transition-colors font-mono text-xs uppercase tracking-widest py-2 -my-2"
            >
              LinkedIn
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-subtle hover:text-accent-soft transition-colors font-mono text-xs uppercase tracking-widest py-2 -my-2"
            >
              GitHub
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="text-subtle hover:text-accent-soft transition-colors font-mono text-xs uppercase tracking-widest py-2 -my-2"
            >
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Foreground — floating accent line pops forward */}
      <div
        aria-hidden="true"
        data-depth="60"
        className="absolute top-0 left-0 right-0 mx-auto w-24 h-px bg-accent/60 pointer-events-none"
      />
    </footer>
  )
}
