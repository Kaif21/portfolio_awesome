'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/lib/types'
import { CATEGORY_LABELS } from '@/lib/constants'

interface WorkflowDiagramModalProps {
  project: Project | null
  onClose: () => void
}

// Deep Cyber Charcoal palette — tangerine / coral / ice
const NODE_COLORS = ['#FF5A1F', '#FF8A5B', '#F8FAFC', '#FF5A1F', '#FF8A5B', '#F8FAFC']

export function WorkflowDiagramModal({ project, onClose }: WorkflowDiagramModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  // createPortal must only run on the client — guard against SSR prerender
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (project) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
      const previous = document.activeElement as HTMLElement | null
      // Move focus into the dialog
      requestAnimationFrame(() => closeRef.current?.focus())
      return () => {
        document.removeEventListener('keydown', onKey)
        document.body.style.overflow = ''
        previous?.focus()
      }
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  // Keep Tab inside the dialog while open
  const trapTab = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !panelRef.current) return
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
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

  const steps = project
    ? project.solutionArchitecture
        .split(/→|->/)
        .map((s) => s.trim())
        .filter(Boolean)
    : []

  // Rendered via portal so the dialog is never affected by the
  // perspective/transform of the parallax stage
  if (!mounted) return null
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-base/[0.96] flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Workflow diagram for ${project.title}`}
        >
          <motion.div
            ref={panelRef}
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 10 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={trapTab}
            className="glass-strong rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-soft mb-2">
                  {'// Workflow Diagram'}
                </div>
                <h3 className="text-2xl font-semibold text-ice leading-tight">{project.title}</h3>
                <p className="text-xs font-mono text-muted mt-1 uppercase tracking-wider">
                  {CATEGORY_LABELS[project.category] ?? project.category} · {project.clientType}
                </p>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close diagram"
                className="w-11 h-11 rounded-full border border-white/15 text-muted hover:text-ice hover:border-accent-soft/50 transition-colors flex items-center justify-center shrink-0"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            {/* Pipeline diagram */}
            <div className="rounded-xl bg-base-deep/80 border border-white/[0.06] p-5 md:p-6 mb-6">
              <div className="flex flex-col md:items-center gap-0">
                {steps.map((step, i) => (
                  <div key={i} className="flex flex-col md:items-center w-full">
                    <motion.div
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.09 }}
                      className="px-4 py-3 rounded-lg border font-mono text-sm text-center w-full md:min-w-[320px]"
                      style={{
                        borderColor: `${NODE_COLORS[i % NODE_COLORS.length]}55`,
                        color: NODE_COLORS[i % NODE_COLORS.length],
                        background: `${NODE_COLORS[i % NODE_COLORS.length]}0D`,
                      }}
                    >
                      <span className="text-subtle mr-2 text-xs" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {step}
                    </motion.div>
                    {i < steps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.09 + 0.05 }}
                        className="flex flex-col items-center py-1"
                        aria-hidden="true"
                      >
                        <span className="text-accent text-lg leading-none">↓</span>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Impact */}
            <div className="rounded-lg bg-success/[0.07] border border-success/25 px-5 py-4 flex items-center gap-4 mb-6">
              <div className="text-4xl font-bold font-mono text-success">{project.impactValue}</div>
              <div className="text-sm text-success/90">{project.impactLabel}</div>
            </div>

            {/* Tools */}
            <div className="flex flex-wrap gap-2">
              {project.toolsUsed.map((tool) => (
                <span key={tool} className="tech-tag">{tool}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
