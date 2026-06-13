'use client'

import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCarrito } from '../contexto/CarritoContext'
import { LogoFocus } from './LogoFocus'

const enlaces = [
  { href: '#tienda', etiqueta: 'CATÁLOGO' },
  { href: '#como-comprar', etiqueta: 'CÓMO COMPRAR' },
  { href: '#drops', etiqueta: 'DROPS' },
  { href: '#contacto', etiqueta: 'CONTACTO' },
]

export function Nav() {
  const { totalItems, abrirCarrito } = useCarrito()
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const manejarScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', manejarScroll, { passive: true })
    return () => window.removeEventListener('scroll', manejarScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuAbierto ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuAbierto])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--fondo)]/95 backdrop-blur-sm border-b border-[var(--linea)]'
            : 'bg-[var(--fondo)] border-b border-[var(--linea)]'
        }`}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
          aria-label="Navegación principal"
        >
          {/* Logo */}
          <a
            href="#"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--texto)] rounded-sm"
            aria-label="FOCUS — ir al inicio"
          >
            <LogoFocus height={26} />
          </a>

          {/* Links desktop */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {enlaces.map((enlace) => (
              <li key={enlace.href}>
                <a
                  href={enlace.href}
                  className="font-mono text-[10px] tracking-[0.15em] text-[var(--secundario)] hover:text-[var(--texto)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--texto)] rounded-sm"
                >
                  {enlace.etiqueta}
                </a>
              </li>
            ))}
          </ul>

          {/* Acciones derecha */}
          <div className="flex items-center gap-4">
            {/* Carrito */}
            <button
              onClick={abrirCarrito}
              className="relative flex items-center gap-2 border border-[var(--linea)] px-4 py-2 hover:border-[var(--texto)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--texto)] rounded-sm"
              aria-label={`Carrito${totalItems > 0 ? `, ${totalItems} items` : ' vacío'}`}
            >
              <ShoppingBag size={15} strokeWidth={1.5} className="text-[var(--texto)]" />
              <span className="font-mono text-[10px] tracking-[0.1em] text-[var(--texto)] hidden sm:inline">
                CARRITO
              </span>
              {totalItems > 0 && (
                <span
                  className="w-4 h-4 bg-[var(--texto)] text-[var(--fondo)] font-mono text-[8px] rounded-full flex items-center justify-center leading-none"
                  aria-hidden="true"
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Hamburguesa mobile */}
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="md:hidden p-2 text-[var(--texto)] hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--texto)] rounded-sm"
              aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuAbierto}
            >
              {menuAbierto ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Menú mobile */}
      {menuAbierto && (
        <div
          className="fixed inset-0 z-40 bg-[var(--fondo)] flex flex-col pt-20 px-6 md:hidden border-t border-[var(--linea)]"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <ul className="flex flex-col" role="list">
            {enlaces.map((enlace, i) => (
              <li key={enlace.href} className={i > 0 ? 'border-t border-[var(--linea)]' : ''}>
                <a
                  href={enlace.href}
                  onClick={() => setMenuAbierto(false)}
                  className="block font-black text-[clamp(2rem,8vw,3.5rem)] text-[var(--texto)] py-5 hover:opacity-50 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--texto)] rounded-sm"
                >
                  {enlace.etiqueta}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto pb-10 border-t border-[var(--linea)] pt-6">
            <p className="font-mono text-[9px] tracking-[0.2em] text-[var(--secundario)]">
              FOCUS · ESTD 2025 · MONTEVIDEO
            </p>
          </div>
        </div>
      )}
    </>
  )
}
