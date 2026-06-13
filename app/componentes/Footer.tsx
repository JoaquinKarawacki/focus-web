import { IconoInstagram } from './IconoInstagram'
import { LogoFocus } from './LogoFocus'

const navegacion = ['Catálogo', 'Cómo comprar', 'Drops', 'Contacto']
const hrefs: Record<string, string> = {
  'Catálogo': '#tienda',
  'Cómo comprar': '#como-comprar',
  'Drops': '#drops',
  'Contacto': '#contacto',
}

export function Footer() {
  const anio = new Date().getFullYear()

  return (
    <footer
      id="contacto"
      className="border-t border-[var(--linea)]"
      role="contentinfo"
      aria-label="Pie de página"
    >
      {/* Bloque principal */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-12">

          {/* Marca */}
          <div>
            <LogoFocus height={34} className="mb-3" />
            <p className="font-mono text-[9px] tracking-[0.25em] text-[var(--secundario)] mb-1">
              FOCUS · ESTD 2025 · CLOTHING
            </p>
            <p className="font-mono text-[9px] tracking-[0.15em] text-[var(--secundario)]">
              MONTEVIDEO, URUGUAY
            </p>
            <p className="text-[var(--secundario)] text-sm leading-relaxed mt-4 max-w-xs">
              Ropa streetwear premium seleccionada. Stock limitado. Envíos a todo el país.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-[var(--secundario)] mb-5">
              NAVEGACIÓN
            </p>
            <ul className="space-y-3" role="list">
              {navegacion.map((item) => (
                <li key={item}>
                  <a
                    href={hrefs[item]}
                    className="font-mono text-[10px] tracking-[0.1em] text-[var(--secundario)] hover:text-[var(--texto)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--texto)] rounded-sm"
                  >
                    {item.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Seguinos */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-[var(--secundario)] mb-5">
              SEGUINOS
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/focus.uy_/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[var(--linea)] px-4 py-2.5 font-mono text-[10px] tracking-[0.1em] text-[var(--secundario)] hover:border-[var(--texto)] hover:text-[var(--texto)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--texto)] rounded-sm"
                aria-label="Seguir en Instagram (abre en nueva pestaña)"
              >
                <IconoInstagram size={13} aria-hidden={true} />
                @FOCUS.UY_
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP ?? '59899000000'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--texto)] text-[var(--fondo)] px-4 py-2.5 font-mono text-[10px] tracking-[0.1em] hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--texto)] rounded-sm"
                aria-label="Contactar por WhatsApp (abre en nueva pestaña)"
              >
                <span aria-hidden="true">↗</span>
                WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-[var(--linea)]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[9px] tracking-[0.1em] text-[var(--secundario)]">
            © {anio} FOCUS. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <p className="font-mono text-[9px] tracking-[0.1em] text-[var(--secundario)]">
            ENVÍOS VÍA OCA · CORREO URUGUAYO
          </p>
        </div>
      </div>
    </footer>
  )
}
