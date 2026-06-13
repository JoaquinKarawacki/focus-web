export function formatearPrecio(precio: number): string {
  return new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency: 'UYU',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(precio)
}

export function formatearMensajeCarrito(
  items: { nombre: string; talle: string; cantidad: number; precio: number }[],
  total: number
): string {
  const lineas = items.map(
    (item) =>
      `• ${item.cantidad}x ${item.nombre} (talle ${item.talle}) — ${formatearPrecio(item.precio * item.cantidad)}`
  )
  return [
    'Hola! Quiero coordinar un pedido de FOCUS:',
    '',
    ...lineas,
    '',
    `Total: ${formatearPrecio(total)}`,
    '',
    'Por favor confirmen disponibilidad y datos de envío. Gracias!',
  ].join('\n')
}
