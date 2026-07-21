import { useLang } from "../../context/LangContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Tag from "../ui/Tag";

const articles = {
  ro: [
    {
      tag: "ghid · iulie 2026",
      title: "Cât costă un site web în România? Prețuri reale și ghid de buget",
      excerpt:
        "De la 1.500 lei la peste 30.000 lei: ce influențează costul de dezvoltare, ce capcane să eviți și cum să stabilești bugetul corect.",
      readTime: "7 min",
      href: "/blog/cat-costa-un-site-in-romania-2026.html",
      label: "Citește articolul",
    },
    {
      tag: "comparație · iulie 2026",
      title:
        "WordPress sau dezvoltare Custom: Ce soluție se potrivește afacerii tale?",
      excerpt:
        "O analiză obiectivă a costurilor de mentenanță, vitezei de încărcare, securității și flexibilității pe termen lung.",
      readTime: "6 min",
      href: "/blog/wordpress-sau-site-custom-2026.html",
      label: "Citește articolul",
    },
    {
      tag: "SEO & Optimizare · iulie 2026",
      title: "Ghid SEO pentru IMM-uri: Bazele vizibilității organice pe Google",
      excerpt:
        "Pași practici pentru optimizarea on-page, structura datelor, Google Business Profile și aspecte tehnice esențiale.",
      readTime: "8 min",
      href: "/blog/seo-pentru-imm-uri-romania.html",
      label: "Citește articolul",
    },
  ],
  en: [
    {
      tag: "guide · july 2026",
      title:
        "How much does a website cost in Romania? Real prices & budgeting guide",
      excerpt:
        "From 1,500 RON to over 30,000 RON: key price factors, pitfalls to avoid, and how to estimate the right budget.",
      readTime: "7 min",
      href: "/blog/cat-costa-un-site-in-romania-2026.html",
      label: "Read article",
    },
    {
      tag: "comparison · july 2026",
      title:
        "WordPress vs. Custom Development: Which is right for your business?",
      excerpt:
        "An objective breakdown of long-term maintenance costs, performance, security, and scalability.",
      readTime: "6 min",
      href: "/blog/wordpress-sau-site-custom-2026.html",
      label: "Read article",
    },
    {
      tag: "SEO & Optimization · july 2026",
      title:
        "SEO for SMEs: Practical foundations for organic search visibility",
      excerpt:
        "Actionable steps covering on-page optimization, site architecture, Google Business Profile, and essential technical aspects.",
      readTime: "8 min",
      href: "/blog/seo-pentru-imm-uri-romania.html",
      label: "Read article",
    },
  ],
};

export default function Blog() {
  const { i18n } = useLang();
  const ref = useScrollReveal<HTMLDivElement>();
  const isRO = i18n.lang_toggle === "EN";
  const list = isRO ? articles.ro : articles.en;

  return (
    <section className="section-pad bg-bg-2">
      <div className="wrap">
        <div className="flex flex-col xs:flex-row xs:items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <Tag>{isRO ? "resurse & articole" : "resources & articles"}</Tag>
            <h2 className="font-bricolage font-bold text-[clamp(22px,4vw,38px)] leading-[1.1] tracking-[-0.03em]">
              {isRO
                ? "Ghiduri și recomandări pentru proiectul tău"
                : "Guides and insights for your digital presence"}
            </h2>
          </div>
          <a
            href="/blog/cat-costa-un-site-in-romania-2026.html"
            className="font-mono text-[12.5px] text-mint hover:underline flex-shrink-0"
          >
            {isRO ? "Toate articolele →" : "See all articles →"}
          </a>
        </div>

        <div
          ref={ref}
          className="reveal grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {list.map((article, i) => (
            <a
              key={i}
              href={article.href}
              className="group glass-card rounded-[16px] md:rounded-[20px] p-6 flex flex-col gap-4
                hover:-translate-y-1 transition-all duration-300"
            >
              <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-mint flex items-center gap-2">
                <span className="w-3 h-px bg-mint/50 inline-block" />
                {article.tag}
              </div>
              <h3
                className="font-bricolage font-semibold text-[16px] md:text-[17px] leading-[1.3] text-ink
                group-hover:text-mint transition-colors duration-200"
              >
                {article.title}
              </h3>
              <p className="text-[13px] text-ink-dim leading-[1.65] flex-1">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-[var(--line)]">
                <span className="font-mono text-[11px] text-ink-faint">
                  ⏱ {article.readTime}
                </span>
                <span
                  className="text-[12.5px] text-mint font-medium flex items-center gap-1
                  group-hover:gap-2 transition-all duration-200"
                >
                  {article.label}
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 10L10 2M10 2H4M10 2V8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
