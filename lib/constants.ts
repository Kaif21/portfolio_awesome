import { Experience } from './types'

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    company: 'SMT (Betopia Group)',
    role: 'Sales Team Lead — Automation Sales',
    period: 'Jan 2024 – Present',
    type: 'work',
    current: true,
    description: [
      'Leading automation sales & operations for international clients across time zones',
      'Architecting n8n / Zapier / Odoo CRM/ERP workflow automations end to end',
      'Coordinating multi-shift technical teams with unified handoff systems',
      'Managing the full client lifecycle — discovery, delivery, retention (98%)',
    ],
    tags: ['n8n', 'Zapier', 'Odoo', 'Team Leadership', 'International Clients'],
  },
  {
    id: '2',
    company: 'EduportalBD',
    role: 'Junior Web Developer',
    period: 'Jun 2023 – Dec 2023',
    type: 'work',
    description: [
      'Built and maintained front-end systems with Tailwind CSS',
      'Shipped high-performance, mobile-responsive landing pages',
      'Optimized load times and accessibility across the platform',
    ],
    tags: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript'],
  },
  {
    id: '3',
    company: 'Theinfoport.com',
    role: 'Web Developer / Data Collector',
    period: '2022 – 2023',
    type: 'work',
    description: [
      'Designed front-end solutions for educational content platforms',
      'Managed data collection pipelines and content curation',
      'Improved UX flows for enriched user experience',
    ],
    tags: ['Frontend', 'Data Management', 'UX'],
  },
  {
    id: '4',
    company: 'Hiver.Digital',
    role: 'Data Entry Officer',
    period: '2020 – 2022',
    type: 'work',
    description: [
      'Maintained data accuracy and integrity across digital tools',
      'Operated Vera Koto & Dam Koto platforms at scale',
      'Built the process discipline that later shaped my automation career',
    ],
    tags: ['Data Entry', 'Digital Tools', 'Accuracy'],
  },
  {
    id: '5',
    company: 'Dhaka Polytechnic Institute',
    role: 'Diploma in Computer Technology',
    period: '2021 – 2024 · GPA 3.0',
    type: 'education',
    description: [
      'Computer Technology diploma — systems architecture & networking',
      'Applied coding skills, turning theory into practical solutions',
    ],
    tags: ['Computer Technology', 'Systems', 'Networking'],
  },
  {
    id: '6',
    company: 'BITM',
    role: 'Web Development with PHP, Laravel & Vue.js',
    period: 'Nov 2024',
    type: 'certification',
    description: ['Full-stack certification covering modern PHP frameworks and Vue.js'],
    tags: ['PHP', 'Laravel', 'Vue.js'],
  },
  {
    id: '7',
    company: 'NSDA',
    role: 'IT & Web Operations Specialist — Level 3',
    period: 'Oct 2024',
    type: 'certification',
    description: ['National certification in IT operations and web infrastructure management'],
    tags: ['IT Operations', 'Web Infrastructure'],
  },
]

export const SERVICE_OPTIONS = [
  'Workflow Automation (n8n / Zapier / Make.com)',
  'ERP / Odoo CRM Integration',
  'AI Orchestration',
  'International Sales Automation',
  'Technical Project Coordination',
  'Web Development',
  'Other',
]

export const TOOLS = [
  'n8n',
  'Zapier',
  'Make.com',
  'Odoo',
  'Laravel',
  'Vue.js',
  'Tailwind CSS',
  'PHP',
  'MySQL',
  'JavaScript',
  'Git',
  'Trello',
]

export const CATEGORY_LABELS: Record<string, string> = {
  workflow: 'Workflow Automation',
  erp: 'ERP / Odoo',
  web: 'Web Development',
  management: 'Technical Management',
}
