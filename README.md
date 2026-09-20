# KAIF21 — 3D Automation Architect Portfolio & Admin Panel

High-performance portfolio for **Kaif Hossain** — Automation Architect & Sales Leader (Dhaka, BD).
Interactive 3D node network, case-study matrix, career timeline, and a lightweight admin CMS.

## Theme

| Token | Value | Usage |
|---|---|---|
| Background | `#1B1B1B` | Deep black canvas |
| Primary | `#F8B400` | Vibrant yellow — CTAs, highlights, metrics |
| Secondary | `#E63946` | Rich red — badges, glows, accents |
| Accent | `#FFFFFF` | White — typography |

Typography: **Bebas Neue** (display) · **Plus Jakarta Sans** (body) · **JetBrains Mono** (metrics/badges).

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — glassmorphic dark theme
- **React Three Fiber + drei** — interactive 3D automation node network (lazy-loaded, desktop-only for 60 FPS)
- **Anime.js** — stat counters & staggered micro-interactions
- **Framer Motion** — section reveals, modals, layout transitions

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

### Environment

Create `.env.local`:

```
ADMIN_PASSWORD=your_passcode_here
```

### Admin Panel

- `/admin` — dashboard (passcode-gated, cookie session)
- `/admin/projects/new` — create case studies
- `/admin/projects/[id]/edit` — edit
- `/api/projects` — full CRUD (in-memory store seeded from `data/projects.ts`; swap for Supabase in production)
- `/api/admin/auth` — login / session check / logout

### CV Download

The **Download CV** button serves a real PDF (`public/kaif-hossain-cv.pdf`) via anchor download —
no print dialog, works on every browser.

Regenerate the PDF after editing CV content:

```bash
npm run generate:cv   # runs scripts/generate-cv-pdf.mjs (zero dependencies)
```

CV content lives inside `scripts/generate-cv-pdf.mjs`; site copy lives in `lib/site-data.ts`.

## Project Structure

```
app/
  (public)/           # Public site (single page, anchor navigation)
    layout.tsx        # Navbar + Footer
    page.tsx          # Hero → About → Services → Projects → Timeline → Certs → Garage → Contact
  admin/              # Passcode-gated CMS
  api/
    projects/         # CRUD for case studies
    admin/auth/       # Login/logout/session
components/
  3d/                 # R3F automation node network
  cv/                 # DownloadCVButton (real PDF download)
  layout/             # Navbar, Footer
  sections/           # Hero, About, Services, ProjectsMatrix, Timeline, Certifications, Garage, Contact
  admin/              # Sidebar, ProjectForm, ProjectList
  ui/                 # Button, Card, Badge, Input primitives
data/projects.ts      # Seed case studies (Problem → Solution → Impact format)
lib/
  site-data.ts        # Single source of truth for site content
  constants.ts        # Experience timeline, tools, service options
scripts/generate-cv-pdf.mjs  # Hand-rolled PDF generator (no deps)
```

## Deployment

```bash
npm run build && npm start
```

Deploy to Vercel/Netlify as a standard Next.js app.
