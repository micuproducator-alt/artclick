import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface MagneticBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'ghost'
}

// Primary / secondary call-to-action button.
export default function MagneticBtn({
  children,
  variant = 'primary',
  className = '',
  ...props
}: MagneticBtnProps) {
  const base = `inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[14.5px] font-semibold
    whitespace-nowrap transition-[background,border-color,color,transform] duration-200 active:scale-[0.98]`
  const primary = `bg-mint border border-mint text-bg hover:bg-[#3BE3D2]`
  const ghost = `bg-white/[0.03] border border-white/15 text-ink hover:border-white/30 hover:bg-white/[0.06]`

  return (
    <button className={`${base} ${variant === 'ghost' ? ghost : primary} ${className}`} {...props}>
      {children}
    </button>
  )
}
