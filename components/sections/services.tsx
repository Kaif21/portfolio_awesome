'use client'

import { motion } from 'framer-motion'
import { SERVICES } from '@/lib/site-data'

export function Services() {
  // Bento spans: [featured 2×2, 1×1, 1×1, 1×1, 1×1, full-width]
  const SPANS = [
    'sm:col-span-2 lg:col-span-2 lg:row-span-2',
    '',
    '',
    '',
    '',
    'sm:col-span-2 lg:col-span-4',
  ]
  const PIPELINE = ['Webhook', 'n8n', 'CRM', 'Alerts']

  return (
    <section id="services" data-parallax-section className="depth-section relative py-20 lg:py-28">
      {/* ── Background layer ── */}
      <div
        aria-hidden="true"
        data-depth="-50"
        data-parallax-fade="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="section-ghost absolute top-10 inset-x-0 text-center font-display text-outline select-none">
          STACK
        </div>
      </div>

      {/* ── Midground — bento feature grid ── */}
      <div data-depth="0" className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="section-label mb-3">// What I Build</div>
          <h2 className="text-4xl lg:text-5xl font-display tracking-wide">
            AUTOMATION <span className="text-gradient">STACK</span>
          </h2>
          <p className="text-muted mt-3">From workflow design to full deployment — end to end.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.07 }}
              className={`glass card-hover rounded-xl p-6 group flex flex-col ${
                SPANS[i] ?? ''
              } ${i === 0 ? 'justify-between' : ''}`}
            >
              <div>
                <div
                  className="text-3xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  aria-hidden="true"
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-ice mb-3">{service.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{service.description}</p>
              </div>

              {/* Featured cell — mini pipeline visual */}
              {i === 0 && (
                <div className="mt-8 hidden sm:flex items-center gap-0" aria-hidden="true">
                  {PIPELINE.map((node, j) => (
                    <div key={node} className="flex items-center">
                      {j > 0 && <span className="w-6 h-px bg-accent/40 mx-1" />}
                      <span
                        className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest rounded border ${
                          j === 1
                            ? 'border-accent/50 text-accent bg-accent/10'
                            : 'border-white/15 text-muted'
                        }`}
                      >
                        {node}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Full-width cell — horizontal emphasis */}
              {i === SERVICES.length - 1 && (
                <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-accent-soft/70">
                  Pixel-perfect · Mobile-first · Performant
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Foreground — floating accents ── */}
      <div
        aria-hidden="true"
        data-depth="70"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-[16%] right-[10%] w-3 h-3 rotate-45 border border-accent-soft/40 animate-float" />
        <div className="absolute bottom-[20%] left-[5%] w-2.5 h-2.5 rounded-full border border-accent/40 animate-float-slow" />
      </div>
    </section>
  )
}
