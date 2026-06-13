'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import type { Producto, Talle } from '../tipos/producto'
import { PlaceholderPrenda } from './PlaceholderPrenda'
import { useCarrito } from '../contexto/CarritoContext'
import { formatearPrecio } from '../utiles/formatearPrecio'

interface TarjetaProductoProps {
  producto: Producto
  onAgregar?: (mensaje: string) => void
}

function tipoPrendaSVG(cat: Producto['categoria']): 'remera' | 'buzo' | 'accesorio' | 'pantalon' {
  const mapa = { remeras: 'remera', buzos: 'buzo', accesorios: 'accesorio', pantalones: 'pantalon' } as const
  return mapa[cat]
}

export function TarjetaProducto({ producto, onAgregar }: TarjetaProductoProps) {
  const { agregarAlCarrito } = useCarrito()
  const [talleSeleccionado, setTalleSeleccionado] = useState<Talle | null>(
    producto.talles.find((t) => t.estado !== 'agotado')?.talle ?? null
  )

  const talleActual = producto.talles.find((t) => t.talle === talleSeleccionado)
  const productoAgotado = producto.talles.every((t) => t.estado === 'agotado')
  const esTalleUnico = producto.talles.length === 1 && producto.talles[0].talle === 'unico'

  const manejarAgregar = useCallback(() => {
    if (!talleSeleccionado || talleActual?.estado === 'agotado' || productoAgotado) return
    agregarAlCarrito(producto, talleSeleccionado)
    onAgregar?.(`${producto.nombre} agregado.`)
  }, [talleSeleccionado, talleActual, productoAgotado, agregarAlCarrito, producto, onAgregar])

  return (
    <article
      className="group flex flex-col bg-[var(--superficie)] border border-[var(--linea)] overflow-hidden"
      aria-label={`${producto.nombre} por ${producto.marca}`}
    >
      {/* Imagen */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--superficie)]">
        {producto.foto ? (
          <Image
            src={producto.foto}
            alt={`${producto.nombre} — ${producto.marca}`}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:scale-100"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <PlaceholderPrenda
            tipo={tipoPrendaSVG(producto.categoria)}
            colorFondo={producto.colorPlaceholder}
            className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:scale-100"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {producto.esNuevo && (
            <span className="bg-[var(--texto)] text-[var(--fondo)] font-mono text-[8px] tracking-[0.15em] px-2 py-1">
              NUEVO
            </span>
          )}
          {producto.dropNumero && (
            <span className="bg-[var(--fondo)]/80 border border-[var(--linea)] text-[var(--secundario)] font-mono text-[8px] tracking-[0.1em] px-2 py-1">
              DROP {String(producto.dropNumero).padStart(2, '0')}
            </span>
          )}
        </div>

        {/* Estado stock */}
        <div className="absolute top-3 right-3">
          <span
            className={`font-mono text-[11px] drop-shadow-md ${productoAgotado ? 'text-[var(--secundario)]' : 'text-[var(--texto)]'}`}
            aria-label={productoAgotado ? 'Agotado' : 'En stock'}
          >
            {productoAgotado ? '○' : '●'}
          </span>
        </div>

        {/* Overlay agotado */}
        {productoAgotado && (
          <div className="absolute inset-0 bg-[var(--fondo)]/50 flex items-end justify-center pb-4">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--secundario)]">AGOTADO</span>
          </div>
        )}
      </div>

      {/* Cuerpo */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--secundario)] uppercase">
          {producto.marca}
        </span>

        <div className="flex items-start justify-between gap-2">
          <h3 className="font-black text-[var(--texto)] text-base leading-tight flex-1">
            {producto.nombre}
          </h3>
          <span className="font-mono text-[var(--texto)] text-sm shrink-0">
            {formatearPrecio(producto.precio)}
          </span>
        </div>

        {/* Selector de talles */}
        {!esTalleUnico && (
          <div
            className="flex gap-1.5 flex-wrap"
            role="group"
            aria-label={`Talles de ${producto.nombre}`}
          >
            {producto.talles.map(({ talle, estado }) => {
              const agotado = estado === 'agotado'
              const seleccionado = talleSeleccionado === talle
              return (
                <button
                  key={talle}
                  onClick={() => !agotado && setTalleSeleccionado(talle)}
                  disabled={agotado}
                  aria-pressed={seleccionado}
                  aria-label={`Talle ${talle}${agotado ? ', agotado' : ''}`}
                  className={`font-mono text-[9px] w-8 h-8 border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--texto)] ${
                    agotado
                      ? 'border-[var(--linea)] text-[var(--linea)] cursor-not-allowed line-through'
                      : seleccionado
                      ? 'border-[var(--texto)] bg-[var(--texto)] text-[var(--fondo)]'
                      : 'border-[var(--linea)] text-[var(--secundario)] hover:border-[var(--texto)] hover:text-[var(--texto)]'
                  }`}
                >
                  {talle}
                </button>
              )
            })}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={manejarAgregar}
          disabled={productoAgotado || !talleSeleccionado || talleActual?.estado === 'agotado'}
          className="mt-auto w-full bg-[var(--texto)] text-[var(--fondo)] font-mono text-[10px] tracking-[0.15em] py-3 uppercase hover:opacity-85 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--texto)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--superficie)]"
          aria-label={productoAgotado ? `${producto.nombre} agotado` : `Agregar ${producto.nombre} al carrito`}
        >
          {productoAgotado ? 'AGOTADO' : 'AGREGAR AL CARRITO'}
        </button>
      </div>
    </article>
  )
}
