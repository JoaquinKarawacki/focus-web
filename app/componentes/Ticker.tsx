'use client'

const mensajes = [
  'ENVÍOS A TODO EL PAÍS',
  'STOCK LIMITADO',
  'SELECCIÓN EXCLUSIVA',
  'ESTD 2025',
  'MONTEVIDEO, UY',
  'PAGO EN CUOTAS',
]

export function Ticker() {
  const contenido = [...mensajes, ...mensajes]

  return (
    <div
      className="bg-[var(--texto)] text-[var(--fondo)] overflow-hidden py-2.5 border-b border-[var(--linea)]"
      aria-label="Información de la tienda"
    >
      <div className="flex animate-marquee whitespace-nowrap will-change-transform motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-6">
        {contenido.map((msg, i) => (
          <span key={i} className="font-mono text-[10px] tracking-[0.2em] uppercase mx-6 shrink-0">
            {msg}
            <span className="mx-6 opacity-40">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
