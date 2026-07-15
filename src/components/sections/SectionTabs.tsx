import { useState, useRef, useEffect } from 'react'
import { useLang } from '../../context/LangContext'
import { useModal } from '../../context/ModalContext'
import Projects from './Projects'
import Services from './Services'
import WhyArtclick from './WhyArtclick'
import Process from './Process'

export default function SectionTabs() {
  const { i18n } = useLang()
  const { openModal } = useModal()
  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [dir, setDir] = useState<'r' | 'l'>('r')
  const indRef = useRef<HTMLSpanElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const isEN = i18n.lang_toggle === 'RO'

  const tabs = [
    { label: i18n.nav_projects, icon: '◈',
      sub: isEN ? '4 proiecte live' : '4 live projects' },
    { label: i18n.nav_services, icon: '⬚',
      sub: isEN ? '5 tipuri' : '5 types' },
    { label: i18n.nav_why ?? 'De ce noi', icon: '✦',
      sub: isEN ? '3 garanții' : '3 guarantees' },
    { label: i18n.nav_process, icon: '→',
      sub: isEN ? '4 pași' : '4 steps' },
  ]

  const panels = [
    <Projects />,
    <Services />,
    <WhyArtclick />,
    <Process />,
  ]

  const switchTab = (i: number) => {
    if (i === active) return
    setDir(i > active ? 'r' : 'l')
    setPrev(active)
    setActive(i)
    setTimeout(() => setPrev(null), 450)
  }

  // Sliding indicator
  useEffect(() => {
    const btn = tabRefs.current[active]
    const ind = indRef.current
    if (!btn || !ind) return
    ind.style.left = btn.offsetLeft + 'px'
    ind.style.width = btn.offsetWidth + 'px'
  }, [active, i18n])

  return (
    <div className="relative z-10">

      {/* Sticky tab bar */}
      <div className="sticky top-[60px] xs:top-[65px] z-50
        bg-bg/90 backdrop-blur-2xl border-b border-[var(--line)]">
        <div className="wrap">
          <div className="flex items-center overflow-x-auto scrollbar-none relative">

            {/* Sliding pill indicator */}
            <span ref={indRef}
              className="absolute bottom-0 h-[2px] bg-mint rounded-full"
              style={{ transition: 'left 0.35s cubic-bezier(0.16,1,0.3,1), width 0.35s cubic-bezier(0.16,1,0.3,1)' }}
            />

            {tabs.map((tab, i) => (
              <button
                key={i}
                ref={el => { tabRefs.current[i] = el }}
                onClick={() => switchTab(i)}
                className={`flex flex-col items-start px-3 xs:px-4 sm:px-5 py-3.5 md:py-4 cursor-none
                  flex-shrink-0 transition-all duration-200 border-b-2 border-transparent
                  ${active === i ? 'text-ink' : 'text-ink-faint hover:text-ink-dim'}`}>
                <span className="text-[13px] md:text-[14px] font-medium font-inter flex items-center gap-1.5">
                  <span className="text-[9px] font-mono opacity-50">{tab.icon}</span>
                  {tab.label}
                </span>
                <span className={`text-[10px] font-mono transition-colors duration-200
                  ${active === i ? 'text-mint' : 'text-ink-faint'}`}>
                  {tab.sub}
                </span>
              </button>
            ))}

            {/* Quick contact */}
            <button
              onClick={() => openModal('quote')}
              className="ml-auto hidden md:flex items-center gap-2 px-4 py-2 my-2 mr-1 rounded-full
                bg-mint text-bg text-[13px] font-medium flex-shrink-0 cursor-none
                hover:shadow-[0_0_20px_rgba(13,217,197,0.4)] transition-all duration-200">
              {i18n.nav_cta}
            </button>
          </div>
        </div>
      </div>

      {/* Panels */}
      <div className="relative overflow-hidden">
        {panels.map((panel, i) => {
          const isActive = i === active
          const isLeaving = i === prev
          const enterX = dir === 'r' ? '32px' : '-32px'
          const exitX  = dir === 'r' ? '-32px' : '32px'

          return (
            <div key={i}
              className={isActive || isLeaving ? 'block' : 'hidden'}
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'none' : isLeaving ? `translateX(${exitX}) scale(0.98)` : `translateX(${enterX})`,
                transition: 'opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)',
                position: isLeaving ? 'absolute' : 'relative',
                top: 0, left: 0, right: 0,
              }}>
              {panel}
            </div>
          )
        })}
      </div>
    </div>
  )
}
