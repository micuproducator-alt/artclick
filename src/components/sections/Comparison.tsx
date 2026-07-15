import { useLang } from '../../context/LangContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import Tag from '../ui/Tag'

function CmpCell({ text }: { text: string }) {
  if (text.startsWith('✓')) return <><span className="text-mint">✓</span>{text.slice(1)}</>
  if (text.startsWith('✗')) return <><span className="text-red-400">✗</span>{text.slice(1)}</>
  if (text.startsWith('◐')) return <><span className="text-yellow-400">◐</span>{text.slice(1)}</>
  return <>{text}</>
}

export default function Comparison() {
  const { i18n } = useLang()
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section className="section-pad pb-16 md:pb-[140px] bg-bg-2">
      <div className="wrap">
        <div className="mb-10 md:mb-14 max-w-[600px]">
          <Tag>{i18n.cmp_tag}</Tag>
          <h2 className="font-bricolage font-bold text-[clamp(24px,4vw,42px)] leading-[1.1] tracking-[-0.03em]"
            dangerouslySetInnerHTML={{ __html: i18n.cmp_h2 }} />
          <p className="text-ink-dim mt-3 md:mt-4 text-[14px] md:text-[16px]">{i18n.cmp_p}</p>
        </div>

        <div ref={ref} className="reveal overflow-x-auto -webkit-overflow-scrolling-touch rounded-[16px] border border-[var(--glass-border)]">
          <table className="w-full border-collapse" style={{ minWidth: 520 }}>
            <thead>
              <tr>
                {i18n.cmp_headers.map((h, i) => (
                  <th key={i} className={`py-3 md:py-4 px-3 md:px-5 text-left font-mono text-[10px] md:text-[11.5px] uppercase tracking-[0.08em] font-medium
                    ${i === 3
                      ? 'text-mint border-b-2 border-mint bg-mint/5'
                      : 'text-ink-dim border-b border-[var(--line)]'}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {i18n.cmp_rows.map((row, ri) => (
                <tr key={ri} className="group border-b border-[var(--line)] last:border-b-0 hover:bg-white/5">
                  <td className="py-3 md:py-[18px] px-3 md:px-5 text-[12px] md:text-[13.5px] text-ink-dim">{row[0]}</td>
                  <td className="py-3 md:py-[18px] px-3 md:px-5 text-[12px] md:text-[14px] text-ink-dim"><CmpCell text={row[1]} /></td>
                  <td className="py-3 md:py-[18px] px-3 md:px-5 text-[12px] md:text-[14px] text-ink-dim"><CmpCell text={row[2]} /></td>
                  <td className="py-3 md:py-[18px] px-3 md:px-5 text-[12px] md:text-[14px] font-medium text-ink
                    bg-mint/8 border-l border-r border-mint/15 group-hover:bg-mint/14">
                    <CmpCell text={row[3]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center text-[11px] text-ink-dim mt-3 md:hidden">← swipe pentru a vedea tot tabelul</p>
      </div>
    </section>
  )
}
