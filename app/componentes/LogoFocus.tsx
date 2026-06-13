interface LogoFocusProps {
  className?: string
  height?: number
  invertido?: boolean
}

// Logo "Focus" con la "o" como viewfinder — extraído de la identidad visual real de la marca
export function LogoFocus({ className = '', height = 28, invertido = false }: LogoFocusProps) {
  const color = invertido ? '#0A0A0A' : '#F5F4F0'
  const ancho = height * 3.8

  return (
    <svg
      width={ancho}
      height={height}
      viewBox="0 0 152 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Focus"
      role="img"
    >
      {/* F */}
      <text
        x="0"
        y="32"
        fontFamily="'Archivo Black', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="36"
        fill={color}
        letterSpacing="-1"
      >
        F
      </text>
      {/* o — versión simplificada como texto con overlay del loop */}
      <text
        x="24"
        y="32"
        fontFamily="'Archivo Black', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="36"
        fill={color}
        letterSpacing="-1"
      >
        o
      </text>
      {/* Loop/viewfinder dentro de la "o" */}
      <rect
        x="28"
        y="14"
        width="15"
        height="9"
        rx="4.5"
        stroke={invertido ? '#0A0A0A' : '#0A0A0A'}
        strokeWidth="2.5"
        fill="none"
      />
      <rect
        x="29.5"
        y="15.5"
        width="12"
        height="6"
        rx="3"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* cus */}
      <text
        x="46"
        y="32"
        fontFamily="'Archivo Black', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="36"
        fill={color}
        letterSpacing="-1"
      >
        cus
      </text>
    </svg>
  )
}

// Versión lockup completo con subtítulo
export function LogoLockup({ className = '', invertido = false }: { className?: string; invertido?: boolean }) {
  const color = invertido ? '#0A0A0A' : '#F5F4F0'
  const colorSec = invertido ? '#4a4a45' : '#8A8A85'
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <LogoFocus height={32} invertido={invertido} />
      <span
        className="font-mono tracking-[0.25em] uppercase"
        style={{ fontSize: '9px', color: colorSec }}
      >
        ESTD 2025 · CLOTHING
      </span>
    </div>
  )
}
