import { useRef, type ReactNode, type ButtonHTMLAttributes } from 'react'

interface MagneticBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  strength?: number
}

export default function MagneticBtn({
  children,
  variant = 'primary',
  strength = 0.35,
  className = '',
  ...props
}: MagneticBtnProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ref.current
    if (!btn) return
    const r = btn.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * strength
    const y = (e.clientY - r.top - r.height / 2) * strength
    btn.style.transform = `translate(${x}px, ${y}px) scale(1.04)`
  }

  const onMouseLeave = () => {
    const btn = ref.current
    if (!btn) return
    btn.style.transform = 'translate(0, 0) scale(1)'
  }

  const base = `inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium
    cursor-none transition-[box-shadow,background] duration-200 whitespace-nowrap
    [transition:transform_0.45s_cubic-bezier(0.16,1,0.3,1),box-shadow_0.2s,background_0.2s]`
  const primary = `bg-mint border border-mint text-white hover:shadow-[0_0_32px_rgba(13,217,197,0.5)]`
  const ghost = `bg-transparent border border-[var(--glass-border)] text-ink hover:border-[var(--glass-border-hi)] hover:text-mint`

  return (
    <button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`${base} ${variant === 'ghost' ? ghost : primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
