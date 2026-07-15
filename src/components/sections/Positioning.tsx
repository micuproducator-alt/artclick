import { useLang } from '../../context/LangContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import Tag from '../ui/Tag'

export default function Positioning() {
  const { i18n } = useLang()
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section className="section-pad bg-bg">
      <div className="wrap">
        <div className="mb-10 md:mb-14">
          <Tag>{i18n.pos_tag}</Tag>
          <h2 className="font-bricolage font-bold text-[clamp(24px,4vw,42px)] leading-[1.1] tracking-[-0.03em]"
            dangerouslySetInnerHTML={{ __html: i18n.pos_h2 }} />
          <p className="text-ink-dim mt-3 md:mt-4 text-[14px] md:text-[16px] max-w-xl">{i18n.pos_sub}</p>
        </div>

        <div ref={ref} className="reveal flex flex-col border border-[var(--glass-border)] rounded-[16px] md:rounded-[20px] overflow-hidden bg-[var(--glass)] backdrop-blur-sm">
          {i18n.pos_rows.map((row, i) => (
            <div key={i}
              className={`flex flex-col md:grid md:grid-cols-[140px_1fr] gap-2 md:gap-6
                px-4 xs:px-5 sm:px-6 md:px-8 py-5 md:py-7 border-b border-[var(--line)] last:border-b-0
                transition-colors hover:bg-white/5
                ${row.highlight ? 'bg-mint/8' : ''}`}>
              <div className="font-mono text-[10.5px] md:text-[11.5px] uppercase tracking-[0.1em] text-mint">
                {row.key}
              </div>
              <div
                className={`text-[14px] md:text-[15.5px] leading-[1.6]
                  ${row.highlight ? 'font-bricolage font-semibold md:text-[17px]' : ''}`}
                dangerouslySetInnerHTML={{ __html: row.val }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
