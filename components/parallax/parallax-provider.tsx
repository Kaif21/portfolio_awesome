'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * ── Site-wide Z-axis 3D parallax engine ────────────────────────────
 * Pure vanilla JS — zero dependencies, no scroll-hijacking.
 *
 * Architecture:
 *   .parallax-stage  (perspective: 1000px — toggled by the engine)
 *     └─ .tilt-scope (preserve-3d, receives subtle cursor tilt)
 *         └─ section.depth-section  (preserve-3d, no overflow clipping)
 *             ├─ layer[data-depth="-50"]   background: shifts back, fades
 *             ├─ layer[data-depth="0"]     midground: normal flow
 *             └─ layer[data-depth="60"]    foreground: pops forward
 *
 * Performance contract:
 *   • one passive scroll listener + ONE requestAnimationFrame loop
 *   • writes only compositor-friendly props (transform3d / opacity)
 *   • section geometry cached; re-measured on resize (ResizeObserver)
 *   • IntersectionObserver activates layers only near the viewport
 *   • layers get will-change only while their section is on screen
 *
 * Graceful degradation — the whole system is OFF when any of:
 *   • viewport < 1024px wide (phones/tablets)
 *   • no hover / no fine pointer (touch devices)
 *   • prefers-reduced-motion: reduce
 * Offline, the page renders as a perfectly normal flat layout.
 * ────────────────────────────────────────────────────────────────────
 */

const PERSPECTIVE = 1000
const TILT_MAX_DEG = 1.2
const TILT_LERP = 0.08

interface Layer {
  el: HTMLElement
  depth: number
  drift: number
  fade: boolean
  section: HTMLElement
  active: boolean
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const layerScale = (depth: number) => (depth < 0 ? (PERSPECTIVE - depth) / PERSPECTIVE : 1)
const baseTransform = (depth: number) => `translate3d(0,0,${depth}px)`

export function ParallaxProvider({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const tilt = tiltRef.current
    if (!stage || !tilt) return

    const fineDesktop = window.matchMedia(
      '(min-width: 1024px) and (hover: hover) and (pointer: fine)'
    )
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let raf = 0
    let enabled = false
    let layers: Layer[] = []
    let observer: IntersectionObserver | null = null
    let ro: ResizeObserver | null = null
    const meta = new WeakMap<HTMLElement, { top: number; height: number }>()

    let tiltX = 0
    let tiltY = 0
    let targetX = 0
    let targetY = 0

    const capable = () => fineDesktop.matches && !reduceMotion.matches
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    /* ── measurement (reads batched here, never inside frame writes) ── */
    const measure = () => {
      const seen = new Set<HTMLElement>()
      for (const l of layers) {
        if (seen.has(l.section)) continue
        seen.add(l.section)
        const rect = l.section.getBoundingClientRect()
        meta.set(l.section, { top: rect.top + window.scrollY, height: rect.height })
      }
    }

    /* ── the single rAF tick: batched transform/opacity writes ── */
    const frame = () => {
      raf = 0
      const vh = window.innerHeight
      const scrollY = window.scrollY

      for (const l of layers) {
        if (!l.active) continue
        const m = meta.get(l.section)
        if (!m) continue
        // 0 → section entering bottom, 1 → leaving top
        const p = clamp01((scrollY + vh - m.top) / (vh + m.height))
        const y = (0.5 - p) * l.drift
        l.el.style.transform = `translate3d(0, ${y.toFixed(2)}px, ${l.depth}px) scale(${layerScale(l.depth).toFixed(4)})`
        if (l.fade) {
          const edge = clamp01(Math.min(p, 1 - p) / 0.18)
          l.el.style.opacity = (0.3 + 0.7 * edge).toFixed(3)
        }
      }

      /* cursor tilt — lerped, pivoting around the live viewport centre
         so a tall page never swings wildly around its document centre */
      const dx = targetX - tiltX
      const dy = targetY - tiltY
      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        tiltX += dx * TILT_LERP
        tiltY += dy * TILT_LERP
        schedule()
      } else {
        tiltX = targetX
        tiltY = targetY
      }

      if (tiltX !== 0 || tiltY !== 0) {
        tilt.style.transformOrigin = `50% ${(scrollY + vh / 2).toFixed(0)}px`
        tilt.style.transform = `rotateX(${tiltY.toFixed(3)}deg) rotateY(${tiltX.toFixed(3)}deg)`
      } else {
        tilt.style.transform = ''
        tilt.style.transformOrigin = ''
      }
    }

    /* ── input listeners (passive / no layout reads) ── */
    const onScroll = () => schedule()
    const onResize = () => {
      measure()
      schedule()
    }
    const onPointerMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      targetX = nx * 2 * TILT_MAX_DEG
      targetY = -ny * 2 * TILT_MAX_DEG
      schedule()
    }
    const onLoad = () => {
      measure()
      schedule()
    }

