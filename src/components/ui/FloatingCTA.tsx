import { useState, useEffect } from 'react'
import { useLang } from '../../context/LangContext'
import { useModal } from '../../context/ModalContext'

export default function FloatingCTA() {
  const { i18n } = useLang()
  const { openModal } = useModal()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`fixed bottom-4 right-3 xs:bottom-5 xs:right-4 md:bottom-6 md:right-6 z-[150] transition-all duration-300
      ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      <button
        onClick={() => openModal('quote')}
        className="flex items-center gap-2.5 px-4 py-3 md:px-5 md:py-3.5
          bg-mint text-white rounded-full font-medium text-[13px] md:text-[14px]
          shadow-[0_8px_32px_rgba(13,217,197,0.35)] hover:shadow-[0_8px_40px_rgba(13,217,197,0.55)]
          hover:-translate-y-0.5 transition-all duration-200 cursor-none"
      >
        <span className="w-2 h-2 rounded-full bg-[var(--glass)] animate-pulse flex-shrink-0" />
        <span className="hidden sm:inline">{i18n.cta_btn}</span>
        <span className="sm:hidden">Contact</span>
      </button>
    </div>
  )
}
