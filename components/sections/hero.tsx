'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { SITE } from '@/lib/site-data'
import { StatsBar } from './stats-bar'
import { DownloadCVButton } from '@/components/cv/download-cv-button'

// Lazy-load the 3D canvas client-side; skipped on small screens for 60 FPS mobile
const AutomationNetwork = dynamic(
  () => import('../3d/automation-network').then((m) => m.AutomationNetwork),
  { ssr: false, loading: () => null }
)

function webglSupported(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

export function Hero() {
  const [show3D, setShow3D] = useState(false)
  const [webglOk, setWebglOk] = useState(true)

  useEffect(() => {
    // Only mount the WebGL scene on pointer-capable, reasonably large screens
    const mq = window.matchMedia('(min-width: 1024px) and (hover: hover)')
    const enable = () => {
      if (!mq.matches) return
      const ok = webglSupported()
      setWebglOk(ok)
      setShow3D(ok)
    }
    enable()
    mq.addEventListener('change', enable)
    return () => mq.removeEventListener('change', enable)
  }, [])

  return (
    <section
      id="hero"
      data-parallax-section
      className="depth-section relative min-h-screen flex items-center pt-24 pb-16"
    >
      {/* ── Background layer (translateZ(-50px)) — grid + gradient wash, no blur ── */}
      <div
        aria-hidden="true"
        data-depth="-50"
        data-parallax-fade="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute inset-0 bg-grid-base [background-size:44px_44px] opacity-70" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-accent/[0.05] via-transparent to-accent-soft/[0.04]" />
        {/* Crisp corner ticks — geometric, not blurred */}
        <div className="absolute top-24 left-6 w-14 h-14 border-l border-t border-accent/20" />
        <div className="absolute bottom-10 right-6 w-14 h-14 border-r border-b border-accent/20" />
      </div>

      {/* ── Midground layer (translateZ(0)) — primary content ── */}
      <div data-depth="0" className="container mx-auto px-4 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — command content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full glass"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent-soft">
                Automation Architect · Dhaka, BD
              </span>
            </motion.div>

            <h1 className="mb-5 font-display leading-[0.95]">
              <span className="block text-6xl md:text-8xl text-ice tracking-wide">
                KAIF <span className="text-gradient">HOSSAIN</span>
              </span>
              <span className="block mt-2 text-2xl md:text-3xl tracking-[0.18em] text-muted">
                {SITE.aliases.join(' · ')}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-ice/90 font-medium mb-4 max-w-xl">
              {SITE.headline}
            </p>
            <p className="text-sm md:text-base text-muted mb-8 max-w-xl leading-relaxed">
              {SITE.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                className="btn-primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Workflow Case Studies <span aria-hidden="true">→</span>
              </button>
              <button
                className="btn-secondary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Schedule Technical Consultation
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-11 h-11 rounded-md glass flex items-center justify-center text-muted hover:text-accent-soft hover:border-accent/40 transition-all"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="w-11 h-11 rounded-md glass flex items-center justify-center text-muted hover:text-accent-soft hover:border-accent/40 transition-all"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <span className="h-6 w-px bg-white/10 hidden sm:block" aria-hidden="true" />
              <DownloadCVButton variant="outline" label="Download CV (PDF)" />
            </div>

            <StatsBar />
          </motion.div>

          {/* Right — 3D node network */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:block"
          >
            {show3D ? (
              <AutomationNetwork />
            ) : (
              <div className="w-full h-[560px] rounded-2xl glass flex flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-2" aria-hidden="true">
                  {['bg-accent', 'bg-accent-soft', 'bg-muted'].map((c, i) => (
                    <span
                      key={c}
                      className={`w-2.5 h-2.5 rounded-full ${c} ${webglOk ? 'animate-pulse-slow' : ''}`}
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                  ))}
                </div>
                <span className="font-mono text-xs text-subtle">
                  {webglOk ? 'INITIALIZING NODES…' : '3D VIEW UNAVAILABLE — WEBGL DISABLED'}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Foreground layer (translateZ(80px)) — scroll indicator + floating accents ── */}
      <div
        aria-hidden="true"
        data-depth="80"
        className="absolute inset-0 pointer-events-none z-20"
      >
        {/* Floating accent geometry */}
        <div className="absolute top-[22%] right-[8%] w-3 h-3 rounded-full border border-accent-soft/50 animate-float-slow" />
        <div className="absolute bottom-[30%] left-[4%] w-4 h-4 rotate-45 border border-accent/40 animate-float" />
      </div>
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        data-depth="60"
        className="absolute bottom-6 left-0 right-0 mx-auto w-fit hidden md:flex flex-col items-center gap-2 text-subtle hover:text-accent-soft transition-colors z-20"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }} aria-hidden="true">
          ↓
        </motion.span>
      </motion.a>
    </section>
  )
}
