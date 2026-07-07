import type { Metadata } from 'next'
import './journey.css'

export const metadata: Metadata = {
  title: 'The Journey — Archit Bhullar',
  description:
    'Amritsar to Melbourne. One suitcase, 4:30 AM shifts, and the projects built along the way — a cinematic story.',
}

export default function JourneyLayout({ children }: { children: React.ReactNode }) {
  return children
}
