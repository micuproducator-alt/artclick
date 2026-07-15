import { useLang } from '../../context/LangContext'
import { useModal } from '../../context/ModalContext'
import Modal from '../ui/Modal'

export default function ServicesModal() {
  const { i18n } = useLang()
  const { open, openModal } = useModal()

  const icons = ['⬚', '🛒', '⬡', '✉', '⬢', '🔧']

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
            <div>
              <h4 className="font-bricolage font-semibold text-[15.5px] mb-1">{item.h}</h4>
              <p className="text-[13px] text-ink-dim leading-[1.55]">{item.p}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => openModal('quote')}
        className="w-full py-3 rounded-full bg-mint border border-mint text-bg font-medium text-[14px]
          hover:shadow-[0_0_28px_rgba(13,217,197,0.4)] transition-all cursor-none flex items-center justify-center gap-2">
        {i18n.svc_cta} ↗
      </button>
    </Modal>
  )
}
