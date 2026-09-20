import { NextRequest, NextResponse } from 'next/server'
import { Project } from '@/lib/types'
import { INITIAL_PROJECTS } from '@/data/projects'

// In-memory store (replace with Supabase/DB in production)
let projects: Project[] = INITIAL_PROJECTS

export async function GET() {
  return NextResponse.json(projects)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const newProject: Project = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    projects = [newProject, ...projects]
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const index = projects.findIndex(p => p.id === data.id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    projects[index] = {
      ...projects[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(projects[index])
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    projects = projects.filter(p => p.id !== id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}