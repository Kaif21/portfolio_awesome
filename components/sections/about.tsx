'use client'

import { motion } from 'framer-motion'
import { SITE, SKILLS } from '@/lib/site-data'

const rise = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

export function About() {
  return (
    <section id="about" data-parallax-section className="depth-section relative py-20 lg:py-28">
      {/* ── Background layer — ghost heading + grid, clipped inside the leaf ── */}
      <div
        aria-hidden="true"
        data-depth="-50"
        data-parallax-fade="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="section-ghost absolute top-10 inset-x-0 text-center font-display text-outline select-none">
          ABOUT
        </div>
      </div>

      {/* ── Midground — bento information grid ── */}
      <div data-depth="0" className="container mx-auto px-4 lg:px-8 relative">
        <motion.div {...rise} className="text-center mb-14">
          <div className="section-label mb-3">// Who I Am</div>
          <h2 className="text-4xl lg:text-5xl font-display tracking-wide">
            THE <span className="text-gradient">ARCHITECT</span>
          </h2>
          <p className="text-muted mt-3">Systems thinker. Process optimizer. Revenue driver.</p>
        </motion.div>

        {/* Bento: featured bio (2×2) + meta cells + skills cells + CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {/* Featured — bio */}
          <motion.div
            {...rise}
            className="glass card-hover rounded-xl p-8 sm:col-span-2 lg:row-span-2"
          >
            <div className="section-label mb-4">// Mission Statement</div>
            {SITE.bio.map((paragraph, i) => (
              <p key={i} className="text-ice/80 leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
            <div className="mt-6 flex items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-white/10" />
              <span className="w-2 h-2 rotate-45 border border-accent/60" />
              <span className="h-px flex-1 bg-white/10" />
            </div>
          </motion.div>

          {/* Meta cells */}
          <motion.div {...rise} transition={{ delay: 0.05 }} className="glass rounded-xl p-5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-subtle mb-1.5">Location</div>
            <div className="text-sm text-ice/90">{SITE.location}</div>
          </motion.div>
          <motion.div {...rise} transition={{ delay: 0.1 }} className="glass rounded-xl p-5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-subtle mb-1.5">Languages</div>
            <div className="text-sm text-ice/90">
              {SITE.languages.map((l) => `${l.name} (${l.level})`).join(' · ')}
            </div>
          </motion.div>
          <motion.div {...rise} transition={{ delay: 0.15 }} className="glass rounded-xl p-5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-subtle mb-1.5">Email</div>
            <a href={`mailto:${SITE.email}`} className="text-sm text-accent-soft hover:underline break-all">
              {SITE.email}
            </a>
          </motion.div>
          <motion.div {...rise} transition={{ delay: 0.2 }} className="glass rounded-xl p-5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-subtle mb-1.5">Phone</div>
            <a href={`tel:${SITE.phone}`} className="text-sm text-accent-soft hover:underline">
              {SITE.phoneDisplay}
            </a>
          </motion.div>

          {/* Skills cells — varied spans */}
          {SKILLS.map((group, i) => (
            <motion.div
              key={group.category}
              {...rise}
              transition={{ delay: i * 0.06 }}
              className={`glass rounded-xl p-6 ${
                i === 0 ? 'sm:col-span-2' : ''
              } ${i === SKILLS.length - 1 ? 'sm:col-span-2' : ''}`}
            >
              <div className="font-mono text-xs uppercase tracking-widest text-accent-soft mb-4">
                {'// '}{group.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span key={skill} className="tech-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Bento CTA cell */}
          <motion.div
            {...rise}
            transition={{ delay: 0.1 }}
            className="rounded-xl p-6 sm:col-span-2 bg-accent/[0.07] border border-accent/25 flex flex-col justify-center"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-accent-soft mb-2">
              {'// '}Availability
            </div>
            <p className="text-sm text-ice/85 leading-relaxed">
              Open to automation architecture & technical coordination roles — Dhaka or remote,
              across any time zone.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Foreground — floating accent geometry ── */}
      <div
        aria-hidden="true"
        data-depth="55"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-[18%] left-[6%] w-3.5 h-3.5 rotate-45 border border-accent-soft/40 animate-float-slow" />
        <div className="absolute bottom-[14%] right-[7%] w-3 h-3 rounded-full border border-accent/40 animate-float" />
      </div>
    </section>
  )
}
