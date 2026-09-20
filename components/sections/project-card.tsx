'use client'

import { motion } from 'framer-motion'
import { Project } from '@/lib/types'
import { CATEGORY_LABELS } from '@/lib/constants'

interface ProjectCardProps {
  project: Project
  onOpenDiagram: (project: Project) => void
  index?: number
}

export function ProjectCard({ project, onOpenDiagram, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ delay: (index % 3) * 0.07 }}
      className="glass card-hover rounded-xl p-6 flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-5 gap-3">
        <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest border border-accent/30 rounded-full text-accent-soft bg-accent/[0.07]">
          {CATEGORY_LABELS[project.category] ?? project.category}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="w-2 h-2 rounded-full bg-success animate-pulse-slow"
            title={`Status: ${project.status ?? 'Live'}`}
          />
          <span className="font-mono text-xs text-subtle">{project.year ?? ''}</span>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-ice mb-1.5 leading-snug">{project.title}</h3>
      <p className="text-xs font-mono text-muted mb-5 uppercase tracking-wider">{project.clientType}</p>

      {/* Step 1 — Problem Statement */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="w-5 h-5 rounded bg-accent-soft/15 border border-accent-soft/40 text-accent-soft text-[10px] font-mono flex items-center justify-center"
            aria-hidden="true"
          >
            1
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-soft">Problem</span>
        </div>
        <p className="text-sm text-muted leading-relaxed">{project.problemStatement}</p>
      </div>

      {/* Step 2 — Solution Architecture */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="w-5 h-5 rounded bg-accent/15 border border-accent/40 text-accent text-[10px] font-mono flex items-center justify-center"
            aria-hidden="true"
          >
            2
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent">Solution Architecture</span>
        </div>
        <p className="text-sm text-ice/80 leading-relaxed">{project.solutionArchitecture}</p>
      </div>

      {/* Step 3 — Business Impact Metric */}
      <div className="mt-auto mb-4 rounded-lg bg-success/[0.07] border border-success/25 px-4 py-3">
        <div className="flex items-center gap-2 mb-0.5">
          <span
            className="w-5 h-5 rounded bg-success/15 border border-success/40 text-success text-[10px] font-mono flex items-center justify-center"
            aria-hidden="true"
          >
            3
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-success/80">Business Impact</span>
        </div>
        <div className="text-3xl font-bold font-mono text-success leading-tight">
          {project.impactValue}
        </div>
        <div className="text-xs text-success/80">{project.impactLabel}</div>
      </div>

      {/* Tools + diagram */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.toolsUsed.map((tool) => (
          <span key={tool} className="tech-tag">{tool}</span>
        ))}
      </div>

      <button className="btn-outline w-full !py-2.5 text-xs" onClick={() => onOpenDiagram(project)}>
        View Workflow Diagram <span aria-hidden="true">⟐</span>
      </button>
    </motion.article>
  )
}
