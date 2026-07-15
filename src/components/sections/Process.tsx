import { useLang } from '../../context/LangContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import RevealText from '../ui/RevealText'
import Tag from '../ui/Tag'

export default function Process() {
  const { i18n } = useLang()
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="mb-10 md:mb-14 max-w-[560px]">
          <Tag>{i18n.tag_process}</Tag>
          <RevealText text={i18n.h2_process.replace(/<br\/>/g, ' ')} as="h2"
            className="font-bricolage font-bold text-[clamp(20px,4vw,40px)] leading-[1.1] tracking-[-0.03em]" />
          <p className="text-ink-dim mt-3 text-[14px] md:text-[15px] leading-[1.7]">{i18n.proc_sub}</p>
        </div>

        {/* Timeline */}
        <div ref={ref} className="reveal flex flex-col gap-0">
          {i18n.proc_steps_ext.map((step, i) => (
            <div key={i} className="group flex gap-5 md:gap-8 relative">
              {/* Connector line */}
              {i < i18n.proc_steps_ext.length - 1 && (
                <div className="absolute left-[19px] top-[44px] bottom-0 w-px bg-[var(--line)]
                  group-hover:bg-mint/20 transition-colors duration-500" />
              )}

              {/* Step circle */}
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full border border-[var(--glass-border)]
                  bg-[var(--glass)] flex items-center justify-center
                  font-mono text-[12px] text-mint font-medium z-10 relative
                  group-hover:border-mint/40 group-hover:bg-mint/8
                  transition-all duration-300">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Content */}
              <div className="pb-8 md:pb-10 flex-1">
                <div className="flex items-center gap-3 mb-1.5">
                  <h3 className="font-bricolage font-semibold text-[16px] md:text-[18px] text-ink">
                    {step.h}
                  </h3>
                  <span className="font-mono text-[10px] text-ink-faint hidden sm:block">
                    {step.t}
                  </span>
                </div>
                <p className="text-[13.5px] md:text-[14px] text-ink-dim leading-[1.65] max-w-[560px]">
                  {step.p}
                </p>
                <span className="font-mono text-[10px] text-ink-faint mt-1 block sm:hidden">
                  {step.t}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
