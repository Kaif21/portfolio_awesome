# Kaif Hossain — Portfolio

Simple, reliable, professional portfolio built with **HTML + Tailwind CSS + vanilla JavaScript**.
No framework, no build server — it is a static site you can host anywhere (Netlify, Vercel,
GitHub Pages, or any web server).

## Structure

```
index.html          — the entire site (all sections & content)
css/input.css       — Tailwind source (design tokens, components, reveal animation)
css/tailwind.css    — compiled stylesheet (generated, committed)
js/main.js          — small vanilla JS: scroll reveal, mobile menu, project filters, contact form
assets/             — headshot.jpg, kaif-hossain-cv.pdf
legacy-next/        — archived old Next.js version (safe to delete)
```

## Fonts

- **Libre Baskerville** — display / headings
- **Roboto** — body

Loaded from Google Fonts with system fallbacks.

## Commands

```bash
npm run build:css   # rebuild css/tailwind.css after editing index.html or css/input.css
npm run watch:css   # rebuild automatically while you edit
npm run dev         # serve locally (http://localhost:3000)
```

Or just open `index.html` directly in a browser — everything works from the file system too.

## Editing content

All text lives directly in `index.html` — projects, experience, certifications, contact info.
After changing classes (not just text), run `npm run build:css` so Tailwind picks up new classes.

## Design

- Palette: mist `#F2F3EF` background, ink `#101110` text, lime `#C8F14D` accent, hairline `#E3E5DE` borders
- Interactions kept intentionally subtle: fade-up reveal on scroll, hover underlines, quiet filters
- `prefers-reduced-motion` is respected — all animation is disabled for users who opt out
