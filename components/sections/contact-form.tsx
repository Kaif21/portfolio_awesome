'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SITE } from '@/lib/site-data'
import { SERVICE_OPTIONS } from '@/lib/constants'
import { DownloadCVButton } from '@/components/cv/download-cv-button'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Compose a real email in the visitor's mail client — zero backend required
      const subject = encodeURIComponent(
        `[Portfolio Inquiry] ${formData.service || 'General'} — ${formData.name}`
      )
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || '—'}\nService: ${formData.service || '—'}\n\n${formData.message}`
      )
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const set = (key: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))

  return (
    <section id="contact" data-parallax-section className="depth-section relative py-20 lg:py-28">
      {/* ── Background layer ── */}
      <div
        aria-hidden="true"
        data-depth="-50"
        data-parallax-fade="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="section-ghost absolute top-10 inset-x-0 text-center font-display text-outline select-none">
          CONTACT
        </div>
      </div>

      {/* ── Midground ── */}
      <div data-depth="0" className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="section-label mb-3">// Let&apos;s Build Together</div>
          <h2 className="text-4xl lg:text-5xl font-display tracking-wide">
            GET IN <span className="text-gradient">TOUCH</span>
          </h2>
          <p className="text-muted mt-3">Have an automation challenge? Let&apos;s solve it.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass rounded-xl p-8 space-y-5"
          >
            <div className="font-mono text-xs text-accent-soft uppercase tracking-widest">
              {'// Send a Message'}
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="cf-name" className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">
                  Name *
                </label>
                <input id="cf-name" required value={formData.name} onChange={set('name')} className="input-field" placeholder="Your full name" autoComplete="name" />
              </div>
              <div>
                <label htmlFor="cf-email" className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">
                  Email *
                </label>
                <input id="cf-email" type="email" required value={formData.email} onChange={set('email')} className="input-field" placeholder="you@company.com" autoComplete="email" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="cf-company" className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">
                  Company
                </label>
                <input id="cf-company" value={formData.company} onChange={set('company')} className="input-field" placeholder="Your company (optional)" autoComplete="organization" />
              </div>
              <div>
                <label htmlFor="cf-service" className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">
                  Service Needed
                </label>
                <select id="cf-service" value={formData.service} onChange={set('service')} className="input-field">
                  <option value="">Select a service…</option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="cf-message" className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">
                Message *
              </label>
              <textarea id="cf-message" required rows={5} value={formData.message} onChange={set('message')} className="input-field resize-y" placeholder="Describe your project or challenge…" />
            </div>

            <button type="submit" className="btn-primary w-full">
              Send Message <span aria-hidden="true">→</span>
            </button>

            {/* Status announced to assistive tech */}
            <div aria-live="polite">
              {status === 'success' && (
                <p className="p-3 text-center font-mono text-sm bg-success/10 border border-success/25 text-success rounded-lg">
                  <span aria-hidden="true">✓</span> Opening your email client — I reply within 24 hours.
                </p>
              )}
              {status === 'error' && (
                <p className="p-3 text-center font-mono text-sm bg-accent-soft/10 border border-accent-soft/25 text-accent-soft rounded-lg">
                  <span aria-hidden="true">✕</span> Something went wrong — email {SITE.email} directly.
                </p>
              )}
            </div>
          </motion.form>

          {/* Quick links + info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass rounded-xl p-6">
              <div className="font-mono text-xs text-accent-soft uppercase tracking-widest mb-5">
                {'// Direct Channels'}
              </div>

              <a href={`mailto:${SITE.email}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/[0.04] transition-colors group">
                <div className="w-11 h-11 rounded-md bg-accent/10 border border-accent/25 text-accent flex items-center justify-center font-mono text-sm" aria-hidden="true">@</div>
                <div>
                  <div className="font-semibold text-ice group-hover:text-accent-soft transition-colors">Email</div>
                  <div className="font-mono text-xs text-muted">{SITE.email}</div>
                </div>
              </a>

              <a href={`tel:${SITE.phone}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/[0.04] transition-colors group">
                <div className="w-11 h-11 rounded-md bg-accent-soft/10 border border-accent-soft/25 text-accent-soft flex items-center justify-center font-mono text-sm" aria-hidden="true">☎</div>
                <div>
                  <div className="font-semibold text-ice group-hover:text-accent-soft transition-colors">Phone</div>
                  <div className="font-mono text-xs text-muted">{SITE.phoneDisplay}</div>
                </div>
              </a>

              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/[0.04] transition-colors group">
                <div className="w-11 h-11 rounded-md bg-white/[0.05] border border-white/10 text-muted group-hover:text-accent-soft flex items-center justify-center font-mono text-sm font-bold" aria-hidden="true">in</div>
                <div>
                  <div className="font-semibold text-ice group-hover:text-accent-soft transition-colors">LinkedIn</div>
                  <div className="font-mono text-xs text-muted">linkedin.com/in/kaif21</div>
                </div>
              </a>

              <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/[0.04] transition-colors group">
                <div className="w-11 h-11 rounded-md bg-white/[0.05] border border-white/10 text-muted group-hover:text-accent-soft flex items-center justify-center font-mono text-sm font-bold" aria-hidden="true">⌥</div>
                <div>
                  <div className="font-semibold text-ice group-hover:text-accent-soft transition-colors">GitHub</div>
                  <div className="font-mono text-xs text-muted">github.com/kaif21</div>
                </div>
              </a>

              <div className="p-3 rounded-lg group">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-md bg-accent/10 border border-accent/25 text-accent flex items-center justify-center" aria-hidden="true">↓</div>
                  <div>
                    <div className="font-semibold text-ice">Download CV</div>
                    <div className="font-mono text-xs text-muted">PDF · always up to date</div>
                  </div>
                </div>
                <DownloadCVButton variant="primary" className="w-full mt-3" label="Download CV (PDF)" />
              </div>
            </div>

            <div className="glass rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-accent/10 to-transparent p-4 border-b border-white/[0.06]">
                <div className="font-mono text-xs text-accent-soft uppercase tracking-widest">
                  {'// Book a Discovery Call'}
                </div>
              </div>
              <div className="p-4">
                <a
                  href={SITE.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full"
                >
                  Open Calendly Scheduler <span aria-hidden="true">↗</span>
                </a>
                <p className="text-xs text-subtle mt-3 text-center font-mono">
                  30-min technical consultation · GMT+6
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Foreground accents ── */}
      <div
        aria-hidden="true"
        data-depth="60"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute bottom-[18%] right-[6%] w-3 h-3 rotate-45 border border-accent-soft/40 animate-float" />
      </div>
    </section>
  )
}
