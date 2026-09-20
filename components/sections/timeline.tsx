'use client'

import { motion } from 'framer-motion'
import { EXPERIENCES } from '@/lib/constants'

const TYPE_STYLES = {
  work: { dot: 'bg-accent', ring: 'border-accent', badge: 'border-accent/40 text-accent-soft bg-accent/[0.07]', label: 'Work' },
  education: { dot: 'bg-accent-soft', ring: 'border-accent-soft', badge: 'border-accent-soft/40 text-accent-soft bg-accent-soft/[0.07]', label: 'Education' },
  certification: { dot: 'bg-success', ring: 'border-success', badge: 'border-success/40 text-success bg-success/[0.07]', label: 'Certification' },
} as const

export function Timeline() {
  return (
    <section
      id="experience"
      data-parallax-section
      className="depth-section relative py-20 lg:py-28"
    >
      {/* ── Background layer — soft banding wash ── */}
      <div
        aria-hidden="true"
        data-depth="-50"
        data-parallax-fade="true"
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent" />
      </div>

      {/* ── Midground ── */}
      <div data-depth="0" className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="section-label mb-3">// Career Journey</div>
          <h2 className="text-4xl lg:text-5xl font-display tracking-wide">
            TECHNICAL <span className="text-gradient">CAREER TIMELINE</span>
          </h2>
          <p className="text-muted mt-3">From frontend precision to automation architecture.</p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical spine */}
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-accent-soft/40 to-transparent"
            aria-hidden="true"
          />

          {EXPERIENCES.map((exp, index) => {
            const style = TYPE_STYLES[exp.type]
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: Math.min(index * 0.06, 0.3) }}
                className="relative pl-14 pb-10 last:pb-0"
              >
                {/* Node dot */}
                <div
                  className={`absolute left-0 top-6 w-8 h-8 rounded-full bg-base border-2 ${style.ring} flex items-center justify-center z-10`}
                  aria-hidden="true"
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${style.dot} ${exp.current ? 'animate-pulse' : ''}`} />
                </div>

                <div className="glass card-hover rounded-xl p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <h3 className="text-lg font-semibold text-ice leading-snug">{exp.role}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest border ${style.badge}`}>
                      {style.label}
                    </span>
                    {exp.current && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest border border-success/40 text-success bg-success/[0.07]">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="font-mono text-sm text-accent-soft mb-4">
                    {exp.company} <span className="text-subtle" aria-hidden="true">·</span>{' '}
                    <span className="text-muted">{exp.period}</span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-sm text-muted flex items-start gap-2">
                        <span className="text-accent mt-0.5" aria-hidden="true">▸</span>
                        {desc}
                      </li>
                    ))}
                  </ul>

                  {exp.tags && (
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Foreground accents ── */}
      <div
        aria-hidden="true"
        data-depth="55"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-[24%] right-[8%] w-3 h-3 rotate-45 border border-accent/40 animate-float" />
      </div>
    </section>
  )
}
