'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Project } from '@/lib/types'
import { ProjectForm } from '@/components/admin/project-form'
import { Sidebar } from '@/components/admin/sidebar'

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProject()
  }, [params.id])

  const fetchProject = async () => {
    try {
      const response = await fetch('/api/projects')
      const projects: Project[] = await response.json()
      const found = projects.find(p => p.id === params.id)
      if (found) setProject(found)
      else router.push('/admin')
    } catch (error) {
      router.push('/admin')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (data: any) => {
    const response = await fetch('/api/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: params.id, ...data }),
    })

    if (!response.ok) throw new Error('Failed to update project')
  }

  if (loading) return <div className="p-8">Loading...</div>
  if (!project) return null

  return (
    <div className="min-h-screen bg-base">
      <Sidebar />
      <main className="lg:ml-64 p-8">
        <ProjectForm project={project} onSubmit={handleSubmit} />
      </main>
    </div>
  )
}