'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/lib/types'
import { ProjectCard } from './project-card'
import { WorkflowDiagramModal } from './workflow-diagram-modal'

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'workflow', label: 'Workflow Automation' },
  { id: 'erp', label: 'ERP / Odoo' },
  { id: 'web', label: 'Web Development' },
  { id: 'management', label: 'Technical Management' },
]

interface ProjectsMatrixProps {
  /** Seed data prerendered at build time (SSG); refreshed from the API client-side */
  initialProjects?: Project[]
}

export function ProjectsMatrix({ initialProjects = [] }: ProjectsMatrixProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(initialProjects.length === 0)
  const [diagramProject, setDiagramProject] = useState<Project | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      setProjects(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects =
    activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" data-parallax-section className="depth-section relative py-20 lg:py-28">
      {/* ── Background layer ── */}
      <div
        aria-hidden="true"
        data-depth="-50"
        data-parallax-fade="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="section-ghost absolute top-10 inset-x-0 text-center font-display text-outline select-none">
          BUILDS
        </div>
      </div>

      {/* ── Midground ── */}
      <div data-depth="0" className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="section-label mb-3">// Case Studies</div>
          <h2 className="text-4xl lg:text-5xl font-display tracking-wide">
            PROJECT <span className="text-gradient">ARCHITECTURE MATRIX</span>
          </h2>
          <p className="text-muted mt-3">Real workflows. Real results. All in production.</p>
        </motion.div>

        {/* Filter pills — horizontal snap-scroll on mobile, centered wrap on desktop */}
        <div
          className="edge-fade-x overflow-x-auto lg:overflow-x-visible no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 mb-12"
          role="group"
          aria-label="Filter projects by category"
        >
          <div className="flex flex-nowrap lg:flex-wrap justify-start lg:justify-center gap-2.5 w-max lg:w-auto">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`shrink-0 snap-start px-4 min-h-[44px] py-2 font-mono text-xs uppercase tracking-widest rounded-full border transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'border-accent text-accent bg-accent/10 shadow-elev-1'
                    : 'border-white/10 text-muted hover:border-accent-soft/50 hover:text-accent-soft'
                }`}
                aria-pressed={activeCategory === category.id}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Announce filter results to assistive tech */}
        <p className="sr-only" aria-live="polite">
          {loading
            ? 'Loading projects'
            : `Showing ${filteredProjects.length} ${
                filteredProjects.length === 1 ? 'project' : 'projects'
              }`}
        </p>

        {/* Projects grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-xl p-6 h-[420px] animate-pulse" aria-hidden="true" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onOpenDiagram={setDiagramProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted font-mono text-sm">// No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* ── Foreground accents ── */}
      <div
        aria-hidden="true"
        data-depth="60"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-[20%] left-[4%] w-3 h-3 rotate-45 border border-accent/40 animate-float-slow" />
      </div>

      <WorkflowDiagramModal
        project={diagramProject}
        onClose={() => setDiagramProject(null)}
      />
    </section>
  )
}
