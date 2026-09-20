'use client'

import { ProjectForm } from '@/components/admin/project-form'
import { Sidebar } from '@/components/admin/sidebar'

export default function NewProjectPage() {
  const handleSubmit = async (data: any) => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error('Failed to create project')
  }

  return (
    <div className="min-h-screen bg-base">
      <Sidebar />
      <main className="lg:ml-64 p-8">
        <ProjectForm onSubmit={handleSubmit} />
      </main>
    </div>
  )
}