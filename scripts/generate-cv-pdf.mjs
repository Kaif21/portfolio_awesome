/**
 * Generates public/kaif-hossain-cv.pdf — a hand-crafted, valid PDF
 * (no external dependencies, Helvetica core fonts, WinAnsi encoding).
 *
 * Run: node scripts/generate-cv-pdf.mjs   (or: npm run generate:cv)
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'kaif-hossain-cv.pdf')

// ---------- palette ----------
const INK = [0.106, 0.106, 0.106] // #1B1B1B
const AMBER = [0.973, 0.706, 0.0] // #F8B400
const CRIMSON = [0.902, 0.224, 0.275] // #E63946
const DARK = [0.13, 0.13, 0.13]
const GRAY = [0.42, 0.42, 0.42]
const LIGHT = [0.55, 0.55, 0.55]
const WHITE = [1, 1, 1]

// ---------- page geometry (A4) ----------
const PW = 595.28
const PH = 841.89
const M = 50
const CW = PW - M * 2

// ---------- text helpers ----------
const sanitize = (s) =>
  String(s)
    .replace(/→/g, '>')
    .replace(/[–—]/g, '-')
    .replace(/’/g, "'")
    .replace(/[^\x00-\xFF]/g, '')

const esc = (s) =>
  s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')

function charW(ch) {
  if (ch === ' ') return 0.28
  if ('iljtfI.,;:!|\'`'.includes(ch)) return 0.3
  if ('mwMW@'.includes(ch)) return 0.85
  if (ch >= 'A' && ch <= 'Z') return 0.68
  if (ch >= '0' && ch <= '9') return 0.56
  return 0.55
}
const textW = (s, size) => [...s].reduce((w, ch) => w + charW(ch), 0) * size

function wrap(str, size, maxW) {
  const words = sanitize(str).split(/\s+/)
  const lines = []
  let line = ''
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (textW(test, size) > maxW && line) {
      lines.push(line)
      line = word
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines
}

// ---------- content stream builder ----------
class Page {
  constructor() {
    this.ops = []
  }
  text(x, y, str, { size = 9.5, font = 'F1', color = DARK } = {}) {
    this.ops.push(`BT ${color.join(' ')} rg /${font} ${size} Tf ${x.toFixed(2)} ${y.toFixed(2)} Td (${esc(sanitize(str))}) Tj ET`)
    return this
  }
  rect(x, y, w, h, color) {
    this.ops.push(`${color.join(' ')} rg ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f`)
    return this
  }
  line(x1, y1, x2, y2, color, w = 0.8) {
    this.ops.push(`${color.join(' ')} RG ${w} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`)
    return this
  }
  build() {
    return this.ops.join('\n')
  }
}

// ---------- CV document model ----------
const doc = {
  header: {
    name: 'KAIF HOSSAIN',
    title: 'Automation Architect & Sales Leader',
    tagline: 'n8n · Zapier · Odoo CRM/ERP · AI Orchestration · Full-Stack Web',
    contact: [
      'South Banasree, Dhaka, Bangladesh',
      'kaif.bd21@gmail.com · +880 1876 514842',
      'linkedin.com/in/kaif21 · github.com/kaif21 · kaif21.netlify.app',
    ],
  },
  summary:
    "I architect automation systems that scale. With deep expertise in n8n, Zapier, Make.com and Odoo CRM/ERP, I lead international automation projects and sales teams - transforming business bottlenecks into seamless, self-running pipelines. From frontend roots to automation mastery: 100+ workflows designed, multi-shift technical teams coordinated, and enterprise integrations delivered for overseas agencies and decision-makers.",
  experience: [
    {
      role: 'Sales Team Lead - Automation Sales',
      company: 'SMT (Betopia Group)',
      period: 'Jan 2024 - Present',
      bullets: [
        'Leading automation sales & operations for international clients across time zones',
        'Architecting n8n / Zapier / Odoo CRM/ERP workflow automations end to end',
        'Coordinating multi-shift technical teams with unified handoff systems',
        'Managing the full client lifecycle - discovery, delivery, retention (98%)',
      ],
    },
    {
      role: 'Junior Web Developer',
      company: 'EduportalBD',
      period: 'Jun 2023 - Dec 2023',
      bullets: [
        'Built and maintained front-end systems with Tailwind CSS',
        'Shipped high-performance, mobile-responsive landing pages',
        'Optimized load times and accessibility across the platform',
      ],
    },
    {
      role: 'Web Developer / Data Collector',
      company: 'Theinfoport.com',
      period: '2022 - 2023',
      bullets: [
        'Designed front-end solutions for educational content platforms',
        'Managed data collection pipelines and content curation',
      ],
    },
    {
      role: 'Data Entry Officer',
      company: 'Hiver.Digital',
      period: '2020 - 2022',
      bullets: [
        'Maintained data accuracy and integrity across digital tools at scale',
      ],
    },
  ],
  projects: [
    {
      name: 'International Sales Pipeline Automation',
      detail: 'n8n webhook listener > lead scoring > Odoo CRM auto-assignment > Slack alerts > automated follow-ups. Reduced lead response time by 85%.',
    },
    {
      name: 'Multi-Shift Team Coordination System',
      detail: 'Laravel dashboard + real-time Trello sync + n8n handoff reports + MySQL tracking. Eliminated 95% of task duplication across 3 shifts.',
    },
    {
      name: 'E-Commerce Order Processing Pipeline',
      detail: 'Shopify webhooks > n8n orchestration > Odoo ERP inventory > automated invoicing and shipping. 92% faster order fulfillment.',
    },
  ],
  skills: [
    { category: 'Automation', items: 'n8n, Zapier, Make.com, Odoo CRM/ERP, AI Orchestration, Webhook Design, API Integration' },
    { category: 'Development', items: 'HTML5, CSS3, JavaScript, Tailwind CSS, PHP, Laravel, MySQL, Responsive Web Design' },
    { category: 'Leadership', items: 'Sales Team Management, Multi-Shift Coordination, International Client Relations, Project Management' },
    { category: 'Tools', items: 'Git, GitHub, Trello, Netlify, Figma, Notion, Slack' },
  ],
  certifications: [
    'Web Development with PHP, Laravel & Vue.js - BITM (Nov 2024)',
    'IT & Web Operations Specialist, Level 3 - NSDA (Oct 2024)',
  ],
  education: [
    'Diploma in Computer Technology - Dhaka Polytechnic Institute (2021 - 2024, GPA 3.0)',
  ],
  languages: 'Bengali (Native) · English (Professional)',
}

// ---------- layout ----------
const pages = []
let page = null
let y = 0

function newPage() {
  page = new Page()
  pages.push(page)
  y = PH - M
  // header band on every page
  page.rect(0, PH - 26, PW, 26, INK)
  page.rect(0, PH - 28, PW, 2, AMBER)
  page.text(M, PH - 18, 'KAIF HOSSAIN', { size: 9, font: 'F2', color: AMBER })
  page.text(PW - M - 90, PH - 18, 'Automation Architect', { size: 8, font: 'F3', color: [0.75, 0.75, 0.75] })
  y = PH - 46
}

function ensure(h) {
  if (y - h < M + 10) newPage()
}

function sectionHeading(title) {
  ensure(34)
  y -= 6
  page.text(M, y, title.toUpperCase(), { size: 11, font: 'F2', color: AMBER })
  page.rect(M, y - 5, CW, 1.2, CRIMSON)
  y -= 18
}

function para(str, { size = 9.5, color = DARK, leading = 13.5, indent = 0, font = 'F1' } = {}) {
  for (const line of wrap(str, size, CW - indent)) {
    ensure(leading)
    page.text(M + indent, y, line, { size, color, font })
    y -= leading
  }
}

function bullet(str, { size = 9.5, leading = 13 } = {}) {
  const lines = wrap(str, size, CW - 14)
  lines.forEach((line, i) => {
    ensure(leading)
    if (i === 0) page.text(M + 2, y, '·', { size, font: 'F2', color: CRIMSON })
    page.text(M + 12, y, line, { size, color: DARK })
    y -= leading
  })
}

// ----- page 1: hero header -----
newPage()
// big hero header (replaces the slim band drawn by newPage)
page.rect(0, PH - 132, PW, 132, INK)
page.rect(0, PH - 138, PW, 6, AMBER)
page.text(M, PH - 52, doc.header.name, { size: 26, font: 'F2', color: AMBER })
page.text(M, PH - 70, doc.header.title, { size: 12, font: 'F2', color: WHITE })
page.text(M, PH - 86, doc.header.tagline, { size: 8.5, font: 'F3', color: [0.72, 0.72, 0.72] })
doc.header.contact.forEach((line, i) => {
  page.text(M, PH - 102 - i * 11, line, { size: 8, color: [0.62, 0.62, 0.62] })
})
page.rect(M, PH - 140, 3.5, 3.5, CRIMSON)
y = PH - 158

// summary
sectionHeading('Professional Summary')
para(doc.summary)

// experience
sectionHeading('Experience')
for (const job of doc.experience) {
  ensure(30)
  const roleW = textW(job.role, 10.5)
  const periodW = textW(job.period, 8.5)
  page.text(M, y, job.role, { size: 10.5, font: 'F2', color: DARK })
  if (M + roleW + 8 + periodW < PW - M) {
    page.text(PW - M - periodW, y + 1, job.period, { size: 8.5, font: 'F1', color: LIGHT })
  }
  y -= 13
  page.text(M, y, `${job.company}`, { size: 9, font: 'F3', color: CRIMSON })
  y -= 14
  for (const b of job.bullets) bullet(b)
  y -= 5
}

// projects
sectionHeading('Key Projects')
for (const p of doc.projects) {
  ensure(28)
  page.text(M, y, p.name, { size: 10, font: 'F2', color: DARK })
  y -= 13
  para(p.detail, { size: 9, color: GRAY, leading: 12 })
  y -= 4
}

// skills
sectionHeading('Core Skills')
for (const s of doc.skills) {
  ensure(26)
  page.text(M, y, s.category, { size: 9.5, font: 'F2', color: CRIMSON })
  const catW = textW(s.category, 9.5) + 8
  const lines = wrap(s.items, 9, CW - catW)
  lines.forEach((line, i) => {
    if (i > 0) ensure(12)
    page.text(M + catW, y, line, { size: 9, color: DARK })
    y -= 12
  })
  y -= 3
}

// certifications & education
sectionHeading('Certifications & Education')
for (const c of doc.certifications) bullet(c)
for (const e of doc.education) bullet(e)

sectionHeading('Languages')
para(doc.languages)

// footer on last page
ensure(24)
y = M + 8
page.line(M, y + 10, PW - M, y + 10, [0.85, 0.85, 0.85], 0.6)
page.text(M, y, 'Kaif Hossain - Automation Architect & Sales Leader', { size: 7.5, color: LIGHT })
const gen = new Date().toISOString().slice(0, 10)
const stamped = `Updated ${gen}`
page.text(PW - M - textW(stamped, 7.5), y, stamped, { size: 7.5, color: LIGHT })

// ---------- PDF assembly ----------
const contents = pages.map((p) => p.build())
const nPages = contents.length

// object numbering: 1 catalog, 2 pages, 3-5 fonts, then per page: page obj + content obj
const fontObjs = [
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>',
]
const firstPageObj = 6
const kids = Array.from({ length: nPages }, (_, i) => `${firstPageObj + i * 2} 0 R`).join(' ')

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  `<< /Type /Pages /Kids [${kids}] /Count ${nPages} >>`,
  ...fontObjs,
]
contents.forEach((c, i) => {
  const pageObjNum = firstPageObj + i * 2
  const contentObjNum = pageObjNum + 1
  objects.push(
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PW} ${PH}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents ${contentObjNum} 0 R >>`,
  )
  objects.push(`<< /Length ${Buffer.byteLength(c, 'latin1')} >>\nstream\n${c}\nendstream`)
})

let pdf = '%PDF-1.4\n'
const offsets = []
objects.forEach((body, i) => {
  offsets.push(Buffer.byteLength(pdf, 'latin1'))
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`
})
const xrefStart = Buffer.byteLength(pdf, 'latin1')
pdf += `xref\n0 ${objects.length + 1}\n`
pdf += '0000000000 65535 f \n'
for (const off of offsets) {
  pdf += `${String(off).padStart(10, '0')} 00000 n \n`
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, Buffer.from(pdf, 'latin1'))
console.log(`✓ CV PDF generated: ${OUT} (${nPages} page${nPages > 1 ? 's' : ''}, ${Buffer.byteLength(pdf, 'latin1')} bytes)`)
