'use client'

import { motion } from 'framer-motion'
import { GARAGE } from '@/lib/site-data'

export function Garage() {
  return (
    <section id="garage" data-parallax-section className="depth-section relative py-20 lg:py-28">
      {/* ── Background layer — subtle coral grid ── */}
      <div
        aria-hidden="true"
        data-depth="-50"
        data-parallax-fade="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,138,91,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,138,91,0.02)_1px,transparent_1px)] [background-size:38px_38px]" />
      </div>

      {/* ── Midground ── */}
      <div data-depth="0" className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-subtle mb-2">
            // Easter egg — you found it <span aria-hidden="true">🏁</span>
          </div>
          <div className="section-label mb-3">// Passion Project</div>
          <h2 className="text-4xl lg:text-5xl font-display tracking-wide">
            THE <span className="text-gradient">GARAGE</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 max-w-3xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-5 mb-6">
            <div className="text-5xl animate-float" aria-hidden="true">🚗</div>
            <div>
              <div className="text-3xl font-display text-ice tracking-wide">{GARAGE.dreamCar}</div>
              <div className="font-mono text-xs text-accent-soft uppercase tracking-widest mt-1">
                Dream Build · Luxury Spec
              </div>
            </div>
          </div>

          <p className="text-muted leading-relaxed mb-6">{GARAGE.description}</p>

          <div className="font-mono text-xs text-accent-soft uppercase tracking-widest mb-4">
            {'// '}Planned Modifications
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            {GARAGE.mods.map((mod) => (
              <span
                key={mod}
                className="px-3 py-1.5 text-xs font-mono uppercase tracking-widest border border-accent-soft/25 rounded-full text-accent-soft bg-accent-soft/[0.06]"
              >
                {mod}
              </span>
            ))}
          </div>

          <div className="rounded-xl p-4 bg-accent/[0.05] border border-accent/20">
            <p className="font-mono text-sm text-accent-soft/90 leading-relaxed">
              {'// '}The same obsession for detail and precision I bring to automation — I bring to car culture. Every mod is a workflow optimization.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Foreground accents ── */}
      <div
        aria-hidden="true"
        data-depth="65"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-[30%] right-[12%] w-3.5 h-3.5 rounded-full border border-accent/40 animate-float-slow" />
      </div>
    </section>
  )
}
