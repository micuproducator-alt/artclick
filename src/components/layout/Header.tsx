import { useState } from "react";
import { useLang } from "../../context/LangContext";
import { useModal } from "../../context/ModalContext";

export default function Header() {
  const { i18n, toggleLang } = useLang();
  const { openModal } = useModal();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      label: i18n.nav_services,
      action: () => {
        openModal("services");
        setMenuOpen(false);
      },
    },
    {
      label: i18n.nav_projects,
      action: () => {
        openModal("projects");
        setMenuOpen(false);
      },
    },
    {
      label: i18n.nav_process,
      action: () => {
        openModal("process");
        setMenuOpen(false);
      },
    },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[200] py-4 md:py-5
        backdrop-blur-xl bg-bg/80 border-b border-[var(--line)]"
      >
        <div className="wrap flex items-center justify-between">
          {/* Logo */}
          <div className="font-bricolage font-bold text-[19px] flex items-center gap-2 text-ink">
            <span
              className="w-[7px] h-[7px] rounded-full bg-mint
              shadow-[0_0_10px_rgba(13,217,197,0.6)]"
            />
            Artcllick
          </div>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-sm text-ink-dim hover:text-mint transition-colors cursor-none
                  bg-transparent border-none font-inter font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="font-mono text-[12px] px-3 py-1.5 rounded-full border border-[var(--glass-border)]
                text-ink-dim hover:border-mint hover:text-mint transition-all cursor-none"
            >
              {i18n.lang_toggle}
            </button>
            <button
              onClick={() => openModal("contact")}
              className="px-5 py-2.5 rounded-full bg-mint text-white text-[13.5px] font-medium
                hover:bg-mint/90 transition-all cursor-none
                shadow-[0_4px_20px_rgba(13,217,197,0.3)] hover:shadow-[0_6px_28px_rgba(13,217,197,0.45)]"
            >
              {i18n.nav_cta}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleLang}
              className="font-mono text-[11px] px-2.5 py-1.5 rounded-full border border-[var(--glass-border)]
                text-ink-faint cursor-none"
            >
              {i18n.lang_toggle}
            </button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 cursor-none
                rounded-full border border-[var(--glass-border)] bg-[var(--glass)]"
            >
              <span
                className={`block w-4 h-px bg-ink transition-all ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`}
              />
              <span
                className={`block w-4 h-px bg-ink transition-all ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-4 h-px bg-ink transition-all ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[190] md:hidden transition-all duration-300
        ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-bg/60 backdrop-blur-sm" />
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed top-[58px] left-3 right-3 xs:top-[65px] xs:left-4 xs:right-4 z-[195] md:hidden
        bg-bg-2 border border-[var(--glass-border)] rounded-2xl p-6 shadow-xl
        transition-all duration-300
        ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}
      >
        <nav className="flex flex-col gap-1 mb-5">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="text-left py-3 px-4 text-[15px] text-ink-dim hover:text-mint hover:bg-mint/5
                rounded-xl transition-all cursor-none bg-transparent border-none font-inter"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => {
            openModal("contact");
            setMenuOpen(false);
          }}
          className="w-full py-3 rounded-full bg-mint text-bg font-medium text-[14px]
            shadow-[0_4px_16px_rgba(13,217,197,0.3)] cursor-none"
        >
          {i18n.nav_cta}
        </button>
      </div>
    </>
  );
}
