import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type ModalType = 'contact' | 'quote' | 'services' | 'process' | 'projects' | null

interface ModalContextValue {
  open: ModalType
  openModal: (m: ModalType) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<ModalType>(null)

  const openModal = (m: ModalType) => {
    setOpen(m)
    document.body.style.overflow = 'hidden'
  }
  const closeModal = () => {
    setOpen(null)
    document.body.style.overflow = ''
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <ModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used inside ModalProvider')
  return ctx
}
