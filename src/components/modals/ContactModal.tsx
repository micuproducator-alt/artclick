import { useState, useEffect } from "react";
import { useLang } from "../../context/LangContext";
import { useModal } from "../../context/ModalContext";
import Modal from "../ui/Modal";

export default function ContactModal() {
  const { i18n } = useLang();
  const { open } = useModal();
  const [sent, setSent] = useState(false);

  // Reset la inchidere
  useEffect(() => {
    if (open !== "contact") setTimeout(() => setSent(false), 400);
  }, [open]);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sub = encodeURIComponent(`Mesaj de la ${form.name}`);
    const body = encodeURIComponent(
      `Nume: ${form.name}\nEmail: ${form.email}\n\n${form.msg}`,
    );
    window.location.href = `mailto:artclickon@outlook.com?subject=${sub}&body=${body}`;
    setSent(true);
  };

  const inputCls = `w-full bg-white/5 border-2 border-white/12 rounded-xl
    px-4 py-3 text-ink text-[14px] font-inter placeholder:text-ink-faint/60
    focus:outline-none focus:border-mint focus:bg-mint/5
    focus:shadow-[0_0_0_3px_rgba(13,217,197,0.1)] transition-all duration-200 cursor-text`;

  return (
    <Modal isOpen={open === "contact"}>
      {sent ? (
        <div className="text-center py-6">
          <div className="w-14 h-14 rounded-full bg-mint/15 border border-mint/30 flex items-center justify-center mx-auto mb-5">
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
              <path
                d="M5 14L11.5 20.5L23 8"
                stroke="#0DD9C5"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="font-bricolage font-bold text-[22px] text-ink mb-2">
            Trimis!
          </h3>
          <p className="text-[13.5px] text-ink-dim">
            Revin la tine în aceeași zi.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-4 h-px bg-mint" />
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-mint">
              contact rapid
            </span>
          </div>
          <h3 className="font-bricolage font-bold text-[24px] tracking-[-0.02em] text-ink mb-1.5">
            {i18n.modal_h3}
          </h3>
          <p className="text-[13.5px] text-ink-dim mb-6 leading-[1.6]">
            {i18n.modal_sub}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.08em] text-ink-dim mb-2">
                {i18n.modal_name}
              </label>
              <input
                type="text"
                required
                placeholder={i18n.modal_name_ph}
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className={inputCls}
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.08em] text-ink-dim mb-2">
                Email
              </label>
              <input
                type="email"
                required
                placeholder={i18n.modal_email_ph}
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className={inputCls}
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.08em] text-ink-dim mb-2">
                {i18n.modal_msg}
              </label>
              <textarea
                required
                rows={4}
                placeholder={i18n.modal_msg_ph}
                value={form.msg}
                onChange={(e) =>
                  setForm((f) => ({ ...f, msg: e.target.value }))
                }
                className={`${inputCls} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-mint text-bg font-bold text-[15px] mt-1
                hover:shadow-[0_0_28px_rgba(13,217,197,0.4)] active:scale-[0.98]
                transition-all cursor-none"
            >
              Trimite mesajul →
            </button>
            <p className="text-center text-[11.5px] text-ink-faint">
              Răspuns în aceeași zi lucrătoare
            </p>
          </form>
        </>
      )}
    </Modal>
  );
}
