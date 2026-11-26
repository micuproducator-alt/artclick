import { useLang } from '../../context/LangContext'
import { useModal } from '../../context/ModalContext'
import Modal from '../ui/Modal'

export default function ServicesModal() {
  const { i18n } = useLang()
  const { open, openModal } = useModal()

  const svg = (d: JSX.Element) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  )
  const icons = [
    svg(<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></>),
    svg(<><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></>),
    svg(<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></>),
    svg(<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>),
    svg(<><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/></>),
    svg(<><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></>),
    svg(<><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></>),
  ]

  return (
    <Modal isOpen={open === 'services'} wide>
      <div className="font-mono text-[12px] text-mint uppercase tracking-[0.08em] mb-3 flex items-center gap-2">
        <span className="w-3.5 h-px bg-mint inline-block" />{i18n.svc_tag}
      </div>
      <h3 className="font-bricolage font-bold text-[26px] tracking-[-0.02em] mb-2">{i18n.svc_h3}</h3>
      <p className="text-[14px] text-ink-dim mb-7">{i18n.svc_sub}</p>

      <div className="flex flex-col gap-2.5 mb-6">
        {i18n.svc_items.map((item, i) => (
          <div key={i}
            className="flex items-start gap-4 p-4 rounded-[14px] border border-[var(--glass-border)]
              bg-[var(--glass)] hover:border-[var(--glass-border-hi)] hover:shadow-md transition-all">
            <div className="w-[38px] h-[38px] rounded-[10px] bg-mint/10 flex items-center justify-center flex-shrink-0 text-mint">
              {icons[i]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-3 mb-1">
                <h4 className="font-bricolage font-semibold text-[15.5px]">{item.h}</h4>
                {item.price && (
                  <span className="font-mono text-[11.5px] text-mint whitespace-nowrap flex-shrink-0">{item.price}</span>
                )}
              </div>
              <p className="text-[13px] text-ink-dim leading-[1.55]">{item.p}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => openModal('quote')}
        className="w-full py-3 rounded-full bg-mint border border-mint text-bg font-medium text-[14px]
          hover:bg-[#3BE3D2] transition-all flex items-center justify-center gap-2">
        {i18n.svc_cta} ↗
      </button>
    </Modal>
  )
}
