'use client'

import { useState } from 'react'
import { SITE } from '@/lib/site-data'
import { cn } from '@/lib/utils'

interface DownloadCVButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  className?: string
}

/**
 * Reliable CV download: real static PDF served from /public,
 * downloaded via anchor[download] — works on every browser,
 * no print dialog required.
 */
export function DownloadCVButton({
  variant = 'secondary',
  size = 'md',
  label = 'Download CV',
  className,
}: DownloadCVButtonProps) {
  const [state, setState] = useState<'idle' | 'done'>('idle')

  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'text-muted hover:text-accent-soft font-mono text-sm uppercase tracking-widest transition-colors',
  }[variant]

  const sizeClass = {
    sm: 'px-4 py-2 text-xs',
    md: '',
    lg: 'px-8 py-4 text-base',
  }[size]

  return (
    <a
      href={SITE.cvPath}
      download="Kaif-Hossain-CV.pdf"
      onClick={() => {
        setState('done')
        setTimeout(() => setState('idle'), 2500)
      }}
      className={cn(
        'inline-flex items-center justify-center gap-2 select-none',
        variantClass,
        sizeClass,
        className
      )}
      aria-label="Download Kaif Hossain's CV as PDF"
    >
      <span aria-hidden="true">{state === 'done' ? '✓' : '↓'}</span>      <span>{state === 'done' ? 'Downloading…' : label}</span>
    </a>
  )
}
