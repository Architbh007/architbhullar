import { cn } from '@/lib/utils'

interface TerminalLineProps {
  command: string
  className?: string
}

export function TerminalLine({ command, className }: TerminalLineProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="font-mono text-xs text-violet-500 select-none">{'>'}</span>
      <span className="font-mono text-xs text-zinc-500">{command}</span>
    </div>
  )
}