    const stop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      observer?.disconnect()
      observer = null
      ro?.disconnect()
      ro = null
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('load', onLoad)
      stage.classList.remove('parallax-stage')
      tilt.style.transform = ''
      tilt.style.transformOrigin = ''
      for (const l of layers) {
        l.el.style.transform = ''
        l.el.style.opacity = ''
        l.el.style.willChange = ''
        l.active = false
      }
      layers = []
      targetX = targetY = tiltX = tiltY = 0
      enabled = false
    }

    const start = () => {
      enabled = true

      const nodes = Array.from(stage.querySelectorAll<HTMLElement>('[data-depth]'))
      layers = nodes
        .map((el) => {
          const parsedDepth = parseFloat(el.dataset.depth ?? '0')
          const depth = Number.isFinite(parsedDepth)
            ? Math.max(-300, Math.min(300, parsedDepth))
            : 0
          const section = el.closest<HTMLElement>('[data-parallax-section]') ?? el
          const fade = el.dataset.parallaxFade === 'true'
          const parsedDrift = parseFloat(el.dataset.parallaxDrift ?? '')
          const drift = Number.isFinite(parsedDrift)
            ? parsedDrift
            : Math.max(-90, Math.min(90, depth * -0.8))
          return { el, depth, drift, fade, section, active: false } as Layer
        })
        .filter((l) => l.el !== l.section)

      if (layers.length === 0) {
        enabled = false
        return
      }

      stage.classList.add('parallax-stage')

      /* activate layers only while their section is near the viewport */
      const sections = Array.from(new Set(layers.map((l) => l.section)))
      const sectionLayers = new Map<HTMLElement, Layer[]>(
        sections.map((s) => [s, layers.filter((l) => l.section === s)])
      )
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const ls = sectionLayers.get(entry.target as HTMLElement)
            if (!ls) continue
            for (const l of ls) {
              l.active = entry.isIntersecting
              if (entry.isIntersecting) {
                l.el.style.willChange = 'transform'
              } else {
                l.el.style.willChange = ''
                l.el.style.transform = baseTransform(l.depth)
                l.el.style.opacity = ''
              }
            }
          }
          schedule()
        },
        { rootMargin: '20% 0px 20% 0px' }
      )
      sections.forEach((s) => observer?.observe(s))

      ro = new ResizeObserver(() => {
        measure()
        schedule()
      })
      sections.forEach((s) => ro?.observe(s))

      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize)
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('load', onLoad)

      measure()
      frame() // paint first frame immediately
    }

    const onMediaChange = () => {
      if (capable() && !enabled) start()
      else if (!capable() && enabled) stop()
    }

    if (capable()) start()
    fineDesktop.addEventListener('change', onMediaChange)
    reduceMotion.addEventListener('change', onMediaChange)

    return () => {
      stop()
      fineDesktop.removeEventListener('change', onMediaChange)
      reduceMotion.removeEventListener('change', onMediaChange)
    }
  }, [])

  return (
    <div ref={stageRef} className="relative">
      <div ref={tiltRef} className="tilt-scope">
        {children}
      </div>
    </div>
  )
}
