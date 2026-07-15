import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  children: ReactNode
}

export default function Btn({ variant = 'primary', children, className = '', ...props }: BtnProps) {
  const base = 'inline-flex items-center gap-2 px-5 py-[11px] rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-none'
  const primary = 'bg-mint border border-mint text-bg hover:shadow-[0_0_28px_rgba(13,217,197,0.45)] hover:-translate-y-px'
  const ghost = 'bg-transparent border border-[var(--glass-border)] text-ink hover:border-[var(--glass-border-hi)]'

  return (
    <button
      className={`${base} ${variant === 'ghost' ? ghost : primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
