import { useLang } from '../../context/LangContext'
import { useModal } from '../../context/ModalContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useTilt } from '../../hooks/useTilt'
import { useProjectCanvas } from '../../hooks/useProjectCanvas'
import RevealText from '../ui/RevealText'
import Tag from '../ui/Tag'
import type { WorkCard } from '../../types'

type PT = 'trading' | 'firma' | 'locallio' | 'pretcinstit'

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ProjectCard({ card, type, index }: { card: WorkCard; type: PT; index: number }) {
  const canvasRef = useProjectCanvas(type)
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>()

  const nums = ['01', '02', '03', '04']

  const inner = (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group/card wcard relative rounded-[20px] overflow-hidden h-full
        border border-[var(--glass-border)] bg-bg-2
        transition-[border-color,box-shadow] duration-500
        hover:border-mint/30 hover:shadow-[0_24px_64px_rgba(13,217,197,0.1)]
        [transform-style:preserve-3d] will-change-transform"
      style={{ cursor: 'none', minHeight: 240 }}
    >
      {/* Canvas bg */}
      <canvas ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-45 group-hover/card:opacity-70 transition-opacity duration-500"
        style={{ pointerEvents: 'none' }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-bg-2/30 to-bg-2/80
        group-hover/card:to-bg-2/60 transition-all duration-500" />
      {/* Mouse spotlight */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(13,217,197,0.06), transparent 60%)' }}
      />
      {/* Watermark number */}
      <div className="absolute bottom-0 right-3 font-bricolage font-black pointer-events-none select-none leading-none
        text-white/[0.03] group-hover/card:text-mint/[0.07] transition-colors duration-500"
        style={{ fontSize: 'clamp(52px, 9vw, 100px)' }}>
        {nums[index]}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-5 xs:p-6 sm:p-7" style={{ minHeight: 240 }}>
        {/* Tag */}
        <div className="font-mono text-[9.5px] xs:text-[10.5px] uppercase tracking-[0.12em]
          text-mint/60 group-hover/card:text-mint mb-auto pb-5 flex items-center gap-2 transition-colors duration-300">
          <span className="w-3 h-px bg-mint/40 group-hover/card:bg-mint group-hover/card:w-5 transition-all duration-400 inline-block" />
          {card.tag}
        </div>

        <div>
          <h3 className="font-bricolage font-bold tracking-[-0.025em] mb-2 leading-[1.1] text-ink"
            style={{ fontSize: 'clamp(16px, 2.5vw, 26px)' }}>
            {card.h}
          </h3>
          <p className="text-[12px] xs:text-[13px] text-ink-dim leading-[1.65] mb-4" style={{ maxWidth: 380 }}>
            {card.p}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-2">
            {/* Pills */}
            <div className="flex gap-1 flex-wrap">
              {card.pills?.map(pill => (
                <span key={pill}
                  className="font-mono text-[9.5px] xs:text-[10.5px] px-2 py-0.5 rounded-full
                    border border-white/10 text-ink-faint group-hover/card:border-mint/20 transition-colors duration-300">
                  {pill}
                </span>
              ))}
            </div>
            {/* Arrow + link */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {card.href && (
                <span className="font-mono text-[10px] text-mint opacity-0 group-hover/card:opacity-100
                  -translate-x-2 group-hover/card:translate-x-0 transition-all duration-300">
                  {card.link}
                </span>
              )}
              <div className={`w-8 h-8 xs:w-9 xs:h-9 rounded-full border flex items-center justify-center
                transition-all duration-400 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
                ${card.href
                  ? 'border-white/15 text-ink-dim group-hover/card:bg-mint group-hover/card:border-mint group-hover/card:text-bg -rotate-45 group-hover/card:rotate-0'
                  : 'border-white/10 text-ink-faint/40'}`}>
                <ArrowIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (card.href) {
    return (
      <a href={card.href} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    )
  }
  return <div>{inner}</div>
}

// Card "Proiectul tău"
function YourProjectCard() {
  const { openModal } = useModal()
  const { i18n } = useLang()
  const isRO = i18n.lang_toggle === 'EN'

  return (
    <div onClick={() => openModal('quote')}
      className="group relative rounded-[20px] overflow-hidden
        border-2 border-dashed border-mint/20
        bg-mint/3 hover:border-mint/45 hover:bg-mint/6
        transition-all duration-400 cursor-none
        flex items-center justify-center p-6"
      style={{ minHeight: 180 }}>
      <div className="text-center">
        <div className="w-11 h-11 rounded-full border border-mint/30 flex items-center justify-center
          mx-auto mb-3 group-hover:border-mint/60 group-hover:bg-mint/10 transition-all duration-300">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="#0DD9C5" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <h3 className="font-bricolage font-semibold text-[15px] text-ink mb-1">
          {isRO ? 'Proiectul tău următor' : 'Your next project'}
        </h3>
        <p className="text-[12px] text-ink-dim mb-3">
          {isRO ? 'Vrei să fii aici?' : 'Want to be here?'}
        </p>
        <span className="font-mono text-[11.5px] text-mint flex items-center justify-center gap-1.5
          group-hover:gap-2.5 transition-all">
          {isRO ? 'Începe un proiect' : 'Start a project'} →
        </span>
      </div>
    </div>
  )
}

export default function Projects() {
  const { i18n } = useLang()
  const headRef = useScrollReveal<HTMLDivElement>()
  const gridRef = useScrollReveal<HTMLDivElement>()

  const types: PT[] = ['trading', 'firma', 'locallio', 'pretcinstit']

  return (
    <section id="proiecte" className="section-pad scroll-mt-[80px]">
      <div className="wrap">

        {/* Header */}
        <div ref={headRef} className="reveal flex flex-col xs:flex-row xs:justify-between xs:items-end mb-10 md:mb-14 gap-3">
          <div>
            <Tag>{i18n.work_tag}</Tag>
            <RevealText text={i18n.work_h2} as="h2"
              className="font-bricolage font-bold text-[clamp(22px,4vw,40px)] leading-[1.1] tracking-[-0.03em]" />
          </div>
          <div className="font-mono text-[12px] text-ink-faint flex-shrink-0">
            <span className="text-mint">04</span> {i18n.work_counter}
          </div>
        </div>

        {/* Grid — 4 proiecte + placeholder */}
        <div ref={gridRef} className="reveal grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
          {/* Proiect 1 - featured, full width pe xs+ */}
          <div className="xs:col-span-2">
            <ProjectCard card={i18n.work_cards[0]} type={types[0]} index={0} />
          </div>
          {/* Proiect 2 */}
          <ProjectCard card={i18n.work_cards[1]} type={types[1]} index={1} />
          {/* Proiect 3 */}
          <ProjectCard card={i18n.work_cards[2]} type={types[2]} index={2} />
          {/* Proiect 4 — Preț Cinstit */}
          <ProjectCard card={i18n.work_cards[3]} type={types[3]} index={3} />
          {/* Placeholder */}
          <YourProjectCard />
        </div>

      </div>
    </section>
  )
}
