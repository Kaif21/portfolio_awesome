'use client'

import { motion } from 'framer-motion'
import { CERTIFICATIONS } from '@/lib/site-data'

export function Certifications() {
  return (
    <section
      id="certifications"
      data-parallax-section
      className="depth-section relative py-20 lg:py-28"
    >
      {/* ── Background layer — accent banding wash ── */}
      <div
        aria-hidden="true"
        data-depth="-50"
        data-parallax-fade="true"
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent" />
      </div>

      {/* ── Midground — compact bento strip ── */}
      <div data-depth="0" className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="section-label mb-3">// Credentials</div>
          <h2 className="text-4xl lg:text-5xl font-display tracking-wide">
            CERTIFICATIONS <span className="text-gradient">& EDUCATION</span>
          </h2>
          <p className="text-muted mt-3">Verified expertise. Ongoing learning.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`glass card-hover rounded-xl p-6 flex flex-col ${
                i === 0 ? 'sm:col-span-2 lg:col-span-1 border-accent/25' : ''
              }`}
            >
              <div className="text-2xl mb-4 animate-float-slow" aria-hidden="true">
                {cert.badge}
              </div>
              <h3 className="font-semibold text-ice mb-2 leading-snug">{cert.title}</h3>
              <div className="font-mono text-xs text-accent-soft mb-1">{cert.issuer}</div>
              <div className="font-mono text-xs text-subtle mt-auto">{cert.year}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
