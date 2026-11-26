import { type ReactNode } from 'react'
import { useModal } from '../../context/ModalContext'

interface ModalProps {
  isOpen: boolean
  children: ReactNode
  wide?: boolean
}

export default function Modal({ isOpen, children, wide = false }: ModalProps) {
  const { closeModal } = useModal()

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) closeModal() }}
      className={`fixed inset-0 z-[1000] flex items-end xs:items-center justify-center
        xs:p-6 transition-opacity duration-300
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      style={{ background: 'rgba(7,13,26,0.82)', backdropFilter: 'blur(12px)' }}
    >
      <div
        className={`relative w-full ${wide ? 'xs:max-w-[520px]' : 'xs:max-w-[460px]'}
          rounded-t-[22px] xs:rounded-[20px]
          border border-[rgba(13,217,197,0.2)]
          transition-all duration-350
          hide-scrollbar
          ${isOpen
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 xs:scale-[0.97] opacity-0'}`}
        style={{
          background: '#0C1528',
          padding: '28px 20px 32px',
          maxHeight: '90dvh',
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
          boxShadow: '0 32px 80px rgba(0,0,0,0.65)',
        }}
      >
        {/* Top gradient accent */}
        <div className="absolute top-0 left-10 right-10 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,#0DD9C5,transparent)' }} />

        {/* Mobile drag handle */}
        <div className="xs:hidden w-10 h-1 rounded-full bg-white/15 mx-auto mb-5" />

        {/* Close button */}
        <button
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center
            border border-white/15 bg-white/6 text-ink-faint text-[20px] leading-none
            hover:bg-white/12 hover:text-ink hover:rotate-90
            transition-all duration-200 z-10"
        >
          ×
        </button>

        {/* Content */}
        <div className="xs:p-4">
          {children}
        </div>
      </div>
    </div>
  )
}
