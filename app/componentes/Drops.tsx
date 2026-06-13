import Image from 'next/image'
import { ArrowRight, Lock } from 'lucide-react'
import { PlaceholderPrenda } from './PlaceholderPrenda'

const drops = [
  {
    numero: '01',
    titulo: 'Raíces',
    descripcion:
      'El primer drop. Básicos que no son básicos. Fleeces pesados, remeras washed, gráficas serigrafía. Todo agotado en 48h.',
    estado: 'cerrado' as const,
    fecha: 'MAR 2025',
    piezas: 4,
    imagen: null,
    tipoImagen: 'remera' as const,
    colorFondo: '#0d0d0d',
  },
  {
    numero: '02',
    titulo: 'Arquitectura',
    descripcion:
      'Volumen y estructura. Cargos wide leg, hoodies Balenciaga Paris, remeras premium importadas. Stock limitado.',
    estado: 'activo' as const,
    fecha: 'JUN 2025',
    piezas: 3,
    imagen: '/productos/balenciaga-hoodie-paris.jpg',
    tipoImagen: 'buzo' as const,
    colorFondo: '#0f0f0f',
  },
]

export function Drops() {
  return (
    <section id="drops" aria-label="Drops" className="py-24 border-t border-[var(--linea)]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-[9px] tracking-[0.3em] text-[var(--secundario)] mb-4 uppercase">
            — Lanzamientos
          </p>
          <h2 className="font-black text-[clamp(2.5rem,6vw,5rem)] leading-none text-[var(--texto)] uppercase">
            Drops
            <span className="text-[var(--secundario)]">.</span>
          </h2>
        </div>

        {/* Lista */}
        <div className="space-y-px">
          {drops.map((drop) => (
            <article
              key={drop.numero}
              className={`group border border-[var(--linea)] p-8 sm:p-10 transition-colors duration-300 ${
                drop.estado === 'activo' ? 'hover:bg-[var(--superficie)]' : 'opacity-60'
              }`}
              aria-label={`Drop ${drop.numero}: ${drop.titulo}`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-8 items-center">

                {/* Número + preview */}
                <div className="flex items-center gap-6">
                  <span
                    className="font-black leading-none select-none text-[var(--linea)]"
                    style={{ fontSize: 'clamp(4rem,7vw,6rem)' }}
                    aria-hidden="true"
                  >
                    {drop.numero}
                  </span>
                  <div className="hidden sm:block w-14 h-18 aspect-[3/4] overflow-hidden shrink-0 border border-[var(--linea)]">
                    {drop.imagen ? (
                      <div className="relative w-14 h-[4.5rem]">
                        <Image
                          src={drop.imagen}
                          alt={`Drop ${drop.numero} preview`}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                    ) : (
                      <PlaceholderPrenda
                        tipo={drop.tipoImagen}
                        colorFondo={drop.colorFondo}
                        className="w-14 h-[4.5rem]"
                      />
                    )}
                  </div>
                </div>

                {/* Contenido */}
                <div>
                  <div className="flex items-center gap-4 mb-3 flex-wrap">
                    <h3 className="font-black text-2xl sm:text-3xl text-[var(--texto)]">
                      {drop.titulo}
                    </h3>
                    {drop.estado === 'activo' ? (
                      <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.15em] text-[var(--texto)] border border-[var(--linea)] px-2 py-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--texto)] animate-pulse inline-block" aria-hidden="true" />
                        EN VIVO
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.15em] text-[var(--secundario)] border border-[var(--linea)] px-2 py-1">
                        <Lock size={8} aria-hidden="true" />
                        CERRADO
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--secundario)] text-sm leading-relaxed max-w-lg mb-4">
                    {drop.descripcion}
                  </p>
                  <div className="flex gap-6">
                    {[
                      { k: 'FECHA', v: drop.fecha },
                      { k: 'PIEZAS', v: `${drop.piezas} SKUs` },
                      { k: 'ESTADO', v: drop.estado === 'activo' ? '● ACTIVO' : '○ CERRADO' },
                    ].map(({ k, v }) => (
                      <div key={k}>
                        <div className="font-mono text-[8px] tracking-[0.15em] text-[var(--secundario)]">{k}</div>
                        <div className="font-mono text-[9px] text-[var(--texto)]">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                {drop.estado === 'activo' ? (
                  <a
                    href="#tienda"
                    className="shrink-0 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-[var(--texto)] border border-[var(--linea)] px-5 py-3 hover:bg-[var(--texto)] hover:text-[var(--fondo)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--texto)]"
                    aria-label={`Ver piezas del Drop ${drop.numero}`}
                  >
                    VER PIEZAS
                    <ArrowRight size={12} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="shrink-0 font-mono text-[10px] tracking-[0.15em] text-[var(--secundario)]">
                    AGOTADO
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Próximo drop */}
        <div className="mt-px border border-dashed border-[var(--linea)] p-8 sm:p-10">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <span
                className="font-black leading-none text-[var(--linea)] select-none"
                style={{ fontSize: 'clamp(4rem,7vw,6rem)' }}
                aria-hidden="true"
              >
                03
              </span>
              <div>
                <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--secundario)]">PRÓXIMAMENTE · 2025</div>
                <p className="font-black text-2xl text-[var(--secundario)] mt-1">Por confirmar</p>
              </div>
            </div>
            <a
              href="https://ig.me/m/focus.uy_"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.15em] text-[var(--secundario)] hover:text-[var(--texto)] transition-colors border border-dashed border-[var(--linea)] px-5 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--texto)]"
            >
              SEGUIR EN IG →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
