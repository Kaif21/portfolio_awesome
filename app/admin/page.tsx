'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Project } from '@/lib/types'
import { Sidebar } from '@/components/admin/sidebar'
import { ProjectList } from '@/components/admin/project-list'
import { Button } from '@/components/ui/button'

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchProjects()
  }, [])

  const checkAuth = async () => {
    const response = await fetch('/api/admin/auth')
    if (!response.ok) {
      router.push('/admin/login')
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      await fetch(`/api/projects`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  return (
    <div className="min-h-screen bg-base">
      <Sidebar />
      <main className="lg:ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-ice">Projects</h1>
          <Button onClick={() => router.push('/admin/projects/new')}>
            Add New Project
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-white/[0.04] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <ProjectList projects={projects} onDelete={handleDelete} />
        )}
      </main>
    </div>
  )
}