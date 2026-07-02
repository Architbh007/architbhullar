export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#0d0d10', color: '#e2e2e8', fontFamily: 'system-ui, sans-serif', fontSize: '14px', margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
