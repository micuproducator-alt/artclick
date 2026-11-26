import { useLang } from '../../context/LangContext'
import { useModal } from '../../context/ModalContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import RevealText from '../ui/RevealText'
import MagneticBtn from '../ui/MagneticBtn'

export default function CTA() {
  const { i18n } = useLang()
  const { openModal } = useModal()
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section className="section-pad pb-20 md:pb-32">
      <div className="wrap">
        <div ref={ref} className="reveal relative rounded-[24px] md:rounded-[32px]
          overflow-hidden border border-[var(--glass-border)]
          p-8 sm:p-12 md:p-16
          flex flex-col md:flex-row md:items-center md:justify-between gap-8 lg:gap-12">

          {/* Gradient backgrounds */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_0%_0%,rgba(13,217,197,0.07),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_100%_100%,rgba(56,189,248,0.05),transparent_70%)]" />
          <div className="absolute inset-0 bg-[var(--glass)]" />

          <div className="relative z-10 flex-1">
            {/* Urgency */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5
              border border-white/10 bg-white/[0.03] text-[12px] text-ink-dim">
              <span className="w-1.5 h-1.5 rounded-full bg-mint flex-shrink-0" />
              {i18n.urgency}
            </div>

            <RevealText text={i18n.h2_cta.replace(/<br\/>/g, ' ')} as="h2"
              className="font-bricolage font-bold text-[clamp(24px,4vw,44px)] leading-[1.1] tracking-[-0.03em] max-w-[480px] mb-4" />

            <p className="text-ink-dim text-[14px] md:text-[15px] leading-[1.7] max-w-[420px]">
              {i18n.cta_p}
            </p>

            {/* Trust signals inline */}
            <div className="flex flex-wrap gap-4 mt-5">
              {['Reply within 24h', 'Free quote', 'No obligation'].map(s => (
                <span key={s} className="flex items-center gap-1.5 text-[12px] text-ink-dim font-mono">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#0DD9C5" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <MagneticBtn onClick={() => openModal('quote')}
              className="w-full lg:w-auto justify-center text-[14px] md:text-[15px] px-7 md:px-9 py-4">
              {i18n.cta_btn}
            </MagneticBtn>
          </div>
        </div>
      </div>
    </section>
  )
}
