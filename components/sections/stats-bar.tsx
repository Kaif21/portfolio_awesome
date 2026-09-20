'use client'

import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import { STATS } from '@/lib/site-data'

export function StatsBar() {
  const root = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || !root.current) return

    // Anime.js staggered entrance + counter animation
    anime({
      targets: root.current.querySelectorAll('.stat-cell'),
      opacity: [0, 1],
      translateY: [24, 0],
      delay: anime.stagger(90),
      duration: 700,
      easing: 'easeOutCubic',
    })

    root.current.querySelectorAll<HTMLElement>('.stat-value').forEach((el, i) => {
      const target = STATS[i].value
      const obj = { v: 0 }
      anime({
        targets: obj,
        v: target,
        duration: 1600,
        delay: 200 + i * 120,
        easing: 'easeOutExpo',
        update: () => {
          el.textContent = `${Math.round(obj.v)}${STATS[i].suffix}`
        },
      })
    })
  }, [visible])

  return (
    <div ref={root} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {STATS.map((stat) => (
        <div key={stat.label} className="stat-cell glass rounded-lg p-4 text-center">
          {/* Animated number is hidden from AT; the static value below is authoritative */}
          <div className="stat-value text-3xl md:text-4xl font-bold font-mono text-gradient" aria-hidden="true">
            {stat.value}
            {stat.suffix}
          </div>
          <div className="mt-1 text-[11px] font-mono uppercase tracking-widest text-muted">
            {stat.label}
          </div>
          <span className="sr-only">
            {stat.label}: {stat.value}
            {stat.suffix}
          </span>
        </div>
      ))}
    </div>
  )
}
