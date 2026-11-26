import { useLang } from "../../context/LangContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Tag from "../ui/Tag";

const NUMS = ["G01", "G02", "G03"];

export default function WhyArtcllick() {
  const { i18n } = useLang();
  const guarantees = i18n.why_cards.slice(0, 3);
  const rest = i18n.why_cards.slice(3);
  const ref = useScrollReveal<HTMLDivElement>();
  const ref2 = useScrollReveal<HTMLDivElement>();

  return (
    <section className="section-pad bg-bg-2">
      <div className="wrap">
        <div className="mb-10 md:mb-16">
          <Tag>{i18n.why_tag}</Tag>
          <h2
            className="font-bricolage font-bold text-[clamp(20px,4vw,40px)] leading-[1.1] tracking-[-0.03em]"
            dangerouslySetInnerHTML={{ __html: i18n.why_h2 }}
          />
        </div>

        {/* 3 garanții — mari, bold, imediat vizibile */}
        <div
          ref={ref}
          className="reveal grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-14"
        >
          {guarantees.map((card, i) => (
            <div
              key={i}
              className="group relative border border-[var(--glass-border)] rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8
                bg-[var(--glass)] hover:border-mint/40 transition-all duration-300
                hover:bg-[#3BE3D2]"
            >
              {/* Number watermark */}
              <div
                className="absolute top-5 right-6 font-bricolage font-black text-[48px] md:text-[56px]
                leading-none text-mint/8 group-hover:text-mint/14 transition-colors duration-300 select-none"
              >
                {NUMS[i]}
              </div>

              {/* Checkmark */}
              <div
                className="w-9 h-9 rounded-full bg-mint/10 flex items-center justify-center mb-5
                group-hover:bg-mint/20 transition-colors duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8L6.5 11.5L13 5"
                    stroke="#0DD9C5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Statement bold */}
              <h3 className="font-bricolage font-bold text-[17px] md:text-[20px] leading-[1.2] mb-3 text-ink">
                {card.h}
              </h3>
              <p className="text-[13px] md:text-[13.5px] text-ink-dim leading-[1.65]">
                {card.p}
              </p>
            </div>
          ))}
        </div>

        {/* Rest — compact grid */}
        <div
          ref={ref2}
          className="reveal grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-px
          bg-[var(--line)] border border-[var(--line)] rounded-2xl overflow-hidden"
        >
          {rest.map((card, i) => (
            <div
              key={i}
              className="bg-bg-2 p-5 md:p-7 hover:bg-white/[0.02] transition-colors"
            >
              <div
                className="font-mono text-[10.5px] text-mint uppercase tracking-[0.08em] mb-3
                flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                {card.label}
              </div>
              <h4 className="font-bricolage font-semibold text-[14.5px] md:text-[16px] mb-2 leading-[1.25] text-ink">
                {card.h}
              </h4>
              <p className="text-[12.5px] text-ink-dim leading-[1.6]">
                {card.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
