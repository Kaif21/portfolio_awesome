import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const display = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kaif21.netlify.app'),
  title: 'Kaif Hossain — Automation Architect & Sales Leader | Dhaka, BD',
  description:
    'Engineering scalable workflows & coordinating technical delivery. Expert in n8n, Zapier, Odoo CRM/ERP, AI orchestration, and full-stack automation solutions for international clients.',
  keywords: [
    'Automation Architect',
    'n8n',
    'Zapier',
    'Make.com',
    'Odoo',
    'Workflow Automation',
    'Sales Team Lead',
    'Project Coordinator',
    'Dhaka Bangladesh',
  ],
  authors: [{ name: 'Kaif Hossain' }],
  openGraph: {
    title: 'Kaif Hossain — Automation Architect & Sales Leader',
    description: 'Turning manual chaos into intelligent workflows. n8n, Zapier, Odoo & AI orchestration.',
    url: 'https://kaif21.netlify.app',
    siteName: 'Kaif Hossain Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaif Hossain — Automation Architect & Sales Leader',
    description: 'Turning manual chaos into intelligent workflows.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0A0D14',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-base text-ice font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
