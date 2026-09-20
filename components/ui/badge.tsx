import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'info' | 'danger'
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-white/[0.05] text-ice/70 border-white/10',
      success: 'bg-success/10 text-success border-success/30',
      warning: 'bg-accent/10 text-accent border-accent/30',
      info: 'bg-accent/10 text-accent border-accent/30',
      danger: 'bg-accent-soft/10 text-accent-soft border-accent-soft/30',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'
