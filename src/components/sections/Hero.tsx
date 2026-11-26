import { Fragment, useEffect, useState } from 'react'
import { useLang } from '../../context/LangContext'
import { useModal } from '../../context/ModalContext'
import { useCounter } from '../../hooks/useCounter'
import MagneticBtn from '../ui/MagneticBtn'
import BrowserFrame from '../ui/BrowserFrame'

function ProofItem({ num, unit, label }: { num: string; unit: string; label: string }) {
  const { display, ref } = useCounter(num)
  return (
    <div className="flex flex-col gap-1.5 px-4 md:px-6 py-5 md:py-6">
      <span ref={ref} className="font-bricolage font-bold text-[26px] md:text-[32px] text-ink leading-none tracking-[-0.02em]">
        {display}{unit && <small className="text-[14px] md:text-[16px] ml-1 font-bricolage text-ink-dim font-semibold">{unit}</small>}
      </span>
      <span className="text-[12px] md:text-[13px] text-ink-dim leading-snug">{label}</span>
    </div>
  )
}

function RevealH1({ html }: { html: string }) {
  const [vis, setVis] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVis(true), 200); return () => clearTimeout(t) }, [])
  const parts = html.split(/(<span[^>]*>.*?<\/span>)/g)
  return (
    <h1 className="hero-h1 font-bricolage font-bold leading-[1.06] tracking-[-0.035em] mb-5 md:mb-6 text-ink"
      style={{ fontSize: 'clamp(34px, 4.6vw, 58px)', maxWidth: 640 }}
      aria-label={html.replace(/<[^>]+>/g, '')}>
      {parts.map((part, pi) => {
        const inner = part.startsWith('<span') ? part.replace(/<span[^>]*>(.*?)<\/span>/, '$1') : null
        const words = (inner ?? part.replace(/<br\/>/g, ' ')).split(' ').filter(Boolean)
        return words.map((word, wi) => (
          <Fragment key={`${pi}-${wi}`}>{(pi > 0 || wi > 0) && ' '}<span className="inline-block overflow-hidden" style={{ verticalAlign: 'bottom' }}>
            <span className={inner ? 'grad-text inline-block' : 'inline-block'} style={{
              transform: vis ? 'translateY(0)' : 'translateY(110%)',
              opacity: vis ? 1 : 0,
              transition: `transform 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease`,
              transitionDelay: `${200 + (pi * 3 + wi) * 55}ms`,
            }}>{word}</span>
          </span></Fragment>
        ))
      })}
    </h1>
  )
}

export default function Hero() {
  const { i18n } = useLang()
  const { openModal } = useModal()
  const [vis, setVis] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t) }, [])
  const fade = (delay: number) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'none' : 'translateY(14px)',
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  })
  const [first, second] = i18n.work_cards

  return (
    <section className="relative z-10 overflow-hidden pt-[110px] pb-12 md:pt-[140px] md:pb-16">
      {/* soft background light */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none
        bg-[radial-gradient(ellipse_60%_50%_at_75%_30%,rgba(13,217,197,0.08),transparent_70%)]" />

      <div className="wrap w-full relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-14 items-center">
          {/* Copy */}
          <div>
            <div style={fade(0)}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10
                rounded-full bg-white/[0.03] text-[12px] text-ink-dim mb-6 w-fit">
              <span className="w-[6px] h-[6px] rounded-full bg-mint flex-shrink-0" />
              {i18n.status}
            </div>

            <RevealH1 html={i18n.h1} />

            <p style={fade(0.2)} className="text-[15px] md:text-[17px] text-ink-dim max-w-[540px] mb-8 leading-[1.7]">
              {i18n.hero_p}
            </p>

            <div style={fade(0.3)} className="flex flex-col xs:flex-row gap-3 mb-7">
              <MagneticBtn onClick={() => openModal('quote')} className="w-full xs:w-auto justify-center">{i18n.cta_start}</MagneticBtn>
              <MagneticBtn variant="ghost" onClick={() => openModal('projects')} className="w-full xs:w-auto justify-center">{i18n.cta_projects}</MagneticBtn>
            </div>

            <div style={fade(0.4)} className="flex gap-x-5 gap-y-2 flex-wrap text-[13px] text-ink-dim">
              {i18n.for_who.map((pill, i) => (
                <span key={i} className="inline-flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6L5 9L10 3" stroke="#0DD9C5" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                  {pill.replace(/^✓\s*/, '')}
                </span>
              ))}
            </div>
          </div>

          {/* Work showcase */}
          <button type="button" onClick={() => openModal('projects')} style={fade(0.35)}
            aria-label={i18n.cta_projects}
            className="relative block w-full text-left pb-10 sm:pb-14 lg:pb-16 lg:pl-8">
            <BrowserFrame src={first.image!} alt={`${first.h} — screenshot`} url={first.url} eager />
            <div className="absolute left-0 bottom-0 w-[58%] hidden sm:block">
              <BrowserFrame src={second.image!} alt={`${second.h} — screenshot`} url={second.url} eager
                className="shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]" />
            </div>
          </button>
        </div>

        {/* Proof */}
        <div style={fade(0.5)}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 border-t border-white/[0.08]">
          {i18n.proof_items.map((item, i) => (
            <div key={i} className={`border-white/[0.08] ${i % 2 === 1 ? 'border-l' : ''} ${i === 2 ? 'md:border-l' : ''} ${i >= 2 ? 'border-t md:border-t-0' : ''}`}>
              <ProofItem num={item.num} unit={item.unit} label={item.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
