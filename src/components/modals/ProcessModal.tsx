import { useLang } from '../../context/LangContext'
import { useModal } from '../../context/ModalContext'
import Modal from '../ui/Modal'

export default function ProcessModal() {
  const { i18n } = useLang()
  const { open, openModal } = useModal()

  return (
    <Modal isOpen={open === 'process'} wide>
      <div className="font-mono text-[12px] text-mint uppercase tracking-[0.08em] mb-3 flex items-center gap-2">
        <span className="w-3.5 h-px bg-mint inline-block" />{i18n.proc_tag}
      </div>
      <h3 className="font-bricolage font-bold text-[26px] tracking-[-0.02em] mb-2">{i18n.proc_h3}</h3>
      <p className="text-[14px] text-ink-dim mb-7">{i18n.proc_modal_sub}</p>

      <div className="flex flex-col mb-6">
        {i18n.proc_steps.map((step, i) => (
          <div key={i} className="flex gap-4 pb-7 relative">
            {i < i18n.proc_steps.length - 1 && (
              <div className="absolute left-[18px] top-9 bottom-0 w-px bg-[var(--glass-border)]" />
            )}
            <div className="w-9 h-9 rounded-full border border-[var(--glass-border-hi)] bg-bg
              flex items-center justify-center font-mono text-[13px] text-mint flex-shrink-0 z-10">
              0{i + 1}
            </div>
            <div className="pt-1">
              <h4 className="font-bricolage font-semibold text-[15.5px] mb-1.5">{step.h}</h4>
              <p className="text-[13px] text-ink-dim leading-[1.55]">{step.p}</p>
              <span className="font-mono text-[11px] text-ink-faint mt-1.5 inline-block">{step.t}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => openModal('quote')}
        className="w-full py-3 rounded-full bg-mint border border-mint text-bg font-medium text-[14px]
          hover:bg-[#3BE3D2] transition-all">
        {i18n.proc_cta}
      </button>
    </Modal>
  )
}
