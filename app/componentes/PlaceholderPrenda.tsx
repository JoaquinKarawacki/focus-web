interface PlaceholderPrendaProps {
  colorFondo?: string
  className?: string
  tipo?: 'remera' | 'buzo' | 'accesorio' | 'pantalon'
}

export function PlaceholderPrenda({
  colorFondo = '#141414',
  className = '',
  tipo = 'remera',
}: PlaceholderPrendaProps) {
  return (
    <svg
      viewBox="0 0 400 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Fondo */}
      <rect width="400" height="500" fill={colorFondo} />

      {/* Percha */}
      <line x1="200" y1="20" x2="200" y2="60" stroke="#3a3a3a" strokeWidth="2" />
      <path
        d="M 165 60 Q 200 45 235 60"
        fill="none"
        stroke="#3a3a3a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="200" cy="19" r="3" fill="none" stroke="#3a3a3a" strokeWidth="2" />

      {tipo === 'remera' && <Remera />}
      {tipo === 'buzo' && <Buzo />}
      {tipo === 'accesorio' && <Accesorio />}
      {tipo === 'pantalon' && <Pantalon />}
    </svg>
  )
}

function Remera() {
  return (
    <g>
      {/* Cuerpo remera */}
      <path
        d="M 120 60 L 80 120 L 120 130 L 120 420 L 280 420 L 280 130 L 320 120 L 280 60 L 230 90 Q 200 100 170 90 Z"
        fill="none"
        stroke="#2a2a2a"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Cuello */}
      <path
        d="M 170 60 Q 200 80 230 60"
        fill="none"
        stroke="#2a2a2a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Costura lateral */}
      <line x1="120" y1="130" x2="120" y2="420" stroke="#222" strokeWidth="1" strokeDasharray="6,8" />
      <line x1="280" y1="130" x2="280" y2="420" stroke="#222" strokeWidth="1" strokeDasharray="6,8" />
    </g>
  )
}

function Buzo() {
  return (
    <g>
      {/* Cuerpo buzo */}
      <path
        d="M 115 60 L 65 130 L 115 145 L 115 430 L 285 430 L 285 145 L 335 130 L 285 60 L 235 85 Q 200 98 165 85 Z"
        fill="none"
        stroke="#2a2a2a"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Capucha */}
      <path
        d="M 165 60 Q 165 30 200 28 Q 235 30 235 60"
        fill="none"
        stroke="#2a2a2a"
        strokeWidth="1.5"
      />
      {/* Canguro bolsillo */}
      <rect x="145" y="290" width="110" height="70" rx="4" fill="none" stroke="#252525" strokeWidth="1" />
      {/* Cordones */}
      <line x1="193" y1="60" x2="185" y2="140" stroke="#252525" strokeWidth="1" />
      <line x1="207" y1="60" x2="215" y2="140" stroke="#252525" strokeWidth="1" />
      {/* Costura */}
      <line x1="115" y1="145" x2="115" y2="430" stroke="#222" strokeWidth="1" strokeDasharray="6,8" />
      <line x1="285" y1="145" x2="285" y2="430" stroke="#222" strokeWidth="1" strokeDasharray="6,8" />
    </g>
  )
}

function Accesorio() {
  return (
    <g>
      {/* Bucket hat */}
      <ellipse cx="200" cy="200" rx="110" ry="30" fill="none" stroke="#2a2a2a" strokeWidth="1.5" />
      <path
        d="M 90 200 L 100 300 Q 200 320 300 300 L 310 200"
        fill="none"
        stroke="#2a2a2a"
        strokeWidth="1.5"
      />
      {/* Ala */}
      <ellipse cx="200" cy="310" rx="90" ry="18" fill="none" stroke="#2a2a2a" strokeWidth="1.5" />
      {/* Costuras bucket */}
      <line x1="200" y1="172" x2="200" y2="292" stroke="#222" strokeWidth="1" strokeDasharray="5,7" />
    </g>
  )
}

function Pantalon() {
  return (
    <g>
      {/* Cintura */}
      <rect x="125" y="60" width="150" height="25" rx="2" fill="none" stroke="#2a2a2a" strokeWidth="1.5" />
      {/* Cuerpo */}
      <path
        d="M 125 85 L 115 260 L 115 430 L 195 430 L 200 260 L 205 430 L 285 430 L 285 260 L 275 85 Z"
        fill="none"
        stroke="#2a2a2a"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Bolsillo cargo */}
      <rect x="120" y="180" width="55" height="65" rx="3" fill="none" stroke="#252525" strokeWidth="1" />
      <rect x="225" y="180" width="55" height="65" rx="3" fill="none" stroke="#252525" strokeWidth="1" />
      {/* Costuras */}
      <line x1="200" y1="85" x2="200" y2="260" stroke="#222" strokeWidth="1" strokeDasharray="5,7" />
    </g>
  )
}
