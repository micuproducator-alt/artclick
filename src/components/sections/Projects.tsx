import { useLang } from '../../context/LangContext'
import { useModal } from '../../context/ModalContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import RevealText from '../ui/RevealText'
import Tag from '../ui/Tag'
import BrowserFrame from '../ui/BrowserFrame'
import type { WorkCard } from '../../types'

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ProjectCard({ card, featured = false }: { card: WorkCard; featured?: boolean }) {
  const body = (
    <div className={featured ? 'flex flex-col justify-center' : ''}>
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-dim">{card.tag}</span>
        {card.badge && (
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-mint/10 text-mint border border-mint/25">
            {card.badge}
          </span>
        )}
      </div>
      <h3 className={`font-bricolage font-bold tracking-[-0.02em] leading-[1.15] text-ink mb-2
        ${featured ? 'text-[24px] md:text-[30px]' : 'text-[19px] md:text-[21px]'}`}>
        {card.h}
      </h3>
      <p className={`text-ink-dim leading-[1.65] mb-4 ${featured ? 'text-[14.5px] max-w-[440px]' : 'text-[13.5px]'}`}>
        {card.p}
      </p>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-1.5 flex-wrap">
          {card.pills?.map(pill => (
            <span key={pill} className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.07] text-ink-dim">
              {pill}
            </span>
          ))}
        </div>
        {card.href && (
          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-mint group-hover:gap-2.5 transition-all">
            {card.link} <ArrowIcon />
          </span>
        )}
      </div>
    </div>
  )

  const frame = card.image && (
    <div className="overflow-hidden rounded-xl">
      <BrowserFrame src={card.image} alt={`${card.h} — screenshot`} url={card.url}
        className="transition-transform duration-500 ease-out group-hover:scale-[1.015]" />
    </div>
  )

  const cls = `group block h-full rounded-2xl border border-white/[0.08] bg-bg-2/80 p-4 sm:p-5
    hover:border-mint/30 transition-colors duration-300`

  const inner = featured ? (
    <div className="grid md:grid-cols-[1.25fr_1fr] gap-6 md:gap-10 items-center">
      {frame}
      <div className="px-1 md:px-0 md:pr-4">{body}</div>
    </div>
  ) : (
    <div className="flex flex-col gap-5 h-full">
      {frame}
      <div className="px-1 pb-1">{body}</div>
    </div>
  )

  return card.href ? (
    <a href={card.href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${card.h} — ${card.link}`}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

function YourProjectBanner() {
  const { openModal } = useModal()
  return (
    <button onClick={() => openModal('quote')}
      className="group w-full text-left rounded-2xl border border-dashed border-mint/25 hover:border-mint/50
        bg-mint/[0.03] hover:bg-mint/[0.06] transition-colors duration-300
        px-6 py-6 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h3 className="font-bricolage font-semibold text-[18px] text-ink mb-1">Your project could be next</h3>
        <p className="text-[13.5px] text-ink-dim">Tell us what you're building and get a fixed-price proposal within 24 hours.</p>
      </div>
      <span className="inline-flex items-center gap-2 text-[14px] font-medium text-mint flex-shrink-0 group-hover:gap-3 transition-all">
        Start a project <ArrowIcon />
      </span>
    </button>
  )
}

export default function Projects() {
  const { i18n } = useLang()
  const headRef = useScrollReveal<HTMLDivElement>()
  const gridRef = useScrollReveal<HTMLDivElement>()
  const [featured, ...rest] = i18n.work_cards

  return (
    <section id="work" className="section-pad scroll-mt-[80px]">
      <div className="wrap">
        <div ref={headRef} className="reveal flex flex-col xs:flex-row xs:justify-between xs:items-end mb-10 md:mb-12 gap-3">
          <div>
            <Tag>{i18n.work_tag}</Tag>
            <RevealText text={i18n.work_h2} as="h2"
              className="font-bricolage font-bold text-[clamp(22px,4vw,40px)] leading-[1.1] tracking-[-0.03em]" />
          </div>
          <div className="font-mono text-[12px] text-ink-faint flex-shrink-0">
            <span className="text-mint">{String(i18n.work_cards.length).padStart(2, '0')}</span> {i18n.work_counter}
          </div>
        </div>

        <div ref={gridRef} className="reveal flex flex-col gap-4 sm:gap-5">
          <ProjectCard card={featured} featured />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {rest.map(card => <ProjectCard key={card.h} card={card} />)}
          </div>
          <YourProjectBanner />
        </div>
      </div>
    </section>
  )
}
