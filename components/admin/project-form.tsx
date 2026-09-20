'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Project } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input, Textarea, Select } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { TOOLS } from '@/lib/constants'

interface ProjectFormProps {
  project?: Project
  onSubmit: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
}

export function ProjectForm({ project, onSubmit }: ProjectFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: project?.title || '',
    category: project?.category || 'workflow',
    clientType: project?.clientType || '',
    problemStatement: project?.problemStatement || '',
    solutionArchitecture: project?.solutionArchitecture || '',
    impactValue: project?.impactValue || '',
    impactLabel: project?.impactLabel || '',
    toolsUsed: project?.toolsUsed || [],
    featured: project?.featured || false,
    year: project?.year || String(new Date().getFullYear()),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onSubmit(formData)
      router.push('/admin')
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleTool = (tool: string) => {
    setFormData((prev) => ({
      ...prev,
      toolsUsed: prev.toolsUsed.includes(tool)
        ? prev.toolsUsed.filter((t) => t !== tool)
        : [...prev.toolsUsed, tool],
    }))
  }

  const labelClass = 'block text-xs font-mono uppercase tracking-widest text-muted mb-2'

  return (
    <Card className="max-w-3xl mx-auto !p-8">
      <h1 className="text-2xl font-bold mb-6 text-gradient font-display tracking-wide">
        {project ? 'Edit Project' : 'New Project'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={labelClass}>Project Title *</label>
          <Input
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., International Sales Pipeline Automation"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className={labelClass}>Category *</label>
            <Select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as Project['category'] })}
            >
              <option value="workflow">Workflow Automation</option>
              <option value="erp">ERP / Odoo</option>
              <option value="web">Web Development</option>
              <option value="management">Technical Management</option>
            </Select>
          </div>

          <div>
            <label className={labelClass}>Client Type *</label>
            <Input
              required
              value={formData.clientType}
              onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
              placeholder="e.g., Overseas SaaS Agency"
            />
          </div>

          <div>
            <label className={labelClass}>Year</label>
            <Input
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder="2024"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>
            <span className="text-accent-soft">01</span> — Problem Statement *
          </label>
          <Textarea
            required
            value={formData.problemStatement}
            onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
            rows={3}
            placeholder="The business bottleneck — e.g., manual lead routing losing 40% of sales"
          />
        </div>

        <div>
          <label className={labelClass}>
            <span className="text-accent">02</span> — Solution Architecture *
          </label>
          <Textarea
            required
            value={formData.solutionArchitecture}
            onChange={(e) => setFormData({ ...formData, solutionArchitecture: e.target.value })}
            rows={3}
            placeholder="The workflow — separate steps with → e.g., n8n webhook → Odoo CRM → Slack alert"
          />
          <p className="text-xs text-subtle mt-1.5 font-mono">
            Tip: separate steps with → to render the workflow diagram automatically.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>
              <span className="text-success">03</span> — Impact Value *
            </label>
            <Input
              required
              value={formData.impactValue}
              onChange={(e) => setFormData({ ...formData, impactValue: e.target.value })}
              placeholder="e.g., 85%"
            />
          </div>

          <div>
            <label className={labelClass}>Impact Label *</label>
            <Input
              required
              value={formData.impactLabel}
              onChange={(e) => setFormData({ ...formData, impactLabel: e.target.value })}
              placeholder="e.g., Reduction in lead response time"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Tools Used</label>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((tool) => (
              <button
                key={tool}
                type="button"
                onClick={() => toggleTool(tool)}
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  formData.toolsUsed.includes(tool)
                    ? 'bg-accent text-base font-semibold shadow-elev-1'
                    : 'bg-white/[0.05] text-muted border border-white/10 hover:border-accent/40 hover:text-accent-soft'
                }`}
              >
                {tool}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4 accent-accent"
          />
          <label htmlFor="featured" className="text-sm font-medium text-ice/80">
            Featured Project
          </label>
        </div>

        <div className="flex gap-4 pt-2">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving…' : project ? 'Update Project' : 'Create Project'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
