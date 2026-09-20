import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Services } from '@/components/sections/services'
import { ProjectsMatrix } from '@/components/sections/projects-matrix'
import { Timeline } from '@/components/sections/timeline'
import { Certifications } from '@/components/sections/certifications'
import { Garage } from '@/components/sections/garage'
import { ContactForm } from '@/components/sections/contact-form'
import { INITIAL_PROJECTS } from '@/data/projects'

// ISR — regenerate the static page every 60s so admin edits propagate
export const revalidate = 60

export default function HomePage() {
  return (
    <main className="relative">
      {/* Module A — Command Hero with 3D Node Network */}
      <Hero />
      {/* About & Capabilities */}
      <About />
      {/* Services — Automation Stack */}
      <Services />
      {/* Module B — Project Architecture Matrix */}
      <ProjectsMatrix initialProjects={INITIAL_PROJECTS} />
      {/* Module C — Technical Career & Capabilities Timeline */}
      <Timeline />
      {/* Certifications & Education */}
      <Certifications />
      {/* Easter Egg — The Garage */}
      <Garage />
      {/* Contact */}
      <ContactForm />
    </main>
  )
}
