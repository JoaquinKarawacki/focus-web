import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ProveedorCarrito } from './contexto/CarritoContext'

export const metadata: Metadata = {
  title: 'FOCUS — Streetwear · Montevideo',
  description:
    'Selección exclusiva de streetwear premium. Stock limitado. Envíos a todo Uruguay. ESTD 2025.',
  keywords: ['streetwear', 'ropa', 'Uruguay', 'Montevideo', 'ropa premium', 'drops'],
  authors: [{ name: 'FOCUS' }],
  openGraph: {
    title: 'FOCUS — Streetwear · Montevideo',
    description: 'Selección exclusiva de streetwear premium. ESTD 2025.',
    type: 'website',
    locale: 'es_UY',
    siteName: 'FOCUS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FOCUS — Streetwear · Montevideo',
    description: 'Selección exclusiva de streetwear premium. ESTD 2025.',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
}

export default function LayoutRaiz({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full bg-[var(--fondo)] text-[var(--texto)] antialiased">
        <ProveedorCarrito>{children}</ProveedorCarrito>
      </body>
    </html>
  )
}
