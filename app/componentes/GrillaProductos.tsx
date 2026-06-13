'use client'

import { useState } from 'react'
import { catalogo, categorias, type FiltroCategoria } from '../datos/catalogo'
import { TarjetaProducto } from './TarjetaProducto'
import { Toast, useToast } from './Toast'

export function GrillaProductos() {
  const [filtro, setFiltro] = useState<FiltroCategoria>('todo')
  const { toast, mostrarToast, ocultarToast } = useToast()

  const productosFiltrados =
    filtro === 'todo' ? catalogo : catalogo.filter((p) => p.categoria === filtro)

  return (
    <section id="tienda" aria-label="Catálogo de productos" className="py-24 border-t border-[var(--linea)]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-[9px] tracking-[0.3em] text-[var(--secundario)] mb-4 uppercase">
            — Catálogo
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2 className="font-black text-[clamp(2.5rem,6vw,5rem)] leading-none text-[var(--texto)] uppercase">
              Nuestros productos
              <span className="text-[var(--secundario)]">.</span>
            </h2>

            {/* Filtros */}
            <nav aria-label="Filtrar por categoría">
              <ul className="flex flex-wrap gap-2" role="list">
                {categorias.map(({ valor, etiqueta }) => (
                  <li key={valor}>
                    <button
                      onClick={() => setFiltro(valor)}
                      aria-pressed={filtro === valor}
                      className={`font-mono text-[10px] tracking-[0.12em] px-4 py-2 border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--texto)] ${
                        filtro === valor
                          ? 'bg-[var(--texto)] text-[var(--fondo)] border-[var(--texto)]'
                          : 'border-[var(--linea)] text-[var(--secundario)] hover:border-[var(--texto)] hover:text-[var(--texto)]'
                      }`}
                    >
                      {etiqueta}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <p className="font-mono text-[9px] tracking-[0.2em] text-[var(--secundario)] mt-4">
            {productosFiltrados.length} {productosFiltrados.length === 1 ? 'PIEZA' : 'PIEZAS'}
            {filtro !== 'todo' && ` — ${categorias.find((c) => c.valor === filtro)?.etiqueta}`}
          </p>
        </div>

        {/* Grilla */}
        {productosFiltrados.length > 0 ? (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            role="list"
            aria-label="Productos"
          >
            {productosFiltrados.map((producto) => (
              <div key={producto.id} role="listitem">
                <TarjetaProducto producto={producto} onAgregar={mostrarToast} />
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-[var(--linea)] border-dashed py-24 text-center">
            <p className="font-black text-2xl text-[var(--secundario)] mb-3">Sin piezas aquí todavía.</p>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--secundario)]">
              PRONTO HAY NOVEDADES.
            </p>
          </div>
        )}
      </div>

      <Toast mensaje={toast.mensaje} visible={toast.visible} onOcultar={ocultarToast} />
    </section>
  )
}
