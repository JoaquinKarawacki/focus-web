'use client'

import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCarrito } from '../contexto/CarritoContext'
import { formatearPrecio, formatearMensajeCarrito } from '../utiles/formatearPrecio'
import type { ItemCarrito } from '../tipos/carrito'
import { useEffect, useRef } from 'react'

const WHATSAPP_NUMERO = process.env.NEXT_PUBLIC_WHATSAPP ?? '59899000000'

function ItemCarritoFila({ item }: { item: ItemCarrito }) {
  const { quitarDelCarrito, cambiarCantidad } = useCarrito()

  return (
    <div className="flex gap-4 py-5 border-b border-[var(--linea)]">
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[9px] tracking-[0.15em] text-[var(--secundario)] mb-1">
          {item.producto.marca}
        </div>
        <div className="font-black text-sm text-[var(--texto)] leading-tight mb-2">
          {item.producto.nombre}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-[var(--secundario)] border border-[var(--linea)] px-2 py-0.5">
            {item.talleSeleccionado === 'unico' ? 'ÚNICO' : item.talleSeleccionado}
          </span>
          <span className="font-mono text-sm text-[var(--texto)]">
            {formatearPrecio(item.producto.precio)}
          </span>
        </div>
      </div>

      {/* Controles cantidad */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => quitarDelCarrito(item.producto.id, item.talleSeleccionado)}
          className="p-1 text-[var(--secundario)] hover:text-[var(--texto)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--texto)]"
          aria-label={`Quitar ${item.producto.nombre} del carrito`}
        >
          <X size={14} strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-2 border border-[var(--linea)]">
          <button
            onClick={() => cambiarCantidad(item.producto.id, item.talleSeleccionado, item.cantidad - 1)}
            className="p-2 text-[var(--secundario)] hover:text-[var(--texto)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--texto)]"
            aria-label="Reducir cantidad"
          >
            <Minus size={10} strokeWidth={2} />
          </button>
          <span
            className="font-mono text-[11px] w-6 text-center text-[var(--texto)]"
            aria-label={`Cantidad: ${item.cantidad}`}
          >
            {item.cantidad}
          </span>
          <button
            onClick={() => cambiarCantidad(item.producto.id, item.talleSeleccionado, item.cantidad + 1)}
            className="p-2 text-[var(--secundario)] hover:text-[var(--texto)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--texto)]"
            aria-label="Aumentar cantidad"
          >
            <Plus size={10} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}

export function DrawerCarrito() {
  const { estado, cerrarCarrito, totalPrecio, totalItems } = useCarrito()
  const { items, abierto } = estado
  const cerrarRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (abierto) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => cerrarRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [abierto])

  useEffect(() => {
    const manejarEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && abierto) cerrarCarrito()
    }
    document.addEventListener('keydown', manejarEscape)
    return () => document.removeEventListener('keydown', manejarEscape)
  }, [abierto, cerrarCarrito])

  const coordinarPedido = () => {
    const resumen = items.map((item) => ({
      nombre: item.producto.nombre,
      talle: item.talleSeleccionado === 'unico' ? 'Único' : item.talleSeleccionado,
      cantidad: item.cantidad,
      precio: item.producto.precio,
    }))
    const mensaje = formatearMensajeCarrito(resumen, totalPrecio)
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
          abierto ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={cerrarCarrito}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className={`fixed top-0 right-0 bottom-0 z-[60] w-full sm:w-[420px] bg-[var(--fondo)] border-l border-[var(--linea)] flex flex-col transition-transform duration-400 ease-out motion-reduce:transition-none ${
          abierto ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--linea)] shrink-0">
          <div>
            <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--secundario)] mb-1">
              CARRITO
            </div>
            <h2 className="font-black text-xl text-[var(--texto)]">
              Tu bolsa
              <span className="text-[var(--secundario)]">.</span>
            </h2>
          </div>
          <button
            ref={cerrarRef}
            onClick={cerrarCarrito}
            className="p-2 text-[var(--secundario)] hover:text-[var(--texto)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--texto)] rounded-sm"
            aria-label="Cerrar carrito"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center py-16">
              <ShoppingBag
                size={40}
                strokeWidth={1}
                className="text-[var(--linea)]"
                aria-hidden="true"
              />
              <div>
                <p className="font-black text-xl text-[var(--texto)] mb-2">Bolsa vacía.</p>
                <p className="text-[var(--secundario)] text-sm leading-relaxed max-w-[220px]">
                  La buena ropa no espera.
                </p>
              </div>
              <button
                onClick={cerrarCarrito}
                className="font-mono text-[10px] tracking-[0.15em] border border-[var(--linea)] px-6 py-3 text-[var(--texto)] hover:bg-[var(--superficie)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--texto)]"
              >
                VER LA GRILLA
              </button>
            </div>
          ) : (
            <div aria-label={`${totalItems} ${totalItems === 1 ? 'item' : 'items'} en el carrito`}>
              {items.map((item) => (
                <ItemCarritoFila
                  key={`${item.producto.id}-${item.talleSeleccionado}`}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer con total y CTA */}
        {items.length > 0 && (
          <div className="shrink-0 px-6 py-6 border-t border-[var(--linea)]">
            {/* Desglose */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] tracking-[0.1em] text-[var(--secundario)]">
                  SUBTOTAL
                </span>
                <span className="font-mono text-sm text-[var(--texto)]">
                  {formatearPrecio(totalPrecio)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] tracking-[0.1em] text-[var(--secundario)]">
                  ENVÍO
                </span>
                <span className="font-mono text-[10px] text-[var(--secundario)]">
                  A COORDINAR
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[var(--linea)]">
                <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--texto)]">
                  TOTAL
                </span>
                <span className="font-mono text-lg text-[var(--texto)]">
                  {formatearPrecio(totalPrecio)}
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={coordinarPedido}
              className="group w-full bg-[var(--texto)] text-[var(--fondo)] font-mono text-[11px] tracking-[0.15em] py-4 flex items-center justify-center gap-3 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--texto)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--fondo)]"
            >
              COORDINAR PAGO Y ENVÍO
              <ArrowRight
                size={12}
                className="group-hover:translate-x-1 transition-transform motion-reduce:translate-x-0"
                aria-hidden="true"
              />
            </button>

            <p className="font-mono text-[9px] tracking-[0.1em] text-[var(--secundario)] text-center mt-3">
              VÍA WHATSAPP · RESPUESTA EN &lt;24H
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
