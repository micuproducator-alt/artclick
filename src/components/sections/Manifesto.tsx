import { useLang } from '../../context/LangContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import Tag from '../ui/Tag'

export default function Manifesto() {
  const { i18n } = useLang()
  const leftRef = useScrollReveal<HTMLDivElement>()
  const rightRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="section-pad" style={{ background: 'linear-gradient(135deg, #EEF4FF 0%, #1E1040 100%)' }}>
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div ref={leftRef} className="reveal">
            <Tag>{i18n.mani_tag}</Tag>
            <blockquote
              className="font-bricolage font-semibold leading-[1.4] text-ink tracking-[-0.02em] mt-2"
              style={{ fontSize: 'clamp(20px,3vw,26px)' }}
            >
              {i18n.mani_quote}
            </blockquote>
            <div className="inline-flex items-center gap-3 mt-5 md:mt-7 px-3 md:px-4 py-3
              border border-[var(--glass-border)] rounded-full bg-[var(--glass)]">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-bricolage font-bold text-[14px] text-bg flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #0DD9C5, #38BDF8)' }}>
                A
              </div>
              <div>
                <span className="text-[13px] text-bg font-medium block">{i18n.mani_founder}</span>
                <span className="text-[12px] text-ink-dim block mt-0.5">{i18n.mani_role}</span>
              </div>
            </div>
          </div>

          <div ref={rightRef} className="reveal text-[14.5px] text-ink-dim leading-[1.8] space-y-4">
            <p>{i18n.mani_p1}</p>
            <p>{i18n.mani_p2}</p>
            <p>{i18n.mani_p3}</p>
            <p>{i18n.mani_p4}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
