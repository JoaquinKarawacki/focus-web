import type { Producto, Talle } from './producto'

export interface ItemCarrito {
  producto: Producto
  talleSeleccionado: Talle
  cantidad: number
}

export interface EstadoCarrito {
  items: ItemCarrito[]
  abierto: boolean
}

export type AccionCarrito =
  | { tipo: 'AGREGAR'; producto: Producto; talle: Talle }
  | { tipo: 'QUITAR'; productoId: string; talle: Talle }
  | { tipo: 'CAMBIAR_CANTIDAD'; productoId: string; talle: Talle; cantidad: number }
  | { tipo: 'ABRIR_CARRITO' }
  | { tipo: 'CERRAR_CARRITO' }
  | { tipo: 'VACIAR_CARRITO' }
  | { tipo: 'CARGAR_ESTADO'; estado: EstadoCarrito }
