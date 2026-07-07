'use client'

import dynamic from 'next/dynamic'

const Lanyard = dynamic(() => import('./Lanyard'), { ssr: false })

interface LanyardCardProps {
  frontImage?: string | null
}

export function LanyardCard({ frontImage }: LanyardCardProps) {
  return (
    <div style={{ width: '260px', height: '340px' }} className="flex-shrink-0 -my-8">
      <Lanyard frontImage={frontImage ?? null} />
    </div>
  )
}
