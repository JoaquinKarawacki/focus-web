import { ShieldCheck, Truck, Wallet } from 'lucide-react'

const features = [
  {
    icono: ShieldCheck,
    titulo: 'CALIDAD PREMIUM',
    descripcion:
      'Seleccionamos cada pieza por su calidad y construcción. Te mandamos fotos reales antes de confirmar.',
  },
  {
    icono: Truck,
    titulo: 'ENVÍOS A TODO URUGUAY',
    descripcion:
      'Coordinamos el envío directo a tu casa, sea donde sea en el país. OCA, Correo Uruguayo o mensajería.',
  },
  {
    icono: Wallet,
    titulo: 'MÚLTIPLES FORMAS DE PAGO',
    descripcion:
      'Transferencia bancaria, Abitab, RedPagos o efectivo. El método que más te convenga.',
  },
]

const mediosDePago = [
  'TRANSFERENCIA',
  'ABITAB',
  'REDPAGOS',
  'EFECTIVO',
  'MERCADOPAGO',
]

export function Confianza() {
  return (
    <section
      id="confianza"
      aria-label="Por qué elegirnos"
      className="py-24 border-t border-[var(--linea)]"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-[9px] tracking-[0.3em] text-[var(--secundario)] mb-4 uppercase">
            — Por qué elegirnos
          </p>
          <h2 className="font-black text-[clamp(2.5rem,6vw,5rem)] leading-none text-[var(--texto)] uppercase">
            Compra con confianza
            <span className="text-[var(--secundario)]">.</span>
          </h2>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {features.map(({ icono: Icono, titulo, descripcion }) => (
            <div
              key={titulo}
              className="border border-[var(--linea)] bg-[var(--superficie)] p-8 flex flex-col gap-5"
            >
              <div className="w-10 h-10 border border-[var(--linea)] flex items-center justify-center shrink-0">
                <Icono size={18} strokeWidth={1.5} className="text-[var(--texto)]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-mono text-[10px] tracking-[0.15em] text-[var(--texto)] mb-3">
                  {titulo}
                </h3>
                <p className="text-[var(--secundario)] text-sm leading-relaxed">
                  {descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Métodos de pago */}
        <div className="border border-[var(--linea)] p-8">
          <p className="font-mono text-[9px] tracking-[0.25em] text-[var(--secundario)] mb-6 text-center">
            MÉTODOS DE PAGO
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {mediosDePago.map((medio) => (
              <span
                key={medio}
                className="border border-[var(--linea)] px-4 py-2 font-mono text-[9px] tracking-[0.15em] text-[var(--secundario)]"
              >
                {medio}
              </span>
            ))}
          </div>
          <p className="font-mono text-[9px] tracking-[0.1em] text-[var(--secundario)] text-center mt-6">
            Hacemos envíos a <span className="text-[var(--texto)]">todo el territorio nacional</span> a través de empresas de mensajería. Coordinamos todo por WhatsApp.
          </p>
        </div>
      </div>
    </section>
  )
}
