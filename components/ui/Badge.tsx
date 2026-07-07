import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'success' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-colors',
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-2.5 py-1 text-xs',
        variant === 'default' && 'bg-white/[0.06] text-zinc-300 border border-white/[0.08]',
        variant === 'accent' && 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
        variant === 'success' && 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        variant === 'outline' && 'border border-white/[0.1] text-zinc-300',
        className
      )}
    >
      {children}
    </span>
  )
}
