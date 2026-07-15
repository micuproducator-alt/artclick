import { useState, useCallback } from 'react'
import { useLang } from '../../context/LangContext'
import { useModal } from '../../context/ModalContext'
import Modal from '../ui/Modal'

const PrevIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M9 2L3 7L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const NextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5 2L11 7L5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function ProjectsCarousel() {
  const { i18n } = useLang()
  const { open } = useModal()
  const [current, setCurrent] = useState(0)

  const goTo = useCallback((i: number) => {
    setCurrent((i + i18n.proj_items.length) % i18n.proj_items.length)
  }, [i18n.proj_items.length])

  const item = i18n.proj_items[current]

  const glowColors = ['#0DD9C5', '#38BDF8', '#0DD9C5', '#0AA896']

  return (
    <Modal isOpen={open === 'projects'} wide>
      <div className="font-mono text-[12px] text-mint uppercase tracking-[0.08em] mb-3 flex items-center gap-2">
        <span className="w-3.5 h-px bg-mint inline-block" />{i18n.proj_tag}
      </div>
      <h3 className="font-bricolage font-bold text-[24px] tracking-[-0.02em] mb-6">{i18n.proj_h3}</h3>

      {/* Slide */}
      <div className="border border-[var(--glass-border)] rounded-2xl overflow-hidden mb-6">
        {/* Thumb */}
        <div className="h-[200px] bg-bg-2 border-b border-[var(--line)] relative flex items-center justify-center">
          <div
            className="absolute w-[220px] h-[220px] rounded-full opacity-40"
            style={{
              background: glowColors[current],
              filter: 'blur(70px)',
              left: '20%', top: '10%'
            }}
          />
          <span className="text-[40px] z-10 relative">
            {current === 0 ? '📈' : current === 1 ? '🏢' : current === 2 ? '📍' : '🛒'}
          </span>
        </div>
        {/* Body */}
        <div className="p-6">
          <div className="font-mono text-[11.5px] text-mint mb-2">{item.tag}</div>
          <h3 className="font-bricolage font-bold text-[22px] tracking-[-0.02em] mb-2">{item.h}</h3>
          <p className="text-[14px] text-ink-dim mb-4">{item.p}</p>
          {item.href ? (
            <a href={item.href} target="_blank" rel="noopener"
              className="text-[13px] text-mint flex items-center gap-1.5 hover:gap-2.5 transition-all">
              {item.link} ↗
            </a>
          ) : (
            <span className="text-[13px] text-ink-dim">{item.link}</span>
          )}
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {i18n.proj_items.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 cursor-none
                ${i === current ? 'w-[22px] h-[7px] bg-mint' : 'w-[7px] h-[7px] bg-[var(--glass-border-hi)]'}`}
            />
          ))}
        </div>
        <div className="flex gap-2.5">
          <button onClick={() => goTo(current - 1)}
            className="w-[46px] h-[46px] rounded-full border border-[var(--glass-border-hi)]
              bg-white/[0.06] flex items-center justify-center text-ink
              hover:bg-mint hover:border-mint hover:text-white transition-all duration-200 cursor-none">
            <PrevIcon />
          </button>
          <button onClick={() => goTo(current + 1)}
            className="w-[46px] h-[46px] rounded-full border border-[var(--glass-border-hi)]
              bg-white/[0.06] flex items-center justify-center text-ink
              hover:bg-mint hover:border-mint hover:text-white transition-all duration-200 cursor-none">
            <NextIcon />
          </button>
        </div>
      </div>
    </Modal>
  )
}
