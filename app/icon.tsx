import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#0d0d10',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
        }}
      >
        <span
          style={{
            color: '#a78bfa',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '-0.5px',
          }}
        >
          AB
        </span>
      </div>
    ),
    { ...size }
  )
}
