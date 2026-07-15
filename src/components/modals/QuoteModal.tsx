import { useState, useEffect } from "react";
import { useModal } from "../../context/ModalContext";
import Modal from "../ui/Modal";

type Status = "idle" | "loading" | "success";
interface Form {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  business: string;
  hasDescription: string;
  hasLogo: string;
  deadline: string;
}
const EMPTY: Form = {
  lastName: "",
  firstName: "",
  email: "",
  phone: "",
  business: "",
  hasDescription: "",
  hasLogo: "",
  deadline: "",
};

function RadioCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
        transition-all duration-200 cursor-none border-2
        ${
          selected
            ? "border-mint bg-mint/12 shadow-[0_0_0_1px_rgba(13,217,197,0.25)]"
            : "border-white/15 bg-white/4 hover:border-white/30 hover:bg-white/7"
        }`}
    >
      <span
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
        transition-all duration-200
        ${selected ? "border-mint bg-mint" : "border-white/40"}`}
      >
        {selected && (
          <span className="w-[7px] h-[7px] rounded-full bg-bg block" />
        )}
      </span>
      <span
        className={`text-[13.5px] font-medium ${selected ? "text-ink" : "text-ink-dim"}`}
      >
        {label}
      </span>
    </button>
  );
}

function Pill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full border-2 text-[13px] font-medium
        transition-all duration-200 cursor-none
        ${
          selected
            ? "border-mint bg-mint/20 text-mint shadow-[0_0_12px_rgba(13,217,197,0.2)]"
            : "border-white/15 bg-white/4 text-ink-dim hover:border-white/30 hover:text-ink"
        }`}
    >
      {label}
    </button>
  );
}

export default function QuoteModal() {
  const { open } = useModal();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState<Form>(EMPTY);

  // Reset complet la inchidere
  useEffect(() => {
    if (open !== "quote") {
      const t = setTimeout(() => {
        setStep(1);
        setStatus("idle");
        setForm(EMPTY);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [open]);
  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const inp =
    (k: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      set(k, e.target.value);

  const step1Valid =
    form.lastName && form.firstName && form.email.includes("@") && form.phone;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.business.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.lastName} ${form.firstName}`,
          email: form.email,
          phone: form.phone,
          business: form.business,
          hasDescription: form.hasDescription,
          hasLogo: form.hasLogo,
          deadline: form.deadline,
          message: form.business,
          type: "Cerere ofertă",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      const sub = encodeURIComponent(
        `Cerere ofertă — ${form.lastName} ${form.firstName}`,
      );
      const body = encodeURIComponent(
        `Nume: ${form.lastName} ${form.firstName}\nEmail: ${form.email}\nTelefon: ${form.phone}\n\n` +
          `Ce face firma: ${form.business}\nDescrierea pregătită: ${form.hasDescription}\n` +
          `Logo și culori: ${form.hasLogo}\nTermen: ${form.deadline}`,
      );
      window.location.href = `mailto:artclickon@outlook.com?subject=${sub}&body=${body}`;
      setStatus("success");
    }
  };

  const inputCls = `w-full bg-white/5 border-2 border-white/12 rounded-xl
    px-4 py-3 text-ink text-[14px] font-inter placeholder:text-ink-faint/60
    focus:outline-none focus:border-mint focus:bg-mint/5
    focus:shadow-[0_0_0_3px_rgba(13,217,197,0.1)] transition-all duration-200 cursor-text`;
  const lbl = (t: string) => (
    <label className="block font-mono text-[11px] uppercase tracking-[0.08em] text-ink-dim mb-2">
      {t}
    </label>
  );

  return (
    <Modal isOpen={open === "quote"} wide>
      {status === "success" ? (
        <div className="text-center py-6">
          <div className="relative w-16 h-16 mx-auto mb-5">
            <div
              className="absolute inset-0 rounded-full bg-mint/20 animate-ping"
              style={{ animationDuration: "1.8s" }}
            />
            <div className="relative w-16 h-16 rounded-full bg-mint/15 border border-mint/30 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M5 14L11.5 20.5L23 8"
                  stroke="#0DD9C5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <h3 className="font-bricolage font-bold text-[24px] text-ink mb-3">
            Cererea a fost trimisă!
          </h3>
          <p className="text-[14px] text-ink-dim leading-[1.75] max-w-[280px] mx-auto mb-6">
            Revin cu o ofertă personalizată în{" "}
            <strong className="text-mint">maximum 24 de ore.</strong>
          </p>
          {[
            "✓  Email de confirmare trimis",
            "✓  Ofertă cu preț fix în 24h",
            "✓  Te sun personal cu detalii",
          ].map((t, i) => (
            <div key={i} className="text-[13px] text-mint font-mono mb-1.5">
              {t}
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-4 h-px bg-mint" />
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-mint">
                cerere ofertă gratuită
              </span>
            </div>
            <h3 className="font-bricolage font-bold text-[24px] tracking-[-0.02em] text-ink mb-1.5">
              Spune-mi despre proiectul tău
            </h3>
            <p className="text-[13.5px] text-ink-dim leading-[1.6]">
              Completează formularul și primești o ofertă personalizată în 24h.
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-7">
            {[
              { n: 1, label: "Date personale" },
              { n: 2, label: "Proiectul tău" },
            ].map(({ n, label }) => {
              const done = step > n;
              const active = step === n;
              return (
                <div
                  key={n}
                  className={`flex items-center gap-2 ${n < 2 ? "flex-1" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[11px] font-bold flex-shrink-0 border-2 transition-all duration-300
                    ${done ? "border-mint bg-mint text-bg" : active ? "border-mint bg-mint/15 text-mint" : "border-white/20 text-ink-faint"}`}
                  >
                    {done ? (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M1.5 6L4.5 9L10.5 3"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      n
                    )}
                  </div>
                  <span
                    className={`text-[12.5px] font-medium ${active || done ? "text-ink" : "text-ink-faint"}`}
                  >
                    {label}
                  </span>
                  {n < 2 && (
                    <div
                      className="flex-1 h-px mx-1 transition-colors duration-300"
                      style={{
                        background: done ? "#0DD9C5" : "rgba(255,255,255,0.1)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  {lbl("Nume *")}
                  <input
                    type="text"
                    placeholder="Popescu"
                    value={form.lastName}
                    onChange={inp("lastName")}
                    className={inputCls}
                  />
                </div>
                <div>
                  {lbl("Prenume *")}
                  <input
                    type="text"
                    placeholder="Ion"
                    value={form.firstName}
                    onChange={inp("firstName")}
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                {lbl("Email *")}
                <input
                  type="email"
                  placeholder="ion@firma.ro"
                  value={form.email}
                  onChange={inp("email")}
                  className={inputCls}
                />
              </div>
              <div>
                {lbl("Număr de telefon *")}
                <input
                  type="tel"
                  placeholder="07XX XXX XXX"
                  value={form.phone}
                  onChange={inp("phone")}
                  className={inputCls}
                />
                <p className="text-[11.5px] text-ink-faint mt-1.5">
                  Te sun personal în 24h cu oferta
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (step1Valid) setStep(2);
                }}
                disabled={!step1Valid}
                className="w-full py-3.5 rounded-full bg-mint text-bg font-bold text-[15px] mt-2
                  hover:shadow-[0_0_28px_rgba(13,217,197,0.45)] active:scale-[0.98]
                  transition-all cursor-none disabled:opacity-25"
              >
                Continuă →
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={submit} className="flex flex-col gap-6">
              <div>
                {lbl("Ce face firma dvs.? *")}
                <textarea
                  placeholder="Ex: Suntem o firmă de instalații din Cluj, servim clienți rezidențiali și companii..."
                  value={form.business}
                  onChange={inp("business")}
                  rows={3}
                  required
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div>
                {lbl("Aveți deja descrierea pregătită pentru site?")}
                <div className="flex flex-col gap-2">
                  {[
                    "Da, am textele gata",
                    "Parțial, am câteva idei",
                    "Nu, am nevoie de ajutor",
                  ].map((opt) => (
                    <RadioCard
                      key={opt}
                      label={opt}
                      selected={form.hasDescription === opt}
                      onClick={() => set("hasDescription", opt)}
                    />
                  ))}
                </div>
              </div>

              <div>
                {lbl("Aveți logo și paletă de culori?")}
                <div className="flex flex-col gap-2">
                  {[
                    "Da, am logo + culori definite",
                    "Am logo, dar fără culori stabilite",
                    "Nu am nimic pregătit",
                  ].map((opt) => (
                    <RadioCard
                      key={opt}
                      label={opt}
                      selected={form.hasLogo === opt}
                      onClick={() => set("hasLogo", opt)}
                    />
                  ))}
                </div>
              </div>

              <div>
                {lbl("Care este termenul dorit?")}
                <div className="flex flex-wrap gap-2">
                  {[
                    "Urgent (1 săptămână)",
                    "2–3 săptămâni",
                    "O lună",
                    "Fără urgență",
                  ].map((opt) => (
                    <Pill
                      key={opt}
                      label={opt}
                      selected={form.deadline === opt}
                      onClick={() => set("deadline", opt)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-full border-2 border-white/15 text-ink-dim text-[13.5px]
                    hover:border-white/30 hover:text-ink transition-all cursor-none flex-shrink-0"
                >
                  ← Înapoi
                </button>
                <button
                  type="submit"
                  disabled={!form.business.trim() || status === "loading"}
                  className="flex-1 py-3 rounded-full bg-mint text-bg font-bold text-[15px]
                    hover:shadow-[0_0_28px_rgba(13,217,197,0.45)] active:scale-[0.98]
                    transition-all cursor-none disabled:opacity-25 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="animate-spin"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray="31.4"
                          strokeDashoffset="10"
                          strokeLinecap="round"
                        />
                      </svg>
                      Se trimite...
                    </>
                  ) : (
                    "Trimite cererea →"
                  )}
                </button>
              </div>
              <p className="text-center text-[11.5px] text-ink-faint">
                Zero spam · Răspuns garantat în 24h
              </p>
            </form>
          )}
        </>
      )}
    </Modal>
  );
}
