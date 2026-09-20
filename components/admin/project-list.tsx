'use client'

import { Project } from '@/lib/types'
import { CATEGORY_LABELS } from '@/lib/constants'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ProjectListProps {
  projects: Project[]
  onDelete: (id: string) => void
}

export function ProjectList({ projects, onDelete }: ProjectListProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id} className="p-6">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-ice">
                  {project.title}
                </h3>
                {project.featured && <Badge variant="success">Featured</Badge>}
                <Badge variant={
                  project.category === 'workflow' ? 'info' :
                  project.category === 'erp' ? 'default' :
                  project.category === 'web' ? 'warning' : 'danger'
                }>
                  {CATEGORY_LABELS[project.category] ?? project.category}
                </Badge>
              </div>
              <p className="text-sm text-muted mb-2 font-mono">{project.clientType}</p>
              <p className="text-sm text-subtle line-clamp-2">
                {project.problemStatement}
              </p>
              <div className="mt-3 flex items-center gap-4 text-sm">
                <span className="text-success font-mono">
                  {project.impactValue} · {project.impactLabel}
                </span>
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <Link href={`/admin/projects/${project.id}/edit`}>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(project.id)}
                className="!text-accent-soft hover:!border-accent-soft/60"
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}

      {projects.length === 0 && (
        <div className="text-center py-12 text-subtle font-mono text-sm">
          // No projects yet. Create your first one!
        </div>
      )}
    </div>
  )
}
