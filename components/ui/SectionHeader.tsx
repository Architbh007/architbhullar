import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  index: string
  label: string
  title: string
  description?: string
  className?: string
  centered?: boolean
}

export function SectionHeader({
  index,
  label,
  title,
  description,
  className,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      <div className={cn('flex items-center gap-3 mb-4', centered && 'justify-center')}>
        <span className="font-mono text-xs text-zinc-600 tracking-widest">{index}</span>
        <div className="h-px w-8 bg-zinc-700" />
        <span className="font-mono text-xs text-violet-400 tracking-wider uppercase">
          {label}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-50 tracking-tight">{title}</h2>
      {description && (
        <p className="mt-4 text-zinc-400 text-lg max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
