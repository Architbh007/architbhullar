import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  external?: boolean
  className?: string
  download?: string
}

export function Button({
  children,
  href,
  onClick,
  variant = 'ghost',
  size = 'md',
  external = false,
  className,
  download,
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer select-none',
    size === 'sm' && 'px-3 py-1.5 text-sm',
    size === 'md' && 'px-4 py-2 text-sm',
    size === 'lg' && 'px-5 py-2.5 text-base',
    variant === 'primary' &&
      'bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30',
    variant === 'ghost' &&
      'bg-white/[0.05] text-zinc-300 hover:bg-white/[0.1] hover:text-zinc-100 border border-white/[0.07] hover:border-white/[0.14]',
    variant === 'outline' &&
      'border border-white/[0.12] text-zinc-300 hover:border-white/[0.25] hover:text-zinc-100',
    className
  )

  if (href) {
    if (external || download) {
      return (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          download={download}
          className={base}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={base}>
      {children}
    </button>
  )
}
