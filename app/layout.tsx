import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Archit Bhullar',
  description:
    'Software Engineering student at Deakin University. Building AI tools, full-stack systems, and automation software. Open to internships.',
  keywords: [
    'Archit Bhullar',
    'Software Engineering',
    'AI Engineering',
    'Full Stack Developer',
    'Deakin University',
    'Melbourne',
    'Internship',
    'React',
    'TypeScript',
    'Python',
  ],
  authors: [{ name: 'Archit Bhullar' }],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    title: 'Archit Bhullar — Software Engineering Student',
    description:
      'Building AI tools, full-stack systems, and automation software. Open to internships.',
    siteName: 'Archit Bhullar',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="h-full overflow-hidden bg-[#0d0d10] text-zinc-200 antialiased">
        {children}
      </body>
    </html>
  )
}
