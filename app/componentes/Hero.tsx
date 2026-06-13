'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { IconoInstagram } from './IconoInstagram'

const estadisticas = [
  { valor: '3+', etiqueta: 'MARCAS' },
  { valor: '8', etiqueta: 'PIEZAS EN STOCK' },
  { valor: '100%', etiqueta: 'PREMIUM' },
  { valor: 'UY', etiqueta: 'TODO EL PAÍS' },
]

export function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(id)
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden"
      aria-label="Presentación principal"
    >
      <div className="max-w-7xl mx-auto px-6 w-full py-16 flex flex-col gap-12">

        {/* Eyebrow — tracking amplísimo como la referencia */}
        <div
          className={`transition-all duration-500 ease-out motion-reduce:transition-none ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] text-[var(--secundario)] uppercase">
            — Selección con intención
          </p>
        </div>

        {/* Título monumental */}
        <div
          className={`transition-all duration-600 delay-100 ease-out motion-reduce:transition-none ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1
            className="font-black uppercase leading-[0.88] tracking-[-0.02em] text-[var(--texto)]"
            style={{ fontSize: 'clamp(3.8rem, 11.5vw, 10.5rem)' }}
            aria-label="Ropa importada premium"
          >
            <span className="block">ROPA</span>
            <span className="block text-[var(--secundario)]">IMPORTADA</span>
            <span className="block">PREMIUM
              <span className="text-[var(--secundario)]">.</span>
            </span>
          </h1>
        </div>

        {/* Separador con texto editorial */}
        <div
          className={`border-t border-[var(--linea)] pt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-8 transition-all duration-600 delay-200 ease-out motion-reduce:transition-none ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p
            className="font-mono uppercase text-[var(--secundario)] leading-loose max-w-xs"
            style={{ fontSize: '10px', letterSpacing: '0.22em' }}
          >
            Las mejores marcas.<br />
            Directo a tu puerta.<br />
            Streetwear en Uruguay.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="#tienda"
              className="group inline-flex items-center justify-center gap-3 bg-[var(--texto)] text-[var(--fondo)] px-8 py-4 font-mono text-[10px] tracking-[0.2em] uppercase hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--texto)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--fondo)]"
            >
              Ver catálogo
              <ArrowRight
                size={13}
                className="group-hover:translate-x-1 transition-transform motion-reduce:translate-x-0"
                aria-hidden="true"
              />
            </a>
            <a
              href="https://ig.me/m/focus.uy_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border border-[var(--linea)] text-[var(--texto)] px-8 py-4 font-mono text-[10px] tracking-[0.2em] uppercase hover:border-[var(--texto)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--texto)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--fondo)]"
            >
              <IconoInstagram size={13} aria-hidden={true} />
              Instagram
            </a>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-0 border border-[var(--linea)] transition-all duration-600 delay-300 ease-out motion-reduce:transition-none ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {estadisticas.map(({ valor, etiqueta }, i) => (
            <div
              key={etiqueta}
              className={`px-6 py-5 flex flex-col gap-1 ${
                i < estadisticas.length - 1 ? 'border-r border-[var(--linea)]' : ''
              } ${i >= 2 ? 'border-t border-[var(--linea)] sm:border-t-0' : ''}`}
            >
              <div className="font-black text-[clamp(1.8rem,3vw,2.5rem)] text-[var(--texto)] leading-none">
                {valor}
              </div>
              <div className="font-mono text-[8px] tracking-[0.2em] text-[var(--secundario)]">
                {etiqueta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
