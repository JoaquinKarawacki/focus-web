'use client'

import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'

interface ToastProps {
  mensaje: string
  visible: boolean
  onOcultar: () => void
}

export function Toast({ mensaje, visible, onOcultar }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const id = setTimeout(onOcultar, 2800)
      return () => clearTimeout(id)
    }
  }, [visible, onOcultar])

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] transition-all duration-300 ease-out motion-reduce:transition-none ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-[var(--texto)] text-[var(--fondo)] px-6 py-3 flex items-center gap-3 shadow-2xl">
        <Check size={14} strokeWidth={2.5} />
        <span className="font-mono text-[11px] tracking-[0.1em]">{mensaje}</span>
      </div>
    </div>
  )
}

interface EstadoToast {
  visible: boolean
  mensaje: string
}

export function useToast() {
  const [toast, setToast] = useState<EstadoToast>({ visible: false, mensaje: '' })

  const mostrarToast = (mensaje: string) => {
    setToast({ visible: true, mensaje })
  }

  const ocultarToast = () => {
    setToast((prev) => ({ ...prev, visible: false }))
  }

  return { toast, mostrarToast, ocultarToast }
}
