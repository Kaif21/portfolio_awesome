import { Project } from '@/lib/types'

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'International Sales Pipeline Automation',
    category: 'workflow',
    clientType: 'Overseas SaaS Agency',
    problemStatement:
      'Manual lead routing was losing 40% of qualified leads due to delayed response times and human error in data entry.',
    solutionArchitecture:
      'n8n webhook listener → Lead scoring algorithm → Odoo CRM auto-assignment → Slack notification to sales team → Automated follow-up sequence via Make.com',
    impactValue: '85%',
    impactLabel: 'Reduction in lead response time',
    toolsUsed: ['n8n', 'Odoo', 'Make.com', 'Slack API'],
    featured: true,
    year: '2024',
    status: 'Live',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Multi-Shift Team Coordination System',
    category: 'management',
    clientType: '24/7 Operations Company',
    problemStatement:
      'Three shifts across different time zones had no unified system for handoffs, causing 30% task duplication and missed deadlines.',
    solutionArchitecture:
      'Custom PHP/Laravel dashboard → Real-time Trello sync → Automated shift handoff reports via n8n → MySQL task tracking → Email/SMS escalation alerts',
    impactValue: '95%',
    impactLabel: 'Elimination of task duplication',
    toolsUsed: ['Laravel', 'PHP', 'MySQL', 'n8n', 'Trello'],
    featured: true,
    year: '2024',
    status: 'Live',
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01',
  },
  {
    id: '3',
    title: 'Multi-Channel Lead Nurture Engine',
    category: 'workflow',
    clientType: 'Digital Marketing Agency',
    problemStatement:
      'Leads from Facebook Ads sat idle in spreadsheets — manual outreach meant 80% of working hours burned on repetitive follow-ups.',
    solutionArchitecture:
      'Facebook Lead Ads webhook → n8n enrichment (Clearbit-style scoring) → CRM record creation → Personalized email sequence → Slack deal alerts',
    impactValue: '80%',
    impactLabel: 'Manual workload eliminated',
    toolsUsed: ['n8n', 'CRM', 'Facebook API', 'Email Automation'],
    featured: false,
    year: '2024',
    status: 'Live',
    createdAt: '2024-03-10',
    updatedAt: '2024-03-10',
  },
  {
    id: '4',
    title: 'E-Commerce Order Processing Pipeline',
    category: 'erp',
    clientType: 'Mid-size E-commerce Business',
    problemStatement:
      'Order processing took 4–6 hours manually, with frequent inventory sync errors between Shopify and the warehouse system.',
    solutionArchitecture:
      'Shopify webhook → n8n orchestration → Odoo ERP inventory update → Automated invoice generation → Shipping label creation → Customer notification',
    impactValue: '92%',
    impactLabel: 'Faster order fulfillment',
    toolsUsed: ['n8n', 'Odoo', 'Shopify API', 'Zapier'],
    featured: true,
    year: '2024',
    status: 'Live',
    createdAt: '2024-04-20',
    updatedAt: '2024-04-20',
  },
  {
    id: '5',
    title: 'International Client Reporting Dashboard',
    category: 'management',
    clientType: 'Agency Serving 10+ Overseas Clients',
    problemStatement:
      'Weekly reports were assembled by hand every Monday — hours of copy-paste across Airtable, Sheets, and email, with inconsistent formatting.',
    solutionArchitecture:
      'Make.com scheduled scenario → Airtable data pull → Google Sheets formatting → PDF snapshot → Timed email delivery with Slack digest',
    impactValue: '10+',
    impactLabel: 'Client reports fully automated weekly',
    toolsUsed: ['Make.com', 'Airtable', 'Google Sheets', 'Scheduling'],
    featured: false,
    year: '2023',
    status: 'Live',
    createdAt: '2023-11-05',
    updatedAt: '2023-11-05',
  },
  {
    id: '6',
    title: 'High-Performance Landing Page System',
    category: 'web',
    clientType: 'EdTech Startup',
    problemStatement:
      'Legacy landing pages had 8+ second load times, causing a 60% bounce rate on mobile devices.',
    solutionArchitecture:
      'Tailwind CSS design system → Vue.js component library → Laravel backend API → Image optimization pipeline → CDN deployment → Performance monitoring',
    impactValue: '1.2s',
    impactLabel: 'Average load time achieved',
    toolsUsed: ['Tailwind CSS', 'Vue.js', 'Laravel', 'Vite'],
    featured: false,
    year: '2023',
    status: 'Live',
    createdAt: '2023-08-20',
    updatedAt: '2023-08-20',
  },
]
