import { useLang } from '../../context/LangContext'
import { useModal } from '../../context/ModalContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import RevealText from '../ui/RevealText'
import Tag from '../ui/Tag'

const ICONS = [
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="6" cy="18" r="1" fill="currentColor" stroke="none"/></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>,
]

const TIMES = ['from €299', 'from €599', 'custom quote', 'from €49', 'custom quote', 'from €149']

export default function Services() {
  const { i18n } = useLang()
  const { openModal } = useModal()
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="mb-10 md:mb-14">
          <Tag>{i18n.tag_services}</Tag>
          <RevealText
            text={i18n.svc_bento_h2.replace(/<br\/>/g, ' ')} as="h2"
            className="font-bricolage font-bold text-[clamp(20px,4vw,40px)] leading-[1.1] tracking-[-0.03em]"
          />
          <p className="text-ink-dim mt-3 text-[14px] md:text-[16px] leading-[1.7] max-w-[500px]">
            {i18n.svc_bento_p}
          </p>
        </div>

        <div ref={ref} className="reveal flex flex-col divide-y divide-[var(--line)] border border-[var(--glass-border)] rounded-2xl overflow-hidden">
          {i18n.svc_bento.map((item, i) => (
            <div key={i}
              className="group flex items-center gap-4 md:gap-6 px-4 xs:px-5 sm:px-6 md:px-8 py-5 md:py-6
                bg-[var(--glass)] hover:bg-white/5 transition-all duration-200">

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center
                text-mint flex-shrink-0 group-hover:bg-mint/20 transition-colors duration-200">
                {ICONS[i]}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-bricolage font-semibold text-[15px] md:text-[17px] text-ink">
                  {item.h}
                </div>
                <div className="text-[12.5px] md:text-[13.5px] text-ink-dim mt-0.5 leading-[1.5] truncate">
                  {item.p}
                </div>
              </div>

              {/* Time badge */}
              <div className="hidden sm:flex items-center text-[12.5px] font-medium text-ink-dim
                px-3 py-1 rounded-full border border-white/10 flex-shrink-0">
                {TIMES[i]}
              </div>

              {/* CTA */}
              <button
                onClick={() => openModal('quote')}
                className="flex-shrink-0 flex items-center gap-1.5 text-[13px] text-mint font-medium
                  opacity-0 group-hover:opacity-100 transition-all duration-200
                  -translate-x-2 group-hover:translate-x-0">
                Get a quote
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Quick CTA */}
        <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
          <p className="text-[13px] text-ink-faint">
            Not sure which service you need?
          </p>
          <button onClick={() => openModal('quote')}
            className="text-[13px] text-mint font-medium hover:underline">
            Tell us about your project →
          </button>
        </div>
      </div>
    </section>
  )
}
