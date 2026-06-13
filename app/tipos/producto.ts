export type Categoria = 'remeras' | 'buzos' | 'accesorios' | 'pantalones'

export type EstadoStock = 'disponible' | 'agotado' | 'pocas-unidades'

export type Talle = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'unico'

export interface TalleStock {
  talle: Talle
  estado: EstadoStock
}

export interface Producto {
  id: string
  nombre: string
  marca: string
  categoria: Categoria
  precio: number
  descripcion: string
  talles: TalleStock[]
  etiquetas: string[]
  esNuevo: boolean
  dropNumero?: number
  colorPlaceholder: string
  foto?: string // ruta relativa a /public, ej: '/productos/remera.jpg'
}
