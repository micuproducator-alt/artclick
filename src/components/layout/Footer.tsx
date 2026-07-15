import { useLang } from "../../context/LangContext";
import { useModal } from "../../context/ModalContext";

const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const InstagramIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);
const ArrowIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 12 12"
    fill="none"
    style={{ flexShrink: 0 }}
  >
    <path
      d="M2 10L10 2M10 2H4M10 2V8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default function Footer() {
  const { i18n } = useLang();
  const { openModal } = useModal();
  const isRO = i18n.lang_toggle === "EN";

  const navLinks = [
    { label: i18n.nav_services, action: () => openModal("services") },
    {
      label: i18n.nav_why ?? (isRO ? "De ce noi" : "Why us"),
      action: () => openModal("services"),
    },
    { label: i18n.nav_projects, action: () => openModal("projects") },
    { label: i18n.nav_process, action: () => openModal("process") },
  ];

  return (
    <footer className="relative z-10 bg-bg-2 border-t border-[var(--line)]">
      {/* ── Main content ── */}
      <div className="wrap py-8 xs:py-10 sm:py-14 lg:py-20">
        {/*
          Mobile     (< 576px):  1 coloană
          xs         (≥ 576px):  2 coloane  — Brand | Contact  /  Nav | Social
          sm/Tablet  (≥ 768px):  4 coloane
        */}
        <div
          className="
          grid gap-x-6 gap-y-8
          grid-cols-2
          sm:grid-cols-4
        "
        >
          {/* ── Brand ── */}
          <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <span
                className="w-[7px] h-[7px] rounded-full bg-mint flex-shrink-0"
                style={{ boxShadow: "0 0 10px rgba(13,217,197,0.55)" }}
              />
              <span className="font-bricolage font-bold text-[18px] text-ink">
                artclick
              </span>
            </div>

            <p className="text-[13.5px] text-ink-dim leading-[1.7] max-w-[220px]">
              {i18n.footer_tagline}
            </p>

            {/* Badge — stiluri inline ca sa nu depinda de Tailwind breakpoints */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 999,
                border: "1px solid rgba(13,217,197,0.3)",
                background: "rgba(13,217,197,0.07)",
                width: "fit-content",
                fontFamily: "monospace",
                fontSize: 11.5,
                color: "#0DD9C5",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#0DD9C5",
                  flexShrink: 0,
                  animation: "pulse 1.6s ease-in-out infinite",
                }}
              />
              {i18n.footer_available}
            </span>
          </div>

          {/* ── Contact ── */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-[10px] xs:text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
              {i18n.footer_contact_title}
            </h4>
            <ul className="flex flex-col gap-2 xs:gap-3">
              <li>
                <a
                  href="mailto:artclickon@outlook.com"
                  className="text-[11.5px] xs:text-[13px] text-ink-dim hover:text-mint transition-colors
                    inline-flex items-center gap-1 xs:gap-1.5 cursor-none leading-tight"
                >
                  <span className="hidden xs:inline">
                    artclickon@outlook.com
                  </span>
                  <span className="xs:hidden">artclickon@outlook.com</span>
                  <ArrowIcon />
                </a>
              </li>
              <li>
                <button
                  onClick={() => openModal("quote")}
                  className="text-[11.5px] xs:text-[13px] text-ink-dim hover:text-mint transition-colors
                    inline-flex items-center gap-1 xs:gap-1.5 cursor-none
                    bg-transparent border-none font-inter text-left leading-tight"
                >
                  {i18n.cta_btn} <ArrowIcon />
                </button>
              </li>
              <li className="pt-1">
                <span className="text-[11px] xs:text-[12.5px] text-ink-faint">
                  {i18n.footer_location}
                </span>
              </li>
            </ul>
          </div>

          {/* ── Navigation ── */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-[10px] xs:text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
              {i18n.footer_links_title}
            </h4>
            <ul className="flex flex-col gap-2 xs:gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-[11.5px] xs:text-[13px] text-ink-dim hover:text-ink transition-colors
                      cursor-none bg-transparent border-none font-inter text-left leading-tight"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Social ── */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-[10px] xs:text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
              {i18n.footer_social_title}
            </h4>
            <div className="flex gap-2.5">
              {[
                {
                  label: "LinkedIn",
                  icon: <LinkedInIcon />,
                  href: "https://www.linkedin.com",
                },
                {
                  label: "Instagram",
                  icon: <InstagramIcon />,
                  href: "https://www.instagram.com",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-[var(--glass-border)]
                    flex items-center justify-center text-ink-dim flex-shrink-0
                    hover:border-mint hover:text-mint hover:bg-mint/8
                    transition-all duration-200 cursor-none"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="mt-2">
              <div className="font-bricolage font-bold text-[32px] text-mint leading-none">
                4+
              </div>
              <div className="text-[12px] text-ink-faint mt-1">
                {isRO ? "proiecte livrate" : "projects delivered"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[var(--line)]">
        <div
          className="wrap py-3 xs:py-4
          flex flex-row items-center justify-between gap-2 flex-wrap"
        >
          <span className="text-[11px] xs:text-[12px] text-ink-faint font-mono">
            {i18n.footer_copy} · {i18n.footer_legal}
          </span>
          <div className="flex items-center gap-3 xs:gap-4">
            <span className="text-[11px] xs:text-[12px] text-ink-faint font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-mint/60 flex-shrink-0" />
              {i18n.footer_location}
            </span>
            <button
              onClick={() => openModal("quote")}
              className="text-[11px] xs:text-[12px] text-ink-faint hover:text-mint font-mono
                transition-colors cursor-none bg-transparent border-none hidden xs:block"
            >
              {i18n.footer_available}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
