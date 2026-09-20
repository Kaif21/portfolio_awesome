# UI/UX Cosmetic Audit — kaif-portfolio

Audited: all public sections (`Hero`, `About`, `Services`, `ProjectsMatrix`, `Timeline`,
`Certifications`, `Garage`, `ContactForm`), layout (`Navbar`, `Footer`), theme system
(`tailwind.config.ts`, `globals.css`), 3D scene, and `WorkflowDiagramModal`.

Severity legend: 🔴 must fix · 🟠 should fix · 🟡 polish

---

## A. Neon blur & glow (user request: remove entirely)

| # | Sev | Location | Issue |
|---|-----|----------|-------|
| A1 | 🔴 | `globals.css` `.neon-glow*` | 24px colored box-shadow halos on cards/badges |
| A2 | 🔴 | `tailwind.config.ts` | `glow-amber` / `glow-crimson` pulsing keyframes + 4 glow shadows (`amber-glow`, `amber-glow-lg`, `crimson-glow*`) wired into buttons, cards, filter pills |
| A3 | 🔴 | `hero.tsx` | Two giant blurred orbs (`blur-[120px]`, `blur-[110px]`) — expensive full-viewport GPU blur + the exact neon look being removed |
| A4 | 🔴 | `.glass-panel` (`backdrop-blur-xl`) | Dozens of stacked backdrop blurs → scroll jank on mobile Safari; `backdrop-filter` also flattens nested 3D transforms (would break the new parallax) |
| A5 | 🟠 | navbar / modal overlays | `backdrop-blur-md`/`xl` overlays — replace with high-opacity tint |

## B. Layout bugs (mobile)

| # | Sev | Location | Issue |
|---|-----|----------|-------|
| B1 | 🔴 | `services.tsx`, `projects-matrix.tsx` | Ghost headings `text-[9rem]` ("STACK", "BUILDS") with **no `overflow-hidden`** on the section → horizontal page shift on phones (About/Contact have it; these don't) |
| B2 | 🟠 | `navbar.tsx` | Desktop menu appears at `md` (768px) with 6 links + CV button → cramped/overflowing row at 768–860px |
| B3 | 🟠 | `projects-matrix.tsx` | Skeleton fixed `h-[480px]` vs variable card heights → layout jump when projects load |
| B4 | 🟡 | mobile drawer | No `env(safe-area-inset-*)` padding → content under iPhone home indicator |
| B5 | 🟡 | filter pills | Wrapped multi-row pills push grid far down on mobile; horizontal snap-scroll strip is better |

## C. Accessibility

| # | Sev | Location | Issue |
|---|-----|----------|-------|
| C1 | 🔴 | theme | `faint #6E6E6E` on `#1B1B1B` ≈ 3.5:1 — fails WCAG AA for text (years, footer links, placeholders, labels) |
| C2 | 🔴 | global | No `:focus-visible` styles; keyboard focus invisible/inconsistent on hamburger, ✕ buttons, pills, links |
| C3 | 🔴 | mobile drawer | No Escape-to-close, no focus trap, hamburger missing `aria-expanded` / `aria-controls` |
| C4 | 🟠 | modal | `role="dialog"` present but no focus management; background stays in tab order |
| C5 | 🟠 | sitewide | Emoji icons (⚡🤖🌐📊🎯🔗💻🛡️🎓🚗) and arrows (→ ⟐ ↗ ↓) read literally by screen readers — need `aria-hidden` |
| C6 | 🟠 | `contact-form.tsx` | Success/error status not in an `aria-live` region |
| C7 | 🟠 | global | No `prefers-reduced-motion` handling despite pulse/float/blink/glow animations |
| C8 | 🟡 | `stats-bar.tsx` | Cells start `opacity-0` — with JS off/blocked, stats remain invisible (no static fallback) |
| C9 | 🟡 | `app/layout.tsx` | `scroll-smooth` applied unconditionally (should be gated by reduced-motion) |
| C10 | 🟡 | buttons | Several 10–11px mono badges/pills below comfortable tap size (<44px) |

## D. Palette drift (hardcoded old colors)

| # | Sev | Location | Issue |
|---|-----|----------|-------|
| D1 | 🔴 | `tailwind.config.ts`, `globals.css` | Entire amber/crimson/ink palette replaced by new spec — all aliases must remap |
| D2 | 🔴 | `workflow-diagram-modal.tsx` | `NODE_COLORS = ['#F8B400', '#E63946', …]` hardcoded |
| D3 | 🔴 | `automation-network.tsx` | `AMBER`/`CRIMSON` constants + emissive materials (neon look, intensity up to 2.2) |
| D4 | 🟠 | `globals.css` | Scrollbar, `::selection`, `.text-outline` stroke, `bg-grid-ink` all amber |
| D5 | 🟠 | `garage.tsx` | Crimson grid background + crimson pill styling |

## E. Other cosmetic issues

| # | Sev | Location | Issue |
|---|-----|----------|-------|
| E1 | 🟠 | `providers.tsx` | Entire app wrapped in client `AnimatePresence` — pointless client boundary |
| E2 | 🟠 | `globals.css` | Google Fonts via render-blocking CSS `@import` (FOUT) — use `next/font` |
| E3 | 🟡 | `hero.tsx` | "INITIALIZING NODES…" blinks forever if WebGL is blocked — no error state |
| E4 | 🟡 | ghost headings | `.text-outline` at 0.16 alpha barely visible — rework as depth-layer background |
| E5 | 🟡 | `app/layout.tsx` | Viewport meta lacks `viewport-fit=cover` |

---

## Remediation implemented

1. **New palette** (`#0A0D14` base, `#141923` surfaces, `#FF5A1F` / `#FF8A5B` accents,
   `#F8FAFC` text, `#94A3B8` muted) applied centrally — every amber/crimson reference remapped.
2. **Zero neon**: all glow classes, keyframes, blur orbs and heavy backdrop blurs removed.
   New accessible glass: semi-opaque surface + hairline border + top-edge highlight,
   `@supports` fallback, optional 4px blur on ≥1024px only.
3. **Z-axis 3D parallax** across all sections + footer: perspective 1000px stage,
   bg `translateZ(-50px)` / mid `0` / fg `+50–100px` layers, single rAF loop,
   transform-only writes, IntersectionObserver gating, cursor tilt (fine pointers only),
   full disable on touch/small screens/reduced-motion.
4. **Bento grids** for About and Services; compact bento for Certifications.
5. **Mobile**: ghost-heading overflow fixed, pill snap-scroll, 44px targets, safe-area insets,
   `viewport-fit=cover`, md→lg navbar breakpoint, skeleton heights match content.
6. **A11y**: `:focus-visible` rings, drawer Escape + focus trap + `aria-expanded`,
   `aria-live` form status, decorative glyphs `aria-hidden`, AA-compliant text tokens,
   global `prefers-reduced-motion` kill-switch, static stats fallback.
