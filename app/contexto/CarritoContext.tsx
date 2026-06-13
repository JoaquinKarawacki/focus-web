'use client'

import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react'
import type { EstadoCarrito, AccionCarrito, ItemCarrito } from '../tipos/carrito'
import type { Producto, Talle } from '../tipos/producto'

const CLAVE_LOCAL_STORAGE = 'focus-carrito'

const estadoInicial: EstadoCarrito = {
  items: [],
  abierto: false,
}

function reducerCarrito(estado: EstadoCarrito, accion: AccionCarrito): EstadoCarrito {
  switch (accion.tipo) {
    case 'AGREGAR': {
      const indiceExistente = estado.items.findIndex(
        (item) => item.producto.id === accion.producto.id && item.talleSeleccionado === accion.talle
      )
      if (indiceExistente >= 0) {
        const items = [...estado.items]
        items[indiceExistente] = {
          ...items[indiceExistente],
          cantidad: items[indiceExistente].cantidad + 1,
        }
        return { ...estado, items }
      }
      return {
        ...estado,
        items: [
          ...estado.items,
          { producto: accion.producto, talleSeleccionado: accion.talle, cantidad: 1 },
        ],
      }
    }
    case 'QUITAR': {
      return {
        ...estado,
        items: estado.items.filter(
          (item) =>
            !(item.producto.id === accion.productoId && item.talleSeleccionado === accion.talle)
        ),
      }
    }
    case 'CAMBIAR_CANTIDAD': {
      if (accion.cantidad <= 0) {
        return {
          ...estado,
          items: estado.items.filter(
            (item) =>
              !(item.producto.id === accion.productoId && item.talleSeleccionado === accion.talle)
          ),
        }
      }
      return {
        ...estado,
        items: estado.items.map((item) =>
          item.producto.id === accion.productoId && item.talleSeleccionado === accion.talle
            ? { ...item, cantidad: accion.cantidad }
            : item
        ),
      }
    }
    case 'ABRIR_CARRITO':
      return { ...estado, abierto: true }
    case 'CERRAR_CARRITO':
      return { ...estado, abierto: false }
    case 'VACIAR_CARRITO':
      return { ...estado, items: [] }
    case 'CARGAR_ESTADO':
      return accion.estado
    default:
      return estado
  }
}

interface ContextoCarrito {
  estado: EstadoCarrito
  agregarAlCarrito: (producto: Producto, talle: Talle) => void
  quitarDelCarrito: (productoId: string, talle: Talle) => void
  cambiarCantidad: (productoId: string, talle: Talle, cantidad: number) => void
  abrirCarrito: () => void
  cerrarCarrito: () => void
  vaciarCarrito: () => void
  totalItems: number
  totalPrecio: number
}

const Contexto = createContext<ContextoCarrito | null>(null)

export function ProveedorCarrito({ children }: { children: ReactNode }) {
  const [estado, despachar] = useReducer(reducerCarrito, estadoInicial)

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_LOCAL_STORAGE)
      if (guardado) {
        const estadoGuardado = JSON.parse(guardado) as EstadoCarrito
        despachar({ tipo: 'CARGAR_ESTADO', estado: { ...estadoGuardado, abierto: false } })
      }
    } catch {
      // localStorage no disponible
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_LOCAL_STORAGE, JSON.stringify(estado))
    } catch {
      // localStorage no disponible
    }
  }, [estado])

  const agregarAlCarrito = useCallback((producto: Producto, talle: Talle) => {
    despachar({ tipo: 'AGREGAR', producto, talle })
  }, [])

  const quitarDelCarrito = useCallback((productoId: string, talle: Talle) => {
    despachar({ tipo: 'QUITAR', productoId, talle })
  }, [])

  const cambiarCantidad = useCallback((productoId: string, talle: Talle, cantidad: number) => {
    despachar({ tipo: 'CAMBIAR_CANTIDAD', productoId, talle, cantidad })
  }, [])

  const abrirCarrito = useCallback(() => despachar({ tipo: 'ABRIR_CARRITO' }), [])
  const cerrarCarrito = useCallback(() => despachar({ tipo: 'CERRAR_CARRITO' }), [])
  const vaciarCarrito = useCallback(() => despachar({ tipo: 'VACIAR_CARRITO' }), [])

  const totalItems = estado.items.reduce((acc, item) => acc + item.cantidad, 0)
  const totalPrecio = estado.items.reduce(
    (acc, item) => acc + item.producto.precio * item.cantidad,
    0
  )

  return (
    <Contexto.Provider
      value={{
        estado,
        agregarAlCarrito,
        quitarDelCarrito,
        cambiarCantidad,
        abrirCarrito,
        cerrarCarrito,
        vaciarCarrito,
        totalItems,
        totalPrecio,
      }}
    >
      {children}
    </Contexto.Provider>
  )
}

export function useCarrito(): ContextoCarrito {
  const contexto = useContext(Contexto)
  if (!contexto) throw new Error('useCarrito debe usarse dentro de ProveedorCarrito')
  return contexto
}
