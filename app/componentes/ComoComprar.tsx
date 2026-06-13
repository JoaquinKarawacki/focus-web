import { ShoppingBag, MessageCircle, Package } from 'lucide-react'

const pasos = [
  {
    numero: '01',
    icono: ShoppingBag,
    titulo: 'ELEGÍS TU PIEZA',
    descripcion:
      'Explorá el catálogo y encontrá lo que querés. Filtrá por categoría o drop. Agregalo al carrito con tu talle.',
  },
  {
    numero: '02',
    icono: MessageCircle,
    titulo: 'NOS ESCRIBÍS',
    descripcion:
      'Coordinamos por WhatsApp o Instagram. Te confirmamos disponibilidad, talle y precio final. Sin intermediarios.',
  },
  {
    numero: '03',
    icono: Package,
    titulo: 'TE LO ENVIAMOS',
    descripcion:
      'Coordinamos el pago y el despacho. Llegás a tu puerta en todo Uruguay. OCA o Correo Uruguayo.',
  },
]

export function ComoComprar() {
  return (
    <section
      id="como-comprar"
      aria-label="Cómo comprar"
      className="py-24 border-t border-[var(--linea)]"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-[9px] tracking-[0.3em] text-[var(--secundario)] mb-4 uppercase">
            — Simple y rápido
          </p>
          <h2 className="font-black text-[clamp(2.5rem,6vw,5rem)] leading-none text-[var(--texto)] uppercase">
            Cómo comprar
            <span className="text-[var(--secundario)]">.</span>
          </h2>
        </div>

        {/* Pasos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--linea)]">
          {pasos.map(({ numero, icono: Icono, titulo, descripcion }) => (
            <div key={numero} className="bg-[var(--fondo)] p-8 sm:p-10 relative overflow-hidden">
              {/* Número fantasma de fondo */}
              <span
                className="absolute top-4 right-5 font-black text-[7rem] leading-none text-[var(--linea)] select-none pointer-events-none"
                aria-hidden="true"
              >
                {numero}
              </span>

              {/* Contenido */}
              <div className="relative z-10">
                <div className="mb-6">
                  <Icono
                    size={24}
                    strokeWidth={1.5}
                    className="text-[var(--texto)]"
                    aria-hidden="true"
                  />
                </div>
                <p className="font-mono text-[9px] tracking-[0.2em] text-[var(--secundario)] mb-3">
                  PASO {numero}
                </p>
                <h3 className="font-black text-xl text-[var(--texto)] mb-4 leading-tight">
                  {titulo}
                </h3>
                <p className="text-[var(--secundario)] text-sm leading-relaxed">
                  {descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP ?? '59899000000'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[var(--texto)] text-[var(--fondo)] px-10 py-4 font-mono text-[11px] tracking-[0.15em] uppercase hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--texto)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--fondo)]"
          >
            Empezar mi pedido →
          </a>
        </div>
      </div>
    </section>
  )
}
